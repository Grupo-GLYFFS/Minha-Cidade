// Tira tudo que não é número do CPF. Recebe "123.456.789-09"; devolve "12345678909".
export function limparCpf(cpf = '') {
  return cpf.replace(/\D/g, '').slice(0, 11);
}

// Aplica a máscara 000.000.000-00 enquanto a pessoa digita.
// Recebe o texto digitado; devolve os números com pontos e hífen nos lugares certos.
export function formatarCpf(texto = '') {
  const digitos = limparCpf(texto);
  if (digitos.length <= 3) return digitos;
  if (digitos.length <= 6) return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
  if (digitos.length <= 9)
    return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

// Calcula um dígito verificador do CPF.
// Recebe os números que entram na conta; devolve o dígito (de 0 a 9).
function digitoVerificador(numeros) {
  // Cada número é multiplicado por um peso que começa em (quantidade + 1) e desce até 2
  const soma = numeros.reduce(
    (total, numero, posicao) => total + numero * (numeros.length + 1 - posicao),
    0,
  );
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

// Diz se o CPF existe de verdade, conferindo os dois dígitos verificadores.
// Recebe o CPF com ou sem máscara; devolve true ou false.
export function cpfValido(cpf = '') {
  const digitos = limparCpf(cpf);
  // Precisa de 11 números e não pode ser tudo igual (ex.: 111.111.111-11 passa na conta, mas não existe)
  if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) return false;
  const numeros = digitos.split('').map(Number);
  const primeiro = digitoVerificador(numeros.slice(0, 9));
  const segundo = digitoVerificador(numeros.slice(0, 10));
  return primeiro === numeros[9] && segundo === numeros[10];
}

// Esconde o começo e o fim do CPF, para guardar sem expor o número inteiro.
// Recebe "123.456.789-09"; devolve "***.456.789-**".
export function mascararCpf(cpf = '') {
  const digitos = limparCpf(cpf);
  return `***.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-**`;
}
