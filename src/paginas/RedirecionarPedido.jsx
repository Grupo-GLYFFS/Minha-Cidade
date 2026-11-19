import { Navigate, useParams } from 'react-router-dom';

// Endereços antigos e atalhos do detalhe do pedido (/pedidos/:id,
// usados pelo CardPedido e por links salvos) levam para /minha-cidade/pedidos/:id.
export default function RedirecionarPedido() {
  const { id } = useParams();
  return <Navigate to={`/minha-cidade/pedidos/${id}`} replace />;
}
