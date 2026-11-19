import { buscarStatus } from './pedidos';

// Caminho normal de um pedido, do envio até a conclusão
export const ETAPAS_NORMAIS = ['enviada', 'em-analise', 'aprovada', 'em-execucao', 'concluida'];

// O que acontece em cada etapa, em linguagem simples (detalhe do pedido)
const EXPLICACOES = {
  enviada: 'O pedido chegou à prefeitura.',
  'em-analise': 'A equipe confere o local e o tipo de problema.',
  aprovada: 'O serviço foi aprovado e entrou na fila.',
  'em-execucao': 'A equipe está trabalhando no local.',
  concluida: 'O serviço foi terminado.',
  avaliada: 'Quem abriu o pedido avaliou o serviço.',
};

// O que vem pela frente em cada etapa (tela "Pedido enviado")
export const PROXIMOS_PASSOS = {
  'em-analise': 'A equipe confere o local e o tipo de problema.',
  aprovada: 'A prefeitura define a prioridade e quem vai fazer o serviço.',
  'em-execucao': 'A equipe faz o conserto.',
  concluida: 'Você avalia o resultado.',
};

const UM_DIA_MS = 24 * 60 * 60 * 1000;

// Estima o dia de uma etapa que não tem data guardada, repartindo o tempo
// entre o envio e a última mudança. Recebe o pedido, a posição da etapa e a posição atual;
// devolve "AAAA-MM-DD".
function estimarData(pedido, posicao, posicaoAtual) {
  if (posicaoAtual <= 0) return pedido.criadoEm.slice(0, 10);
  const inicio = Date.parse(pedido.criadoEm.slice(0, 10));
  const fim = Date.parse(pedido.atualizadoEm.slice(0, 10));
  const dias = Math.round(((fim - inicio) / UM_DIA_MS) * (posicao / posicaoAtual));
  return new Date(inicio + dias * UM_DIA_MS).toISOString().slice(0, 10);
}

// Junta os dados de uma etapa. Recebe o id do status, o estado, a data e a explicação.
function montarEtapa(id, estado, data, explicacao = EXPLICACOES[id]) {
  return { id, rotulo: buscarStatus(id)?.rotulo ?? id, explicacao, estado, data };
}

// Monta as etapas da linha do tempo de um pedido.
// Recebe o pedido; devolve uma lista de { id, rotulo, explicacao, estado, data }, em que
// estado é "feita", "atual", "futura" ou "recusada". Etapas futuras não têm data.
// As datas vêm de pedido.datasEtapas; as que faltam são estimadas.
export function etapasDoPedido(pedido) {
  const datas = pedido.datasEtapas ?? {};

  // Pedido recusado: passou pelo envio e pela análise e parou ali, com o motivo
  if (pedido.status === 'recusada') {
    return [
      montarEtapa('enviada', 'feita', datas.enviada ?? estimarData(pedido, 0, 2)),
      montarEtapa('em-analise', 'feita', datas['em-analise'] ?? estimarData(pedido, 1, 2)),
      montarEtapa(
        'recusada',
        'recusada',
        datas.recusada ?? estimarData(pedido, 2, 2),
        pedido.motivoRecusa ?? 'A prefeitura não vai atender este pedido.',
      ),
    ];
  }

  // "Avaliado" só aparece quando o pedido chegou nele
  const ids = pedido.status === 'avaliada' ? [...ETAPAS_NORMAIS, 'avaliada'] : ETAPAS_NORMAIS;
  const posicaoAtual = ids.indexOf(pedido.status);
  const ultima = ids.length - 1;

  return ids.map((id, posicao) => {
    if (posicao > posicaoAtual) return montarEtapa(id, 'futura');
    // A última etapa (concluído ou avaliado) já é o fim: aparece como feita
    const estado = posicao === posicaoAtual && posicao !== ultima ? 'atual' : 'feita';
    const data =
      datas[id] ??
      (posicao === posicaoAtual
        ? pedido.atualizadoEm.slice(0, 10)
        : estimarData(pedido, posicao, posicaoAtual));
    return montarEtapa(id, estado, data);
  });
}
