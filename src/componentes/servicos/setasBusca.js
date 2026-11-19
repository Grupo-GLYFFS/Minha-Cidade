// Setas na busca: do campo, a seta para baixo vai ao primeiro resultado; nas linhas, as setas
// andam pela lista e a seta para cima no primeiro item volta ao campo. Enter abre o link focado.
// Recebe o evento de teclado, o elemento que tem os resultados e o campo (input).
export function moverComSetas(evento, lista, campo) {
  if (evento.key !== 'ArrowDown' && evento.key !== 'ArrowUp') return;
  if (!lista) return;
  const itens = [...lista.querySelectorAll('[data-item-busca]')];
  if (itens.length === 0) return;
  const atual = itens.indexOf(document.activeElement);
  evento.preventDefault();
  if (evento.key === 'ArrowDown') {
    itens[Math.min(atual + 1, itens.length - 1)].focus();
  } else if (atual <= 0) {
    campo?.focus();
  } else {
    itens[atual - 1].focus();
  }
}
