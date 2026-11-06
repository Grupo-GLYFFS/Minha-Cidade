import { Group, Text } from '@mantine/core';
import Icone from '../Icone';
import BotaoApoiar from './BotaoApoiar';
import IndicadorPrioridade from './IndicadorPrioridade';
import NumeroApoios from './NumeroApoios';
import { textoUltimaMudanca } from '../../logica/pedidos';
import classes from './RodapeCartaoPedido.module.css';

// Parte de baixo do cartão da lista: apoios, prioridade, última mudança e o botão "Apoiar".
// Recebe o pedido e o layout do cartão ("grade" ou "lista").
export default function RodapeCartaoPedido({ pedido, layout }) {
  return (
    <div className={classes.rodape} data-layout={layout}>
      <div className={classes.dados}>
        <Group gap="sm" wrap="wrap">
          <Group gap={4} wrap="nowrap">
            <Icone nome="thumb_up" tamanho={18} />
            <NumeroApoios apoios={pedido.apoios} />
          </Group>
          <IndicadorPrioridade pedido={pedido} />
        </Group>
        <Text fz={13} c="var(--cor-texto-suave)" mt={4}>
          {textoUltimaMudanca(pedido)}
        </Text>
      </div>
      <BotaoApoiar pedido={pedido} />
    </div>
  );
}
