import { Link } from 'react-router-dom';
import { Anchor, Group } from '@mantine/core';
import Icone from './Icone';

// Link "voltar" com seta, no topo das páginas internas.
// Recebe o caminho e o texto (ex.: "Todos os serviços").
export default function LinkVoltar({ caminho, rotulo }) {
  return (
    <Anchor
      component={Link}
      to={caminho}
      fw={600}
      fz={14}
      c="var(--cor-link)"
      display="inline-flex"
      mih={44}
    >
      <Group gap={4} wrap="nowrap">
        <Icone nome="arrow_back" tamanho={20} />
        {rotulo}
      </Group>
    </Anchor>
  );
}
