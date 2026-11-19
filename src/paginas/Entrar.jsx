import { Navigate, useSearchParams } from 'react-router-dom';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioEntrar from '../componentes/conta/FormularioEntrar';
import PeConta from '../componentes/conta/PeConta';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { destinoSeguro } from '../logica/sessao';

// Página "Entrar" (/entrar): gov.br, e-mail ou CPF e senha.
// O endereço pode trazer ?voltar=/caminho: depois de entrar, a pessoa volta para lá (ou para o Início).
// Quem já está logado é levado direto ao destino.
export default function Entrar() {
  const { logado } = useSessao();
  const [parametros] = useSearchParams();
  const destino = destinoSeguro(parametros.get('voltar'));
  const { criarConta } = useCaminhoConta();

  if (logado) return <Navigate to={destino} replace />;

  return (
    <MolduraConta
      painel="entrar"
      titulo="Entrar"
      texto="Para abrir pedidos, votar e acompanhar suas solicitações."
    >
      <FormularioEntrar destino={destino} />
      <PeConta pergunta="Ainda não tem conta?" acao="Criar conta" para={criarConta} />
    </MolduraConta>
  );
}
