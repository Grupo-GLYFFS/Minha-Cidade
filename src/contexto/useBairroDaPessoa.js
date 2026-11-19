import { useLocation } from 'react-router-dom';
import { useSessao } from './useSessao';
import { BAIRRO_PADRAO } from '../logica/lugares';
import { lerBairroEscolhido } from '../logica/bairroEscolhido';

// Diz qual bairro vale para a pessoa: com conta, o do endereço; sem conta, o que ela escolheu
// na página Escolher bairro (ou a Vila Mariana, enquanto não escolheu nenhum).
// Devolve { nome, temConta, definido }: definido é false só para o visitante sem bairro escolhido.
export function useBairroDaPessoa() {
  const { usuario } = useSessao();
  // Relê o bairro escolhido a cada troca de página (a escolha é salva antes de navegar)
  useLocation();
  if (usuario) return { nome: usuario.bairro || BAIRRO_PADRAO, temConta: true, definido: true };
  const escolhido = lerBairroEscolhido();
  return { nome: escolhido?.nome ?? BAIRRO_PADRAO, temConta: false, definido: Boolean(escolhido) };
}
