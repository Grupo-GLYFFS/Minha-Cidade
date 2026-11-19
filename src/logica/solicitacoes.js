import { HOJE, formatarDataCurta, momentoDeHoje } from './datas';
import { mascararCpf } from './cpf';
import { formatarDataDetalhe, formatarHora, somarDias, horarioPorExtenso } from './datasExtenso';
import { STATUS_SOLICITACAO } from '../dados/statusSolicitacao';
import { GRUPOS_SOLICITACAO } from '../dados/gruposSolicitacao';

// Solicitações de serviço (formulários online do catálogo), separadas dos pedidos de zeladoria.

// Começo do protocolo das solicitações, para não confundir com o dos pedidos ("2026-005121")
const PREFIXO_PROTOCOLO = 'SRV';

// Prazo padrão de resposta, quando o serviço não diz o seu
const PRAZO_PADRAO_DIAS = 15;

// Descobre o próximo protocolo de solicitação, seguindo a sequência das já feitas no ano.
// Recebe todas as solicitações (de todas as pessoas) e a data de hoje;
// devolve um texto como "SRV-2026-119311".
export function proximoProtocoloSolicitacao(solicitacoes, hoje = HOJE) {
  const inicio = `${PREFIXO_PROTOCOLO}-${hoje.slice(0, 4)}-`;
  // Pega a parte numérica de cada protocolo do mesmo ano e acha o maior
  const numeros = solicitacoes
    .filter((item) => item.protocolo.startsWith(inicio))
    .map((item) => Number(item.protocolo.slice(inicio.length)) || 0);
  const proximo = Math.max(0, ...numeros) + 1;
  return `${inicio}${String(proximo).padStart(6, '0')}`;
}

// Escreve a resposta de um campo como texto seguro para guardar.
// Recebe o campo, o valor preenchido e se a data vai por extenso ("quarta, 18 de novembro")
// ou curta ("18/11/2026", na revisão do formulário); devolve o texto (vazio se não foi respondido).
// Arquivo vira só o nome; CPF fica com o começo e o fim escondidos.
export function respostaEmTexto(campo, valor, dataExtensa = false) {
  if (valor === null || valor === undefined || valor === '') return '';
  if (campo.tipo === 'arquivo') return valor.name;
  if (campo.tipo === 'cpf') return mascararCpf(valor);
  if (campo.tipo === 'data')
    return dataExtensa ? formatarDataDetalhe(valor) : formatarDataCurta(valor);
  if (campo.tipo === 'hora') return formatarHora(valor);
  if (campo.tipo === 'selecao') {
    return campo.opcoes.find((opcao) => opcao.valor === valor)?.rotulo ?? valor;
  }
  return String(valor).trim();
}

// Transforma o que a pessoa preencheu na lista de respostas da solicitação.
// Recebe os campos do serviço (sem o de CEP) e os valores já validados;
// devolve [{ nome, rotulo, valor }] só com texto, sem as perguntas deixadas em branco.
export function prepararRespostas(campos, valores) {
  return campos
    .map((campo) => ({
      nome: campo.nome,
      rotulo: campo.rotulo,
      valor: respostaEmTexto(campo, valores[campo.nome], true),
    }))
    .filter((resposta) => resposta.valor !== '');
}

// Endereço da pessoa em uma linha. Recebe o usuário; devolve "Rua Joaquim Távora, 120".
export function enderecoCurto(usuario) {
  return `${usuario.rua}, ${usuario.numero}`;
}

// Monta a solicitação completa para guardar.
// Recebe o serviço, as respostas já preparadas, a lista atual (de todas as pessoas),
// o usuário e o momento de agora; devolve a solicitação "solicitada", com o prazo de resposta.
export function montarSolicitacao(
  servico,
  respostas,
  solicitacoes,
  usuario,
  agora = momentoDeHoje(),
) {
  const protocolo = proximoProtocoloSolicitacao(solicitacoes, agora.slice(0, 10));
  // O resumo do card junta as duas primeiras respostas curtas
  const curtas = respostas.filter(
    (resposta) => resposta.valor.length <= 40 && resposta.nome !== 'cpf',
  );
  const resumo = [...curtas.slice(0, 1).map((r) => r.valor), enderecoCurto(usuario)].join(' · ');
  return {
    id: protocolo,
    protocolo,
    idServico: servico.id,
    nomeServico: servico.nome,
    categoria: servico.categoria,
    autorId: usuario.id,
    status: 'solicitada',
    resumo,
    criadoEm: agora,
    prazoData: somarDias(agora, servico.prazoDias ?? PRAZO_PADRAO_DIAS),
    textoPrazo: servico.textoPrazo ?? 'Resposta até',
    avisoPrazo: 'Você recebe uma notificação quando houver novidade.',
    prazo: servico.info.prazo,
    local: { nome: enderecoCurto(usuario), endereco: usuario.bairro },
    historico: [{ status: 'solicitada', em: agora, textos: ['Solicitação recebida.'] }],
    respostas: [
      ...respostas,
      {
        nome: 'endereco',
        rotulo: 'Endereço',
        valor: `${enderecoCurto(usuario)} · ${usuario.bairro}, ${usuario.cidade}`,
      },
    ],
  };
}

// Procura os dados de uma situação de solicitação (rótulo, cor e grupo).
// Recebe o id (ex.: "agendada"); devolve o objeto ou o de "solicitada" se não achar.
export function buscarStatusSolicitacao(idStatus) {
  return STATUS_SOLICITACAO.find((status) => status.id === idStatus) ?? STATUS_SOLICITACAO[0];
}

// Procura uma solicitação pelo id (o protocolo). Devolve a solicitação ou null.
export function buscarSolicitacao(solicitacoes, id) {
  return solicitacoes.find((item) => item.id === id) ?? null;
}

// Ordena as solicitações da mais recente para a mais antiga.
// Recebe a lista; devolve uma nova lista (a original não muda).
export function ordenarSolicitacoes(solicitacoes) {
  return [...solicitacoes].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

// Momento do agendamento, para ordenar. Recebe a solicitação; devolve "2026-11-14T08:30".
function momentoAgendado(solicitacao) {
  return `${solicitacao.agendamento.data}T${solicitacao.agendamento.hora}`;
}

// Separa as solicitações nos grupos da página, na ordem de GRUPOS_SOLICITACAO.
// Agendadas: da mais próxima para a mais distante. Solicitadas: da mais nova para a mais antiga.
// Concluídas e canceladas: da mais recente para a mais antiga.
// Recebe a lista; devolve [{ grupo, itens }] sem os grupos vazios.
export function agruparSolicitacoes(solicitacoes) {
  const ordenar = {
    agendadas: (a, b) => momentoAgendado(a).localeCompare(momentoAgendado(b)),
    solicitadas: (a, b) => b.criadoEm.localeCompare(a.criadoEm),
    concluidas: (a, b) => (b.concluidaEm ?? '').localeCompare(a.concluidaEm ?? ''),
    canceladas: (a, b) => (b.canceladaEm ?? '').localeCompare(a.canceladaEm ?? ''),
  };
  return GRUPOS_SOLICITACAO.map((grupo) => ({
    grupo,
    itens: solicitacoes
      .filter((item) => buscarStatusSolicitacao(item.status).grupo === grupo.id)
      .sort(ordenar[grupo.id]),
  })).filter((bloco) => bloco.itens.length > 0);
}

// Junta as agendadas por dia, para a data aparecer uma vez só acima dos cards.
// Recebe as agendadas já em ordem; devolve [{ data, itens }].
export function agruparPorDia(agendadas) {
  const dias = [];
  agendadas.forEach((item) => {
    const ultimo = dias[dias.length - 1];
    if (ultimo?.data === item.agendamento.data) ultimo.itens.push(item);
    else dias.push({ data: item.agendamento.data, itens: [item] });
  });
  return dias;
}

// Conta as agendadas e as solicitadas. Recebe a lista; devolve { agendadas, solicitadas }.
export function contarSolicitacoes(solicitacoes) {
  const contar = (grupo) =>
    solicitacoes.filter((item) => buscarStatusSolicitacao(item.status).grupo === grupo).length;
  return { agendadas: contar('agendadas'), solicitadas: contar('solicitadas') };
}

// Texto curto com as contagens, para os cards "Para onde ir".
// Recebe a lista e se mostra as solicitadas; devolve "4 agendadas" ou "4 agendadas, 3 solicitadas".
export function textoContagemSolicitacoes(solicitacoes, comSolicitadas = false) {
  const { agendadas, solicitadas } = contarSolicitacoes(solicitacoes);
  const partes = [agendadas === 1 ? '1 agendada' : `${agendadas} agendadas`];
  if (comSolicitadas)
    partes.push(solicitadas === 1 ? '1 solicitada' : `${solicitadas} solicitadas`);
  return partes.join(', ');
}

// Horário do agendamento em texto. Recebe o agendamento; devolve "8h30" ou "16h às 17h".
export function textoHorario(agendamento) {
  const inicio = formatarHora(agendamento.hora);
  return agendamento.horaFim ? `${inicio} às ${formatarHora(agendamento.horaFim)}` : inicio;
}

// Calcula o agendamento novo de uma remarcação, mantendo a duração quando há hora de fim.
// Recebe a solicitação, a data e a hora escolhidas; devolve { data, hora, horaFim? }.
export function agendamentoRemarcado(solicitacao, data, hora) {
  const { horaFim } = solicitacao.agendamento;
  if (!horaFim) return { data, hora };
  const minutos = (texto) => Number(texto.slice(0, 2)) * 60 + Number(texto.slice(3, 5));
  const fim = minutos(hora) + minutos(horaFim) - minutos(solicitacao.agendamento.hora);
  const novoFim = `${String(Math.floor(fim / 60)).padStart(2, '0')}:${String(fim % 60).padStart(2, '0')}`;
  return { data, hora, horaFim: novoFim };
}

// Frase da remarcação, igual no aviso do rodapé, no histórico e na notificação.
// Recebe o começo ("Remarcado" ou "Remarcada") e o agendamento novo;
// devolve, por exemplo, "Remarcado para sexta, 20 de novembro, das 7h às 13h."
export function textoRemarcado(comeco, { data, hora, horaFim }) {
  return `${comeco} para ${formatarDataDetalhe(data)}, ${horarioPorExtenso(hora, horaFim)}.`;
}

// Remarca um agendamento para outro dia e hora, com a etapa nova no histórico.
// Recebe a solicitação, a data e a hora escolhidas e o momento de agora; devolve a solicitação nova.
export function remarcarSolicitacao(solicitacao, data, hora, agora = momentoDeHoje()) {
  const agendamento = agendamentoRemarcado(solicitacao, data, hora);
  return {
    ...solicitacao,
    agendamento,
    // O horário escolhido deixa de aparecer como livre
    horariosLivres: (solicitacao.horariosLivres ?? [])
      .map((dia) => ({ ...dia, horas: dia.horas.filter((h) => dia.data !== data || h !== hora) }))
      .filter((dia) => dia.horas.length > 0),
    historico: [
      ...solicitacao.historico,
      {
        status: 'agendada',
        rotulo: 'Remarcada',
        em: agora,
        textos: [textoRemarcado('Remarcada', agendamento)],
      },
    ],
  };
}

// Cancela uma solicitação, com a etapa nova no histórico.
// Recebe a solicitação e o momento de agora; devolve a solicitação "cancelada".
export function cancelarSolicitacao(solicitacao, agora = momentoDeHoje()) {
  return {
    ...solicitacao,
    status: 'cancelada',
    canceladaEm: agora,
    historico: [
      ...solicitacao.historico,
      { status: 'cancelada', em: agora, textos: ['Você cancelou esta solicitação.'] },
    ],
  };
}

// Endereço do Google Maps para o "Como chegar". Recebe o local; devolve a URL da busca.
export function linkComoChegar(local) {
  const busca = [local.nome, local.endereco, 'São Paulo'].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
}
