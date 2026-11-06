import { createTheme } from '@mantine/core';

// Tons do azul da logo, do mais claro (0) ao mais escuro (9).
// O tom 6 (#0052EF) é a cor principal do app.
const AZUL = [
  '#EDF2FF',
  '#D9E4FF',
  '#B3C9FF',
  '#8AACFF',
  '#5C8BFF',
  '#2E6BFA',
  '#0052EF',
  '#0047D1',
  '#003BAD',
  '#002F8A',
];

// Tema do Mantine com o design system do Minha Prefeitura (estilo "App moderno").
// Espaçamentos seguem a escala de 4 em 4 px; o padding padrão é 16 px ("md").
export const tema = createTheme({
  primaryColor: 'azul',
  primaryShade: 6,
  colors: { azul: AZUL },

  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  headings: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontWeight: '800',
  },

  // Botões e campos usam 12 px; cards usam 20 px ("xl")
  defaultRadius: 'md',
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // Foco bem visível para quem navega pelo teclado
  focusRing: 'auto',

  other: {
    corFundo: '#F4F6FA',
    corBorda: '#E4E8EF',
    paddingPadrao: 16,
  },
});
