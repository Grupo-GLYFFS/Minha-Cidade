// Monta o endereço da página de busca com o texto digitado.
// Recebe o texto; devolve "/busca" (texto vazio) ou "/busca?q=..." com o texto codificado.
export function montarCaminhoBusca(texto) {
  const limpo = texto.trim();
  return limpo ? `/busca?q=${encodeURIComponent(limpo)}` : '/busca';
}
