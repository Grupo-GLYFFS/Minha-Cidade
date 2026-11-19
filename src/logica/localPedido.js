import { BAIRROS_CIDADE } from '../dados/bairrosCidade';
import { SUBPREFEITURAS } from '../dados/subprefeituras';
import { normalizarTexto } from './enderecos';

// Nomes pelos quais cada bairro é conhecido: o do distrito e os apelidos do dia a dia
function nomesDoBairro(bairro) {
  return [bairro.nome, ...(bairro.apelidos ?? [])].map(normalizarTexto);
}

// Descobre a subprefeitura responsável por um bairro (os 96 de dados/bairrosCidade.js).
// Recebe o nome do bairro como a pessoa digitou ou como o ViaCEP devolveu;
// devolve o nome da subprefeitura (ex.: "Vila Mariana") ou "" se o app não conhece o bairro.
export function subprefeituraDoBairro(bairro) {
  const procurado = normalizarTexto(bairro);
  if (!procurado) return '';
  // Primeiro o nome igual; depois um nome que contém o bairro conhecido (ex.: "Jardim Vila Mariana").
  // Entre os parecidos vale o nome mais longo ("Vila Mariana" ganha de "Vila Maria").
  const igual = BAIRROS_CIDADE.find((item) => nomesDoBairro(item).includes(procurado));
  let parecido;
  let tamanho = 0;
  BAIRROS_CIDADE.forEach((item) => {
    nomesDoBairro(item).forEach((nome) => {
      if (procurado.includes(nome) && nome.length > tamanho) {
        parecido = item;
        tamanho = nome.length;
      }
    });
  });
  const achado = igual ?? parecido;
  if (!achado) return '';
  return SUBPREFEITURAS.find((sub) => sub.id === achado.subprefeitura)?.nome ?? '';
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
