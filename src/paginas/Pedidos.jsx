import { Stack } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import BotaoAbrirPedido from '../componentes/pedidos/BotaoAbrirPedido';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';
import classes from './Pedidos.module.css';

// Pedidos: lista de melhorias pedidas pela população, com filtros, ordem e apoio.
export default function Pedidos() {
  return (
    <Stack gap="lg">
      <div className={classes.topo}>
        <CabecalhoAntigo
          titulo="Pedidos"
          descricao="Veja o que os moradores pediram, apoie os pedidos e abra o seu."
        />
        <BotaoAbrirPedido />
      </div>
      <ListaPedidos />
    </Stack>
  );
}
