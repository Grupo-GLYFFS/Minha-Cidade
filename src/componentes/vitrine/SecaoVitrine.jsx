import { Stack, Text, Title } from '@mantine/core';
import classes from './SecaoVitrine.module.css';

// Uma seção da página de componentes: título h2 com âncora (ex.: #cores), frase curta e conteúdo.
// Recebe o id (âncora), o título, a descrição (opcional) e children.
export default function SecaoVitrine({ id, titulo, descricao, children }) {
  return (
    <section aria-labelledby={id} className={classes.secao}>
      <Title order={2} id={id} fz={{ base: 22, md: 26 }} fw={800} lts="-0.02em">
        {titulo}
      </Title>
      {descricao && (
        <Text c="var(--cor-texto-suave)" mt={4} maw={720}>
          {descricao}
        </Text>
      )}
      <Stack gap="xl" mt="lg">
        {children}
      </Stack>
    </section>
  );
}
