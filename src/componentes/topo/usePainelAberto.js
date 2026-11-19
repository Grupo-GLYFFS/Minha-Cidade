import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';

// Controla um painel do topo que abre e fecha (grupos do menu e menu da conta).
// Fecha ao clicar fora dele e ao apertar Esc (o foco volta para o botão que abriu).
// Guarda como o painel foi aberto: pelo mouse passando em cima ("passagem") ou por clique/teclado
// ("clique"). Aberto pela passagem, ele fecha quando o mouse sai; aberto por clique, fica aberto.
// Devolve { aberto, abrirPassagem, fecharPassagem, fechar, alternar, refContorno, aoTeclar }:
// - abrirPassagem/fecharPassagem: no onMouseEnter/onMouseLeave (grupos do menu);
// - alternar: no clique do botão. Fechado ou aberto só pela passagem, abre e fica;
//   aberto por clique, fecha;
// refContorno vai no elemento que envolve o botão e o painel; aoTeclar vai no onKeyDown dele.
export function usePainelAberto() {
  // null = fechado; 'passagem' ou 'clique' = aberto, e de que jeito
  const [modo, setModo] = useState(null);
  const refContorno = useClickOutside(() => setModo(null));
  const aberto = modo !== null;

  // Esc fecha o painel e devolve o foco ao botão que abre (o que tem aria-expanded)
  function aoTeclar(evento) {
    if (evento.key !== 'Escape' || !aberto) return;
    setModo(null);
    evento.currentTarget.querySelector('[aria-expanded]')?.focus();
  }

  return {
    aberto,
    abrirPassagem: () => setModo((atual) => atual ?? 'passagem'),
    fecharPassagem: () => setModo((atual) => (atual === 'passagem' ? null : atual)),
    fechar: () => setModo(null),
    alternar: () => setModo((atual) => (atual === 'clique' ? null : 'clique')),
    refContorno,
    aoTeclar,
  };
}
