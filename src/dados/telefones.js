// Telefones úteis, em grupos. Só números públicos e conhecidos, todos com ligação gratuita.
// "paraQuem" completa o nome do botão para o leitor de tela ("Ligar para o SAMU, 192").
export const GRUPOS_TELEFONES = [
  {
    id: 'emergencia',
    titulo: 'Emergência',
    telefones: [
      {
        numero: '190',
        nome: 'Polícia Militar',
        paraQuem: 'a Polícia Militar',
        descricao: 'Crime acontecendo agora, violência ou risco à vida.',
      },
      {
        numero: '192',
        nome: 'SAMU',
        paraQuem: 'o SAMU',
        descricao: 'Ambulância para urgência médica, como desmaio, acidente ou falta de ar.',
      },
      {
        numero: '193',
        nome: 'Corpo de Bombeiros',
        paraQuem: 'o Corpo de Bombeiros',
        descricao: 'Incêndio, resgate, pessoa presa ou afogamento.',
      },
      {
        numero: '199',
        nome: 'Defesa Civil',
        paraQuem: 'a Defesa Civil',
        descricao: 'Enchente, deslizamento, árvore caindo ou risco de desabamento.',
      },
    ],
  },
  {
    id: 'prefeitura',
    titulo: 'Prefeitura',
    telefones: [
      {
        numero: '156',
        nome: 'Central de atendimento',
        paraQuem: 'a Central de atendimento da Prefeitura',
        descricao:
          'Serviços e informações da Prefeitura de São Paulo, como buraco, lixo e iluminação.',
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
        descricao: 'Informações sobre saúde, vacinas e o SUS.',
      },
      {
        numero: '188',
        nome: 'CVV, apoio emocional',
        paraQuem: 'o CVV',
        descricao: 'Conversa com quem precisa desabafar, 24 horas por dia, com sigilo.',
      },
    ],
  },
  {
    id: 'direitos',
    titulo: 'Direitos',
    telefones: [
      {
        numero: '100',
        nome: 'Direitos Humanos',
        paraQuem: 'o Disque Direitos Humanos',
        descricao:
          'Denúncias de violência contra crianças, idosos, pessoas com deficiência e outros.',
      },
      {
        numero: '180',
        nome: 'Central de Atendimento à Mulher',
        paraQuem: 'a Central de Atendimento à Mulher',
        descricao: 'Ajuda e denúncia em casos de violência contra a mulher.',
      },
    ],
  },
];
