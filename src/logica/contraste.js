// Conta de contraste entre duas cores, como manda a WCAG 2 (acessibilidade na web).

// Lê uma cor escrita em CSS.
// Recebe "#abc", "#aabbcc" ou "rgb(1, 2, 3)"; devolve [vermelho, verde, azul] (0 a 255) ou null.
export function lerCor(cor = '') {
  const texto = cor.trim().toLowerCase();
  const curto = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(texto);
  if (curto) return curto.slice(1).map((canal) => parseInt(canal + canal, 16));
  const longo = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(texto);
  if (longo) return longo.slice(1).map((canal) => parseInt(canal, 16));
  const rgb = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(texto);
  if (rgb) return rgb.slice(1).map(Number);
  return null;
}

// Passa um canal de cor (0 a 255) para a escala de luz que o olho percebe (0 a 1)
function canalLinear(valor) {
  const parte = valor / 255;
  return parte <= 0.04045 ? parte / 12.92 : ((parte + 0.055) / 1.055) ** 2.4;
}

// Calcula a luminância relativa de uma cor (0 = preto, 1 = branco).
// Recebe a cor em texto CSS; devolve o número ou null se a cor não for entendida.
export function luminancia(cor) {
  const canais = lerCor(cor);
  if (!canais) return null;
  const [r, g, b] = canais.map(canalLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calcula a razão de contraste entre duas cores (de 1 a 21).
// Recebe as duas cores em texto CSS; devolve o número com duas casas ou null.
export function razaoContraste(cor1, cor2) {
  const l1 = luminancia(cor1);
  const l2 = luminancia(cor2);
  if (l1 === null || l2 === null) return null;
  const [clara, escura] = l1 > l2 ? [l1, l2] : [l2, l1];
  return Math.round(((clara + 0.05) / (escura + 0.05)) * 100) / 100;
}

// Diz qual nível da WCAG a razão atinge para texto.
// Recebe a razão; devolve "AAA" (7 ou mais), "AA" (4,5 ou mais),
// "AA texto grande" (3 ou mais) ou "Não passa".
export function nivelContraste(razao) {
  if (razao === null) return '';
  if (razao >= 7) return 'AAA';
  if (razao >= 4.5) return 'AA';
  if (razao >= 3) return 'AA texto grande';
  return 'Não passa';
}

// Escreve a razão no jeito brasileiro. Recebe 7.12; devolve "7,12:1".
export function formatarRazao(razao) {
  if (razao === null) return 'não calculado';
  return `${razao.toFixed(2).replace('.', ',')}:1`;
}
