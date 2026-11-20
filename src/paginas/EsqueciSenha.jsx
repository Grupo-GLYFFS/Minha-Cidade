import { Navigate } from 'react-router-dom';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioEsqueciSenha from '../componentes/conta/FormularioEsqueciSenha';
import PeConta from '../componentes/conta/PeConta';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { useSessao } from '../contexto/useSessao';
import { destinoSeguro } from '../logica/sessao';

// Página "Esqueci minha senha" (/entrar/esqueci): pede o e-mail para mandar o link.
// Quem já está logado é levado ao destino do ?voltar= (ou ao Início), como em Entrar.
export default function EsqueciSenha() {
  const { entrar, voltar } = useCaminhoConta();
  const { logado } = useSessao();

  if (logado) return <Navigate to={destinoSeguro(voltar)} replace />;

  return (
    <MolduraConta
      titulo="Esqueci minha senha"
      texto="Enviamos um link para criar uma senha nova."
    >
      <FormularioEsqueciSenha />
      <PeConta pergunta="Lembrou?" acao="Entrar" para={entrar} />
    </MolduraConta>
  );
}
