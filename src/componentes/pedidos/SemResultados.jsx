import { Link } from 'react-router-dom';
import { Button, Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './SemResultados.module.css';

// Aviso quando nenhum pedido combina com os filtros. Sempre dá um próximo passo:
// limpar os filtros ou abrir um pedido novo. Recebe a função aoLimpar().
export default function SemResultados({ aoLimpar }) {
  return (
    <Cartao className={classes.vazio}>
      <span className={classes.icone}>
        <Icone nome="search_off" tamanho={28} />
      </span>
      <Title order={3} fz={18} fw={700} mt="md">
        Nenhum pedido com esses filtros.
      </Title>
      <Text c="var(--cor-texto-suave)" mt={4} maw={420}>
        Tente outra palavra ou tire algum filtro. Se ninguém relatou o problema ainda, você pode
        abrir um pedido.
      </Text>
      <Group justify="center" gap="sm" mt="lg">
        <Button onClick={aoLimpar}>Limpar filtros</Button>
        <Button component={Link} to="/pedidos/novo" variant="default">
          Abrir pedido
        </Button>
      </Group>
    </Cartao>
  );
}
