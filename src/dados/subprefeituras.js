// As 32 subprefeituras de São Paulo, de A a Z (divisão oficial da cidade).
// Os bairros de cada uma ficam em dados/bairrosCidade.js (campo "subprefeitura").
//
// Campos de cada subprefeitura:
// - id: usado na rota /minha-cidade/subprefeituras/:id
// - nome: sem a palavra "Subprefeitura" (ex.: "Vila Mariana")
// - prep: preposição antes do nome nas frases ("na Vila Mariana", "no Ipiranga", "em Pinheiros")
// - destaque (opcional): posição no card "Subprefeituras" da página Cidade de São Paulo
// - percentualPago (opcional): quanto do orçamento da subprefeitura já foi pago até outubro
// - endereco, horario, telefone, subprefeito, coordenacoes, numeros (opcionais): só nas
//   subprefeituras que o app já conhece em detalhe. Sem eles, a página mostra só o que existe.
//   Dados de exemplo: nomes de pessoas, endereços e números são inventados para o protótipo.
export const SUBPREFEITURAS = [
  { id: 'aricanduva-formosa-carrao', nome: 'Aricanduva/Formosa/Carrão', prep: 'em' },
  { id: 'butanta', nome: 'Butantã', prep: 'no' },
  { id: 'campo-limpo', nome: 'Campo Limpo', prep: 'no' },
  { id: 'capela-do-socorro', nome: 'Capela do Socorro', prep: 'na' },
  { id: 'casa-verde-cachoeirinha', nome: 'Casa Verde/Cachoeirinha', prep: 'na' },
  { id: 'cidade-ademar', nome: 'Cidade Ademar', prep: 'na' },
  { id: 'cidade-tiradentes', nome: 'Cidade Tiradentes', prep: 'na' },
  { id: 'ermelino-matarazzo', nome: 'Ermelino Matarazzo', prep: 'em' },
  { id: 'freguesia-brasilandia', nome: 'Freguesia/Brasilândia', prep: 'na' },
  { id: 'guaianases', nome: 'Guaianases', prep: 'em' },
  { id: 'ipiranga', nome: 'Ipiranga', prep: 'no', destaque: 2 },
  { id: 'itaim-paulista', nome: 'Itaim Paulista', prep: 'no' },
  { id: 'itaquera', nome: 'Itaquera', prep: 'em' },
  { id: 'jabaquara', nome: 'Jabaquara', prep: 'no', destaque: 4 },
  { id: 'jacana-tremembe', nome: 'Jaçanã/Tremembé', prep: 'no' },
  { id: 'lapa', nome: 'Lapa', prep: 'na', destaque: 8 },
  { id: 'm-boi-mirim', nome: "M'Boi Mirim", prep: 'no' },
  { id: 'mooca', nome: 'Mooca', prep: 'na', destaque: 7 },
  { id: 'parelheiros', nome: 'Parelheiros', prep: 'em' },
  { id: 'penha', nome: 'Penha', prep: 'na' },
  { id: 'perus-anhanguera', nome: 'Perus/Anhanguera', prep: 'em' },
  { id: 'pinheiros', nome: 'Pinheiros', prep: 'em', destaque: 6 },
  { id: 'pirituba-jaragua', nome: 'Pirituba/Jaraguá', prep: 'em' },
  { id: 'santana-tucuruvi', nome: 'Santana/Tucuruvi', prep: 'em' },
  { id: 'santo-amaro', nome: 'Santo Amaro', prep: 'em', destaque: 3 },
  { id: 'sao-mateus', nome: 'São Mateus', prep: 'em' },
  { id: 'sao-miguel-paulista', nome: 'São Miguel Paulista', prep: 'em' },
  { id: 'sapopemba', nome: 'Sapopemba', prep: 'em' },
  { id: 'se', nome: 'Sé', prep: 'na', destaque: 5 },
  { id: 'vila-maria-vila-guilherme', nome: 'Vila Maria/Vila Guilherme', prep: 'na' },
  {
    id: 'vila-mariana',
    nome: 'Vila Mariana',
    prep: 'na',
    destaque: 1,
    percentualPago: 75,
    endereco: 'Rua José de Magalhães, 500 · Vila Mariana',
    horario: 'Seg. a sex., das 8h às 17h',
    telefone: {
      numero: '(11) 3397-4100',
      link: 'tel:+551133974100',
      texto: 'Atendimento ao público, seg. a sex., das 8h às 17h',
    },
    subprefeito: { nome: 'Luciana Pereira Campos', cargo: 'Subprefeita', iniciais: 'LC' },
    coordenacoes: [
      { area: 'Obras', nome: 'Renato Siqueira Borges', iniciais: 'RB' },
      { area: 'Zeladoria e Limpeza', nome: 'Cláudia Mendonça Reis', iniciais: 'CR' },
      { area: 'Saúde', nome: 'Tatiana Albuquerque Lins', iniciais: 'TL' },
      { area: 'Assistência Social', nome: 'Paulo Roberto Nunes', iniciais: 'PN' },
    ],
    numeros: [
      { icone: 'groups', valor: '344 mil', rotulo: 'moradores · estimativa' },
      { icone: 'straighten', valor: '26,5 km²', rotulo: 'de área' },
      { icone: 'local_hospital', valor: '9', rotulo: 'UBS' },
      { icone: 'school', valor: '38', rotulo: 'escolas municipais' },
      { icone: 'park', valor: '26', rotulo: 'praças e parques' },
      { icone: 'storefront', valor: '21', rotulo: 'feiras livres' },
      { icone: 'diversity_1', valor: '2', rotulo: 'CRAS' },
      { icone: 'local_library', valor: '3', rotulo: 'bibliotecas' },
    ],
  },
  { id: 'vila-prudente', nome: 'Vila Prudente', prep: 'na' },
];
