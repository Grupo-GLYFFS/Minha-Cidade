import { Stack } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import BotaoAbrirPedido from '../componentes/pedidos/BotaoAbrirPedido';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';
import classes from './Pedidos.module.css';

// Pedidos: lista de melhorias pedidas pela população, com filtros, ordem e apoio.
export default function Pedidos() {
  return (
    <Stack gap="lg">
      <div className={classes.topo}>
        <CabecalhoPagina
          titulo="Pedidos"
          descricao="Veja o que os moradores pediram, apoie os pedidos e abra o seu."
        />
        <BotaoAbrirPedido />
      </div>
      <ListaPedidos />
    </Stack>
  );
}
