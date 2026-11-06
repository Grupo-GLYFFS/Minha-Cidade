import { buscarStatus } from './pedidos';

// Caminho normal de um pedido, do envio até a conclusão
const ETAPAS_NORMAIS = ['enviada', 'em-analise', 'aprovada', 'em-execucao', 'concluida'];

// O que acontece em cada etapa, em linguagem simples
const EXPLICACOES = {
  enviada: 'O pedido chegou à prefeitura.',
  'em-analise': 'A equipe confere o local e o tipo de problema.',
  aprovada: 'O serviço foi aprovado e entrou na fila.',
  'em-execucao': 'A equipe está trabalhando no local.',
  concluida: 'O serviço foi terminado.',
  avaliada: 'Quem abriu o pedido avaliou o serviço.',
};

// Monta as etapas da linha do tempo de um pedido.
// Recebe o pedido; devolve uma lista de { id, rotulo, explicacao, estado, data }, em que
// estado é "feita", "atual", "futura" ou "recusada" e data só existe quando é conhecida.
export function etapasDoPedido(pedido) {
  // Pedido recusado: passou pelo envio e pela análise e parou ali
  if (pedido.status === 'recusada') {
    return [
      montarEtapa('enviada', 'feita', pedido.criadoEm),
      montarEtapa('em-analise', 'feita'),
      {
        id: 'recusada',
        rotulo: 'Recusado',
        explicacao: pedido.motivoRecusa ?? 'A prefeitura não vai atender este pedido.',
        estado: 'recusada',
        data: pedido.atualizadoEm,
      },
    ];
  }

  // "Avaliada" só aparece quando o pedido chegou nela
  const ids = pedido.status === 'avaliada' ? [...ETAPAS_NORMAIS, 'avaliada'] : ETAPAS_NORMAIS;
  const posicaoAtual = ids.indexOf(pedido.status);
  const ultima = ids.length - 1;

  return ids.map((id, posicao) => {
    let estado = 'futura';
    if (posicao < posicaoAtual) estado = 'feita';
    // A última etapa (concluída ou avaliada) já é o fim: aparece como feita
    if (posicao === posicaoAtual) estado = posicao === ultima ? 'feita' : 'atual';

    let data;
    if (posicao === 0) data = pedido.criadoEm;
    else if (posicao === posicaoAtual) data = pedido.atualizadoEm;
    return montarEtapa(id, estado, data);
  });
}

// Junta os dados de uma etapa. Recebe o id do status, o estado e a data (opcional).
function montarEtapa(id, estado, data) {
  return { id, rotulo: buscarStatus(id)?.rotulo ?? id, explicacao: EXPLICACOES[id], estado, data };
}

// Descobre a posição da etapa atual, para destacar a linha até ela.
// Recebe a lista de etapas; devolve o índice da última etapa feita, atual ou recusada.
export function posicaoEtapaAtiva(etapas) {
  return etapas.reduce((ativa, etapa, posicao) => (etapa.estado === 'futura' ? ativa : posicao), 0);
}
