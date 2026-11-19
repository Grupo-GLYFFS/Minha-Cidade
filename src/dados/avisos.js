// Avisos da prefeitura e das subprefeituras (dados de exemplo). "Hoje" do app = 13 de novembro.
//
// Campos de cada aviso:
// - id: usado nas rotas /minha-cidade/avisos/:id e /meu-bairro/avisos/:id
// - orgao: { nome, icone, tom } quem publicou; o tom pinta o quadradinho do ícone
//   ("cidade", "saude", "cultura", "sub")
// - assunto: { rotulo, icone }
// - titulo, resumo (uma frase no card) e corpo (texto do detalhe)
// - data: dia da última novidade, que ordena a lista (ISO "AAAA-MM-DD")
// - validoAte: até quando o aviso vale (ISO)
// - publicado: frase do cabeçalho do detalhe
// - bairros: nomes dos bairros onde vale (lista vazia = cidade toda)
// - imagem (opcional): ilustração em public/img/avisos
// - link (opcional): card que leva ao serviço ou à obra { icone, titulo, meta, para }
export const AVISOS = [
  {
    id: 'av-vacina-gripe',
    orgao: { nome: 'Secretaria da Saúde', icone: 'vaccines', tom: 'saude' },
    assunto: { rotulo: 'Saúde', icone: 'stethoscope' },
    titulo: 'Vacinação contra a gripe nas UBS até 30 de novembro',
    resumo: 'Leve o Cartão SUS.',
    corpo:
      'Leve o Cartão SUS. Todas as UBS da cidade, de segunda a sexta, das 7h às 19h. A vacina está liberada para todas as idades.',
    data: '2026-11-13',
    validoAte: '2026-11-30',
    publicado: 'Publicado em 3 de novembro, atualizado há 2 h',
    bairros: [],
    imagem: '/img/avisos/vacina.svg',
    link: {
      icone: 'vaccines',
      titulo: 'Onde e quando vacinar',
      meta: 'Serviço Tomar vacina',
      para: '/servicos/vacinacao',
    },
  },
  {
    id: 'av-feriados-novembro',
    orgao: { nome: 'Prefeitura de São Paulo', icone: 'location_city', tom: 'cidade' },
    assunto: { rotulo: 'Atendimento', icone: 'schedule' },
    titulo: 'Como a prefeitura funciona nos feriados de 15 e 20 de novembro',
    resumo: 'UBS, escolas e subprefeituras fecham no domingo, 15, e na sexta, 20.',
    corpo:
      'UBS, escolas e subprefeituras fecham no domingo, 15, e na sexta, 20. Os hospitais, o SAMU e as UPAs funcionam normalmente. A coleta de lixo passa nos dias de sempre.',
    data: '2026-11-11',
    validoAte: '2026-11-20',
    publicado: 'Publicado em 11 de novembro',
    bairros: [],
  },
  {
    id: 'av-show-ibirapuera',
    orgao: { nome: 'Secretaria de Cultura', icone: 'theater_comedy', tom: 'cultura' },
    assunto: { rotulo: 'Cultura', icone: 'theater_comedy' },
    titulo: 'Show gratuito no Parque Ibirapuera no sábado, 21 de novembro',
    resumo: 'A Orquestra Jovem Municipal toca às 18h no palco perto do portão 3.',
    corpo:
      'A Orquestra Jovem Municipal toca às 18h no palco perto do portão 3. A entrada é livre e não precisa de ingresso. Em caso de chuva, o show passa para o domingo, no mesmo horário.',
    data: '2026-11-09',
    validoAte: '2026-11-21',
    publicado: 'Publicado em 9 de novembro',
    bairros: [],
  },
  {
    id: 'av-matricula-2027',
    orgao: { nome: 'Secretaria da Educação', icone: 'school', tom: 'cidade' },
    assunto: { rotulo: 'Educação', icone: 'school' },
    titulo: 'Matrícula para 2027 em creches e escolas municipais até 11 de dezembro',
    resumo:
      'Quem ainda não tem vaga na rede municipal pode pedir pelo app ou na escola mais perto de casa.',
    corpo:
      'Quem ainda não tem vaga na rede municipal pode pedir pelo app ou na escola mais perto de casa. Leve um documento da criança e um comprovante de endereço. O resultado sai em janeiro.',
    data: '2026-11-04',
    validoAte: '2026-12-11',
    publicado: 'Publicado em 4 de novembro',
    bairros: [],
    link: {
      icone: 'school',
      titulo: 'Pedir vaga na escola',
      meta: 'Serviço Matrícula escolar',
      para: '/servicos/matricula-escolar',
    },
  },
  {
    id: 'av-coleta-19h',
    orgao: { nome: 'Subprefeitura Vila Mariana', icone: 'account_balance', tom: 'sub' },
    assunto: { rotulo: 'Coleta de lixo', icone: 'delete' },
    titulo: 'Coleta de lixo na Vila Mariana passa a começar às 19h',
    resumo:
      'A partir de segunda, 16 de novembro, o caminhão da coleta comum passa a partir das 19h, e não mais às 20h.',
    corpo:
      'A partir de segunda, 16 de novembro, o caminhão da coleta comum passa a partir das 19h, e não mais às 20h. Os dias continuam os mesmos: segunda, quarta e sexta.',
    data: '2026-11-12',
    validoAte: '2026-12-31',
    publicado: 'Publicado em 12 de novembro',
    bairros: ['Vila Mariana'],
    imagem: '/img/avisos/coleta.svg',
  },
  {
    id: 'av-audiencia-vm-2027',
    orgao: { nome: 'Subprefeitura Vila Mariana', icone: 'account_balance', tom: 'sub' },
    assunto: { rotulo: 'Participação', icone: 'groups' },
    titulo: 'Audiência pública sobre as obras de 2027 na Subprefeitura Vila Mariana',
    resumo:
      'Moradores de Vila Mariana, Moema e Saúde podem falar sobre as obras previstas para o ano que vem.',
    corpo:
      'Moradores de Vila Mariana, Moema e Saúde podem falar sobre as obras previstas para o ano que vem. A audiência é na quarta, 25 de novembro, às 19h, na sede da subprefeitura. Para falar, chegue até as 18h30.',
    data: '2026-11-11',
    validoAte: '2026-11-25',
    publicado: 'Publicado em 11 de novembro',
    bairros: ['Vila Mariana', 'Moema', 'Saúde'],
  },
  {
    id: 'av-farmacia-ubs-vm',
    orgao: { nome: 'Secretaria da Saúde', icone: 'vaccines', tom: 'saude' },
    assunto: { rotulo: 'Saúde', icone: 'stethoscope' },
    titulo: 'Farmácia da UBS Vila Mariana muda de sala até dezembro',
    resumo:
      'Por causa da obra de ampliação, a farmácia funciona numa sala provisória no térreo, com entrada pela lateral do prédio.',
    corpo:
      'Por causa da obra de ampliação, a farmácia funciona numa sala provisória no térreo, com entrada pela lateral do prédio. O horário continua o mesmo: de segunda a sexta, das 7h às 19h.',
    data: '2026-11-11',
    validoAte: '2026-12-18',
    publicado: 'Publicado em 11 de novembro',
    bairros: ['Vila Mariana'],
    imagem: '/img/avisos/farmacia-ubs.svg',
    link: {
      icone: 'construction',
      titulo: 'Ver a obra',
      meta: 'Reforma e ampliação da UBS Vila Mariana',
      para: '/meu-bairro/obras/ubs-vila-mariana',
    },
  },
  {
    id: 'av-desvio-ibirapuera',
    orgao: { nome: 'Subprefeitura Vila Mariana', icone: 'account_balance', tom: 'sub' },
    assunto: { rotulo: 'Trânsito', icone: 'directions_bus' },
    titulo: 'Desvio na Avenida Ibirapuera',
    resumo:
      'Faixa de ônibus fechada no trecho de Moema no sábado 21 e no domingo 22 de novembro, das 6h às 20h.',
    corpo:
      'Faixa de ônibus fechada no trecho de Moema para recapear o asfalto no sábado 21 e no domingo 22 de novembro, das 6h às 20h. Os ônibus usam a faixa da esquerda e os pontos do trecho mudam para a calçada em frente.',
    data: '2026-11-10',
    validoAte: '2026-11-22',
    publicado: 'Publicado em 10 de novembro',
    bairros: ['Moema', 'Vila Mariana'],
    imagem: '/img/avisos/asfalto.svg',
    link: {
      icone: 'construction',
      titulo: 'Ver a obra',
      meta: 'Recuperação do asfalto no corredor da Avenida Ibirapuera',
      para: '/meu-bairro/obras/asfalto-avenida-ibirapuera',
    },
  },
];
