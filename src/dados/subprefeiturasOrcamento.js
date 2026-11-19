// As 32 subprefeituras de São Paulo, com os bairros (distritos) de cada uma e o custeio de 2026.
// Dados de exemplo: os nomes e os bairros são os reais; os valores são inventados para o protótipo.
// - id: usado na rota /minha-cidade/subprefeituras/:id
// - bairros: os distritos que a subprefeitura cuida (cada um recebe R$ 1 mi de verba dos moradores)
// - custeio: dinheiro do dia a dia (zeladoria, manutenção, equipes), previsto para 2026, em reais
// - custeioPago (opcional): quanto do custeio já foi pago até outubro (sem ele, a conta usa 79%)
// O valor "em obras" vem das obras em andamento de dados/obras.js.
export const SUBPREFEITURAS_ORCAMENTO = [
  {
    id: 'se',
    nome: 'Sé',
    bairros: [
      'Bela Vista',
      'Bom Retiro',
      'Cambuci',
      'Consolação',
      'Liberdade',
      'República',
      'Santa Cecília',
      'Sé',
    ],
    custeio: 168000000,
  },
  {
    id: 'itaquera',
    nome: 'Itaquera',
    bairros: ['Cidade Líder', 'Itaquera', 'José Bonifácio', 'Parque do Carmo'],
    custeio: 121000000,
  },
  {
    id: 'pinheiros',
    nome: 'Pinheiros',
    bairros: ['Alto de Pinheiros', 'Itaim Bibi', 'Jardim Paulista', 'Pinheiros'],
    custeio: 118000000,
  },
  {
    id: 'sao-mateus',
    nome: 'São Mateus',
    bairros: ['Iguatemi', 'São Mateus', 'São Rafael'],
    custeio: 115000000,
  },
  {
    id: 'butanta',
    nome: 'Butantã',
    bairros: ['Butantã', 'Morumbi', 'Raposo Tavares', 'Rio Pequeno', 'Vila Sônia'],
    custeio: 113000000,
  },
  {
    id: 'vila-mariana',
    nome: 'Vila Mariana',
    bairros: ['Vila Mariana', 'Moema', 'Saúde'],
    custeio: 112000000,
    custeioPago: 88500000,
  },
  {
    id: 'ipiranga',
    nome: 'Ipiranga',
    bairros: ['Cursino', 'Ipiranga', 'Sacomã'],
    custeio: 110000000,
  },
  {
    id: 'penha',
    nome: 'Penha',
    bairros: ['Artur Alvim', 'Cangaíba', 'Penha', 'Vila Matilde'],
    custeio: 109000000,
  },
  {
    id: 'lapa',
    nome: 'Lapa',
    bairros: ['Barra Funda', 'Jaguara', 'Jaguaré', 'Lapa', 'Perdizes', 'Vila Leopoldina'],
    custeio: 106000000,
  },
  {
    id: 'mooca',
    nome: 'Mooca',
    bairros: ['Água Rasa', 'Belém', 'Brás', 'Mooca', 'Pari', 'Tatuapé'],
    custeio: 104000000,
  },
  {
    id: 'santo-amaro',
    nome: 'Santo Amaro',
    bairros: ['Campo Belo', 'Campo Grande', 'Santo Amaro'],
    custeio: 101000000,
  },
  {
    id: 'santana-tucuruvi',
    nome: 'Santana/Tucuruvi',
    bairros: ['Mandaqui', 'Santana', 'Tucuruvi'],
    custeio: 96000000,
  },
  {
    id: 'casa-verde-cachoeirinha',
    nome: 'Casa Verde/Cachoeirinha',
    bairros: ['Cachoeirinha', 'Casa Verde', 'Limão'],
    custeio: 92000000,
  },
  {
    id: 'vila-maria-vila-guilherme',
    nome: 'Vila Maria/Vila Guilherme',
    bairros: ['Vila Guilherme', 'Vila Maria', 'Vila Medeiros'],
    custeio: 88000000,
  },
  {
    id: 'campo-limpo',
    nome: 'Campo Limpo',
    bairros: ['Campo Limpo', 'Capão Redondo', 'Vila Andrade'],
    custeio: 86000000,
  },
  {
    id: 'capela-do-socorro',
    nome: 'Capela do Socorro',
    bairros: ['Cidade Dutra', 'Grajaú', 'Socorro'],
    custeio: 84000000,
  },
  {
    id: 'mboi-mirim',
    nome: "M'Boi Mirim",
    bairros: ['Jardim Ângela', 'Jardim São Luís'],
    custeio: 81000000,
  },
  {
    id: 'aricanduva-formosa-carrao',
    nome: 'Aricanduva/Formosa/Carrão',
    bairros: ['Aricanduva', 'Carrão', 'Vila Formosa'],
    custeio: 78000000,
  },
  {
    id: 'freguesia-brasilandia',
    nome: 'Freguesia/Brasilândia',
    bairros: ['Brasilândia', 'Freguesia do Ó'],
    custeio: 76000000,
  },
  {
    id: 'pirituba-jaragua',
    nome: 'Pirituba/Jaraguá',
    bairros: ['Jaraguá', 'Pirituba', 'São Domingos'],
    custeio: 74000000,
  },
  {
    id: 'vila-prudente',
    nome: 'Vila Prudente',
    bairros: ['São Lucas', 'Vila Prudente'],
    custeio: 71000000,
  },
  {
    id: 'sao-miguel-paulista',
    nome: 'São Miguel Paulista',
    bairros: ['Jardim Helena', 'São Miguel', 'Vila Jacuí'],
    custeio: 69000000,
  },
  {
    id: 'jabaquara',
    nome: 'Jabaquara',
    bairros: ['Jabaquara'],
    custeio: 66000000,
  },
  {
    id: 'cidade-ademar',
    nome: 'Cidade Ademar',
    bairros: ['Cidade Ademar', 'Pedreira'],
    custeio: 64000000,
  },
  {
    id: 'itaim-paulista',
    nome: 'Itaim Paulista',
    bairros: ['Itaim Paulista', 'Vila Curuçá'],
    custeio: 62000000,
  },
  {
    id: 'sapopemba',
    nome: 'Sapopemba',
    bairros: ['Sapopemba'],
    custeio: 59000000,
  },
  {
    id: 'jacana-tremembe',
    nome: 'Jaçanã/Tremembé',
    bairros: ['Jaçanã', 'Tremembé'],
    custeio: 57000000,
  },
  {
    id: 'guaianases',
    nome: 'Guaianases',
    bairros: ['Guaianases', 'Lajeado'],
    custeio: 54000000,
  },
  {
    id: 'ermelino-matarazzo',
    nome: 'Ermelino Matarazzo',
    bairros: ['Ermelino Matarazzo', 'Ponte Rasa'],
    custeio: 52000000,
  },
  {
    id: 'cidade-tiradentes',
    nome: 'Cidade Tiradentes',
    bairros: ['Cidade Tiradentes'],
    custeio: 49000000,
  },
  {
    id: 'perus-anhanguera',
    nome: 'Perus/Anhanguera',
    bairros: ['Anhanguera', 'Perus'],
    custeio: 46000000,
  },
  {
    id: 'parelheiros',
    nome: 'Parelheiros',
    bairros: ['Marsilac', 'Parelheiros'],
    custeio: 43000000,
  },
];
