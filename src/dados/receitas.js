// De onde vem o dinheiro da cidade em 2026 (dados de exemplo, na ordem de grandeza de São Paulo).
// - grupo: a linha resumida da conta (as 10 fontes viram 5 grupos)
// - previsto: valor esperado no ano; arrecadado: quanto entrou até 31 de outubro (em reais)
export const FONTES_RECEITA = [
  {
    id: 'iss',
    nome: 'ISS, o imposto sobre serviços',
    grupo: 'Impostos da cidade',
    previsto: 24600000000,
    arrecadado: 20900000000,
  },
  {
    id: 'iptu',
    nome: 'IPTU',
    grupo: 'Impostos da cidade',
    previsto: 16300000000,
    arrecadado: 13800000000,
  },
  {
    id: 'itbi',
    nome: 'ITBI e outros impostos da cidade',
    grupo: 'Impostos da cidade',
    previsto: 8200000000,
    arrecadado: 6900000000,
  },
  {
    id: 'icms',
    nome: 'Parte do ICMS',
    grupo: 'Repasses do Estado',
    previsto: 17900000000,
    arrecadado: 15400000000,
  },
  {
    id: 'ipva',
    nome: 'Parte do IPVA',
    grupo: 'Repasses do Estado',
    previsto: 3600000000,
    arrecadado: 3100000000,
  },
  {
    id: 'fundeb',
    nome: 'Fundeb, para a educação',
    grupo: 'Fundos de saúde e educação',
    previsto: 12400000000,
    arrecadado: 10300000000,
  },
  {
    id: 'sus',
    nome: 'SUS, para a saúde',
    grupo: 'Fundos de saúde e educação',
    previsto: 6200000000,
    arrecadado: 5100000000,
  },
  {
    id: 'taxas',
    nome: 'Taxas de lixo, licenças e fiscalização',
    grupo: 'Taxas e outras receitas da cidade',
    previsto: 5100000000,
    arrecadado: 3900000000,
  },
  {
    id: 'outras',
    nome: 'Multas, aluguéis e juros',
    grupo: 'Taxas e outras receitas da cidade',
    previsto: 13100000000,
    arrecadado: 9800000000,
  },
  {
    id: 'uniao',
    nome: 'Repasses da União',
    grupo: 'Repasses da União',
    previsto: 3600000000,
    arrecadado: 2800000000,
  },
];
