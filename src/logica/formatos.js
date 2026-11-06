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
    // Abaixo de 2 fica no singular: "R$ 1,7 milhão"
    return `R$ ${formatarNumero(milhoes)} ${milhoes < 2 ? 'milhão' : 'milhões'}`;
  }
  if (valor >= 1e3) return `R$ ${formatarNumero(valor / 1e3)} mil`;
  return `R$ ${formatarNumero(valor)}`;
}

// Escreve um valor grande em bilhões de reais, por extenso.
// Recebe o valor em reais (ex.: 24600000000); devolve "R$ 24,6 bilhões" (abaixo de 2: "bilhão").
export function formatarBilhoes(valor) {
  const bilhoes = valor / 1e9;
  const texto = bilhoes.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  return `R$ ${texto} ${bilhoes < 2 ? 'bilhão' : 'bilhões'}`;
}

// Junta a quantidade com a palavra certa (singular ou plural).
// Recebe a quantidade e as duas formas; devolve, por exemplo, "1 pedido" ou "7 pedidos".
export function pluralizar(quantidade, singular, plural) {
  return `${formatarNumero(quantidade)} ${quantidade === 1 ? singular : plural}`;
}

// Junta a região com a preposição certa. Recebe "Centro" ou "Zona Sul";
// devolve "no Centro" ou "na Zona Sul".
export function naRegiao(regiao) {
  return regiao === 'Centro' ? 'no Centro' : `na ${regiao}`;
}
