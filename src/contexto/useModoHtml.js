import { useSyncExternalStore } from 'react';

// Avisa o React sempre que o alto contraste ou o tamanho da letra mudam no <html>.
function assinar(avisar) {
  const observador = new MutationObserver(avisar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-contraste', 'data-letra'],
  });
  return () => observador.disconnect();
}

// Lê o modo atual do <html>, por exemplo "alto|grande"
function lerModo() {
  const { contraste, letra } = document.documentElement.dataset;
  return `${contraste}|${letra}`;
}

// Devolve o modo de exibição aplicado no <html> agora (contraste e letra).
// A tela que usa este hook desenha de novo depois que o modo muda,
// então os valores lidos das variáveis CSS já vêm atualizados.
export function useModoHtml() {
  return useSyncExternalStore(assinar, lerModo);
}
