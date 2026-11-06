import { HOJE, formatarDataCurta, momentoDeHoje } from './datas';
import { mascararCpf } from './cpf';

// Solicitações de serviço (formulários online do catálogo), separadas dos pedidos de zeladoria.

// Começo do protocolo das solicitações, para não confundir com o dos pedidos ("2026-005121")
const PREFIXO_PROTOCOLO = 'SRV';

// Descobre o próximo protocolo de solicitação, seguindo a sequência das já feitas no ano.
// Recebe todas as solicitações (de todas as pessoas) e a data de hoje;
// devolve um texto como "SRV-2026-000123".
export function proximoProtocoloSolicitacao(solicitacoes, hoje = HOJE) {
  const inicio = `${PREFIXO_PROTOCOLO}-${hoje.slice(0, 4)}-`;
  // Pega a parte numérica de cada protocolo do mesmo ano e acha o maior
  const numeros = solicitacoes
    .filter((item) => item.protocolo.startsWith(inicio))
    .map((item) => Number(item.protocolo.slice(inicio.length)) || 0);
  const proximo = Math.max(0, ...numeros) + 1;
  return `${inicio}${String(proximo).padStart(6, '0')}`;
}

// Gera um id que ainda não existe na lista. Recebe as solicitações; devolve um texto como "s-004".
export function proximoIdSolicitacao(solicitacoes) {
  const numeros = solicitacoes.map((item) => Number(item.id.slice(2)) || 0);
  return `s-${String(Math.max(0, ...numeros) + 1).padStart(3, '0')}`;
}

// Escreve a resposta de um campo como texto seguro para guardar.
// Recebe o campo e o valor preenchido; devolve o texto (vazio se não foi respondido).
// Arquivo vira só o nome; CPF fica com o começo e o fim escondidos.
function respostaEmTexto(campo, valor) {
  if (valor === null || valor === undefined || valor === '') return '';
  if (campo.tipo === 'arquivo') return valor.name;
  if (campo.tipo === 'cpf') return mascararCpf(valor);
  if (campo.tipo === 'data') return formatarDataCurta(valor);
  if (campo.tipo === 'selecao') {
    return campo.opcoes.find((opcao) => opcao.valor === valor)?.rotulo ?? valor;
  }
  return String(valor).trim();
}

// Transforma o que a pessoa preencheu na lista de respostas da solicitação.
// Recebe os campos do serviço e os valores já validados;
// devolve [{ nome, rotulo, valor }] só com texto, sem as perguntas deixadas em branco.
export function prepararRespostas(campos, valores) {
  const respostas = [];
  campos.forEach((campo) => {
    if (campo.tipo === 'cep') {
      const numero = valores.numero.trim();
      respostas.push(
        { nome: 'cep', rotulo: campo.rotulo, valor: valores.cep },
        { nome: 'rua', rotulo: 'Rua', valor: valores.rua.trim() },
        // "s/n", "sn" e "S/N" ficam todos como "S/N"
        { nome: 'numero', rotulo: 'Número', valor: /^s\/?n$/i.test(numero) ? 'S/N' : numero },
        { nome: 'bairro', rotulo: 'Bairro', valor: valores.bairro.trim() },
        { nome: 'regiao', rotulo: 'Região', valor: valores.regiao },
      );
      return;
    }
    respostas.push({
      nome: campo.nome,
      rotulo: campo.rotulo,
      valor: respostaEmTexto(campo, valores[campo.nome]),
    });
  });
  return respostas.filter((resposta) => resposta.valor !== '');
}

// Monta a solicitação completa para guardar.
// Recebe o serviço, as respostas já preparadas, a lista atual (de todas as pessoas),
// o id de quem pediu e o momento de agora; devolve a solicitação com status "recebida".
export function montarSolicitacao(
  servico,
  respostas,
  solicitacoes,
  idAutor,
  agora = momentoDeHoje(),
) {
  return {
    id: proximoIdSolicitacao(solicitacoes),
    protocolo: proximoProtocoloSolicitacao(solicitacoes, agora.slice(0, 10)),
    idServico: servico.id,
    nomeServico: servico.nome,
    categoria: servico.categoria,
    autorId: idAutor,
    respostas,
    status: 'recebida',
    criadoEm: agora,
    prazo: servico.info.prazo,
  };
}

// Passos que vêm depois do envio, tirados do "como fazer" do serviço.
// Recebe o serviço e o limite; devolve os passos depois do último que fala em enviar
// (lista vazia se não houver nenhum).
export function proximosPassos(servico, limite = 3) {
  const passos = servico.info.comoFazer ?? [];
  const ultimoEnvio = passos.findLastIndex((passo) => /\benvie\b/i.test(passo));
  if (ultimoEnvio === -1) return [];
  return passos.slice(ultimoEnvio + 1, ultimoEnvio + 1 + limite);
}
