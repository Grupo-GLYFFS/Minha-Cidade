// Alertas da cidade (Defesa Civil, Sabesp, Meio Ambiente). "Hoje" do app = 13 de novembro.
//
// Campos de cada alerta:
// - id: usado na rota /minha-cidade/alertas/:id
// - tipo: "defesa-civil" (tem o 199 no detalhe e vira aviso nas Notificações) ou outro órgão
// - orgao e icone: quem emitiu e o ícone do assunto (Material Symbols)
// - nivel: "atencao" | "alerta" | "emergencia"
// - ativo: true enquanto o alerta vale; false = encerrado
// - titulo e mensagem: o texto curto da faixa amarela e das Notificações
// - manchete, frase e descricao: título, resumo do card e texto completo do detalhe
// - bairros: nomes dos bairros atingidos (lista vazia = cidade toda)
// - subprefeituras: ids das subprefeituras atingidas
// - inicio e fim: textos de "quando" (o detalhe junta os dois)
// - periodo: data curta dos encerrados (ex.: "6 nov, 16h20 a 7 nov, 9h")
// - passos: "O que fazer" (sem o 199, que o detalhe põe no fim nos alertas da Defesa Civil)
// - pontosApoio e atualizacoes (opcionais)
// - criadoEm: data ISO de quando foi emitido
export const ALERTAS = [
  {
    id: 'a-001',
    tipo: 'defesa-civil',
    orgao: 'Defesa Civil',
    icone: 'thunderstorm',
    nivel: 'alerta',
    ativo: true,
    titulo: 'Alerta da Defesa Civil',
    mensagem:
      'chuva forte prevista para hoje à tarde na Vila Mariana. Evite passar por ruas alagadas.',
    manchete: 'Chuva forte prevista para hoje à tarde',
    frase: 'A previsão é de 40 a 60 mm de chuva entre 14h e 20h, com vento de até 60 km/h.',
    descricao:
      'Uma frente fria chega no meio da tarde. A previsão é de 40 a 60 mm de chuva entre 14h e 20h, com vento de até 60 km/h. Há risco de alagamento na Avenida Ibirapuera e na Avenida Ricardo Jafet e de queda de árvores.',
    bairros: ['Vila Mariana', 'Moema', 'Saúde', 'Ipiranga', 'Campo Belo'],
    subprefeituras: ['vila-mariana', 'ipiranga', 'santo-amaro'],
    inicio: 'Desde 7h30 de hoje',
    fim: 'Até 23h de hoje',
    passos: [
      'Não passe por ruas alagadas, nem a pé nem de carro.',
      'Fique longe de árvores, postes e placas durante o vento forte.',
      'Tire da calçada o lixo e o que a água pode levar.',
      'Se a água entrar em casa, desligue a energia no quadro de luz.',
    ],
    pontosApoio: [
      {
        icone: 'school',
        nome: 'EMEF Vila Mariana',
        endereco: 'Rua França Pinto, 450',
        bairro: 'Vila Mariana',
      },
      {
        icone: 'school',
        nome: 'EMEF Saúde',
        endereco: 'Avenida Bosque da Saúde, 1.040',
        bairro: 'Saúde',
      },
      {
        icone: 'school',
        nome: 'EMEF Ipiranga',
        endereco: 'Rua Bom Pastor, 870',
        bairro: 'Ipiranga',
      },
    ],
    atualizacoes: [
      {
        quando: 'Hoje, 9h45',
        texto:
          'Previsão mantida. Equipes limpam bocas de lobo na Avenida Ibirapuera e na Rua Humberto I.',
      },
      { quando: 'Hoje, 7h30', texto: 'Alerta emitido. Chuva forte prevista entre 14h e 20h.' },
    ],
    criadoEm: '2026-11-13T07:30:00-03:00',
  },
  {
    id: 'al-calor',
    tipo: 'defesa-civil',
    orgao: 'Defesa Civil',
    icone: 'thermostat',
    nivel: 'atencao',
    ativo: true,
    titulo: 'Alerta da Defesa Civil',
    mensagem: 'calor forte e ar seco até a chegada da frente fria. Beba água ao longo do dia.',
    manchete: 'Calor forte e ar seco até a chegada da frente fria',
    frase: 'A temperatura chega a 34 °C e a umidade do ar fica perto de 25% no começo da tarde.',
    descricao:
      'O ar quente e seco fica sobre a cidade até a chegada da frente fria, no meio da tarde. A temperatura chega a 34 °C e a umidade do ar fica perto de 25% no começo da tarde.',
    bairros: [],
    subprefeituras: [],
    inicio: 'Desde 11 nov, 10h',
    fim: 'Até 15h de hoje',
    passos: [
      'Beba água ao longo do dia, mesmo sem sede.',
      'Evite atividade física ao ar livre entre 11h e 16h.',
      'Use roupas leves e fique na sombra.',
      'Cuide de crianças, idosos e animais, que sentem mais o calor.',
    ],
    atualizacoes: [
      {
        quando: '11 nov, 10h',
        texto: 'Alerta emitido. Calor forte e ar seco até a chegada da frente fria.',
      },
    ],
    criadoEm: '2026-11-11T10:00:00-03:00',
  },
  {
    id: 'al-agua-santana',
    tipo: 'sabesp',
    orgao: 'Sabesp',
    icone: 'water_drop',
    nivel: 'atencao',
    ativo: true,
    titulo: 'Aviso da Sabesp',
    mensagem: 'falta de água em Santana e Tucuruvi das 22h de hoje às 10h de amanhã.',
    manchete: 'Falta de água em Santana e Tucuruvi nesta noite',
    frase: 'A Sabesp troca um cano grande na Avenida Cruzeiro do Sul.',
    descricao:
      'A Sabesp troca um cano grande na Avenida Cruzeiro do Sul. A água deve voltar aos poucos a partir das 10h de amanhã, primeiro nas partes mais baixas dos bairros.',
    bairros: ['Santana', 'Tucuruvi'],
    subprefeituras: ['santana-tucuruvi'],
    inicio: 'Começa às 22h de hoje',
    fim: 'Até 10h de amanhã',
    passos: [
      'Encha garrafas e baldes com água antes das 22h.',
      'Feche o registro se a água voltar com cor estranha e deixe correr por alguns minutos.',
      'Use a água da caixa só para o que for preciso.',
    ],
    atualizacoes: [
      {
        quando: 'Hoje, 8h',
        texto: 'Aviso da Sabesp sobre a troca do cano na Avenida Cruzeiro do Sul.',
      },
    ],
    criadoEm: '2026-11-13T08:00:00-03:00',
  },
  {
    id: 'al-enchente-aricanduva',
    tipo: 'defesa-civil',
    orgao: 'Defesa Civil',
    icone: 'flood',
    nivel: 'emergencia',
    ativo: false,
    titulo: 'Alerta da Defesa Civil',
    mensagem: 'enchente na Avenida Aricanduva e na Avenida Mateo Bei.',
    manchete: 'Enchente na Avenida Aricanduva e na Avenida Mateo Bei',
    frase: 'O Córrego Aricanduva transbordou depois de 80 mm de chuva em duas horas.',
    descricao:
      'O Córrego Aricanduva transbordou depois de 80 mm de chuva em duas horas. A água chegou às casas perto da Avenida Aricanduva e da Avenida Mateo Bei. As equipes da Defesa Civil e dos Bombeiros ajudaram as famílias a sair.',
    bairros: ['Aricanduva', 'Vila Formosa'],
    subprefeituras: ['aricanduva-formosa-carrao'],
    inicio: 'De sexta, 6 de novembro, 16h20',
    fim: 'até sábado, 7 de novembro, 9h',
    periodo: '6 nov, 16h20 a 7 nov, 9h',
    passos: [
      'Não entre na água da enchente.',
      'Saia de casa se a água começar a subir e vá para um ponto de apoio.',
      'Desligue a energia no quadro de luz.',
    ],
    atualizacoes: [
      {
        quando: '7 nov, 9h',
        texto: 'Alerta encerrado. A água baixou e as avenidas foram liberadas.',
      },
      { quando: '6 nov, 16h20', texto: 'Emergência emitida. Enchente na Avenida Aricanduva.' },
    ],
    criadoEm: '2026-11-06T16:20:00-03:00',
  },
  {
    id: 'al-calor-ar-seco-out',
    tipo: 'meio-ambiente',
    orgao: 'Secretaria do Verde e do Meio Ambiente',
    icone: 'air',
    nivel: 'atencao',
    ativo: false,
    titulo: 'Aviso do Meio Ambiente',
    mensagem: 'ar de má qualidade por causa da fumaça de queimadas.',
    manchete: 'Ar de má qualidade por causa da fumaça de queimadas',
    frase: 'A fumaça de queimadas no interior do estado deixou o ar da cidade pior.',
    descricao:
      'A fumaça de queimadas no interior do estado chegou à cidade e deixou o ar de má qualidade por três dias.',
    bairros: [],
    subprefeituras: [],
    inicio: 'De quarta, 21 de outubro, 8h',
    fim: 'até sexta, 23 de outubro, 18h',
    periodo: '21 out, 8h a 23 out, 18h',
    passos: [
      'Evite atividade física ao ar livre.',
      'Beba bastante água.',
      'Procure uma UBS se tiver falta de ar.',
    ],
    criadoEm: '2026-10-21T08:00:00-03:00',
  },
];
