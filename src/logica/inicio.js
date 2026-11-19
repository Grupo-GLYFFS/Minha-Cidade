import { HOJE } from './datas';
import { distanciaEmPalavras, formatarDataDetalhe, formatarDiaMes } from './datasExtenso';
import { dataLista, dataListaComDia, dataPrevisao } from './datasTexto';
import { etapasDoPedido } from './linhaDoTempo';
import { avisoValendo, juntarNomes } from './avisos';
import { buscarCategoria, buscarStatus, estaAberto, textoUltimaMudanca } from './pedidos';
import { buscarSituacaoObra, textoPrevisao } from './obras';
import { buscarStatusSolicitacao } from './solicitacoes';
import {
  caminhoVotacao,
  lugarDaVotacao,
  projetosEmVotacao,
  textoFaltam as textoFaltamVotacao,
} from './votacao';
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
// cidade) e o hoje. Devolve os avisos com { caminho, onde } prontos para o card.
export function avisosDoInicio(avisos, bairro = null, hoje = HOJE) {
  return avisos
    .filter((aviso) => avisoValendo(aviso, hoje))
    .filter((aviso) => aviso.bairros.length === 0 || (bairro && aviso.bairros.includes(bairro)))
    .sort((a, b) => b.data.localeCompare(a.data))
    .map((aviso) => {
      const daCidade = aviso.bairros.length === 0;
      return {
        ...aviso,
        caminho: `${daCidade ? '/minha-cidade' : '/meu-bairro'}/avisos/${aviso.id}`,
        onde: daCidade ? 'Cidade toda' : juntarNomes(aviso.bairros),
      };
    });
}

// Separa as votações abertas para a pessoa: as da cidade toda e as da subprefeitura do bairro
// dela, da que termina antes para a que termina depois. Recebe os projetos, o bairro (null para
// visitante: só as da cidade) e o hoje. Devolve as votações com { caminho, lugar, faltam, termina }.
export function votacoesDoInicio(projetos, bairro = null, hoje = HOJE) {
  const sub = bairro ? subprefeituraDoBairro(bairro).nome : null;
  return projetosEmVotacao(projetos, hoje)
    .filter(
      (projeto) =>
        projeto.escopo === 'cidade' ||
        (projeto.escopo === 'subprefeitura' && projeto.subprefeitura === sub),
    )
    .map(descreverVotacao);
}

// Junta os textos que os cards mostram de uma votação aberta.
// Recebe o projeto; devolve o projeto com { caminho, lugar, faltam, termina }.
function descreverVotacao(projeto) {
  return {
    ...projeto,
    caminho: caminhoVotacao(projeto),
    lugar: lugarDaVotacao(projeto),
    faltam: textoFaltamVotacao(projeto.fimVotacao),
    termina: `termina ${dataListaComDia(projeto.fimVotacao)}`,
  };
}

// Monta a lista "O que você segue": obras, depois pedidos, depois votações abertas.
// Recebe { obras, idsObras, pedidos, idsPedidos, projetos, idsVotacoes } (listas completas e os
// ids seguidos). Devolve [{ id, tipo, icone, lugar, titulo, caminho, selo, meta, percentual }].
export function itensSeguidos({ obras, idsObras, pedidos, idsPedidos, projetos, idsVotacoes }) {
  const deObras = obras
    .filter((obra) => idsObras.includes(obra.id))
    .map((obra) => {
      const situacao = buscarSituacaoObra(obra.situacao);
      const previsao = textoPrevisao(obra, { dataPrevisao, dataLista });
      return {
        id: `obra-${obra.id}`,
        tipo: 'Obra',
        icone: obra.icone,
        lugar: obra.bairro ?? `Subprefeitura ${obra.subprefeitura}`,
        titulo: obra.titulo,
        caminho: `/minha-cidade/obras/${obra.id}`,
        selo: situacao && { cor: situacao.cor, rotulo: situacao.rotulo },
        meta: { destaque: `${obra.percentual}%`, texto: ` feita · ${previsao}` },
        percentual: obra.percentual,
      };
    });

  const dePedidos = pedidos
    .filter((pedido) => idsPedidos.includes(pedido.id) && estaAberto(pedido))
    .map((pedido) => {
      const status = buscarStatus(pedido.status);
      return {
        id: `pedido-${pedido.id}`,
        tipo: 'Pedido',
        icone: buscarCategoria(pedido.categoria)?.icone ?? 'assignment',
        lugar: `${pedido.rua}, ${pedido.bairro}`,
        titulo: pedido.titulo,
        caminho: `/pedidos/${pedido.id}`,
        selo: status && { cor: status.cor, rotulo: status.rotulo },
        meta: { texto: textoUltimaMudanca(pedido) },
      };
    });

  const deVotacoes = projetosEmVotacao(projetos)
    .filter((projeto) => idsVotacoes.includes(projeto.id))
    .map(descreverVotacao)
    .map((votacao) => ({
      id: `votacao-${votacao.id}`,
      tipo: 'Votação',
      icone: votacao.icone,
      lugar: votacao.lugar,
      titulo: votacao.titulo,
      caminho: votacao.caminho,
      meta: { texto: `${votacao.faltam} · termina ${dataLista(votacao.fimVotacao)}` },
    }));

  return [...deObras, ...dePedidos, ...deVotacoes];
}
