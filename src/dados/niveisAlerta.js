// Níveis de um alerta, do mais leve ao mais grave (mostrados em degraus no detalhe).
// "cor" é uma das 5 cores de status do SeloSituacao (regra 7: alerta = âmbar, emergência = vermelho).
export const NIVEIS_ALERTA = [
  { id: 'atencao', rotulo: 'Atenção', icone: 'error', cor: 'ambar' },
  { id: 'alerta', rotulo: 'Alerta', icone: 'warning', cor: 'ambar' },
  { id: 'emergencia', rotulo: 'Emergência', icone: 'dangerous', cor: 'vermelho' },
];
