// Quanto a Constituição obriga as cidades a aplicar em educação e em saúde.
// - idArea: a área de AREAS_ORCAMENTO usada na conta
// - minimo: percentual mínimo
// - regra: a regra em linguagem simples
export const MINIMOS_CONSTITUCIONAIS = [
  {
    idArea: 'educacao',
    nome: 'Educação',
    icone: 'school',
    minimo: 25,
    regra: 'Pelo menos 25% do que a cidade arrecada com impostos vai para a educação.',
  },
  {
    idArea: 'saude',
    nome: 'Saúde',
    icone: 'local_hospital',
    minimo: 15,
    regra: 'Pelo menos 15% do que a cidade arrecada com impostos vai para a saúde.',
  },
];
