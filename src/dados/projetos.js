// Votações abertas à população: obras, programas e mudanças de verba.
// Dados de exemplo: valores, datas e votos são inventados para o protótipo.
//
// Campos de cada votação:
// - id, titulo, resumo (uma frase), descricao (parágrafos curtos de "O que muda")
// - tipo: "Obra", "Programa" ou "Mudança de verba"
// - escopo: "cidade" (a cidade toda vota) ou "subprefeitura" (os moradores da subprefeitura votam)
// - bairro (opcional): onde a obra acontece; subprefeitura: nome sem a palavra "Subprefeitura"
// - bairros: bairros afetados (a votação da cidade aparece nas Votações desses bairros)
// - icone (Material Symbols); imagem (opcional): foto de public/img/votacoes
// - valor: custo ou dinheiro movido, em reais; prazoObra (opcional): quanto tempo a obra leva
// - inicioVotacao, fimVotacao: primeiro e último dia da votação (ISO)
// - status: "votacao-aberta" ou "encerrada"
// - situacao, dataSituacao: o que aconteceu depois da votação (ids de SITUACOES_PROJETO)
// - responsavel: { nome, cargo, para } de quem abriu a votação
// - verba (só mudança de verba): { ano, de: { nome, hoje }, para: { nome, hoje } }
// - quemAfeta, pros, contras: os dois lados, escritos com o mesmo cuidado
// - textoSim, textoNao: o que acontece se cada lado ganhar (aparece na caixa do voto)
// - votosIniciais: { sim, nao } que já existiam antes dos votos feitos neste aparelho
// - regiao: usada só pelas telas antigas (TODO: tirar quando o Início e o Meu bairro forem refeitos)

// Quem abre as votações da cidade e as da Subprefeitura Vila Mariana
const PREFEITURA = {
  nome: 'Prefeitura de São Paulo',
  cargo: 'Prefeita Helena Batista Rocha',
  para: '/minha-cidade',
};
const SUB_VILA_MARIANA = {
  nome: 'Subprefeitura Vila Mariana',
  cargo: 'Subprefeita Luciana Pereira Campos',
  para: '/minha-cidade/subprefeituras/vila-mariana',
};

export const PROJETOS = [
  {
    id: 'corredor-jabaquara',
    titulo: 'Corredor de ônibus na Avenida Jabaquara',
    resumo: 'Faixas só para ônibus nos dois sentidos, com novas paradas e calçadas reformadas.',
    descricao: [
      'O projeto cria um corredor de ônibus de 6 km na Avenida Jabaquara, ligando a estação Jabaquara do metrô à Vila Mariana. Os ônibus passam a andar na faixa da esquerda, separados dos carros.',
      'As paradas ficam no canteiro central, cobertas e com rampa. As calçadas dos dois lados da avenida também serão refeitas, com piso tátil e mais árvores.',
    ],
    tipo: 'Obra',
    escopo: 'cidade',
    bairro: 'Jabaquara',
    subprefeitura: 'Jabaquara',
    bairros: ['Jabaquara', 'Saúde', 'Vila Mariana'],
    regiao: 'Zona Sul',
    icone: 'directions_bus',
    imagem: 'img/votacoes/corredor-jabaquara.jpg',
    valor: 180000000,
    prazoObra: '24 meses',
    inicioVotacao: '2026-10-19',
    fimVotacao: '2026-11-18',
    status: 'votacao-aberta',
    responsavel: PREFEITURA,
    quemAfeta:
      'Cerca de 210 mil pessoas que usam as linhas de ônibus da avenida todos os dias, motoristas que passam por ali e o comércio dos dois lados.',
    pros: [
      'Viagem de ônibus até 15 minutos mais rápida nos horários de pico.',
      'Paradas cobertas, com rampa e piso tátil.',
      'Calçadas novas e mais árvores ao longo da avenida.',
    ],
    contras: [
      'Menos espaço para carros e fim de algumas vagas de estacionamento.',
      'Dois anos de obra, com desvios e mais trânsito no período.',
    ],
    textoSim: 'A prefeitura faz o corredor de ônibus.',
    textoNao: 'A avenida continua como está.',
    votosIniciais: { sim: 4630, nao: 3110 },
  },
  {
    id: 'parque-linear-tiquatira',
    titulo: 'Parque linear às margens do Córrego Tiquatira',
    resumo:
      'Área verde de 3 km com pista de caminhada, ciclovia e espaços que seguram a água da chuva.',
    descricao: [
      'O parque ocupa as margens do Córrego Tiquatira, na Penha, que hoje têm mato alto e lixo. A ideia é plantar árvores, fazer uma pista de caminhada e uma ciclovia ao longo do córrego.',
      'Parte do parque é feita para encher na chuva forte: a água fica ali por algumas horas em vez de invadir as ruas e as casas próximas.',
    ],
    tipo: 'Obra',
    escopo: 'cidade',
    bairro: 'Penha',
    subprefeitura: 'Penha',
    bairros: ['Penha', 'Cangaíba'],
    regiao: 'Zona Leste',
    icone: 'park',
    imagem: 'img/votacoes/parque-linear-tiquatira.jpg',
    valor: 96000000,
    prazoObra: '18 meses',
    inicioVotacao: '2026-10-26',
    fimVotacao: '2026-11-25',
    status: 'votacao-aberta',
    responsavel: PREFEITURA,
    quemAfeta:
      'Moradores da Penha e do Cangaíba que vivem perto do córrego, principalmente as cerca de 4 mil famílias das ruas que alagam na chuva.',
    pros: [
      'Menos alagamento nas ruas perto do córrego.',
      'Área de lazer e esporte gratuita perto de casa.',
      'Mais árvores e sombra, deixando o bairro menos quente.',
    ],
    contras: [
      '62 famílias que moram na margem precisarão mudar para moradias da prefeitura.',
      'Custo de manutenção alto todos os anos.',
    ],
    textoSim: 'A prefeitura faz o parque.',
    textoNao: 'As margens do córrego continuam como estão.',
    votosIniciais: { sim: 3480, nao: 1290 },
  },
  {
    id: 'hospital-dia-santana',
    titulo: 'Hospital-dia em Santana',
    resumo: 'Unidade para cirurgias simples e exames em que a pessoa entra e sai no mesmo dia.',
    descricao: [
      'O hospital-dia faz cirurgias pequenas (como catarata, hérnia e varizes) e exames que precisam de preparo, sem internação: a pessoa chega de manhã e volta para casa no mesmo dia.',
      'Hoje, quem mora em Santana e nos bairros vizinhos espera em média 8 meses por essas cirurgias. A nova unidade quer reduzir essa fila pela metade.',
    ],
    tipo: 'Obra',
    escopo: 'cidade',
    bairro: 'Santana',
    subprefeitura: 'Santana/Tucuruvi',
    bairros: ['Santana', 'Tucuruvi', 'Mandaqui'],
    regiao: 'Zona Norte',
    icone: 'local_hospital',
    imagem: 'img/votacoes/hospital-dia-santana.jpg',
    valor: 140000000,
    prazoObra: '30 meses',
    inicioVotacao: '2026-11-02',
    fimVotacao: '2026-12-02',
    status: 'votacao-aberta',
    responsavel: PREFEITURA,
    quemAfeta:
      'Pacientes de Santana e dos bairros vizinhos na fila de cirurgias e exames, que hoje precisam ir até hospitais longe de casa.',
    pros: [
      'Fila de cirurgias simples menor para quem mora perto.',
      'Atendimento perto do metrô, sem atravessar a cidade.',
      'Libera leitos dos hospitais grandes para casos graves.',
    ],
    contras: [
      'Precisa de cerca de 300 profissionais novos, um gasto fixo alto todo ano.',
      'Só fica pronto em dois anos e meio; até lá, a fila continua.',
    ],
    textoSim: 'A prefeitura constrói o hospital-dia.',
    textoNao: 'O terreno fica para outro uso.',
    votosIniciais: { sim: 1529, nao: 420 },
  },
  {
    id: 'moradia-centro',
    titulo: 'Moradia em prédios vazios do Centro',
    resumo: 'Reforma de 6 prédios abandonados para virarem 520 apartamentos de aluguel social.',
    descricao: [
      'O Centro tem prédios vazios há anos, muitos com dívida de IPTU. O projeto compra seis deles e faz uma reforma completa para virarem apartamentos.',
      'Os apartamentos são alugados por um valor que cabe no orçamento de famílias com renda de até três salários mínimos, perto do trabalho, do metrô e dos serviços.',
    ],
    tipo: 'Obra',
    escopo: 'cidade',
    subprefeitura: 'Sé',
    bairros: ['República', 'Sé', 'Santa Cecília'],
    regiao: 'Centro',
    icone: 'apartment',
    imagem: 'img/votacoes/moradia-centro.jpg',
    valor: 260000000,
    prazoObra: '36 meses',
    inicioVotacao: '2026-09-20',
    fimVotacao: '2026-10-31',
    status: 'encerrada',
    situacao: 'encaminhado-camara',
    dataSituacao: '2026-11-04',
    responsavel: PREFEITURA,
    quemAfeta:
      'Famílias de baixa renda na fila da moradia, que hoje vivem longe do trabalho ou pagam aluguel caro, e os vizinhos dos prédios abandonados.',
    pros: [
      '520 famílias morando perto do trabalho e do transporte.',
      'Prédios abandonados voltam a ter uso e o entorno fica mais seguro.',
    ],
    contras: [
      'Comprar e reformar prédios antigos custa caro por apartamento.',
      'Atende poucas famílias perto do tamanho da fila da moradia.',
    ],
    textoSim: 'A prefeitura compra e reforma os prédios.',
    textoNao: 'Os prédios continuam como estão.',
    votosIniciais: { sim: 7120, nao: 5180 },
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
    tipo: 'Obra',
    escopo: 'cidade',
    bairro: 'Butantã',
    subprefeitura: 'Butantã',
    bairros: ['Butantã', 'Rio Pequeno'],
    regiao: 'Zona Oeste',
    icone: 'school',
    imagem: 'img/votacoes/ceu-butanta.jpg',
    valor: 210000000,
    prazoObra: '26 meses',
    inicioVotacao: '2026-09-15',
    fimVotacao: '2026-10-15',
    status: 'encerrada',
    situacao: 'encaminhado-camara',
    dataSituacao: '2026-10-22',
    responsavel: PREFEITURA,
    quemAfeta:
      'Famílias do Butantã com crianças na fila da creche e da escola, e moradores que hoje não têm espaço de lazer e cultura perto de casa.',
    pros: [
      'Cerca de 1.800 vagas novas de creche e escola.',
      'Piscina, teatro e biblioteca gratuitos para o bairro.',
    ],
    contras: [
      'Custo alto para manter aberto todos os dias, inclusive fins de semana.',
      'Obra de mais de dois anos.',
    ],
    textoSim: 'A prefeitura constrói o CEU.',
    textoNao: 'O terreno fica para outro uso.',
    votosIniciais: { sim: 9840, nao: 3120 },
  },
  {
    id: 'piscinao-aricanduva',
    titulo: 'Piscinão no Rio Aricanduva',
    resumo: 'Reservatório subterrâneo que guarda a água da chuva forte para evitar enchentes.',
    descricao: [
      'Um piscinão é um reservatório gigante que recebe a água da chuva quando o rio enche. Depois que a chuva passa, a água volta aos poucos para o rio.',
      'O novo piscinão fica embaixo de uma praça em Itaquera e guarda 500 milhões de litros. A praça é refeita por cima, com quadras e área verde.',
    ],
    tipo: 'Obra',
    escopo: 'cidade',
    bairro: 'Itaquera',
    subprefeitura: 'Itaquera',
    bairros: ['Itaquera', 'São Mateus'],
    regiao: 'Zona Leste',
    icone: 'flood',
    imagem: 'img/votacoes/piscinao-aricanduva.jpg',
    valor: 320000000,
    prazoObra: '32 meses',
    inicioVotacao: '2026-09-01',
    fimVotacao: '2026-10-10',
    status: 'encerrada',
    situacao: 'aprovado-camara',
    dataSituacao: '2026-10-28',
    obra: 'piscinao-aricanduva',
    responsavel: PREFEITURA,
    quemAfeta:
      'Cerca de 90 mil moradores das ruas que alagam perto da Avenida Aricanduva e quem passa pela avenida nos dias de chuva.',
    pros: [
      'Menos enchentes na Avenida Aricanduva e nas ruas próximas.',
      'A praça de cima é refeita e ganha quadras.',
    ],
    contras: [
      'Obra grande e demorada, com a praça fechada por quase três anos.',
      'Resolve a enchente de uma parte da região, não de todos os bairros.',
    ],
    textoSim: 'A prefeitura constrói o piscinão.',
    textoNao: 'A praça continua como está.',
    votosIniciais: { sim: 12780, nao: 2410 },
  },
  {
    id: 'vm-led-santa-cruz',
    titulo: 'LED nas ruas em volta do Metrô Santa Cruz',
    resumo:
      'Troca de 180 lâmpadas por LED e 12 postes novos nas ruas mais escuras perto da estação.',
    descricao: [
      'As ruas em volta da estação Santa Cruz têm lâmpadas antigas e trechos escuros. A proposta troca 180 lâmpadas por LED e coloca 12 postes novos nos pontos mais escuros.',
      'O dinheiro sai do custeio da subprefeitura para 2027.',
    ],
    tipo: 'Obra',
    escopo: 'subprefeitura',
    subprefeitura: 'Vila Mariana',
    bairros: ['Vila Mariana'],
    regiao: 'Zona Sul',
    icone: 'lightbulb',
    imagem: 'img/votacoes/led-santa-cruz.jpg',
    valor: 900000,
    prazoObra: '4 meses',
    inicioVotacao: '2026-10-28',
    fimVotacao: '2026-11-27',
    status: 'votacao-aberta',
    responsavel: SUB_VILA_MARIANA,
    quemAfeta: 'Quem anda a pé à noite perto da estação Santa Cruz e quem mora nessas ruas.',
    pros: ['Ruas mais claras e mais seguras à noite.', 'LED gasta menos energia e dura mais.'],
    contras: [
      'Usa dinheiro que poderia ir para a poda de árvores do bairro.',
      'Quatro meses de obra nas calçadas.',
    ],
    textoSim: 'A subprefeitura troca as lâmpadas e põe os postes novos.',
    textoNao: 'A iluminação continua como está.',
    votosIniciais: { sim: 640, nao: 336 },
  },
  {
    id: 'vm-calcadas-acessiveis',
    titulo: 'Passar R$ 400 mil dos eventos de rua para calçadas acessíveis',
    resumo: 'Menos festas de rua em 2027 e mais rampas e piso tátil perto de escolas, UBS e metrô.',
    descricao: [
      'A subprefeitura reservou R$ 1,1 milhão para eventos de rua em 2027. A proposta tira R$ 400 mil desse valor e usa para refazer calçadas perto da UBS Vila Mariana, da EMEF Vila Mariana e da estação Ana Rosa.',
      'Se o Não ganhar, o dinheiro continua nos eventos de rua.',
    ],
    tipo: 'Mudança de verba',
    escopo: 'subprefeitura',
    subprefeitura: 'Vila Mariana',
    bairros: ['Vila Mariana', 'Moema', 'Saúde'],
    regiao: 'Zona Sul',
    icone: 'accessible',
    imagem: 'img/votacoes/calcadas-acessiveis.jpg',
    valor: 400000,
    inicioVotacao: '2026-11-10',
    fimVotacao: '2026-12-04',
    status: 'votacao-aberta',
    responsavel: SUB_VILA_MARIANA,
    verba: {
      ano: 2027,
      de: { nome: 'Eventos de rua', hoje: 1100000 },
      para: { nome: 'Calçadas acessíveis', hoje: 0 },
    },
    quemAfeta:
      'Quem anda de cadeira de rodas, bengala ou carrinho de bebê, e quem vai aos eventos de rua do bairro.',
    pros: [
      'Cerca de 1.600 metros de calçada nova, com rampa e piso tátil.',
      'Caminho mais seguro até a UBS, a escola e o metrô.',
    ],
    contras: [
      'Menos eventos de rua no ano que vem.',
      'As calçadas só começam a ser feitas em março de 2027.',
    ],
    textoSim: 'R$ 400 mil vão para calçadas acessíveis.',
    textoNao: 'O dinheiro continua nos eventos de rua.',
    votosIniciais: { sim: 365, nao: 221 },
  },
  {
    id: 'vm-rua-de-lazer',
    titulo: 'Rua de lazer aos domingos na Alameda dos Maracatins',
    resumo:
      'Rua fechada para carros aos domingos, das 10h às 16h, para brincar, pedalar e passear.',
    descricao: [
      'Aos domingos, das 10h às 16h, a Alameda dos Maracatins fica fechada para carros entre a Avenida Ibirapuera e a Rua Gaivota. A rua vira espaço para brincar, pedalar e passear.',
      'Os moradores da alameda continuam entrando e saindo de carro, devagar.',
    ],
    tipo: 'Programa',
    escopo: 'subprefeitura',
    subprefeitura: 'Vila Mariana',
    bairros: ['Moema'],
    regiao: 'Zona Sul',
    icone: 'directions_bike',
    imagem: 'img/votacoes/rua-de-lazer.jpg',
    valor: 120000,
    inicioVotacao: '2026-09-01',
    fimVotacao: '2026-09-30',
    status: 'encerrada',
    situacao: 'programa-comecou',
    dataSituacao: '2026-11-01',
    responsavel: SUB_VILA_MARIANA,
    quemAfeta:
      'Moradores da Alameda dos Maracatins e das ruas em volta, e quem usa a rua no domingo.',
    pros: [
      'Espaço seguro para crianças brincarem e para pedalar.',
      'Mais movimento para o comércio do bairro no domingo.',
    ],
    contras: ['Menos lugar para estacionar aos domingos.', 'Mais barulho na rua durante o dia.'],
    textoSim: 'A rua fecha para carros aos domingos.',
    textoNao: 'A rua continua aberta aos carros.',
    votosIniciais: { sim: 1905, nao: 1120 },
  },
];
