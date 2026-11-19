import { estaAberto } from './pedidos';

// Apoiar e Seguir um pedido (detalhe do pedido) e a regra do que a pessoa segue.
// Os dois ligam e desligam. Ficam guardados por pessoa no formato
// { idPessoa: { apoia: [ids], segue: [ids] } }.

// Monta o ponto de partida a partir dos exemplos de dados/pedidosAcompanhados.js.
// Recebe a lista de exemplos; devolve o objeto por pessoa.
export function acompanhamentosIniciais(exemplos) {
  const porPessoa = {};
  exemplos.forEach(({ idPessoa, idPedido, apoia, segue }) => {
    const daPessoa = porPessoa[idPessoa] ?? { apoia: [], segue: [] };
    if (apoia) daPessoa.apoia = [...daPessoa.apoia, idPedido];
    if (segue) daPessoa.segue = [...daPessoa.segue, idPedido];
    porPessoa[idPessoa] = daPessoa;
  });
  return porPessoa;
}

// Liga ou desliga um id numa lista. Recebe a lista e o id; devolve uma nova lista.
export function alternarNaLista(lista, id) {
  return lista.includes(id) ? lista.filter((item) => item !== id) : [...lista, id];
}

// Recalcula os apoios de cada pedido com o que as pessoas deste aparelho mudaram.
// Os apoios dos exemplos já estão somados nos dados; por isso eles são descontados antes.
// Recebe os pedidos, os acompanhamentos atuais e os exemplos; devolve uma nova lista.
export function aplicarAcompanhamentos(pedidos, acompanhamentos, exemplos) {
  const contar = (lista, id) => lista.filter((item) => item === id).length;
  const apoiosAgora = Object.values(acompanhamentos).flatMap((pessoa) => pessoa.apoia ?? []);
  const apoiosExemplo = exemplos.filter((item) => item.apoia).map((item) => item.idPedido);
  return pedidos.map((pedido) => {
    const diferenca = contar(apoiosAgora, pedido.id) - contar(apoiosExemplo, pedido.id);
    return diferenca === 0 ? pedido : { ...pedido, apoios: Math.max(0, pedido.apoios + diferenca) };
  });
}

// Diz por que a pessoa não pode apoiar nem seguir o pedido (ou null se pode).
// Recebe o pedido e o id da pessoa; devolve null, "proprio" ou "encerrado".
export function motivoSemAcompanhar(pedido, idPessoa) {
  if (idPessoa && pedido.autorId === idPessoa) return 'proprio';
  if (!estaAberto(pedido)) return 'encerrado';
  return null;
}

// Regra única do que a pessoa segue: entram só os itens em que ela marcou Seguir (votações,
// obras e pedidos, abertos ou encerrados). Apoiar é outra coisa e não entra aqui.
// Usada por O que você segue, Início, Meu perfil, Meus pedidos, Obras e Votações, para que
// as contagens batam em todo lugar.
// Recebe { projetos, obras, pedidos } (listas completas) e { votacoes, obras, pedidos } (ids
// seguidos). Devolve { votacoes, obras, pedidos, total }.
export function seguidosDaPessoa(listas, ids) {
  const votacoes = (listas.projetos ?? []).filter((item) => ids.votacoes?.includes(item.id));
  const obras = (listas.obras ?? []).filter((item) => ids.obras?.includes(item.id));
  const pedidos = (listas.pedidos ?? []).filter((item) => ids.pedidos?.includes(item.id));
  return { votacoes, obras, pedidos, total: votacoes.length + obras.length + pedidos.length };
}
