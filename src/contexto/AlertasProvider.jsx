import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoAlertas } from './ContextoAlertas';
import { lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { usePedidos } from './usePedidos';
import { useSolicitacoes } from './useSolicitacoes';
import { ALERTAS } from '../dados/alertas';
import { PROJETOS } from '../dados/projetos';
import { montarAlertas } from '../logica/alertas';
import { HOJE } from '../logica/datas';

// Nome com que os alertas lidos ficam guardados no navegador, no formato { idPessoa: [ids] }
const CHAVE_LIDOS = 'alertas-lidos';

// Guarda os alertas da pessoa logada: Defesa Civil, mudanças nos pedidos, solicitações
// de serviço e votações abertas. Os ids já lidos ficam salvos por pessoa.
// Precisa estar dentro dos providers de sessão, pedidos e solicitações.
// Recebe as telas do app (children), que leem os dados com useAlertas().
export default function AlertasProvider({ children }) {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const idPessoa = usuario?.id ?? null;
  const [lidosPorPessoa, setLidosPorPessoa] = useState(() => lerDado(CHAVE_LIDOS, {}));

  // Salva sempre que muda (só depois do primeiro alerta lido, para não criar a chave à toa)
  useEffect(() => {
    if (Object.keys(lidosPorPessoa).length > 0) salvarDado(CHAVE_LIDOS, lidosPorPessoa);
  }, [lidosPorPessoa]);

  // Alertas da pessoa logada (lista vazia para visitante), já com "lido" marcado
  const alertas = useMemo(
    () =>
      montarAlertas({
        usuario,
        pedidos,
        solicitacoes,
        projetos: PROJETOS,
        alertasCidade: ALERTAS,
        lidos: idPessoa ? (lidosPorPessoa[idPessoa] ?? []) : [],
        hoje: HOJE,
      }),
    [usuario, pedidos, solicitacoes, lidosPorPessoa, idPessoa],
  );

  const naoLidos = alertas.filter((alerta) => !alerta.lido).length;

  // Junta ids à lista de lidos da pessoa logada, sem repetir. Recebe a lista de ids.
  const juntarLidos = useCallback(
    (ids) => {
      if (!idPessoa || ids.length === 0) return;
      setLidosPorPessoa((atual) => {
        const daPessoa = atual[idPessoa] ?? [];
        const novos = ids.filter((id) => !daPessoa.includes(id));
        if (novos.length === 0) return atual;
        return { ...atual, [idPessoa]: [...daPessoa, ...novos] };
      });
    },
    [idPessoa],
  );

  // Marca um alerta como lido. Recebe o id do alerta.
  const marcarComoLido = useCallback((id) => juntarLidos([id]), [juntarLidos]);

  // Marca como lidos todos os alertas que ainda não foram lidos
  const marcarTodosComoLidos = useCallback(
    () => juntarLidos(alertas.filter((alerta) => !alerta.lido).map((alerta) => alerta.id)),
    [alertas, juntarLidos],
  );

  const valor = useMemo(
    () => ({ alertas, naoLidos, marcarComoLido, marcarTodosComoLidos }),
    [alertas, naoLidos, marcarComoLido, marcarTodosComoLidos],
  );

  return <ContextoAlertas.Provider value={valor}>{children}</ContextoAlertas.Provider>;
}
