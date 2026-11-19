import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import Pagina from '../Pagina';
import Botao from '../Botao';
import NaoEncontrado from '../NaoEncontrado';
import { useBairroDaPessoa } from '../../contexto/useBairroDaPessoa';
import { montarRecorteLugar } from '../../logica/recorte';

// Guarda das subpáginas de outro bairro e de uma subprefeitura
// (/minha-cidade/bairros/:idBairro/... e /minha-cidade/subprefeituras/:idSub/...), que usam
// as mesmas páginas do Meu bairro com o recorte do lugar da rota.
// - Lugar que não existe: "não encontrado".
// - O bairro da própria pessoa vai para a mesma subpágina em /meu-bairro.
export default function RotaLugar() {
  const { idBairro, idSub } = useParams();
  const { pathname } = useLocation();
  const { nome, definido } = useBairroDaPessoa();
  const recorte = montarRecorteLugar({ idBairro, idSub });

  if (!recorte) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo={idBairro ? 'Não encontramos este bairro' : 'Não encontramos esta subprefeitura'}
          texto="O link pode estar incompleto. Os bairros e as subprefeituras estão na página da cidade."
          icone={idBairro ? 'home_pin' : 'account_balance'}
        >
          <Botao variante="principal" para="/minha-cidade">
            Ver a cidade de São Paulo
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }
  if (idBairro && definido && recorte.bairro === nome) {
    return <Navigate to={pathname.replace(recorte.base, '/meu-bairro')} replace />;
  }
  return <Outlet />;
}
