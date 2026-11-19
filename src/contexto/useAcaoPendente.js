import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessao } from './useSessao';
import { useCaminhoConta } from './useCaminhoConta';
import { apagarDadoDaAba, ehTexto, lerDadoDaAba, salvarDadoDaAba } from '../armazenamento';

// Nome com que a ação pedida pelo visitante fica guardada na aba
const CHAVE = 'acao-pendente';

// Apoiar e Seguir sem conta: guarda o que a pessoa pediu, leva para "Entrar" (que volta
// para esta página) e, quando ela volta logada, faz a ação pedida uma vez só.
// Recebe a chave da ação (ex.: "apoiar:p-001", "seguir-obra:ubs-vila-mariana") e
// aplicar(), que liga a ação (não deve desligar o que já está ligado).
// Devolve pedirEntrando(): chame no clique do visitante.
export function useAcaoPendente(chave, aplicar) {
  const { usuario } = useSessao();
  const { entrar } = useCaminhoConta();
  const navegar = useNavigate();

  // De volta e logada: se a ação guardada é esta, faz e esquece
  useEffect(() => {
    if (!usuario || lerDadoDaAba(CHAVE, null, ehTexto) !== chave) return;
    apagarDadoDaAba(CHAVE);
    aplicar();
  }, [usuario, chave, aplicar]);

  return useCallback(() => {
    salvarDadoDaAba(CHAVE, chave);
    navegar(entrar);
  }, [chave, entrar, navegar]);
}
