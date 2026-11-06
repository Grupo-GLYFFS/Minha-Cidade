// Serviços que aparecem como atalho na página inicial ("Serviços mais usados").
// "caminho" só existe quando o serviço abre uma tela própria do app.
// TODO: trocar pelo catálogo completo quando a tela de Serviços for feita
export const SERVICOS_MAIS_USADOS = [
  { id: 'agendar-consulta', nome: 'Agendar consulta', icone: 'stethoscope' },
  { id: 'segunda-via-iptu', nome: '2ª via do IPTU', icone: 'receipt_long' },
  { id: 'abrir-pedido', nome: 'Abrir pedido', icone: 'campaign', caminho: '/pedidos/novo' },
  { id: 'coleta-de-lixo', nome: 'Coleta de lixo', icone: 'delete' },
  { id: 'matricula-escolar', nome: 'Matrícula escolar', icone: 'school' },
  { id: 'cartao-sus', nome: 'Cartão SUS', icone: 'id_card' },
];
