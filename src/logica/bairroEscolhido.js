import { lerDado, salvarDado } from '../armazenamento';
import { buscarBairro } from './lugares';

// Chave do bairro escolhido por quem não tem conta (na página Escolher bairro)
const CHAVE = 'bairro-escolhido';

// Lê o bairro que o visitante escolheu. Não recebe nada; devolve o bairro
// (de BAIRROS_CIDADE) ou null se ainda não escolheu (ou se o id salvo não existe mais).
export function lerBairroEscolhido() {
  return buscarBairro(lerDado(CHAVE, null)) ?? null;
}

// Guarda o bairro escolhido pelo visitante. Recebe o id do bairro.
export function salvarBairroEscolhido(id) {
  salvarDado(CHAVE, id);
}
