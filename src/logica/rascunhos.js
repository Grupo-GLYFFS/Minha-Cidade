import { apagarDadoDaAba, ehObjeto, lerDadoDaAba, salvarDadoDaAba } from '../armazenamento';

// Rascunhos dos formulários longos (Abrir pedido e Solicitar serviço), guardados só na aba:
// recarregar a página no meio do formulário não apaga o que a pessoa já preencheu.
// Fotos e arquivos não entram no rascunho (o navegador não guarda arquivos como texto).

// Começo do nome com que cada rascunho fica guardado
const PREFIXO_RASCUNHO = 'rascunho:';
// Pedidos enviados nesta aba (só eles mostram "Pedido enviado" de novo)
const CHAVE_ENVIADOS = 'pedidos-enviados-na-aba';

// Diz se o valor é um arquivo ou uma lista com arquivos/fotos (não dá para guardar como texto)
function ehArquivo(valor) {
  if (typeof File !== 'undefined' && valor instanceof File) return true;
  return Array.isArray(valor) && valor.some((item) => ehObjeto(item) && 'url' in item);
}

// Lê o rascunho de um formulário. Recebe o nome do rascunho; devolve o objeto ou null.
export function lerRascunho(nome) {
  return lerDadoDaAba(PREFIXO_RASCUNHO + nome, null, ehObjeto);
}

// Guarda o rascunho, sem os arquivos. Recebe o nome e os dados (objeto).
export function salvarRascunho(nome, dados) {
  const semArquivos = {};
  Object.entries(dados).forEach(([campo, valor]) => {
    if (!ehArquivo(valor)) semArquivos[campo] = valor;
  });
  salvarDadoDaAba(PREFIXO_RASCUNHO + nome, semArquivos);
}

// Apaga o rascunho (depois do envio). Recebe o nome.
export function apagarRascunho(nome) {
  apagarDadoDaAba(PREFIXO_RASCUNHO + nome);
}

// Guarda que o pedido foi enviado nesta aba. Recebe o id do pedido.
export function marcarEnviadoNaAba(id) {
  const enviados = lerDadoDaAba(CHAVE_ENVIADOS, []);
  if (!enviados.includes(id)) salvarDadoDaAba(CHAVE_ENVIADOS, [...enviados, id]);
}

// Diz se o pedido foi enviado nesta aba. Recebe o id; devolve true ou false.
export function foiEnviadoNaAba(id) {
  return lerDadoDaAba(CHAVE_ENVIADOS, []).includes(id);
}
