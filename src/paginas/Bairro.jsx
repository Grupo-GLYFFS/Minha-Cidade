import { Navigate, useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import Botao from '../componentes/Botao';
import NaoEncontrado from '../componentes/NaoEncontrado';
import PerfilBairro from '../componentes/hub/PerfilBairro';
import { useLugarDaPessoa } from '../componentes/hub/useLugarDaPessoa';
import { buscarBairro } from '../logica/lugares';

// Outro bairro (/minha-cidade/bairros/:id, prancha 16): o mesmo molde do Meu bairro,
// sem o selo "Seu bairro". O bairro da própria pessoa vai para /meu-bairro.
export default function Bairro() {
  const { id } = useParams();
  const { bairro: bairroDaPessoa } = useLugarDaPessoa();
  const bairro = buscarBairro(id);

  if (!bairro) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos este bairro"
          texto="O link pode estar incompleto. Os 96 bairros estão nas páginas das subprefeituras."
          icone="home_pin"
        >
          <Botao variante="principal" para="/minha-cidade">
            Ver as subprefeituras
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }
  if (bairro.id === bairroDaPessoa.id) return <Navigate to="/meu-bairro" replace />;

  // A key faz a página recomeçar (carregando) ao trocar de bairro
  return <PerfilBairro key={bairro.id} bairro={bairro} />;
}
