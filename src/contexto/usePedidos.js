import { useContext } from 'react';
import { ContextoPedidos } from './ContextoPedidos';

// Dá acesso aos pedidos, aos ids que entraram em análise agora (recemAnalisados)
// aos pedidos que a pessoa apoia e segue (apoiados, seguidos) e às ações (alternarApoio,
// alternarSeguir, apoiar, adicionarPedido, avancarStatus) em qualquer tela.
// Devolve o objeto do PedidosProvider; avisa se for usado fora dele.
export function usePedidos() {
  const contexto = useContext(ContextoPedidos);
  if (!contexto) throw new Error('usePedidos precisa estar dentro do PedidosProvider');
  return contexto;
}
