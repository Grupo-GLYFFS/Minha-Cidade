import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoSolicitacoes } from './ContextoSolicitacoes';
import { lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { montarSolicitacao } from '../logica/solicitacoes';

// Nome com que as solicitações ficam guardadas no navegador
const CHAVE_SOLICITACOES = 'solicitacoes-servicos';

// Guarda as solicitações de serviço feitas pelos formulários online do catálogo.
// Ficam salvas as de todas as pessoas deste aparelho; as telas recebem só as da pessoa logada.
// Recebe as telas do app (children), que leem os dados com useSolicitacoes().
export default function SolicitacoesProvider({ children }) {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const [todas, setTodas] = useState(() => lerDado(CHAVE_SOLICITACOES, []));

  // Salva sempre que muda (só depois da primeira solicitação, para não criar a chave à toa)
  useEffect(() => {
    if (todas.length > 0) salvarDado(CHAVE_SOLICITACOES, todas);
  }, [todas]);

  // Solicitações da pessoa logada (lista vazia para visitante)
  const solicitacoes = useMemo(
    () => (idPessoa ? todas.filter((item) => item.autorId === idPessoa) : []),
    [todas, idPessoa],
  );

  // Salva uma solicitação da pessoa logada (o formulário só abre para quem entrou).
  // Recebe o serviço e as respostas já preparadas; devolve a solicitação com id e protocolo.
  const adicionarSolicitacao = useCallback(
    (servico, respostas) => {
      const nova = montarSolicitacao(servico, respostas, todas, idPessoa);
      setTodas((atual) => [...atual, nova]);
      return nova;
    },
    [todas, idPessoa],
  );

  const valor = useMemo(
    () => ({ solicitacoes, adicionarSolicitacao }),
    [solicitacoes, adicionarSolicitacao],
  );

  return <ContextoSolicitacoes.Provider value={valor}>{children}</ContextoSolicitacoes.Provider>;
}
