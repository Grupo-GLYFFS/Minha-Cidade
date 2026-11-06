import { Box } from '@mantine/core';

// Mostra um texto curto no celular e um texto longo no computador.
// Recebe os dois textos; sem o texto curto, mostra o longo nas duas telas.
// O texto escondido some também para o leitor de tela (display: none).
export default function TextoResponsivo({ longo, curto }) {
  if (!curto || curto === longo) return longo;

  return (
    <>
      <Box component="span" hiddenFrom="md">
        {curto}
      </Box>
      <Box component="span" visibleFrom="md">
        {longo}
      </Box>
    </>
  );
}
