import { Text, Title } from '@mantine/core';

// Título grande no topo de cada página, com uma frase curta embaixo.
// Recebe o título e a descrição (opcional).
export default function CabecalhoPagina({ titulo, descricao }) {
  return (
    <header>
      <Title order={1} fz={{ base: 30, md: 32 }} lh={1.15} lts="-0.02em">
        {titulo}
      </Title>
      {descricao && (
        <Text c="dimmed" mt="sm" maw={640}>
          {descricao}
        </Text>
      )}
    </header>
  );
}
