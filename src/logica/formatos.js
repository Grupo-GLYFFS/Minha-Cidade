// Escreve um número no jeito brasileiro, com ponto nos milhares.
// Recebe um número (ex.: 8412); devolve o texto "8.412".
export function formatarNumero(numero) {
  return numero.toLocaleString('pt-BR');
}

// Escreve um valor em reais de forma curta, para caber em uma linha.
// Recebe o valor em reais (ex.: 180000000); devolve "R$ 180 milhões".
export function formatarValorCurto(valor) {
  if (valor >= 1e9) return `R$ ${formatarNumero(valor / 1e9)} bi`;
  if (valor >= 1e6) {
    const milhoes = valor / 1e6;
    return `R$ ${formatarNumero(milhoes)} ${milhoes === 1 ? 'milhão' : 'milhões'}`;
  }
  if (valor >= 1e3) return `R$ ${formatarNumero(valor / 1e3)} mil`;
  return `R$ ${formatarNumero(valor)}`;
}

// Junta a quantidade com a palavra certa (singular ou plural).
// Recebe a quantidade e as duas formas; devolve, por exemplo, "1 pedido" ou "7 pedidos".
export function pluralizar(quantidade, singular, plural) {
  return `${formatarNumero(quantidade)} ${quantidade === 1 ? singular : plural}`;
}
