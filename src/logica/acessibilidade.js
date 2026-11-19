import { TAMANHOS_LETRA } from '../dados/tamanhosLetra';

// Preferências de quem nunca mexeu na acessibilidade.
// reduzirAnimacoes null = segue o que o sistema do aparelho pede (prefers-reduced-motion).
// mostrarFaixasAlerta: a faixa amarela da Defesa Civil no alto das páginas; vem desligada.
export const PREFERENCIAS_PADRAO = {
  tamanhoLetra: 'padrao',
  altoContraste: false,
  reduzirAnimacoes: null,
  mostrarFaixasAlerta: false,
};

// Confere as preferências lidas do navegador antes de usar.
// Recebe o que estava salvo (pode estar vazio ou estragado); devolve preferências válidas.
export function normalizarPreferencias(salvo) {
  if (!salvo || typeof salvo !== 'object') return PREFERENCIAS_PADRAO;
  const tamanhoValido = TAMANHOS_LETRA.some((tamanho) => tamanho.id === salvo.tamanhoLetra);
  return {
    tamanhoLetra: tamanhoValido ? salvo.tamanhoLetra : PREFERENCIAS_PADRAO.tamanhoLetra,
    altoContraste: salvo.altoContraste === true,
    reduzirAnimacoes: typeof salvo.reduzirAnimacoes === 'boolean' ? salvo.reduzirAnimacoes : null,
    mostrarFaixasAlerta: salvo.mostrarFaixasAlerta === true,
  };
}

// Anda na lista de tamanhos de letra.
// Recebe o id atual e o passo (-1 diminui, +1 aumenta); devolve o novo id,
// parando no menor e no maior tamanho.
export function mudarTamanho(atual, passo) {
  const posicao = TAMANHOS_LETRA.findIndex((tamanho) => tamanho.id === atual);
  const nova = Math.min(Math.max(posicao + passo, 0), TAMANHOS_LETRA.length - 1);
  return TAMANHOS_LETRA[nova].id;
}

// Diz se o tamanho é o menor ou o maior da lista.
// Recebe o id; devolve { menor, maior } com true ou false.
export function limitesTamanho(id) {
  return {
    menor: id === TAMANHOS_LETRA[0].id,
    maior: id === TAMANHOS_LETRA[TAMANHOS_LETRA.length - 1].id,
  };
}

// Devolve o nome do tamanho para mostrar ou anunciar (ex.: "muito grande"). Recebe o id.
export function rotuloTamanho(id) {
  return TAMANHOS_LETRA.find((tamanho) => tamanho.id === id)?.rotulo ?? '';
}
