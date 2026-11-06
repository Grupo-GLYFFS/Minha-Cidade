// Contas da página Orçamento da Cidade.

// Divide 100 entre vários valores, proporcionalmente, sem casas decimais e somando exatamente 100.
// Usa o método do maior resto: cada um fica com a parte inteira da sua fatia e as unidades que
// faltam para chegar a 100 vão, uma a uma, para quem tinha a maior parte quebrada.
// Recebe uma lista de números; devolve uma lista de inteiros na mesma ordem.
export function distribuirEmCem(valores) {
  const total = valores.reduce((soma, valor) => soma + valor, 0);
  if (total === 0) return valores.map(() => 0);

  const fatias = valores.map((valor, indice) => {
    const exata = (valor / total) * 100;
    return { indice, inteira: Math.floor(exata), resto: exata - Math.floor(exata) };
  });
  let faltam = 100 - fatias.reduce((soma, fatia) => soma + fatia.inteira, 0);

  // Entrega as unidades que faltam para as maiores partes quebradas
  const porResto = [...fatias].sort((a, b) => b.resto - a.resto);
  for (const fatia of porResto) {
    if (faltam === 0) break;
    fatia.inteira += 1;
    faltam -= 1;
  }
  return fatias.map((fatia) => fatia.inteira);
}

// Monta as linhas de "De cada R$ 100 gastos pela prefeitura".
// Recebe as áreas do orçamento; devolve as áreas com "deCem" (reais de cada R$ 100),
// da que recebe mais para a que recebe menos. A soma de "deCem" é sempre 100.
export function montarDeCadaCem(areas) {
  const partes = distribuirEmCem(areas.map((area) => area.previsto));
  return areas
    .map((area, indice) => ({ ...area, deCem: partes[indice] }))
    .sort((a, b) => b.deCem - a.deCem || b.previsto - a.previsto);
}

// Calcula quanto do previsto já foi gasto. Recebe a área; devolve o percentual inteiro (ex.: 82).
export function percentualGasto(area) {
  if (area.previsto === 0) return 0;
  return Math.round((area.gasto / area.previsto) * 100);
}

// Soma o previsto e o gasto de todas as áreas.
// Recebe as áreas; devolve { previsto, gasto, percentual }.
export function totalOrcamento(areas) {
  const previsto = areas.reduce((soma, area) => soma + area.previsto, 0);
  const gasto = areas.reduce((soma, area) => soma + area.gasto, 0);
  return { previsto, gasto, percentual: percentualGasto({ previsto, gasto }) };
}

// Ordena as áreas pelo valor previsto, da maior para a menor. Recebe as áreas; devolve uma nova lista.
export function ordenarPorPrevisto(areas) {
  return [...areas].sort((a, b) => b.previsto - a.previsto);
}

// Confere os mínimos da Constituição (educação e saúde).
// Recebe os mínimos e as áreas do orçamento; devolve cada mínimo com "aplicado"
// (percentual inteiro do orçamento total que vai para a área) e "cumprido" (true ou false).
// A conta usa o orçamento total, para ficar simples; a regra oficial usa só a receita de impostos.
export function conferirMinimos(minimos, areas) {
  const { previsto: total } = totalOrcamento(areas);
  return minimos.map((minimo) => {
    const area = areas.find((item) => item.id === minimo.idArea);
    const exato = area && total > 0 ? (area.previsto / total) * 100 : 0;
    return { ...minimo, aplicado: Math.floor(exato), cumprido: exato >= minimo.minimo };
  });
}
