// Dados da Prefeitura de São Paulo mostrados no hub "Cidade de São Paulo" (dados de exemplo:
// os nomes das pessoas são inventados; os números da cidade são próximos dos oficiais).
// - endereco e horario: atendimento da sede
// - percentualPago: quanto do orçamento da cidade já foi pago até outubro
// - governo: prefeita e vice; secretarias: área e quem cuida
// - numeros: cards de "A cidade em números"
// - telefone: o único telefone do hub (regra de 18/11: só o 156)
export const PREFEITURA = {
  endereco: 'Viaduto do Chá, 15 · Centro · CEP 01002-020',
  horario: 'Seg. a sex., das 8h às 18h',
  percentualPago: 81,
  governo: [
    { nome: 'Helena Batista Rocha', cargo: 'Prefeita · mandato 2025 a 2028', iniciais: 'HR' },
    { nome: 'Marcos Antônio Ribeiro', cargo: 'Vice-prefeito', iniciais: 'MR' },
  ],
  secretarias: [
    { area: 'Saúde', nome: 'Ana Cláudia Moreira', iniciais: 'AM' },
    { area: 'Educação', nome: 'Ricardo Tavares Lima', iniciais: 'RL' },
    { area: 'Mobilidade e Trânsito', nome: 'Patrícia Nogueira Sales', iniciais: 'PS' },
    { area: 'Infraestrutura e Obras', nome: 'Fábio Henrique Costa', iniciais: 'FC' },
    { area: 'Assistência Social', nome: 'Mariana Lopes Furtado', iniciais: 'MF' },
    { area: 'Verde e Meio Ambiente', nome: 'Gustavo Ferraz Almeida', iniciais: 'GA' },
    { area: 'Segurança Urbana', nome: 'Sílvia Rocha Mendes', iniciais: 'SM' },
    { area: 'Subprefeituras', nome: 'Carlos Eduardo Pires', iniciais: 'CP' },
  ],
  numeros: [
    { icone: 'groups', valor: '11.451.999', rotulo: 'moradores · Censo 2022' },
    { icone: 'account_balance', valor: '32', rotulo: 'subprefeituras' },
    { icone: 'home_work', valor: '96', rotulo: 'bairros' },
    { icone: 'straighten', valor: '1.521 km²', rotulo: 'de área' },
    { icone: 'local_hospital', valor: '470', rotulo: 'UBS' },
    { icone: 'school', valor: '1.570', rotulo: 'escolas municipais' },
    { icone: 'theater_comedy', valor: '58', rotulo: 'CEUs' },
    { icone: 'park', valor: '118', rotulo: 'parques municipais' },
    { icone: 'local_library', valor: '54', rotulo: 'bibliotecas' },
  ],
  telefone: {
    numero: '156',
    link: 'tel:156',
    titulo: 'Central de atendimento',
    texto: 'Serviços e informações da Prefeitura de São Paulo, como buraco, lixo e iluminação.',
  },
};
