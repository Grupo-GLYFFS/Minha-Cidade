// Compartilha o link de uma página do app: abre a folha de compartilhar do celular quando existe;
// no computador, copia o link. Recebe { titulo, caminho } (caminho = rota, ex.: "/minha-cidade/avisos/x").
// Devolve uma promessa com "compartilhado", "copiado", "cancelado" ou "erro".
export async function compartilharLink({ titulo, caminho }) {
  // Endereço da página sem a rota atual + a rota depois do # (ex.: .../index.html#/pedidos/12)
  const url = `${window.location.href.split('#')[0]}#${caminho}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, url });
      return 'compartilhado';
    } catch (erro) {
      // A pessoa fechou a folha sem escolher: não é erro
      if (erro?.name === 'AbortError') return 'cancelado';
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return 'copiado';
  } catch {
    return 'erro';
  }
}
