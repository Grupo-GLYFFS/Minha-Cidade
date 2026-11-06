import { Link } from 'react-router-dom';
import { Button, Stack } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';

// Página mostrada quando o endereço não existe. Sempre oferece um caminho de volta.
export default function NaoEncontrada() {
  return (
    <Stack gap="md" align="flex-start">
      <CabecalhoPagina
        titulo="Página não encontrada"
        descricao="O endereço pode ter mudado. Volte ao início para continuar."
      />
      <Button component={Link} to="/">
        Voltar ao início
      </Button>
    </Stack>
  );
}
