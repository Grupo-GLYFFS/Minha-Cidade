// Lê o valor atual de uma variável CSS da página (ex.: "--cor-fundo").
// O valor muda no alto contraste, então é lido na hora, do <html>.
// Recebe o nome da variável; devolve o valor em texto (vazio se não existir).
export function lerVariavelCss(nome) {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(nome).trim();
}

// Descobre a cor final de um valor que pode ser uma variável (ex.: "var(--cor-erro)").
// Recebe o valor; devolve a cor lida na página ou o próprio valor, se não for variável.
export function resolverCor(valor = '') {
  const variavel = /^var\((--[\w-]+)\)$/.exec(valor.trim());
  return variavel ? lerVariavelCss(variavel[1]) : valor;
}
