import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSessao } from './useSessao';
import { useCaminhoConta } from './useCaminhoConta';
import { apagarAcaoPendente, lerAcaoPendente, salvarAcaoPendente } from '../logica/acaoPendente';

// Apoiar e Seguir sem conta: guarda o que a pessoa pediu, leva para "Entrar" (que volta
// para esta página) e, quando ela volta logada, faz a ação pedida uma vez só.
// A ação só vale na volta direta do "Entrar" (ver logica/acaoPendente.js).
// Recebe a chave da ação (ex.: "apoiar:p-001", "seguir-obra:ubs-vila-mariana") e
// aplicar(), que liga a ação (não deve desligar o que já está ligado).
// Devolve pedirEntrando(): chame no clique do visitante.
export function useAcaoPendente(chave, aplicar) {
  const { usuario } = useSessao();
  const { entrar } = useCaminhoConta();
  const { pathname } = useLocation();
  const navegar = useNavigate();

  // De volta e logada: se a ação guardada é esta (e desta página), faz e esquece
  useEffect(() => {
    if (!usuario) return;
    const acao = lerAcaoPendente();
    if (acao?.chave !== chave || acao.pagina !== pathname) return;
    apagarAcaoPendente();
    aplicar();
  }, [usuario, chave, pathname, aplicar]);

  return useCallback(() => {
    salvarAcaoPendente(chave, pathname);
    navegar(entrar);
  }, [chave, pathname, entrar, navegar]);
}
