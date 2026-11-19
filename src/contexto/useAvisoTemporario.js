import { useContext } from 'react';
import { ContextoAvisoTemporario } from './ContextoAvisoTemporario';

// Dá acesso a mostrarAviso(texto, link), que mostra o aviso temporário no rodapé da tela.
// Devolve a função; avisa se for usado fora do AvisoTemporarioProvider.
export function useAvisoTemporario() {
  const contexto = useContext(ContextoAvisoTemporario);
  if (!contexto) {
    throw new Error('useAvisoTemporario precisa estar dentro do AvisoTemporarioProvider');
  }
  return contexto.mostrarAviso;
}
