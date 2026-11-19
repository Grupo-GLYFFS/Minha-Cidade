import { useSessao } from '../../contexto/useSessao';
import { usePedidos } from '../../contexto/usePedidos';
import { useSolicitacoes } from '../../contexto/useSolicitacoes';
import { pedidosAbertosDaPessoa } from '../../logica/pedidos';
import { textoContagemSolicitacoes } from '../../logica/solicitacoes';

// Números da conta para as linhas de apoio ("4 agendadas", "2 em andamento").
// Para o visitante, as linhas ficam vazias (undefined), porque ele não tem nada.
// Devolve { solicitacoes, solicitacoesESolicitadas, pedidos }.
export function useResumoConta() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();

  if (!usuario)
    return { solicitacoes: undefined, solicitacoesESolicitadas: undefined, pedidos: undefined };

  const abertos = pedidosAbertosDaPessoa(pedidos, usuario.id).length;
  return {
    solicitacoes: textoContagemSolicitacoes(solicitacoes),
    solicitacoesESolicitadas: textoContagemSolicitacoes(solicitacoes, true),
    pedidos: `${abertos} em andamento`,
  };
}
