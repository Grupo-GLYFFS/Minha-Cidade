import { Link } from 'react-router-dom';
import { Anchor, Group, Title } from '@mantine/core';
import TextoResponsivo from './TextoResponsivo';
import classes from './SecaoCabecalho.module.css';

// Título de uma seção com o link "Ver todos" à direita.
// Recebe o id do título (para o aria-labelledby da seção), o título, o caminho e o texto do link.
// "tituloCurto" e "rotuloLinkCurto" (opcionais) trocam o texto no celular, onde falta espaço.
export default function SecaoCabecalho({
  id,
  titulo,
  tituloCurto,
  caminho,
  rotuloLink,
  rotuloLinkCurto,
}) {
  return (
    <Group justify="space-between" align="baseline" gap="sm" wrap="nowrap" mb="sm">
      <Title order={2} id={id} fz={{ base: 18, md: 20 }} fw={700} lts="-0.01em">
        <TextoResponsivo longo={titulo} curto={tituloCurto} />
      </Title>
      {caminho && (
        <Anchor
          component={Link}
          to={caminho}
          fz={14}
          fw={600}
          c="var(--cor-link)"
          className={classes.link}
        >
          <TextoResponsivo longo={rotuloLink} curto={rotuloLinkCurto} />
        </Anchor>
      )}
    </Group>
  );
}
