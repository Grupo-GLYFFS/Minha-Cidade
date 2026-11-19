import { apagarDadoDaAba, ehObjeto, lerDadoDaAba, salvarDadoDaAba } from '../armazenamento';
import { PAGINAS_DE_CONTA } from './sessao';

// Ação pedida pelo visitante (Apoiar ou Seguir sem conta), guardada só na aba.
// Ela só vale na volta direta do "Entrar": até 10 minutos depois e se a pessoa não foi
// para outra página no meio do caminho.

// Nome com que a ação fica guardada na aba
const CHAVE = 'acao-pendente';
// Por quanto tempo a ação vale (10 minutos, em milissegundos)
const VALIDADE_MS = 10 * 60 * 1000;

// Guarda a ação pedida. Recebe a chave da ação (ex.: "apoiar:p-001") e a página dela.
export function salvarAcaoPendente(chave, pagina) {
  salvarDadoDaAba(CHAVE, { chave, pagina, ate: Date.now() + VALIDADE_MS });
}

// Apaga a ação guardada (depois de feita, ao sair da conta ou quando perde a validade).
export function apagarAcaoPendente() {
  apagarDadoDaAba(CHAVE);
}

// Lê a ação guardada. Não recebe nada; devolve { chave, pagina } ou null
// (a ação vencida é apagada e devolve null).
export function lerAcaoPendente() {
  const acao = lerDadoDaAba(CHAVE, null, ehObjeto);
  if (!acao) return null;
  if (typeof acao.ate !== 'number' || acao.ate < Date.now()) {
    apagarAcaoPendente();
    return null;
  }
  return acao;
}

// Esquece a ação se a pessoa foi para outra página antes de entrar.
// Recebe a página aberta agora; as telas de entrar e criar conta fazem parte do caminho.
export function conferirAcaoPendente(paginaAtual) {
  const acao = lerAcaoPendente();
  if (!acao || acao.pagina === paginaAtual) return;
  if (PAGINAS_DE_CONTA.includes(paginaAtual)) return;
  apagarAcaoPendente();
}
