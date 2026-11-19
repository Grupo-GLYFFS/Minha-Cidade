import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { conferirAcaoPendente } from '../logica/acaoPendente';

// A cada troca de página, esquece a ação do visitante (Apoiar ou Seguir sem conta)
// se ele foi para outro lugar antes de entrar. Usado uma vez, no App.
export function useConferirAcaoPendente() {
  const { pathname } = useLocation();
  useEffect(() => {
    conferirAcaoPendente(pathname);
  }, [pathname]);
}
