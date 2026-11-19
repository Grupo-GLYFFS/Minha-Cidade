// Telefones úteis, em grupos. Só números públicos e conhecidos, todos com ligação gratuita.
// "paraQuem" completa o nome do link para o leitor de tela ("Ligar para o SAMU, 192").
export const GRUPOS_TELEFONES = [
  {
    id: 'emergencia',
    titulo: 'Emergência',
    telefones: [
      {
        numero: '190',
        nome: 'Polícia Militar',
        paraQuem: 'a Polícia Militar',
        icone: 'local_police',
        descricao: 'Crime acontecendo agora ou risco à vida',
      },
      {
        numero: '192',
        nome: 'SAMU',
        paraQuem: 'o SAMU',
        icone: 'ambulance',
        descricao: 'Ambulância para desmaio, acidente ou falta de ar',
      },
      {
        numero: '193',
        nome: 'Corpo de Bombeiros',
        paraQuem: 'o Corpo de Bombeiros',
        icone: 'fire_truck',
        descricao: 'Incêndio, resgate ou afogamento',
      },
      {
        numero: '199',
        nome: 'Defesa Civil',
        paraQuem: 'a Defesa Civil',
        icone: 'flood',
        descricao: 'Enchente, deslizamento ou árvore com risco de cair',
      },
      {
        numero: '153',
        nome: 'Guarda Civil Metropolitana',
        paraQuem: 'a Guarda Civil Metropolitana',
        icone: 'shield',
        descricao: 'Segurança em praças, parques, escolas e prédios da prefeitura',
      },
    ],
  },
  {
    id: 'prefeitura',
    titulo: 'Prefeitura',
    telefones: [
      {
        numero: '156',
        nome: 'Central da Prefeitura',
        paraQuem: 'a Central da Prefeitura',
        icone: 'support_agent',
        descricao: 'Serviços e informações da Prefeitura de São Paulo',
      },
    ],
  },
  {
    id: 'saude',
    titulo: 'Saúde',
    telefones: [
      {
        numero: '136',
        nome: 'Disque Saúde',
        paraQuem: 'o Disque Saúde',
        icone: 'medical_services',
        descricao: 'Vacinas, SUS e dúvidas sobre saúde',
      },
      {
        numero: '188',
        nome: 'CVV',
        paraQuem: 'o CVV',
        icone: 'favorite',
        descricao: 'Apoio emocional, 24 horas, com sigilo',
      },
    ],
  },
  {
    id: 'direitos',
    titulo: 'Direitos',
    telefones: [
      {
        numero: '100',
        nome: 'Disque Direitos Humanos',
        paraQuem: 'o Disque Direitos Humanos',
        icone: 'diversity_3',
        descricao: 'Violência contra crianças, idosos e pessoas com deficiência',
      },
      {
        numero: '180',
        nome: 'Central de Atendimento à Mulher',
        paraQuem: 'a Central de Atendimento à Mulher',
        icone: 'woman',
        descricao: 'Ajuda e denúncia de violência contra a mulher',
      },
    ],
  },
  {
    id: 'casa',
    titulo: 'Água, luz e gás',
    telefones: [
      {
        numero: '0800 055 0195',
        nome: 'Sabesp',
        paraQuem: 'a Sabesp',
        icone: 'water_drop',
        descricao: 'Falta de água, vazamento e esgoto',
      },
      {
        numero: '0800 72 72 120',
        nome: 'Enel',
        paraQuem: 'a Enel',
        icone: 'bolt',
        descricao: 'Falta de luz e fio caído',
      },
      {
        numero: '0800 110 197',
        nome: 'Comgás',
        paraQuem: 'a Comgás',
        icone: 'local_fire_department',
        descricao: 'Cheiro ou vazamento de gás',
      },
    ],
  },
];
