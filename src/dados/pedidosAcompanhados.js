// Pedidos de outras pessoas que a Maria (conta de demonstração) já acompanha.
// - apoia: ela apoiou o pedido (o apoio dela já está somado em "apoios" de dados/pedidos.js)
// - segue: ela recebe as atualizações do pedido nas notificações
// Valem até ela mudar alguma coisa; depois, o que ela escolheu fica salvo no navegador.
export const PEDIDOS_ACOMPANHADOS = [
  { idPessoa: 'u-001', idPedido: 'p-005', apoia: true, segue: true },
  { idPessoa: 'u-001', idPedido: 'p-011', apoia: true, segue: false },
  { idPessoa: 'u-001', idPedido: 'p-034', apoia: false, segue: true },
  { idPessoa: 'u-001', idPedido: 'p-006', apoia: true, segue: true },
];
