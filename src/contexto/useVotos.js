import { useContext } from 'react';
import { ContextoVotos } from './ContextoVotos';

// Dá acesso aos votos da pessoa logada (votosDaPessoa), a votoDe(idProjeto), explicarSemVoto(projeto),
// votar(idProjeto, opcao) e resultado(projeto), em qualquer tela.
// Devolve o objeto do VotosProvider; avisa se for usado fora dele.
export function useVotos() {
  const contexto = useContext(ContextoVotos);
  if (!contexto) throw new Error('useVotos precisa estar dentro do VotosProvider');
  return contexto;
}
