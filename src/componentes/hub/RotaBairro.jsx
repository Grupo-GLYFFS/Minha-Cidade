import { Outlet } from 'react-router-dom';
import EscolherBairro from '../../paginas/EscolherBairro';
import { useBairroDaPessoa } from '../../contexto/useBairroDaPessoa';

// Guarda das rotas /meu-bairro e /meu-bairro/*: quem não tem conta e ainda não escolheu
// um bairro vê a Escolher bairro no lugar da página (na mesma rota, que abre depois da escolha).
// Com conta ou com bairro escolhido, mostra a página normalmente (o <Outlet />).
export default function RotaBairro() {
  const { definido } = useBairroDaPessoa();
  if (!definido) return <EscolherBairro />;
  return <Outlet />;
}
