import { Stack, Text, Title } from '@mantine/core';

// Parte de uma seção da página de componentes: título h3 (com âncora, se tiver id),
// frase curta opcional e os exemplos empilhados.
// Recebe id (opcional), titulo, descricao (opcional) e children.
export default function Subsecao({ id, titulo, descricao, children }) {
  return (
    <Stack gap="md">
      <div>
        <Title order={3} id={id} fz={{ base: 18, md: 20 }} fw={700}>
          {titulo}
        </Title>
        {descricao && (
          <Text fz={14} c="var(--cor-texto-suave)" mt={4} maw={720}>
            {descricao}
          </Text>
        )}
      </div>
      {children}
    </Stack>
  );
}
