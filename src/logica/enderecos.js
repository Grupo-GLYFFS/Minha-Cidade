import { REGIOES } from '../dados/regioes';

// Deixa um texto pronto para comparar: sem acentos, em minúsculas e sem espaços extras.
// Recebe um texto (ex.: "  Rua  Joaquim Távora "); devolve "rua joaquim tavora".
export function normalizarTexto(texto = '') {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// Tira tudo que não é número do CEP. Recebe "04015-001"; devolve "04015001".
export function limparCep(cep = '') {
  return cep.replace(/\D/g, '').slice(0, 8);
}

// Aplica a máscara 00000-000 enquanto a pessoa digita.
// Recebe o texto digitado; devolve só números, com o hífen depois do 5º dígito.
export function formatarCep(texto = '') {
  const digitos = limparCep(texto);
  return digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
}

// Descobre a região da cidade a partir do bairro, usando a lista de REGIOES.
// Recebe o nome do bairro (com ou sem acento); devolve o nome da região ou null se não achar.
export function regiaoDoBairro(bairro) {
  const procurado = normalizarTexto(bairro);
  if (!procurado) return null;
  const regiao = REGIOES.find((r) => r.bairros.some((b) => normalizarTexto(b) === procurado));
  return regiao ? regiao.nome : null;
}
