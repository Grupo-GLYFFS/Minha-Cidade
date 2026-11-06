import { Link } from 'react-router-dom';
import { Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import clicavel from './cartaoClicavel.module.css';
import classes from './CartaoArea.module.css';

// Cartão grande de uma área da Cidade Aberta (ex.: "Obras da Cidade").
// Recebe a área ({ titulo, descricao, icone, caminho }) e o número de destaque em texto
// (ex.: "11 obras em andamento"). O cartão inteiro leva para a página da área.
export default function CartaoArea({ area, destaque }) {
  return (
    <Cartao component="article" className={clicavel.clicavel}>
      <Group gap="sm" wrap="nowrap" align="center" mb="sm">
        <span className={classes.icone}>
          <Icone nome={area.icone} tamanho={28} />
        </span>
        <Title order={3} fz={{ base: 17, md: 18 }} fw={700} lh={1.3}>
          <Link to={area.caminho} className={clicavel.linkEsticado}>
            {area.titulo}
          </Link>
        </Title>
      </Group>
      <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)">
        {area.descricao}
      </Text>
      <Group gap={4} wrap="nowrap" className={classes.destaque}>
        {destaque}
        <Icone nome="arrow_forward" tamanho={20} />
      </Group>
    </Cartao>
  );
}
