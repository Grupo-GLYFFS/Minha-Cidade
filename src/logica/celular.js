// Tira tudo que não é número do celular. Recebe "(11) 91234-5678"; devolve "11912345678".
export function limparCelular(celular = '') {
  return celular.replace(/\D/g, '').slice(0, 11);
}

// Aplica a máscara (11) 91234-5678 enquanto a pessoa digita.
// Recebe o texto digitado; devolve os números com parênteses, espaço e hífen nos lugares certos.
export function formatarCelular(texto = '') {
  const digitos = limparCelular(texto);
  if (digitos.length === 0) return '';
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

// Diz se o celular é válido: DDD de 11 a 99 (sem zero) e 9 dígitos começando com 9.
// Recebe o celular com ou sem máscara; devolve true ou false.
export function celularValido(celular = '') {
  return /^[1-9]{2}9\d{8}$/.test(limparCelular(celular));
}
