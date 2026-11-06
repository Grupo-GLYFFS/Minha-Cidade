// Único arquivo do app que mexe no localStorage.
// O resto do código usa só estas funções, nunca o localStorage direto.

// Prefixo para não misturar com dados de outros sites no mesmo navegador
const PREFIXO = 'minha-prefeitura:';

// Lê um dado salvo no navegador.
// Recebe a chave e um valor padrão; devolve o dado salvo ou o padrão se não houver nada.
export function lerDado(chave, padrao) {
  try {
    const texto = localStorage.getItem(PREFIXO + chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch {
    // Navegador bloqueou o acesso ou o dado salvo está estragado
    return padrao;
  }
}

// Salva um dado no navegador.
// Recebe a chave e o valor (qualquer objeto ou lista); o valor é guardado como texto JSON.
export function salvarDado(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    // Sem espaço ou acesso bloqueado: o app continua funcionando só na memória
  }
}

// Apaga um dado salvo no navegador. Recebe a chave.
export function apagarDado(chave) {
  try {
    localStorage.removeItem(PREFIXO + chave);
  } catch {
    // Acesso bloqueado: não há o que apagar
  }
}

// Apaga todos os dados do app salvos neste navegador (só as chaves com o prefixo do app).
// Não recebe nada; devolve quantos dados foram apagados.
export function apagarTudo() {
  try {
    // Junta as chaves antes de apagar, porque apagar muda a posição das outras
    const chaves = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const chave = localStorage.key(i);
      if (chave?.startsWith(PREFIXO)) chaves.push(chave);
    }
    chaves.forEach((chave) => localStorage.removeItem(chave));
    return chaves.length;
  } catch {
    // Acesso bloqueado: não há o que apagar
    return 0;
  }
}
