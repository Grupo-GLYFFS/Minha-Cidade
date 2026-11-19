// Código de confirmação do e-mail no cadastro.
// O protótipo não tem servidor de e-mail: o código é sorteado aqui e mostrado na tela.

// Quantos números tem o código e quantos segundos esperar para pedir outro
export const TAMANHO_CODIGO = 6;
export const ESPERA_REENVIO = 45;

// Sorteia um código de 6 números. Devolve o código como texto (ex.: "048213").
export function gerarCodigo() {
  const numeros = crypto.getRandomValues(new Uint32Array(TAMANHO_CODIGO));
  return Array.from(numeros, (numero) => numero % 10).join('');
}

// Escreve os segundos que faltam como relógio. Recebe 45; devolve "0:45".
export function formatarEspera(segundos) {
  return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`;
}
