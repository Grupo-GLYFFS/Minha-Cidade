import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { USUARIO } from '../dados/usuario';
import { NOTIFICACOES } from '../dados/notificacoes';

// Nome com que as notificações lidas ficam guardadas, no formato { idPessoa: [ids] }
const CHAVE_LIDAS = 'notificacoes-lidas';

// Estado compartilhado entre a página Notificações e a caixa do sino do topo
// (as duas marcam como lidas e precisam mudar juntas, sem um Provider a mais).
let lidasPorPessoa = lerDado(CHAVE_LIDAS, {});
const ouvintes = new Set();

// Avisa os componentes que usam o hook. Recebe uma função que chamamos a cada mudança.
function inscrever(ouvinte) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

// Devolve o estado atual (a mesma referência até a próxima mudança)
function lerEstado() {
  return lidasPorPessoa;
}

// Junta ids à lista de lidas de uma pessoa, salva no navegador e avisa quem usa.
// Recebe o id da pessoa e a lista de ids.
function juntarLidas(idPessoa, ids) {
  const daPessoa = lidasPorPessoa[idPessoa] ?? [];
  const novas = ids.filter((id) => !daPessoa.includes(id));
  if (novas.length === 0) return;
  lidasPorPessoa = { ...lidasPorPessoa, [idPessoa]: [...daPessoa, ...novas] };
  salvarDado(CHAVE_LIDAS, lidasPorPessoa);
  ouvintes.forEach((ouvinte) => ouvinte());
}

// Notificações da pessoa logada, da mais nova para a mais antiga, com "lida" marcada.
// Os dados de exemplo são da conta de demonstração; outras contas começam sem notificações.
// Devolve { notificacoes, naoLidas, marcarComoLida(id), marcarTodasComoLidas() }.
export function useNotificacoes() {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const estado = useSyncExternalStore(inscrever, lerEstado);

  const notificacoes = useMemo(() => {
    if (idPessoa !== USUARIO.id) return [];
    const lidas = estado[idPessoa] ?? [];
    return NOTIFICACOES.map((item) => ({ ...item, lida: !item.nova || lidas.includes(item.id) }));
  }, [estado, idPessoa]);

  const naoLidas = notificacoes.filter((item) => !item.lida).length;

  // Marca uma notificação como lida. Recebe o id.
  const marcarComoLida = useCallback(
    (id) => {
      if (idPessoa) juntarLidas(idPessoa, [id]);
    },
    [idPessoa],
  );

  // Marca como lidas todas as que ainda não foram lidas
  const marcarTodasComoLidas = useCallback(() => {
    if (!idPessoa) return;
    juntarLidas(
      idPessoa,
      notificacoes.filter((item) => !item.lida).map((item) => item.id),
    );
  }, [idPessoa, notificacoes]);

  return { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas };
}
