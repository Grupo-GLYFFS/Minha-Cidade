import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { seguidosDaPessoa } from '../logica/acompanhamento';
import { usePedidos } from './usePedidos';
import { useSeguidos } from './useSeguidos';

// O que a pessoa logada segue, pela regra única de logica/acompanhamento.js (seguidosDaPessoa).
// Devolve { seguidos: { votacoes, obras, pedidos, total }, seguirObras, seguirVotacoes }:
// seguirObras e seguirVotacoes são os { seguidos, segue, alternar, logado } do useSeguidos,
// para a página ligar e desligar o Seguir sem criar uma segunda cópia do estado.
export function useOQueSegue() {
  const { pedidos, seguidos: idsPedidos } = usePedidos();
  const seguirObras = useSeguidos('obras');
  const seguirVotacoes = useSeguidos('votacoes');
  const seguidos = seguidosDaPessoa(
    { projetos: PROJETOS, obras: OBRAS, pedidos },
    { votacoes: seguirVotacoes.seguidos, obras: seguirObras.seguidos, pedidos: idsPedidos },
  );
  return { seguidos, seguirObras, seguirVotacoes };
}
