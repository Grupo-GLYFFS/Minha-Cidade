// Situações de uma obra (semáforo). A etiqueta sempre mostra ícone e texto, nunca só a cor.
// As cores são variáveis do global.css, que mudam sozinhas no alto contraste:
// "corFundo" e "corTexto" pintam a etiqueta; "corBarra" pinta a barra de % executado.
// "cor" é uma das 5 cores de status da regra 7 (SeloSituacao e TituloGrupo).
export const SITUACOES_OBRA = [
  {
    id: 'no-prazo',
    cor: 'verde',
    rotulo: 'No prazo',
    rotuloPlural: 'No prazo',
    icone: 'check_circle',
    corFundo: 'var(--cor-sucesso-fundo)',
    corTexto: 'var(--cor-sucesso-texto)',
    corBarra: 'var(--cor-sucesso-texto)',
  },
  {
    id: 'atrasada',
    cor: 'ambar',
    rotulo: 'Atrasada',
    rotuloPlural: 'Atrasadas',
    icone: 'schedule',
    corFundo: 'var(--cor-aviso-fundo)',
    corTexto: 'var(--cor-aviso-texto)',
    corBarra: 'var(--cor-aviso-texto)',
  },
  {
    id: 'parada',
    cor: 'vermelho',
    rotulo: 'Parada',
    rotuloPlural: 'Paradas',
    icone: 'pause_circle',
    corFundo: 'var(--cor-erro-fundo)',
    corTexto: 'var(--cor-erro)',
    corBarra: 'var(--cor-erro)',
  },
  {
    id: 'concluida',
    cor: 'verde',
    rotulo: 'Concluída',
    rotuloPlural: 'Concluídas',
    icone: 'task_alt',
    corFundo: 'var(--cor-azul-suave)',
    corTexto: 'var(--cor-link)',
    corBarra: 'var(--cor-sucesso-texto)',
  },
];
