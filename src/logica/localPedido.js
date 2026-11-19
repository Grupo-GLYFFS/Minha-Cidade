import { SUBPREFEITURAS_DOS_BAIRROS } from '../dados/subprefeiturasDosBairros';
import { normalizarTexto } from './enderecos';

// Descobre a subprefeitura responsável por um bairro.
// Recebe o nome do bairro como a pessoa digitou ou como o ViaCEP devolveu;
// devolve o nome da subprefeitura (ex.: "Vila Mariana") ou "" se o app não conhece o bairro.
export function subprefeituraDoBairro(bairro) {
  const procurado = normalizarTexto(bairro);
  if (!procurado) return '';
  // Primeiro o nome igual; depois um nome que contém o bairro conhecido (ex.: "Jardim Vila Mariana")
  const igual = SUBPREFEITURAS_DOS_BAIRROS.find(
    (item) => normalizarTexto(item.bairro) === procurado,
  );
  const parecido = SUBPREFEITURAS_DOS_BAIRROS.find((item) =>
    procurado.includes(normalizarTexto(item.bairro)),
  );
  return (igual ?? parecido)?.subprefeitura ?? '';
}

// Escreve o nome completo da subprefeitura. Recebe "Vila Mariana"; devolve "Subprefeitura Vila Mariana".
export function nomeSubprefeitura(subprefeitura) {
  return subprefeitura ? `Subprefeitura ${subprefeitura}` : '';
}

// Monta o pedaço do endereço da página da subprefeitura.
// Recebe "Vila Mariana" ou "Santana/Tucuruvi"; devolve "vila-mariana" ou "santana-tucuruvi".
export function idSubprefeitura(subprefeitura) {
  return normalizarTexto(subprefeitura).replace(/[^a-z0-9]+/g, '-');
}

// Escreve a rua com o número. Recebe o pedido; devolve "Rua Domingos de Morais, 2200".
export function enderecoDoPedido(pedido) {
  return pedido.numero ? `${pedido.rua}, ${pedido.numero}` : pedido.rua;
}
