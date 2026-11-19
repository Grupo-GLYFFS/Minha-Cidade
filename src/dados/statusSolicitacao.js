// Situações de uma solicitação de serviço (formulários online do catálogo), na ordem.
// "cor" é uma das 5 cores do SeloSituacao (regra 7); a cor nunca vem sozinha, o selo mostra o rótulo.
// "grupo" diz em que grupo de Minhas solicitações ela aparece.
// corFundo e corTexto são da etiqueta antiga (Perfil), com contraste de pelo menos 4,5:1.
export const STATUS_SOLICITACAO = [
  {
    id: 'solicitada',
    rotulo: 'Solicitada',
    cor: 'cinza',
    grupo: 'solicitadas',
    corFundo: '#F2F4F7',
    corTexto: '#344054',
  },
  {
    id: 'em-analise',
    rotulo: 'Em análise',
    cor: 'ambar',
    grupo: 'solicitadas',
    corFundo: '#FFF4E5',
    corTexto: '#93370D',
  },
  {
    id: 'agendada',
    rotulo: 'Agendada',
    cor: 'azul',
    grupo: 'agendadas',
    corFundo: '#EDF2FF',
    corTexto: '#002F8A',
  },
  {
    id: 'concluida',
    rotulo: 'Concluída',
    cor: 'verde',
    grupo: 'concluidas',
    corFundo: '#ECFDF3',
    corTexto: '#067647',
  },
  {
    id: 'cancelada',
    rotulo: 'Cancelada',
    cor: 'vermelho',
    grupo: 'canceladas',
    corFundo: '#FEF3F2',
    corTexto: '#B42318',
  },
];
