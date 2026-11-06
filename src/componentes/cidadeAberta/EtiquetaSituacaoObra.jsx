import { Box } from '@mantine/core';
import Icone from '../Icone';
import { buscarSituacaoObra } from '../../logica/obras';
import classes from './EtiquetaSituacaoObra.module.css';

// Etiqueta com a situação de uma obra (ex.: "Atrasada"), com ícone, texto e a cor do semáforo.
// Recebe o id da situação. A cor nunca é a única informação: o ícone e o texto dizem o mesmo.
export default function EtiquetaSituacaoObra({ situacao }) {
  const dados = buscarSituacaoObra(situacao);
  if (!dados) return null;

  return (
    <Box component="span" bg={dados.corFundo} c={dados.corTexto} className={classes.etiqueta}>
      <Icone nome={dados.icone} tamanho={18} preenchido />
      {dados.rotulo}
    </Box>
  );
}
