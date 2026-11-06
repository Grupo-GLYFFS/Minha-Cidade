import { Box } from '@mantine/core';
import { useAcessibilidade } from '../contexto/useAcessibilidade';
import { escurecerCor } from '../logica/cores';
import classes from './Etiqueta.module.css';

// Etiqueta redonda com uma bolinha colorida e um texto (ex.: "Votação aberta").
// Recebe o texto e as cores de fundo e do texto. A cor nunca é a única informação: o texto explica.
// No alto contraste, o texto fica mais escuro e a etiqueta ganha borda (no CSS).
export default function Etiqueta({ texto, corFundo, corTexto }) {
  const { altoContraste } = useAcessibilidade();
  const cor = altoContraste ? escurecerCor(corTexto) : corTexto;

  return (
    <Box component="span" bg={corFundo} c={cor} className={classes.etiqueta}>
      {texto}
    </Box>
  );
}
