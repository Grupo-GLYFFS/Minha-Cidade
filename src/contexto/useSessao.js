import { useContext } from 'react';
import { ContextoSessao } from './ContextoSessao';

// Dá acesso à pessoa logada (usuario, ou null para visitante), a "logado"
// e às ações entrar, entrarDemonstracao, criarConta, emailEmUso e sair, em qualquer tela.
// Devolve o objeto do SessaoProvider; avisa se for usado fora dele.
export function useSessao() {
  const contexto = useContext(ContextoSessao);
  if (!contexto) throw new Error('useSessao precisa estar dentro do SessaoProvider');
  return contexto;
}
