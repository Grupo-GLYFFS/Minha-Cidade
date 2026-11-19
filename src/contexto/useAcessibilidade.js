import { useContext } from 'react';
import { ContextoAcessibilidade } from './ContextoAcessibilidade';

// Dá acesso às preferências de acessibilidade (tamanhoLetra, altoContraste, reduzirAnimacoes,
// mostrarFaixasAlerta) e às ações diminuirLetra, aumentarLetra, letraPadrao, definirTamanho,
// alternarAltoContraste, alternarAnimacoes, alternarFaixasAlerta e voltarAoPadrao, em qualquer tela.
// Devolve o objeto do AcessibilidadeProvider; avisa se for usado fora dele.
export function useAcessibilidade() {
  const contexto = useContext(ContextoAcessibilidade);
  if (!contexto)
    throw new Error('useAcessibilidade precisa estar dentro do AcessibilidadeProvider');
  return contexto;
}
