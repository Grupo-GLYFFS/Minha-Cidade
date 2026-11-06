// Caminhos usados para entrar na conta e voltar depois para onde a pessoa estava.

// Páginas de entrar e criar conta (nelas o "voltar" atual é mantido, e não trocado por elas mesmas)
export const PAGINAS_DE_CONTA = ['/entrar', '/criar-conta'];

// Confere o destino recebido no endereço (?voltar=...) antes de usar.
// Recebe o texto do parâmetro; devolve o caminho se for uma página do próprio app,
// ou "/" se estiver vazio ou apontar para outro site (ex.: "//site.com").
export function destinoSeguro(voltar) {
  if (!voltar || !voltar.startsWith('/') || voltar.startsWith('//')) return '/';
  // Não faz sentido voltar para a própria tela de entrar ou criar conta
  if (PAGINAS_DE_CONTA.some((pagina) => voltar.startsWith(pagina))) return '/';
  return voltar;
}

// Monta o caminho de uma página de conta guardando para onde voltar.
// Recebe a página ("/entrar" ou "/criar-conta") e o destino; devolve, por exemplo,
// "/entrar?voltar=%2Fpedidos%2Fnovo". Sem destino (ou destino "/"), devolve só a página.
export function caminhoComVoltar(pagina, voltar) {
  const destino = destinoSeguro(voltar);
  if (destino === '/') return pagina;
  return `${pagina}?voltar=${encodeURIComponent(destino)}`;
}
