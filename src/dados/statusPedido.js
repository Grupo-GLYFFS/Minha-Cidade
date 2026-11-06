// Etapas por onde um pedido passa, na ordem.
// "aberto" diz se o pedido ainda está em andamento (aparece em "Meus pedidos em andamento").
// As cores são da etiqueta: fundo claro e texto escuro, com contraste de pelo menos 4,5:1.
export const STATUS_PEDIDO = [
  { id: 'enviada', rotulo: 'Enviada', corFundo: '#EEF0F4', corTexto: '#3B4351', aberto: true },
  {
    id: 'em-analise',
    rotulo: 'Em análise',
    corFundo: '#FFF1CC',
    corTexto: '#6E4A00',
    aberto: true,
  },
  { id: 'aprovada', rotulo: 'Aprovada', corFundo: '#E3ECFF', corTexto: '#0040C2', aberto: true },
  {
    id: 'em-execucao',
    rotulo: 'Em execução',
    corFundo: '#EFE6FF',
    corTexto: '#5527B0',
    aberto: true,
  },
  { id: 'concluida', rotulo: 'Concluída', corFundo: '#DDF5E6', corTexto: '#126336', aberto: false },
  { id: 'avaliada', rotulo: 'Avaliada', corFundo: '#DDF5E6', corTexto: '#126336', aberto: false },
  { id: 'recusada', rotulo: 'Recusada', corFundo: '#FDE4E4', corTexto: '#A11A1A', aberto: false },
];
