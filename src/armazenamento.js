// Único arquivo do app que mexe no localStorage (e no sessionStorage).
// O resto do código usa só estas funções, nunca o localStorage direto.

// Prefixo para não misturar com dados de outros sites no mesmo navegador
const PREFIXO = 'minha-prefeitura:';

// ---------- Conferência do formato (um dado salvo pode ter sido mexido à mão) ----------

// Diz se o valor é um objeto comum (não lista, não null).
export function ehObjeto(valor) {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor);
}

// Diz se o valor é um texto (ex.: o id de quem está logado).
export function ehTexto(valor) {
  return typeof valor === 'string';
}

// Diz se o valor é uma lista de registros (objetos com id), como pedidos e contas.
export function ehListaDeRegistros(valor) {
  return Array.isArray(valor) && valor.every((item) => ehObjeto(item) && item.id != null);
}

// Diz se o valor é um objeto em que cada valor é uma lista, ex.: { idPessoa: [ids] }.
export function ehMapaDeListas(valor) {
  return ehObjeto(valor) && Object.values(valor).every(Array.isArray);
}

// Diz se o valor é um objeto em que cada valor também é um objeto, ex.: { idPessoa: {…} }.
export function ehMapaDeObjetos(valor) {
  return ehObjeto(valor) && Object.values(valor).every(ehObjeto);
}

// Monta a conferência pelo formato do padrão (lista, objeto, texto, número…).
// Padrão null ou undefined aceita qualquer valor (quem lê confere do seu jeito).
function mesmoFormato(padrao) {
  if (Array.isArray(padrao)) return Array.isArray;
  if (ehObjeto(padrao)) return ehObjeto;
  if (padrao === null || padrao === undefined) return () => true;
  return (valor) => typeof valor === typeof padrao;
}

// Transforma o texto salvo no dado, conferindo o formato. Recebe o texto (ou null),
// o padrão e a função que confere; devolve o dado ou o padrão se faltar ou estiver errado.
function interpretar(texto, padrao, valido) {
  if (texto === null) return padrao;
  const valor = JSON.parse(texto);
  return valido(valor) ? valor : padrao;
}

// Lê um dado salvo no navegador.
// Recebe a chave, um valor padrão e, se quiser, a função que confere o formato
// (sem ela, o dado precisa ter o mesmo formato do padrão: lista, objeto…).
// Devolve o dado salvo ou o padrão se não houver nada ou se o formato estiver errado.
export function lerDado(chave, padrao, valido = mesmoFormato(padrao)) {
  try {
    return interpretar(localStorage.getItem(PREFIXO + chave), padrao, valido);
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

// Lê um dado guardado só enquanto a aba está aberta (sessionStorage).
// Usado na sessão de quem não marcou "Manter conectado neste aparelho".
// Recebe a chave, um valor padrão e, se quiser, a função que confere o formato (como lerDado);
// devolve o dado ou o padrão.
export function lerDadoDaAba(chave, padrao, valido = mesmoFormato(padrao)) {
  try {
    return interpretar(sessionStorage.getItem(PREFIXO + chave), padrao, valido);
  } catch {
    return padrao;
  }
}

// Guarda um dado só enquanto a aba está aberta (some ao fechar o navegador). Recebe a chave e o valor.
export function salvarDadoDaAba(chave, valor) {
  try {
    sessionStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    // Acesso bloqueado: o app continua funcionando só na memória
  }
}

// Apaga um dado guardado só na aba. Recebe a chave.
export function apagarDadoDaAba(chave) {
  try {
    sessionStorage.removeItem(PREFIXO + chave);
  } catch {
    // Acesso bloqueado: não há o que apagar
  }
}

// Apaga as chaves do app de um armazenamento (localStorage ou sessionStorage).
// Recebe o armazenamento; devolve quantos dados foram apagados.
function apagarDoArmazenamento(armazenamento) {
  // Junta as chaves antes de apagar, porque apagar muda a posição das outras
  const chaves = [];
  for (let i = 0; i < armazenamento.length; i += 1) {
    const chave = armazenamento.key(i);
    if (chave?.startsWith(PREFIXO)) chaves.push(chave);
  }
  chaves.forEach((chave) => armazenamento.removeItem(chave));
  return chaves.length;
}

// Apaga todos os dados do app salvos neste navegador (só as chaves com o prefixo do app).
// Recebe { aba: true } para apagar também os da aba (sessionStorage).
// Devolve quantos dados foram apagados do localStorage.
export function apagarTudo({ aba = false } = {}) {
  try {
    if (aba) apagarDoArmazenamento(sessionStorage);
    return apagarDoArmazenamento(localStorage);
  } catch {
    // Acesso bloqueado: não há o que apagar
    return 0;
  }
}
