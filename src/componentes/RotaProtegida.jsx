import { Navigate, Outlet } from 'react-router-dom';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';

// Guarda das páginas que precisam de conta (abrir pedido, perfil, alertas).
// Quem está logado vê a página normalmente (no lugar do <Outlet />);
// o visitante vai para "Entrar" e, depois de entrar, volta para a página que tentou abrir.
export default function RotaProtegida() {
  const { logado } = useSessao();
  const { entrar } = useCaminhoConta();

  if (!logado) return <Navigate to={entrar} replace />;
  return <Outlet />;
}
