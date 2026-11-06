import { Box } from '@mantine/core';
import classes from './Etiqueta.module.css';

// Etiqueta redonda com uma bolinha colorida e um texto (ex.: "Votação aberta").
// Recebe o texto e as cores de fundo e do texto. A cor nunca é a única informação: o texto explica.
export default function Etiqueta({ texto, corFundo, corTexto }) {
  return (
    <Box component="span" bg={corFundo} c={corTexto} className={classes.etiqueta}>
      {texto}
    </Box>
  );
}
