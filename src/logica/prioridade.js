// Faixas de prioridade, da mais alta para a mais baixa.
// "minimo" é a pontuação a partir da qual o pedido entra na faixa.
// O ícone de barras também mostra o nível, então a cor nunca é a única informação.
export const NIVEIS_PRIORIDADE = [
  {
    id: 'alta',
    rotulo: 'Prioridade alta',
    minimo: 75,
    cor: '#A11A1A',
    icone: 'signal_cellular_alt',
  },
  {
    id: 'media',
    rotulo: 'Prioridade média',
    minimo: 35,
    cor: '#6E4A00',
    icone: 'signal_cellular_alt_2_bar',
  },
  {
    id: 'baixa',
    rotulo: 'Prioridade baixa',
    minimo: 0,
    cor: '#525D73',
    icone: 'signal_cellular_alt_1_bar',
  },
];

// Calcula a nota do problema (matriz GUT).
// Recebe o pedido; devolve gravidade × urgência × tendência (de 1 a 125).
export function calcularNotaProblema(pedido) {
  return pedido.gravidade * pedido.urgencia * pedido.tendencia;
}

// Calcula a prioridade do pedido.
// Multiplica gravidade, urgência e tendência (notas de 1 a 5)
// e soma 1 ponto para cada apoio recebido. Recebe o pedido; devolve a pontuação.
export function calcularPrioridade(pedido) {
  return calcularNotaProblema(pedido) + pedido.apoios;
}

// Descobre em qual faixa de prioridade o pedido está.
// Recebe o pedido; devolve o nível (alta, média ou baixa) de NIVEIS_PRIORIDADE.
export function nivelPrioridade(pedido) {
  const pontos = calcularPrioridade(pedido);
  // A lista está da faixa mais alta para a mais baixa, então a primeira que serve é a certa
  return NIVEIS_PRIORIDADE.find((nivel) => pontos >= nivel.minimo);
}
