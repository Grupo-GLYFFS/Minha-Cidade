import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';

// Controla um painel do topo que abre e fecha (grupos do menu e menu da conta).
// Fecha ao clicar fora dele e ao apertar Esc (o foco volta para o botão que abriu).
// Devolve { aberto, abrir, fechar, alternar, refContorno, aoTeclar }:
// refContorno vai no elemento que envolve o botão e o painel; aoTeclar vai no onKeyDown dele.
export function usePainelAberto() {
  const [aberto, setAberto] = useState(false);
  const refContorno = useClickOutside(() => setAberto(false));

  // Esc fecha o painel e devolve o foco ao botão que abre (o que tem aria-expanded)
  function aoTeclar(evento) {
    if (evento.key !== 'Escape' || !aberto) return;
    setAberto(false);
    evento.currentTarget.querySelector('[aria-expanded]')?.focus();
  }

  return {
    aberto,
    abrir: () => setAberto(true),
    fechar: () => setAberto(false),
    alternar: () => setAberto((atual) => !atual),
    refContorno,
    aoTeclar,
  };
}
