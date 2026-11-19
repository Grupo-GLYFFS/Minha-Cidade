import { apagarDado, ehObjeto, lerDado, salvarDado } from '../armazenamento';

// Limite de tentativas erradas na tela "Entrar" e tempo de bloqueio depois disso
export const LIMITE_TENTATIVAS = 5;
const BLOQUEIO_MINUTOS = 15;
const CHAVE = 'tentativas-entrar';

// Escreve a hora no padrão do app. Recebe uma data; devolve, por exemplo, "8h30" ou "21h".
export function formatarHora(data) {
  const minutos = data.getMinutes();
  return `${data.getHours()}h${minutos === 0 ? '' : String(minutos).padStart(2, '0')}`;
}

// Diz até quando a entrada está bloqueada neste aparelho.
// Recebe a hora de agora (opcional); devolve a data do fim do bloqueio ou null se pode tentar.
export function bloqueadoAte(agora = Date.now()) {
  const salvo = lerDado(CHAVE, null, ehObjeto);
  if (!salvo?.ate || salvo.ate <= agora) return null;
  return new Date(salvo.ate);
}

// Conta mais uma tentativa errada. Na quinta, bloqueia por 15 minutos.
// Recebe a hora de agora (opcional); devolve a data do fim do bloqueio ou null.
export function registrarErro(agora = Date.now()) {
  const salvo = lerDado(CHAVE, null, ehObjeto);
  // Depois de um bloqueio vencido, a contagem recomeça
  const quantas = salvo?.ate && salvo.ate <= agora ? 1 : (salvo?.quantas ?? 0) + 1;
  if (quantas >= LIMITE_TENTATIVAS) {
    const ate = agora + BLOQUEIO_MINUTOS * 60 * 1000;
    salvarDado(CHAVE, { quantas: 0, ate });
    return new Date(ate);
  }
  salvarDado(CHAVE, { quantas });
  return null;
}

// Zera a contagem depois de entrar com sucesso
export function zerarTentativas() {
  apagarDado(CHAVE);
}
