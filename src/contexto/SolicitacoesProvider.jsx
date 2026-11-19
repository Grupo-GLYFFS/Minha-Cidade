import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoSolicitacoes } from './ContextoSolicitacoes';
import { lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { SOLICITACOES } from '../dados/solicitacoes';
import {
  cancelarSolicitacao,
  montarSolicitacao,
  remarcarSolicitacao,
} from '../logica/solicitacoes';

// Nome com que as solicitações ficam guardadas no navegador
// (o "v2" separa do formato antigo, que não tinha agendamento nem histórico)
const CHAVE_SOLICITACOES = 'solicitacoes-servicos-v2';

// Guarda as solicitações de serviço feitas pelos formulários online do catálogo.
// Começa com as de exemplo da Maria; ficam salvas as de todas as pessoas deste aparelho
// e as telas recebem só as da pessoa logada.
// Recebe as telas do app (children), que leem os dados com useSolicitacoes().
export default function SolicitacoesProvider({ children }) {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const [todas, setTodas] = useState(() => lerDado(CHAVE_SOLICITACOES, SOLICITACOES));

  // Salva sempre que alguma muda
  useEffect(() => {
    salvarDado(CHAVE_SOLICITACOES, todas);
  }, [todas]);

  // Solicitações da pessoa logada (lista vazia para visitante)
  const solicitacoes = useMemo(
    () => (idPessoa ? todas.filter((item) => item.autorId === idPessoa) : []),
    [todas, idPessoa],
  );

  // Salva uma solicitação da pessoa logada (o formulário só abre para quem entrou).
  // Recebe o serviço e as respostas já preparadas; devolve a solicitação com o protocolo.
  const adicionarSolicitacao = useCallback(
    (servico, respostas) => {
      const nova = montarSolicitacao(servico, respostas, todas, usuario);
      setTodas((atual) => [...atual, nova]);
      return nova;
    },
    [todas, usuario],
  );

  // Troca uma solicitação pela versão nova devolvida por "mudar".
  // Recebe o id e a função que recebe a solicitação e devolve a nova.
  const atualizar = useCallback((id, mudar) => {
    setTodas((atual) => atual.map((item) => (item.id === id ? mudar(item) : item)));
  }, []);

  // Remarca um agendamento. Recebe o id, a data ("2026-11-21") e a hora ("10:00").
  const remarcar = useCallback(
    (id, data, hora) => atualizar(id, (item) => remarcarSolicitacao(item, data, hora)),
    [atualizar],
  );

  // Cancela uma solicitação. Recebe o id.
  const cancelar = useCallback(
    (id) => atualizar(id, (item) => cancelarSolicitacao(item)),
    [atualizar],
  );

  const valor = useMemo(
    () => ({ solicitacoes, adicionarSolicitacao, remarcar, cancelar }),
    [solicitacoes, adicionarSolicitacao, remarcar, cancelar],
  );

  return <ContextoSolicitacoes.Provider value={valor}>{children}</ContextoSolicitacoes.Provider>;
}
