// Solicitações de serviço de exemplo da Maria (u-001), para Minhas solicitações.
// "Hoje" do app é sexta, 13 de novembro de 2026.
//
// Campos de cada solicitação:
// - id e protocolo: o mesmo número "SRV-2026-000000" (é ele que vai no endereço da página);
// - idServico, nomeServico, categoria: o serviço do catálogo;
// - autorId: quem pediu; exemplo: true marca os dados de demonstração;
// - status: id de STATUS_SOLICITACAO (solicitada, em-analise, agendada, concluida, cancelada);
// - resumo: uma linha com o que foi pedido (ex.: "Gata Mel, 2 anos");
// - criadoEm e concluidaEm: datas ISO com hora (horário de Brasília);
// - agendamento: { data, hora, horaFim } das agendadas ("08:30", "16:00");
// - prazoData e textoPrazo: até quando a prefeitura responde ou marca o dia (as solicitadas);
//   avisoPrazo: frase extra embaixo do prazo, no detalhe;
// - prazo: o prazo da ficha do serviço, em texto;
// - local: { nome, endereco, complemento } de onde é o atendimento;
// - rotuloCurto: como chamar o atendimento nos popups ("Remarcar a castração");
// - historico: [{ status, rotulo (opcional), em, textos }] com as etapas já feitas, da mais antiga
//   para a mais nova;
// - instrucoes: [{ icone, texto }] para o dia do atendimento;
// - horariosLivres: [{ data, horas }] para remarcar;
// - respostas: [{ nome, rotulo, valor }] com o que a pessoa enviou.

// Endereço da Maria, usado em várias solicitações
const CASA = { nome: 'Rua Joaquim Távora, 120', endereco: 'Vila Mariana' };

export const SOLICITACOES = [
  {
    id: 'SRV-2026-117655',
    protocolo: 'SRV-2026-117655',
    idServico: 'castracao-de-animais',
    nomeServico: 'Agendar castração gratuita de cão ou gato',
    categoria: 'coleta-meio-ambiente',
    autorId: 'u-001',
    exemplo: true,
    status: 'agendada',
    resumo: 'Gata Mel, 2 anos',
    criadoEm: '2026-11-03T20:15:00-03:00',
    agendamento: { data: '2026-11-14', hora: '08:30' },
    prazo: 'A data da cirurgia é confirmada em até 20 dias.',
    local: {
      nome: 'Unidade móvel de castração',
      endereco: 'Rua José de Magalhães, 500',
      complemento: 'estacionamento da Subprefeitura Vila Mariana',
    },
    rotuloCurto: 'castração',
    historico: [
      { status: 'solicitada', em: '2026-11-03T20:15:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'agendada',
        em: '2026-11-06T10:30:00-03:00',
        textos: ['Castração marcada para sábado, 14 de novembro, às 8h30.'],
      },
    ],
    instrucoes: [
      { icone: 'pets', texto: 'Leve a gata numa caixa de transporte fechada.' },
      {
        icone: 'no_food',
        texto: 'Sem comer nas 8 horas antes e sem beber água nas 2 horas antes.',
      },
      { icone: 'schedule', texto: 'Chegue 15 minutos antes do horário.' },
    ],
    horariosLivres: [
      { data: '2026-11-21', horas: ['08:30', '10:00', '11:30'] },
      { data: '2026-11-28', horas: ['08:30', '10:00'] },
    ],
    respostas: [
      { nome: 'especie', rotulo: 'Animal', valor: 'Gata, fêmea' },
      { nome: 'nomeAnimal', rotulo: 'Nome', valor: 'Mel' },
      { nome: 'idade', rotulo: 'Idade', valor: '2 anos' },
    ],
  },
  {
    id: 'SRV-2026-118204',
    protocolo: 'SRV-2026-118204',
    idServico: 'agendar-consulta',
    nomeServico: 'Agendar consulta na UBS',
    categoria: 'saude',
    autorId: 'u-001',
    exemplo: true,
    status: 'agendada',
    resumo: 'Clínico geral',
    criadoEm: '2026-11-07T09:05:00-03:00',
    agendamento: { data: '2026-11-17', hora: '09:20' },
    prazo: 'A consulta é marcada em até 15 dias.',
    local: {
      nome: 'UBS Vila Mariana',
      endereco: 'Rua Gandavo, 435',
      complemento: 'recepção do térreo',
    },
    rotuloCurto: 'consulta',
    historico: [
      { status: 'solicitada', em: '2026-11-07T09:05:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'agendada',
        em: '2026-11-09T14:00:00-03:00',
        textos: ['Consulta marcada para terça, 17 de novembro, às 9h20.'],
      },
    ],
    instrucoes: [
      { icone: 'badge', texto: 'Leve o Cartão SUS e um documento com foto.' },
      { icone: 'schedule', texto: 'Chegue 15 minutos antes do horário.' },
    ],
    horariosLivres: [
      { data: '2026-11-18', horas: ['07:40', '10:00', '14:20'] },
      { data: '2026-11-20', horas: ['08:00', '11:00'] },
    ],
    respostas: [
      { nome: 'especialidade', rotulo: 'Tipo de consulta', valor: 'Clínico geral' },
      { nome: 'periodo', rotulo: 'Período', valor: 'Manhã' },
      { nome: 'motivo', rotulo: 'Motivo', valor: 'Dor nas costas há duas semanas' },
    ],
  },
  {
    id: 'SRV-2026-118731',
    protocolo: 'SRV-2026-118731',
    idServico: 'reservar-quadra',
    nomeServico: 'Reservar quadra ou espaço esportivo',
    categoria: 'cultura-esporte-lazer',
    autorId: 'u-001',
    exemplo: true,
    status: 'agendada',
    resumo: 'Quadra poliesportiva, 1 hora',
    criadoEm: '2026-11-08T18:40:00-03:00',
    agendamento: { data: '2026-11-17', hora: '16:00', horaFim: '17:00' },
    prazo: 'A reserva é confirmada em até 2 dias.',
    local: {
      nome: 'Centro Esportivo Vila Mariana',
      endereco: 'Rua Pedro de Toledo, 1651',
      complemento: 'portaria da Rua Pedro de Toledo',
    },
    rotuloCurto: 'reserva',
    historico: [
      { status: 'solicitada', em: '2026-11-08T18:40:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'agendada',
        em: '2026-11-09T09:15:00-03:00',
        textos: ['Quadra reservada para terça, 17 de novembro, das 16h às 17h.'],
      },
    ],
    instrucoes: [
      { icone: 'badge', texto: 'Mostre o protocolo na portaria.' },
      { icone: 'groups', texto: 'Até 14 pessoas por reserva.' },
    ],
    horariosLivres: [
      { data: '2026-11-19', horas: ['15:00', '18:00'] },
      { data: '2026-11-24', horas: ['16:00', '17:00'] },
    ],
    respostas: [
      { nome: 'espaco', rotulo: 'Espaço', valor: 'Quadra poliesportiva' },
      { nome: 'pessoas', rotulo: 'Quantas pessoas', valor: '10' },
      { nome: 'atividade', rotulo: 'Atividade', valor: 'Futebol' },
    ],
  },
  {
    id: 'SRV-2026-119032',
    protocolo: 'SRV-2026-119032',
    idServico: 'cata-treco',
    nomeServico: 'Retirada de móveis velhos (Cata-Treco)',
    categoria: 'coleta-meio-ambiente',
    autorId: 'u-001',
    exemplo: true,
    status: 'agendada',
    resumo: 'Sofá de 3 lugares e guarda-roupa',
    criadoEm: '2026-11-10T11:20:00-03:00',
    agendamento: { data: '2026-11-19', hora: '07:00', horaFim: '13:00' },
    prazo: 'A retirada é marcada em até 10 dias.',
    local: {
      nome: 'Na sua calçada',
      endereco: 'Rua Joaquim Távora, 120',
      complemento: 'Vila Mariana',
    },
    rotuloCurto: 'retirada',
    historico: [
      { status: 'solicitada', em: '2026-11-10T11:20:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'agendada',
        em: '2026-11-11T16:05:00-03:00',
        textos: ['Retirada marcada para quinta, 19 de novembro, das 7h às 13h.'],
      },
    ],
    instrucoes: [
      { icone: 'chair', texto: 'Deixe os móveis na calçada a partir das 6h do dia.' },
      { icone: 'block', texto: 'Não bloqueie a passagem de quem anda a pé.' },
    ],
    horariosLivres: [
      { data: '2026-11-26', horas: ['07:00'] },
      { data: '2026-12-03', horas: ['07:00'] },
    ],
    respostas: [
      {
        nome: 'itens',
        rotulo: 'O que vai ser retirado',
        valor: 'Sofá de 3 lugares e guarda-roupa',
      },
      { nome: 'quantidade', rotulo: 'Quantos itens', valor: '2' },
    ],
  },
  {
    id: 'SRV-2026-119310',
    protocolo: 'SRV-2026-119310',
    idServico: 'cadastro-unico',
    nomeServico: 'Agendar inscrição no CadÚnico',
    categoria: 'assistencia-social',
    autorId: 'u-001',
    exemplo: true,
    status: 'solicitada',
    resumo: '4 pessoas na casa · Rua Joaquim Távora, 120',
    criadoEm: '2026-11-13T09:40:00-03:00',
    prazoData: '2026-11-28',
    textoPrazo: 'O CRAS marca o dia até',
    avisoPrazo: 'Você recebe uma notificação com o dia do atendimento.',
    prazo: 'O atendimento é marcado em até 15 dias. O cadastro sai no mesmo atendimento.',
    local: CASA,
    historico: [
      { status: 'solicitada', em: '2026-11-13T09:40:00-03:00', textos: ['Solicitação recebida.'] },
    ],
    respostas: [
      { nome: 'cpf', rotulo: 'CPF de quem vai ser atendido', valor: '***.456.789-**' },
      { nome: 'pessoasNaCasa', rotulo: 'Quantas pessoas moram na casa', valor: '4' },
      {
        nome: 'rendaFamiliar',
        rotulo: 'Renda total da família por mês',
        valor: 'Até 1 salário mínimo',
      },
      { nome: 'dataPreferida', rotulo: 'Data que você prefere', valor: '18/11/2026' },
      { nome: 'periodo', rotulo: 'Período', valor: 'Manhã' },
    ],
  },
  {
    id: 'SRV-2026-117902',
    protocolo: 'SRV-2026-117902',
    idServico: 'vistoria-de-imovel',
    nomeServico: 'Vistoria de imóvel com risco',
    categoria: 'defesa-civil',
    autorId: 'u-001',
    exemplo: true,
    status: 'em-analise',
    resumo: 'Rachadura na parede dos fundos · Rua Joaquim Távora, 120',
    criadoEm: '2026-11-06T19:00:00-03:00',
    prazoData: '2026-11-20',
    textoPrazo: 'A Defesa Civil marca o dia até',
    avisoPrazo: 'Você recebe uma notificação com o dia da vistoria.',
    prazo: 'A vistoria é feita em até 7 dias.',
    local: CASA,
    historico: [
      { status: 'solicitada', em: '2026-11-06T19:00:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'em-analise',
        em: '2026-11-09T11:20:00-03:00',
        textos: [
          'A Defesa Civil viu as fotos. Não há risco imediato.',
          'A vistoria será marcada até 20 de novembro. Você recebe uma notificação com o dia.',
        ],
      },
    ],
    respostas: [
      {
        nome: 'descricao',
        rotulo: 'O que acontece',
        valor: 'Rachadura na parede dos fundos que aumentou depois das chuvas',
      },
      { nome: 'endereco', rotulo: 'Endereço', valor: 'Rua Joaquim Távora, 120 · Vila Mariana' },
    ],
  },
  {
    id: 'SRV-2026-118550',
    protocolo: 'SRV-2026-118550',
    idServico: 'informacao-publica',
    nomeServico: 'Informação pública',
    categoria: 'atendimento-ouvidoria',
    autorId: 'u-001',
    exemplo: true,
    status: 'solicitada',
    resumo: 'Quantas salas novas terá a UBS Vila Mariana',
    criadoEm: '2026-11-10T21:10:00-03:00',
    prazoData: '2026-11-30',
    textoPrazo: 'Resposta até',
    avisoPrazo: 'A resposta chega por e-mail e aparece aqui.',
    prazo: 'A resposta sai em até 20 dias.',
    historico: [
      { status: 'solicitada', em: '2026-11-10T21:10:00-03:00', textos: ['Solicitação recebida.'] },
    ],
    respostas: [
      { nome: 'assunto', rotulo: 'Assunto', valor: 'Reforma da UBS Vila Mariana' },
      { nome: 'pedido', rotulo: 'Pedido', valor: 'Quantas salas novas terá a UBS Vila Mariana' },
      { nome: 'formato', rotulo: 'Como quer receber', valor: 'Por e-mail' },
    ],
  },
  {
    id: 'SRV-2026-116480',
    protocolo: 'SRV-2026-116480',
    idServico: 'segunda-via-iptu',
    nomeServico: 'Emitir 2ª via do IPTU',
    categoria: 'impostos-taxas',
    autorId: 'u-001',
    exemplo: true,
    status: 'concluida',
    resumo: 'Parcela 10 de 10 · Rua Joaquim Távora, 120',
    criadoEm: '2026-10-28T08:50:00-03:00',
    concluidaEm: '2026-10-28T08:52:00-03:00',
    prazo: 'O boleto sai na hora.',
    local: CASA,
    historico: [
      { status: 'solicitada', em: '2026-10-28T08:50:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'concluida',
        em: '2026-10-28T08:52:00-03:00',
        textos: ['Boleto enviado por e-mail.'],
      },
    ],
    respostas: [{ nome: 'parcela', rotulo: 'Parcela', valor: '10 de 10' }],
  },
  {
    id: 'SRV-2026-109874',
    protocolo: 'SRV-2026-109874',
    idServico: 'aulas-de-esporte',
    nomeServico: 'Inscrever-se em aulas gratuitas de esporte',
    categoria: 'cultura-esporte-lazer',
    autorId: 'u-001',
    exemplo: true,
    status: 'concluida',
    resumo: 'Hidroginástica, terças e quintas às 7h',
    criadoEm: '2026-08-03T10:00:00-03:00',
    concluidaEm: '2026-08-10T15:30:00-03:00',
    prazo: 'A vaga é confirmada em até 10 dias.',
    local: {
      nome: 'Centro Esportivo Vila Mariana',
      endereco: 'Rua Pedro de Toledo, 1651',
    },
    historico: [
      { status: 'solicitada', em: '2026-08-03T10:00:00-03:00', textos: ['Solicitação recebida.'] },
      {
        status: 'concluida',
        em: '2026-08-10T15:30:00-03:00',
        textos: ['Matrícula feita na turma de terças e quintas, às 7h.'],
      },
    ],
    respostas: [
      { nome: 'modalidade', rotulo: 'Modalidade', valor: 'Hidroginástica' },
      { nome: 'periodo', rotulo: 'Período', valor: 'Manhã' },
    ],
  },
];
