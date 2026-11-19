// Assuntos do catálogo de serviços, na ordem em que aparecem na tela.
// Cada serviço aponta para um assunto (categoria) e uma parte dele (subcategoria).
export const CATEGORIAS_SERVICOS = [
  {
    id: 'saude',
    nome: 'Saúde',
    descricao: 'Consultas, vacinas, remédios e urgência.',
    icone: 'medical_services',
    subcategorias: [
      { id: 'consultas', nome: 'Consultas e cadastro' },
      { id: 'remedios-vacinas', nome: 'Remédios e vacinas' },
      { id: 'urgencia', nome: 'Urgência e emergência' },
    ],
  },
  {
    id: 'educacao',
    nome: 'Educação',
    descricao: 'Vagas em creches e escolas, merenda e estudo para adultos.',
    icone: 'school',
    subcategorias: [
      { id: 'matricula', nome: 'Matrícula e transporte' },
      { id: 'dia-a-dia', nome: 'Dia a dia na escola' },
      { id: 'adultos', nome: 'Estudo para jovens e adultos' },
    ],
  },
  {
    id: 'zeladoria',
    nome: 'Zeladoria e Ruas',
    descricao: 'Buracos, postes, árvores, calçadas e placas.',
    icone: 'construction',
    subcategorias: [
      { id: 'ruas-calcadas', nome: 'Ruas e calçadas' },
      { id: 'iluminacao-arvores', nome: 'Iluminação e árvores' },
      { id: 'limpeza-drenagem', nome: 'Limpeza e escoamento da chuva' },
      { id: 'sinalizacao', nome: 'Placas e semáforos' },
    ],
  },
  {
    id: 'coleta-meio-ambiente',
    nome: 'Coleta e Meio Ambiente',
    descricao: 'Lixo, reciclagem, animais e proteção da natureza.',
    icone: 'recycling',
    subcategorias: [
      { id: 'coleta', nome: 'Coleta e reciclagem' },
      { id: 'animais', nome: 'Animais' },
      { id: 'meio-ambiente', nome: 'Proteção do meio ambiente' },
    ],
  },
  {
    id: 'impostos-taxas',
    nome: 'Impostos e Taxas',
    descricao: 'IPTU, certidões, dívidas e nota fiscal.',
    icone: 'receipt_long',
    subcategorias: [
      { id: 'iptu', nome: 'IPTU' },
      { id: 'certidoes-dividas', nome: 'Certidões e dívidas' },
      { id: 'empresas', nome: 'Nota fiscal e ISS' },
    ],
  },
  {
    id: 'transporte-transito',
    nome: 'Transporte e Trânsito',
    descricao: 'Ônibus, bilhetes com desconto, Zona Azul e multas.',
    icone: 'directions_bus',
    subcategorias: [
      { id: 'onibus', nome: 'Ônibus e cartões' },
      { id: 'transito', nome: 'Estacionamento e multas' },
    ],
  },
  {
    id: 'assistencia-social',
    nome: 'Assistência Social',
    descricao: 'CadÚnico, benefícios e apoio a quem precisa.',
    icone: 'diversity_1',
    subcategorias: [
      { id: 'beneficios', nome: 'Cadastro e benefícios' },
      { id: 'protecao', nome: 'Atendimento e proteção' },
    ],
  },
  {
    id: 'trabalho-renda',
    nome: 'Trabalho e Renda',
    descricao: 'Vagas de emprego, cursos e abertura de negócio.',
    icone: 'work',
    subcategorias: [
      { id: 'emprego', nome: 'Emprego e cursos' },
      { id: 'negocio', nome: 'Abrir e regularizar um negócio' },
    ],
  },
  {
    id: 'habitacao',
    nome: 'Habitação',
    descricao: 'Moradia popular, auxílio-aluguel e regularização.',
    icone: 'home_work',
    subcategorias: [
      { id: 'moradia', nome: 'Programas de moradia' },
      { id: 'imovel', nome: 'Imóvel e obras' },
    ],
  },
  {
    id: 'cultura-esporte-lazer',
    nome: 'Cultura, Esporte e Lazer',
    descricao: 'Eventos, bibliotecas, quadras e parques.',
    icone: 'theater_comedy',
    subcategorias: [
      { id: 'cultura', nome: 'Cultura e eventos' },
      { id: 'esporte', nome: 'Esporte' },
      { id: 'lazer', nome: 'Parques e lazer' },
    ],
  },
  {
    id: 'defesa-civil',
    nome: 'Defesa Civil',
    descricao: 'Alertas de chuva, enchentes e imóveis com risco.',
    icone: 'flood',
    subcategorias: [
      { id: 'alertas-prevencao', nome: 'Alertas e prevenção' },
      { id: 'emergencias', nome: 'Emergências e vistorias' },
    ],
  },
  {
    id: 'atendimento-ouvidoria',
    nome: 'Atendimento e Ouvidoria',
    descricao: 'Reclamações, informação pública e seus pedidos.',
    icone: 'support_agent',
    subcategorias: [
      { id: 'ouvidoria', nome: 'Ouvidoria e informação' },
      { id: 'participacao', nome: 'Pedidos e participação' },
      { id: 'contatos', nome: 'Contatos' },
    ],
  },
];
