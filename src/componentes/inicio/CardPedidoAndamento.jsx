import CardAndamento from './CardAndamento';
import { buscarCategoria, buscarStatus, textoUltimaMudanca } from '../../logica/pedidos';
import { etapasDoPedidoInicio } from '../../logica/inicio';

// Card de um pedido em andamento da pessoa, com a barra das 5 etapas.
// Recebe o pedido (de usePedidos).
export default function CardPedidoAndamento({ pedido }) {
  const status = buscarStatus(pedido.status);
  const categoria = buscarCategoria(pedido.categoria);

  return (
    <CardAndamento
      caminho={`/pedidos/${pedido.id}`}
      icone={categoria?.icone ?? 'assignment'}
      categoria={categoria?.rotulo}
      selo={status && { cor: status.cor, rotulo: status.rotulo }}
      titulo={pedido.titulo}
      etapas={etapasDoPedidoInicio(pedido)}
    >
      {pedido.rua} · {textoUltimaMudanca(pedido)}
    </CardAndamento>
  );
}
