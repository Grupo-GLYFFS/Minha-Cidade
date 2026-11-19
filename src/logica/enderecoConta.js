import { nomeSubprefeitura, subprefeituraDoBairro } from './localPedido';

// Bairro mostrado no painel azul do "Criar conta" antes de a pessoa digitar o CEP
export const BAIRRO_EXEMPLO = 'Vila Mariana';

// Descobre a subprefeitura que cuida do bairro.
// Recebe o nome do bairro (com ou sem acento); devolve "Subprefeitura Vila Mariana" ou null se o app não conhece.
export function subprefeituraDe(bairro = '') {
  return nomeSubprefeitura(subprefeituraDoBairro(bairro)) || null;
}
