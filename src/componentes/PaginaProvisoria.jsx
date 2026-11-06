import { Stack } from '@mantine/core';
import CabecalhoPagina from './CabecalhoPagina';
import classes from './PaginaProvisoria.module.css';

// Página temporária usada enquanto a tela de verdade não é construída.
// Mostra o título, a descrição e um espaço tracejado no lugar do conteúdo.
// TODO: remover quando todas as telas estiverem prontas
export default function PaginaProvisoria({ titulo, descricao }) {
  return (
    <Stack gap="md">
      <CabecalhoPagina titulo={titulo} descricao={descricao} />
      <div className={classes.vazio}>Conteúdo da tela</div>
    </Stack>
  );
}
