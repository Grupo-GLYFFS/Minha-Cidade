import { useContext } from 'react';
import { ContextoAlertas } from './ContextoAlertas';

// Dá acesso aos alertas da pessoa logada (alertas), à quantidade não lida (naoLidos)
// e às ações marcarComoLido(id) e marcarTodosComoLidos(), em qualquer tela.
// Devolve o objeto do AlertasProvider; avisa se for usado fora dele.
export function useAlertas() {
  const contexto = useContext(ContextoAlertas);
  if (!contexto) throw new Error('useAlertas precisa estar dentro do AlertasProvider');
  return contexto;
}
