import { HOJE } from './datas';
import { distanciaEmPalavras, formatarDataDetalhe, formatarDiaMes } from './datasExtenso';
import { etapasDoPedido } from './linhaDoTempo';
import { avisoValendo } from './avisos';
import { buscarStatusSolicitacao, textoContagemSolicitacoes } from './solicitacoes';
import { contar, resumirLugar } from './resumoLugar';
import { projetosEmVotacao } from './votacao';
import { subprefeituraDoBairro } from './recorte';

// Funções de leitura da página Início: juntam os dados que já existem (solicitações, pedidos,
// avisos, votações e obras) no formato dos cards. Nenhuma guarda ou copia dados.

// Põe a primeira letra em maiúscula. Recebe "amanhã"; devolve "Amanhã".
function comMaiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Momento de um agendamento, para ordenar. Recebe a solicitação; devolve "2026-11-14T08:30".
function momentoAgendado(solicitacao) {
  return `${solicitacao.agendamento.data}T${solicitacao.agendamento.hora}`;
}

// Separa os serviços agendados de hoje em diante, do mais próximo para o mais distante.
// Recebe as solicitações da pessoa e o hoje; devolve { proxima, seguintes, total }.
export function agendaDoInicio(solicitacoes, hoje = HOJE) {
  const agendadas = solicitacoes
    .filter((item) => item.status === 'agendada' && item.agendamento?.data >= hoje)
    .sort((a, b) => momentoAgendado(a).localeCompare(momentoAgendado(b)));
  return { proxima: agendadas[0] ?? null, seguintes: agendadas.slice(1), total: agendadas.length };
}

// Escreve o dia do próximo agendamento na faixa do card.
// Recebe "2026-11-14"; devolve { perto: "Amanhã", data: "sábado, 14 de novembro" }
// (perto fica vazio quando o dia está a mais de 7 dias).
export function diaDoAgendamento(data, hoje = HOJE) {
  const perto = distanciaEmPalavras(data, hoje);
  return { perto: perto ? comMaiuscula(perto) : '', data: formatarDataDetalhe(data) };
}

// Separa as solicitações que esperam a prefeitura (solicitadas e em análise), da mais nova
// para a mais antiga. Recebe as solicitações da pessoa; devolve uma nova lista.
export function solicitacoesEsperando(solicitacoes) {
  return solicitacoes
    .filter((item) => buscarStatusSolicitacao(item.status).grupo === 'solicitadas')
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

// Diz se a solicitação termina com uma resposta (ex.: Informação pública) em vez de um dia marcado.
// Recebe a solicitação; devolve true ou false.
function terminaComResposta(solicitacao) {
  return (solicitacao.textoPrazo ?? 'Resposta até').startsWith('Resposta');
}

// Monta as 3 etapas da barra de uma solicitação que espera a prefeitura:
// Solicitada → Prefeitura marca o dia → Agendada (ou → Prefeitura responde → Respondida).
// Recebe a solicitação; devolve [{ id, rotulo, estado, cor }] com a 2ª etapa atual, em cinza.
export function etapasDaSolicitacao(solicitacao) {
  const resposta = terminaComResposta(solicitacao);
  return [
    { id: 'solicitada', rotulo: 'Solicitada', estado: 'feita' },
    {
      id: 'prefeitura',
      rotulo: resposta ? 'Prefeitura responde' : 'Prefeitura marca o dia',
      estado: 'atual',
      cor: 'cinza',
    },
    { id: 'fim', rotulo: resposta ? 'Respondida' : 'Agendada', estado: 'futura' },
  ];
}

// Escreve a linha de baixo do card da solicitação: quando foi pedida e o prazo da prefeitura.
// Recebe a solicitação; devolve { quando: "Solicitada em 6 nov", prazo: "Resposta até 30 nov" }.
export function textosDaSolicitacao(solicitacao, hoje = HOJE) {
  const relativa = distanciaEmPalavras(solicitacao.criadoEm, hoje);
  const perto = relativa === 'hoje' || relativa === 'ontem';
  const quando = `Solicitada ${perto ? relativa : `em ${formatarDiaMes(solicitacao.criadoEm)}`}`;
  const prazo = solicitacao.prazoData
    ? `${solicitacao.textoPrazo ?? 'Resposta até'} ${formatarDiaMes(solicitacao.prazoData)}`
    : '';
  return { quando, prazo };
}

// Monta as 5 etapas da barra de um pedido em andamento (Enviado → … → Concluído).
// Reaproveita etapasDoPedido (a linha do tempo do detalhe) e só acrescenta a cor da atual:
// âmbar em "Em análise", azul nas outras. Recebe o pedido; devolve [{ id, rotulo, estado, cor }].
export function etapasDoPedidoInicio(pedido) {
  return etapasDoPedido(pedido).map((etapa) => ({
    id: etapa.id,
    rotulo: etapa.rotulo,
    estado: etapa.estado,
    cor: etapa.id === 'em-analise' ? 'ambar' : 'azul',
  }));
}

// Separa os avisos que valem para a pessoa: os da cidade toda e os que citam o bairro dela,
// do mais novo para o mais antigo. Recebe os avisos, o bairro (null para visitante: só os da
// cidade) e o hoje. Devolve os avisos com o caminho do detalhe (cidade ou bairro).
export function avisosDoInicio(avisos, bairro = null, hoje = HOJE) {
  return avisos
    .filter((aviso) => avisoValendo(aviso, hoje))
    .filter((aviso) => aviso.bairros.length === 0 || (bairro && aviso.bairros.includes(bairro)))
    .sort((a, b) => b.data.localeCompare(a.data))
    .map((aviso) => ({
      ...aviso,
      caminho: `${aviso.bairros.length === 0 ? '/minha-cidade' : '/meu-bairro'}/avisos/${aviso.id}`,
    }));
}

// Separa as votações abertas para a pessoa: as da cidade toda e as da subprefeitura do bairro
// dela, da que termina antes para a que termina depois. Recebe os projetos, o bairro (null para
// visitante: só as da cidade) e o hoje. Devolve uma nova lista de projetos.
export function votacoesDoInicio(projetos, bairro = null, hoje = HOJE) {
  const sub = bairro ? subprefeituraDoBairro(bairro).nome : null;
  return projetosEmVotacao(projetos, hoje).filter(
    (projeto) =>
      projeto.escopo === 'cidade' ||
      (projeto.escopo === 'subprefeitura' && projeto.subprefeitura === sub),
  );
}

// Monta os cards do "Para onde ir" do Início, cada um com um número real.
// Com conta: Meus pedidos, Minhas solicitações, Meu bairro e Minha cidade.
// Visitante: só Meu bairro e Minha cidade.
// Recebe { usuario, pedidos, solicitacoes }; devolve [{ icone, titulo, meta, para }].
export function destinosDoInicio({ usuario, pedidos, solicitacoes }) {
  const alertas = (bairros) =>
    contar(resumirLugar(pedidos, bairros).alertas, 'alerta ativo', 'alertas ativos');
  const hubs = [
    {
      icone: 'home_pin',
      titulo: 'Meu bairro',
      meta: usuario ? `${usuario.bairro} · ${alertas([usuario.bairro])}` : 'O resumo do seu bairro',
      para: '/meu-bairro',
    },
    {
      icone: 'location_city',
      titulo: 'Minha cidade',
      meta: `Cidade de São Paulo · ${alertas(null)}`,
      para: '/minha-cidade',
    },
  ];
  if (!usuario) return hubs;

  const feitos = pedidos.filter((pedido) => pedido.autorId === usuario.id).length;
  return [
    {
      icone: 'assignment',
      titulo: 'Meus pedidos',
      meta: contar(feitos, 'feito por você', 'feitos por você'),
      para: '/perfil/pedidos',
    },
    {
      icone: 'event_available',
      titulo: 'Minhas solicitações',
      meta: textoContagemSolicitacoes(solicitacoes),
      para: '/servicos/minhas-solicitacoes',
    },
    ...hubs,
  ];
}
