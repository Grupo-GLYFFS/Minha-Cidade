// Grandes projetos da prefeitura que passam pela opinião da população (Cidade Aberta).
// Dados de exemplo: valores, datas e votos são inventados para o protótipo.
//
// Campos de cada projeto:
// - id, titulo, resumo, descricao (lista de parágrafos curtos)
// - regiao, bairros: onde a obra vai acontecer
// - tema (ex.: "Mobilidade") e icone (Material Symbols)
// - valor: custo estimado em reais; prazoObra: quanto tempo a obra deve levar
// - inicioVotacao, fimVotacao: primeiro e último dia da votação (ISO)
// - status: id de STATUS_PROJETO ("votacao-aberta" ou "encerrada")
// - situacao, dataSituacao: o que aconteceu depois da votação (só nos encerrados)
// - quemAfeta: quem sente a mudança no dia a dia
// - pros, contras: os dois lados, escritos com o mesmo cuidado
// - votosIniciais: votos que já existiam antes dos votos feitos neste aparelho
export const PROJETOS = [
  {
    id: 'corredor-jabaquara',
    titulo: 'Corredor de ônibus na Avenida Jabaquara',
    resumo: 'Faixas só para ônibus nos dois sentidos, com novas paradas e calçadas reformadas.',
    descricao: [
      'O projeto cria um corredor de ônibus de 6 km na Avenida Jabaquara, ligando a estação Jabaquara do metrô à Vila Mariana. Os ônibus passam a andar na faixa da esquerda, separados dos carros.',
      'As paradas ficam no canteiro central, cobertas e com rampa. As calçadas dos dois lados da avenida também serão refeitas, com piso tátil e mais árvores.',
      'Durante a obra, parte da avenida terá desvios por trechos de cerca de 1 km de cada vez.',
    ],
    regiao: 'Zona Sul',
    bairros: ['Vila Mariana', 'Saúde', 'Jabaquara'],
    tema: 'Mobilidade',
    icone: 'directions_bus',
    valor: 180000000,
    prazoObra: '24 meses',
    inicioVotacao: '2026-10-19',
    fimVotacao: '2026-11-18',
    status: 'votacao-aberta',
    quemAfeta:
      'Cerca de 210 mil pessoas que usam as linhas de ônibus da avenida todos os dias, motoristas que passam por ali e o comércio dos dois lados.',
    pros: [
      'Viagem de ônibus até 15 minutos mais rápida nos horários de pico.',
      'Paradas cobertas, com rampa e piso tátil.',
      'Calçadas novas e mais árvores ao longo da avenida.',
      'Menos poluição com ônibus parados no trânsito.',
    ],
    contras: [
      'Menos espaço para carros e fim de algumas vagas de estacionamento.',
      'Dois anos de obra, com desvios e mais trânsito no período.',
      'Lojas da avenida podem perder movimento durante a obra.',
    ],
    votosIniciais: { sim: 4630, nao: 3110, abstencao: 672 },
  },
  {
    id: 'parque-linear-tiquatira',
    titulo: 'Parque linear às margens do Córrego Tiquatira',
    resumo:
      'Área verde de 3 km com pista de caminhada, ciclovia e espaços que seguram a água da chuva.',
    descricao: [
      'O parque ocupa as margens do Córrego Tiquatira, na Penha, que hoje têm mato alto e lixo. A ideia é plantar árvores, fazer uma pista de caminhada e uma ciclovia ao longo do córrego.',
      'Parte do parque é feita para encher na chuva forte: a água fica ali por algumas horas em vez de invadir as ruas e as casas próximas.',
      'O projeto inclui quadras, parquinho, banheiros e iluminação para uso à noite.',
    ],
    regiao: 'Zona Leste',
    bairros: ['Penha', 'Tatuapé'],
    tema: 'Meio ambiente',
    icone: 'park',
    valor: 96000000,
    prazoObra: '18 meses',
    inicioVotacao: '2026-10-26',
    fimVotacao: '2026-11-25',
    status: 'votacao-aberta',
    quemAfeta:
      'Moradores da Penha e do Tatuapé que vivem perto do córrego, principalmente as cerca de 4 mil famílias das ruas que alagam na chuva.',
    pros: [
      'Menos alagamento nas ruas perto do córrego.',
      'Área de lazer e esporte gratuita perto de casa.',
      'Mais árvores e sombra, deixando o bairro menos quente.',
    ],
    contras: [
      '62 famílias que moram na margem precisarão mudar para moradias da prefeitura.',
      'Custo de manutenção alto todos os anos (limpeza, segurança e jardinagem).',
      'Obra perto das casas, com barulho e caminhões por um ano e meio.',
    ],
    votosIniciais: { sim: 3480, nao: 1290, abstencao: 410 },
  },
  {
    id: 'hospital-dia-santana',
    titulo: 'Hospital-dia em Santana',
    resumo: 'Unidade para cirurgias simples e exames em que a pessoa entra e sai no mesmo dia.',
    descricao: [
      'O hospital-dia faz cirurgias pequenas (como catarata, hérnia e varizes) e exames que precisam de preparo, sem internação: a pessoa chega de manhã e volta para casa no mesmo dia.',
      'Hoje, quem mora na Zona Norte espera em média 8 meses por essas cirurgias. A nova unidade quer reduzir essa fila pela metade.',
      'O prédio fica em um terreno da prefeitura perto do metrô Santana.',
    ],
    regiao: 'Zona Norte',
    bairros: ['Santana', 'Tucuruvi', 'Casa Verde'],
    tema: 'Saúde',
    icone: 'local_hospital',
    valor: 140000000,
    prazoObra: '30 meses',
    inicioVotacao: '2026-11-02',
    fimVotacao: '2026-12-02',
    status: 'votacao-aberta',
    quemAfeta:
      'Pacientes da Zona Norte na fila de cirurgias e exames, que hoje precisam ir até hospitais de outras regiões.',
    pros: [
      'Fila de cirurgias simples menor para quem mora na Zona Norte.',
      'Atendimento perto do metrô, sem atravessar a cidade.',
      'Libera leitos dos hospitais grandes para casos graves.',
    ],
    contras: [
      'Precisa de cerca de 300 profissionais novos, um gasto fixo alto todo ano.',
      'Usa um terreno que poderia virar moradia popular.',
      'Só fica pronto em dois anos e meio; até lá, a fila continua.',
    ],
    votosIniciais: { sim: 1530, nao: 420, abstencao: 186 },
  },
  {
    id: 'ceu-butanta',
    titulo: 'Novo CEU no Butantã',
    resumo:
      'Centro educacional com escola, creche, piscina, biblioteca e teatro abertos à comunidade.',
    descricao: [
      'Um CEU (Centro Educacional Unificado) junta escola, creche, biblioteca, piscinas, quadras e teatro no mesmo lugar. Nos fins de semana, tudo fica aberto para os moradores.',
      'O novo CEU teria vagas para cerca de 1.800 alunos, da creche ao ensino fundamental, em uma parte do Butantã com falta de vagas.',
    ],
    regiao: 'Zona Oeste',
    bairros: ['Butantã'],
    tema: 'Educação',
    icone: 'school',
    valor: 210000000,
    prazoObra: '26 meses',
    inicioVotacao: '2026-09-15',
    fimVotacao: '2026-10-15',
    status: 'encerrada',
    situacao: 'encaminhado-camara',
    dataSituacao: '2026-10-22',
    quemAfeta:
      'Famílias do Butantã com crianças na fila da creche e da escola, e moradores que hoje não têm espaço de lazer e cultura perto de casa.',
    pros: [
      'Cerca de 1.800 vagas novas de creche e escola.',
      'Piscina, teatro e biblioteca gratuitos para o bairro.',
      'Espaço seguro para crianças e jovens no contraturno.',
    ],
    contras: [
      'Custo alto para manter aberto todos os dias, inclusive fins de semana.',
      'O terreno escolhido fica longe de algumas partes do bairro.',
      'Obra de mais de dois anos.',
    ],
    votosIniciais: { sim: 9840, nao: 3120, abstencao: 860 },
  },
  {
    id: 'piscinao-aricanduva',
    titulo: 'Piscinão no Rio Aricanduva',
    resumo: 'Reservatório subterrâneo que guarda a água da chuva forte para evitar enchentes.',
    descricao: [
      'Um piscinão é um reservatório gigante que recebe a água da chuva quando o rio enche. Depois que a chuva passa, a água volta aos poucos para o rio.',
      'O novo piscinão fica embaixo de uma praça em Itaquera e guarda 500 milhões de litros. A praça é refeita por cima, com quadras e área verde.',
    ],
    regiao: 'Zona Leste',
    bairros: ['Itaquera', 'São Mateus'],
    tema: 'Drenagem',
    icone: 'water',
    valor: 320000000,
    prazoObra: '32 meses',
    inicioVotacao: '2026-09-01',
    fimVotacao: '2026-10-10',
    status: 'encerrada',
    situacao: 'aprovado-camara',
    dataSituacao: '2026-10-28',
    quemAfeta:
      'Cerca de 90 mil moradores das ruas que alagam perto da Avenida Aricanduva e quem passa pela avenida nos dias de chuva.',
    pros: [
      'Menos enchentes na Avenida Aricanduva e nas ruas próximas.',
      'Menos prejuízo com casas, carros e lojas alagadas.',
      'A praça de cima é refeita e ganha quadras.',
    ],
    contras: [
      'Obra grande e demorada, com a praça fechada por quase três anos.',
      'Precisa de limpeza frequente para não acumular lixo e mau cheiro.',
      'Resolve a enchente de uma parte da região, não de toda a Zona Leste.',
    ],
    votosIniciais: { sim: 12780, nao: 2410, abstencao: 1190 },
  },
  {
    id: 'moradia-centro',
    titulo: 'Moradia em prédios vazios do Centro',
    resumo: 'Reforma de 6 prédios abandonados para virarem 520 apartamentos de aluguel social.',
    descricao: [
      'O Centro tem prédios vazios há anos, muitos com dívida de IPTU. O projeto compra seis deles e faz uma reforma completa para virarem apartamentos.',
      'Os apartamentos são alugados por um valor que cabe no orçamento de famílias com renda de até três salários mínimos, perto do trabalho, do metrô e dos serviços.',
    ],
    regiao: 'Centro',
    bairros: ['República', 'Sé', 'Santa Cecília'],
    tema: 'Habitação',
    icone: 'apartment',
    valor: 260000000,
    prazoObra: '36 meses',
    inicioVotacao: '2026-09-20',
    fimVotacao: '2026-10-31',
    status: 'encerrada',
    situacao: 'encaminhado-camara',
    dataSituacao: '2026-11-04',
    quemAfeta:
      'Famílias de baixa renda na fila da moradia, que hoje vivem longe do trabalho ou pagam aluguel caro, e os vizinhos dos prédios abandonados.',
    pros: [
      '520 famílias morando perto do trabalho e do transporte.',
      'Prédios abandonados voltam a ter uso e o entorno fica mais seguro.',
      'Aproveita prédios prontos em vez de construir longe do Centro.',
    ],
    contras: [
      'Comprar e reformar prédios antigos custa caro por apartamento.',
      'Pode levar anos para negociar com os donos dos prédios.',
      'Atende poucas famílias perto do tamanho da fila da moradia.',
    ],
    votosIniciais: { sim: 7120, nao: 5180, abstencao: 940 },
  },
];
