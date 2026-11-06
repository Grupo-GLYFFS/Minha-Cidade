import { useContext } from 'react';
import { ContextoSolicitacoes } from './ContextoSolicitacoes';

// Dá acesso às solicitações de serviço da pessoa logada e à ação adicionarSolicitacao.
// Devolve o objeto do SolicitacoesProvider; avisa se for usado fora dele.
export function useSolicitacoes() {
  const contexto = useContext(ContextoSolicitacoes);
  if (!contexto) throw new Error('useSolicitacoes precisa estar dentro do SolicitacoesProvider');
  return contexto;
}
