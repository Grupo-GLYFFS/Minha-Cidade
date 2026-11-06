// Opções de voto nos grandes projetos, na ordem em que aparecem.
// "cor" pinta a barra do resultado; o número e o texto ao lado dizem o mesmo, sem depender da cor.
export const OPCOES_VOTO = [
  { valor: 'sim', rotulo: 'Sim', icone: 'thumb_up', cor: 'var(--mantine-color-azul-6)' },
  { valor: 'nao', rotulo: 'Não', icone: 'thumb_down', cor: 'var(--cor-roxo-texto)' },
  {
    valor: 'abstencao',
    rotulo: 'Abstenção',
    icone: 'radio_button_unchecked',
    cor: 'var(--cor-texto-suave)',
  },
];
