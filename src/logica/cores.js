// Escurece uma cor misturando com preto, usado no alto contraste
// (etiquetas e prioridade têm a cor no próprio dado).
// Recebe a cor em hexadecimal ("#126336") e quanto escurecer (0 a 1);
// devolve a nova cor em hexadecimal. Se a cor não for "#rrggbb", devolve como veio.
export function escurecerCor(cor, quanto = 0.3) {
  if (!/^#[0-9a-f]{6}$/i.test(cor)) return cor;
  // Separa vermelho, verde e azul e tira a mesma parte de cada um
  const canais = [1, 3, 5].map((inicio) => parseInt(cor.slice(inicio, inicio + 2), 16));
  const escuros = canais.map((valor) => Math.round(valor * (1 - quanto)));
  return `#${escuros.map((valor) => valor.toString(16).padStart(2, '0')).join('')}`;
}
