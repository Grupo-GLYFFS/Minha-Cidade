// Etapas por onde um pedido passa, na ordem. O rótulo fica no masculino (o pedido: Enviado, Aprovado…).
// "aberto" diz se o pedido ainda está em andamento (aparece em "Meus pedidos em andamento").
// "cor" é uma das 5 cores de status do SeloSituacao (regra 7).
// corFundo e corTexto são da etiqueta antiga: fundo claro e texto escuro, com contraste de pelo menos 4,5:1.
export const STATUS_PEDIDO = [
  {
    id: 'enviada',
    cor: 'cinza',
    rotulo: 'Enviado',
    corFundo: '#EEF0F4',
    corTexto: '#3B4351',
    aberto: true,
  },
  {
    id: 'em-analise',
    cor: 'ambar',
    rotulo: 'Em análise',
    corFundo: '#FFF1CC',
    corTexto: '#6E4A00',
    aberto: true,
  },
  {
    id: 'aprovada',
    cor: 'azul',
    rotulo: 'Aprovado',
    corFundo: '#E3ECFF',
    corTexto: '#0040C2',
    aberto: true,
  },
  {
    id: 'em-execucao',
    cor: 'azul',
    rotulo: 'Em execução',
    corFundo: '#EFE6FF',
    corTexto: '#5527B0',
    aberto: true,
  },
  {
    id: 'concluida',
    cor: 'verde',
    rotulo: 'Concluído',
    corFundo: '#DDF5E6',
    corTexto: '#126336',
    aberto: false,
  },
  {
    id: 'avaliada',
    cor: 'verde',
    rotulo: 'Avaliado',
    corFundo: '#DDF5E6',
    corTexto: '#126336',
    aberto: false,
  },
  {
    id: 'recusada',
    cor: 'vermelho',
    rotulo: 'Recusado',
    corFundo: '#FDE4E4',
    corTexto: '#A11A1A',
    aberto: false,
  },
  // Cancelado por quem abriu (só dá para cancelar enquanto está Enviado ou Em análise)
  {
    id: 'cancelada',
    cor: 'vermelho',
    rotulo: 'Cancelado',
    corFundo: '#FDE4E4',
    corTexto: '#A11A1A',
    aberto: false,
  },
];
