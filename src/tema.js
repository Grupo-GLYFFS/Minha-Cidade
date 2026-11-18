import { createTheme } from '@mantine/core';

// Tons do azul da logo, do mais claro (0) ao mais escuro (9).
// O tom 6 (#0052EF) é o azul único do site; o 7 (#0047D1) é o do hover e dos links.
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

// Medidas da base de design (as mesmas variáveis existem em estilos/global.css).
// Ficam aqui para quem precisa delas em JavaScript (ex.: largura de um Modal).
export const MEDIDAS = {
  larguraConteudo: 880,
  larguraTopo: 1088,
  alturaBotao: 48,
  alturaBotaoCompacto: 44,
  alturaBotaoTopo: 32,
  alturaCampo: 44,
  raioCard: 20,
  raioControle: 12,
  raioIcone: 16,
  raioTopo: 8,
};

// Tema do Mantine com o design system do Minha Prefeitura.
// Espaçamentos seguem a escala de 4 em 4 px; o padding padrão é 16 px ("md").
export const tema = createTheme({
  primaryColor: 'azul',
  primaryShade: 6,
  colors: { azul: AZUL },

  black: '#0F172A',
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  headings: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontWeight: '800',
  },

  // Botões, campos e miniaturas usam 12 px; cards e popups usam 20 px ("xl")
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

  components: {
    // Popups com cantos de 20 px (o componente Popup já usa isso)
    Modal: { defaultProps: { radius: 'xl' } },
  },

  other: {
    corFundo: '#FFFFFF',
    corBorda: '#D0D5DD',
    paddingPadrao: 16,
    ...MEDIDAS,
  },
});
