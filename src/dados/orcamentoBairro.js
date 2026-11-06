// Orçamento do Bairro ("Prefeito por 5 minutos"): dados de exemplo.
// A mesma lista de melhorias vale para todos os bairros; o título mostra o bairro da pessoa.

// Dinheiro fictício que a pessoa divide, em reais
export const VALOR_ORCAMENTO_BAIRRO = 1000000;

// De quanto em quanto o valor de cada melhoria anda (no controle deslizante e nas setas)
export const PASSO_ORCAMENTO_BAIRRO = 50000;

// Bairro mostrado para quem ainda não entrou na conta
export const BAIRRO_PADRAO_ORCAMENTO = 'Vila Mariana';

// Quantos vizinhos já enviaram a divisão (simulado)
export const PARTICIPANTES_VIZINHOS = 1284;

// Melhorias que a pessoa pode escolher.
// - mediaVizinhos: percentual médio que os vizinhos deram para a melhoria (a soma dá 100)
// - referencia: exemplo do que o dinheiro compra, para ajudar a decidir
export const OPCOES_ORCAMENTO_BAIRRO = [
  {
    id: 'recapear',
    nome: 'Recapear ruas',
    descricao: 'Asfalto novo nas ruas mais esburacadas do bairro.',
    icone: 'add_road',
    referencia: 'R$ 50 mil recapeiam cerca de um quarteirão.',
    mediaVizinhos: 28,
  },
  {
    id: 'iluminacao',
    nome: 'Mais iluminação',
    descricao: 'Postes com lâmpadas de LED em ruas escuras e pontos de ônibus.',
    icone: 'lightbulb',
    referencia: 'R$ 50 mil instalam cerca de 10 postes de LED.',
    mediaVizinhos: 24,
  },
  {
    id: 'praca',
    nome: 'Reformar a praça',
    descricao: 'Bancos, brinquedos, academia ao ar livre e grama nova.',
    icone: 'deck',
    referencia: 'R$ 150 mil reformam um parquinho completo.',
    mediaVizinhos: 16,
  },
  {
    id: 'calcadas',
    nome: 'Calçadas acessíveis',
    descricao: 'Calçadas sem buracos, com rampas e piso tátil para quem tem deficiência.',
    icone: 'accessible',
    referencia: 'R$ 50 mil arrumam cerca de 200 metros de calçada.',
    mediaVizinhos: 20,
  },
  {
    id: 'arvores',
    nome: 'Mais árvores e canteiros',
    descricao: 'Plantio de árvores e canteiros nas ruas com menos sombra.',
    icone: 'park',
    referencia: 'R$ 50 mil plantam cerca de 100 árvores.',
    mediaVizinhos: 12,
  },
];
