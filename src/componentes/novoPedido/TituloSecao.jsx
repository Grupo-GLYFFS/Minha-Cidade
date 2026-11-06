import { Group, Text, Title } from '@mantine/core';
import classes from './TituloSecao.module.css';

// Título de cada parte do formulário, com o número da etapa num círculo.
// Recebe o id (usado no aria-labelledby da seção), o número e o título.
export default function TituloSecao({ id, numero, titulo }) {
  return (
    <Group gap="sm" wrap="nowrap">
      <Text component="span" className={classes.numero} aria-hidden="true">
        {numero}
      </Text>
      <Title order={2} id={id} fz={18} fw={700}>
        {titulo}
      </Title>
    </Group>
  );
}
