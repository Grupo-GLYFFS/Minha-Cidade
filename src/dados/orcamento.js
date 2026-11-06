// Orçamento da cidade em 2026, dividido por área (dados de exemplo, na ordem de grandeza
// do orçamento de São Paulo, mas não são os números oficiais).
// - previsto: valor aprovado na lei do orçamento, em reais (a soma dá ORCAMENTO_TOTAL_2026)
// - gasto: quanto já foi pago até o começo de novembro de 2026, em reais
// - descricao: o que esse dinheiro paga, em uma linha
export const AREAS_ORCAMENTO = [
  {
    id: 'educacao',
    nome: 'Educação',
    icone: 'school',
    previsto: 30000000000,
    gasto: 24600000000,
    descricao: 'Escolas e creches, merenda, uniforme, transporte escolar e salário de professores.',
  },
  {
    id: 'saude',
    nome: 'Saúde',
    icone: 'local_hospital',
    previsto: 20200000000,
    gasto: 17000000000,
    descricao: 'UBS, hospitais, remédios, vacinas, SAMU e equipes de saúde da família.',
  },
  {
    id: 'administracao',
    nome: 'Administração e dívida',
    icone: 'account_balance',
    previsto: 23100000000,
    gasto: 18900000000,
    descricao: 'Aposentadorias, parcelas da dívida da cidade, prédios e sistemas da prefeitura.',
  },
  {
    id: 'transporte',
    nome: 'Transporte',
    icone: 'directions_bus',
    previsto: 11500000000,
    gasto: 8900000000,
    descricao: 'Ônibus municipais, Bilhete Único, corredores, semáforos e sinalização.',
  },
  {
    id: 'zeladoria',
    nome: 'Zeladoria e Limpeza Urbana',
    icone: 'cleaning_services',
    previsto: 9800000000,
    gasto: 8100000000,
    descricao: 'Coleta de lixo, varrição, tapa-buraco, poda de árvores e iluminação pública.',
  },
  {
    id: 'assistencia',
    nome: 'Assistência Social',
    icone: 'volunteer_activism',
    previsto: 5600000000,
    gasto: 4400000000,
    descricao: 'CRAS, abrigos, Bom Prato, apoio à população de rua e programas de renda.',
  },
  {
    id: 'habitacao',
    nome: 'Habitação',
    icone: 'home_work',
    previsto: 3900000000,
    gasto: 3000000000,
    descricao: 'Moradias populares, auxílio-aluguel e regularização de bairros.',
  },
  {
    id: 'cultura',
    nome: 'Cultura, Esporte e Lazer',
    icone: 'theater_comedy',
    previsto: 2900000000,
    gasto: 2200000000,
    descricao: 'Bibliotecas, teatros, centros esportivos, CEUs e eventos culturais.',
  },
  {
    id: 'seguranca',
    nome: 'Segurança Urbana',
    icone: 'local_police',
    previsto: 2400000000,
    gasto: 1900000000,
    descricao: 'Guarda Civil Metropolitana, Defesa Civil e câmeras de monitoramento.',
  },
  {
    id: 'meio-ambiente',
    nome: 'Meio Ambiente',
    icone: 'park',
    previsto: 1600000000,
    gasto: 1250000000,
    descricao: 'Parques, praças, plantio de árvores e fiscalização ambiental.',
  },
];
