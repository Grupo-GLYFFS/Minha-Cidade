import { estaAberto } from './pedidos';
import { normalizarTexto } from './enderecos';

// Diz se dois pedidos falam do mesmo problema no mesmo lugar.
// Regra: mesma categoria, mesmo bairro e mesma rua (ignorando maiúsculas, acentos e espaços extras).
function mesmoProblema(a, b) {
  return (
    a.categoria === b.categoria &&
    normalizarTexto(a.bairro) === normalizarTexto(b.bairro) &&
    normalizarTexto(a.rua) === normalizarTexto(b.rua)
  );
}

// Procura um pedido aberto igual ao novo.
// Recebe o pedido novo (categoria, bairro, rua) e a lista atual;
// devolve o pedido que já existe ou undefined se não houver repetido.
export function buscarDuplicado(nova, pedidos) {
  return pedidos.find((pedido) => estaAberto(pedido) && mesmoProblema(pedido, nova));
}

// Verifica se a nova solicitação já existe na lista.
// Recebe a nova solicitação e a lista atual; devolve true se for repetida.
export function ehDuplicada(nova, pedidos) {
  return buscarDuplicado(nova, pedidos) !== undefined;
}
