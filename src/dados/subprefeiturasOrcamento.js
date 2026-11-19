// Orçamento de 2026 das 32 subprefeituras (dados de exemplo; os valores são inventados).
// Os nomes e os bairros de cada uma vêm de dados/subprefeituras.js e dados/bairrosCidade.js
// (mesmos ids); aqui ficam só os números.
// - custeio: dinheiro do dia a dia (zeladoria, manutenção, equipes), previsto para 2026, em reais
// - custeioPago (opcional): quanto do custeio já foi pago até outubro (sem ele, a conta usa 79%)
// O valor "em obras" vem das obras em andamento de dados/obras.js.
export const ORCAMENTO_SUBPREFEITURAS = [
  { id: 'se', custeio: 168000000 },
  { id: 'itaquera', custeio: 121000000 },
  { id: 'pinheiros', custeio: 118000000 },
  { id: 'sao-mateus', custeio: 115000000 },
  { id: 'butanta', custeio: 113000000 },
  { id: 'vila-mariana', custeio: 112000000, custeioPago: 88500000 },
  { id: 'ipiranga', custeio: 110000000 },
  { id: 'penha', custeio: 109000000 },
  { id: 'lapa', custeio: 106000000 },
  { id: 'mooca', custeio: 104000000 },
  { id: 'santo-amaro', custeio: 101000000 },
  { id: 'santana-tucuruvi', custeio: 96000000 },
  { id: 'casa-verde-cachoeirinha', custeio: 92000000 },
  { id: 'vila-maria-vila-guilherme', custeio: 88000000 },
  { id: 'campo-limpo', custeio: 86000000 },
  { id: 'capela-do-socorro', custeio: 84000000 },
  { id: 'm-boi-mirim', custeio: 81000000 },
  { id: 'aricanduva-formosa-carrao', custeio: 78000000 },
  { id: 'freguesia-brasilandia', custeio: 76000000 },
  { id: 'pirituba-jaragua', custeio: 74000000 },
  { id: 'vila-prudente', custeio: 71000000 },
  { id: 'sao-miguel-paulista', custeio: 69000000 },
  { id: 'jabaquara', custeio: 66000000 },
  { id: 'cidade-ademar', custeio: 64000000 },
  { id: 'itaim-paulista', custeio: 62000000 },
  { id: 'sapopemba', custeio: 59000000 },
  { id: 'jacana-tremembe', custeio: 57000000 },
  { id: 'guaianases', custeio: 54000000 },
  { id: 'ermelino-matarazzo', custeio: 52000000 },
  { id: 'cidade-tiradentes', custeio: 49000000 },
  { id: 'perus-anhanguera', custeio: 46000000 },
  { id: 'parelheiros', custeio: 43000000 },
];
