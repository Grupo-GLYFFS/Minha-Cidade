import { createContext } from 'react';

// Caixa compartilhada com os pedidos e as ações de apoiar e abrir pedido.
// Quem fornece os dados é o PedidosProvider; quem usa chama o hook usePedidos().
export const ContextoPedidos = createContext(null);
