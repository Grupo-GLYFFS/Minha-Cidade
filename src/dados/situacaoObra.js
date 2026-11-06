// Situações de uma obra (semáforo). A etiqueta sempre mostra ícone e texto, nunca só a cor.
// As cores são variáveis do global.css, que mudam sozinhas no alto contraste:
// "corFundo" e "corTexto" pintam a etiqueta; "corBarra" pinta a barra de % executado.
export const SITUACOES_OBRA = [
  {
    id: 'no-prazo',
    rotulo: 'No prazo',
    rotuloPlural: 'No prazo',
    icone: 'check_circle',
    corFundo: 'var(--cor-sucesso-fundo)',
    corTexto: 'var(--cor-sucesso-texto)',
    corBarra: 'var(--cor-sucesso-texto)',
  },
  {
    id: 'atrasada',
    rotulo: 'Atrasada',
    rotuloPlural: 'Atrasadas',
    icone: 'schedule',
    corFundo: 'var(--cor-aviso-fundo)',
    corTexto: 'var(--cor-aviso-texto)',
    corBarra: 'var(--cor-aviso-texto)',
  },
  {
    id: 'parada',
    rotulo: 'Parada',
    rotuloPlural: 'Paradas',
    icone: 'pause_circle',
    corFundo: 'var(--cor-erro-fundo)',
    corTexto: 'var(--cor-erro)',
    corBarra: 'var(--cor-erro)',
  },
  {
    id: 'concluida',
    rotulo: 'Concluída',
    rotuloPlural: 'Concluídas',
    icone: 'task_alt',
    corFundo: 'var(--cor-azul-suave)',
    corTexto: 'var(--cor-link)',
    corBarra: 'var(--cor-link)',
  },
];
