// Áreas da Cidade Aberta, na ordem em que aparecem no painel.
// O número de destaque de cada área é montado na tela (ex.: quantas votações estão abertas).
export const AREAS_CIDADE_ABERTA = [
  {
    id: 'orcamento',
    titulo: 'Orçamento da Cidade',
    descricao: 'Para onde vai cada real que a prefeitura recebe.',
    icone: 'account_balance',
    caminho: '/minha-cidade/orcamento',
  },
  {
    id: 'projetos',
    titulo: 'Grandes Projetos',
    descricao: 'Leia os prós e contras e vote antes de ir para a Câmara.',
    icone: 'how_to_vote',
    caminho: '/minha-cidade/votacoes',
  },
  {
    id: 'orcamento-do-bairro',
    titulo: 'Orçamento do Bairro',
    descricao: 'Distribua o dinheiro do seu bairro como se fosse o prefeito.',
    icone: 'tune',
    caminho: '/meu-bairro/orcamento',
  },
  {
    id: 'obras',
    titulo: 'Obras da Cidade',
    descricao: 'Quanto cada obra já andou, quanto foi pago e se está no prazo.',
    icone: 'construction',
    caminho: '/minha-cidade/obras',
  },
];

// Orçamento total da cidade em 2026, em reais (dado de exemplo, na ordem de grandeza
// do orçamento de São Paulo). Usado no destaque do cartão "Orçamento da Cidade".
export const ORCAMENTO_TOTAL_2026 = 111000000000;

// Valor a partir do qual um projeto passa pela votação da população neste app
export const VALOR_MINIMO_CONSULTA = 50000000;
