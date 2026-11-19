import { SUBPREFEITURA_DO_BAIRRO } from '../dados/subprefeituraDoBairro';
import { normalizarTexto } from './enderecos';

// Bairro mostrado no painel azul do "Criar conta" antes de a pessoa digitar o CEP
export const BAIRRO_EXEMPLO = 'Vila Mariana';

// Descobre a subprefeitura que cuida do bairro.
// Recebe o nome do bairro (com ou sem acento); devolve "Subprefeitura Vila Mariana" ou null se o app não conhece.
export function subprefeituraDe(bairro = '') {
  const procurado = normalizarTexto(bairro);
  const item = SUBPREFEITURA_DO_BAIRRO.find((linha) => normalizarTexto(linha.bairro) === procurado);
  return item ? `Subprefeitura ${item.subprefeitura}` : null;
}
