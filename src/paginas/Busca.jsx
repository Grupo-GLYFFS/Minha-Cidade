import { Navigate, useSearchParams } from 'react-router-dom';

// Endereço antigo da busca (/busca?q=lixo): a busca agora fica em Serviços
// (e no popup do topo). Leva para /servicos com o mesmo texto.
export default function Busca() {
  const [parametros] = useSearchParams();
  const texto = parametros.get('q');
  const destino = texto ? `/servicos?q=${encodeURIComponent(texto)}` : '/servicos';
  return <Navigate to={destino} replace />;
}
