import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioEsqueciSenha from '../componentes/conta/FormularioEsqueciSenha';
import PeConta from '../componentes/conta/PeConta';
import { useCaminhoConta } from '../contexto/useCaminhoConta';

// Página "Esqueci minha senha" (/entrar/esqueci): pede o e-mail ou CPF para mandar o link.
export default function EsqueciSenha() {
  const { entrar } = useCaminhoConta();

  return (
    <MolduraConta
      painel="entrar"
      titulo="Esqueci minha senha"
      texto="Enviamos um link para criar uma senha nova."
    >
      <FormularioEsqueciSenha />
      <PeConta pergunta="Lembrou?" acao="Entrar" para={entrar} />
    </MolduraConta>
  );
}
