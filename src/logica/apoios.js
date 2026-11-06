import { estaAberto } from './pedidos';

// Frases que explicam por que a pessoa não pode apoiar um pedido.
export const MOTIVOS_SEM_APOIO = {
  proprio: 'Este pedido é seu',
  encerrado: 'Pedido encerrado',
  'ja-apoiou': 'Você apoiou',
};

// Descobre se a pessoa pode apoiar o pedido e, se não puder, por quê.
// Recebe o pedido, a lista de ids que a pessoa já apoiou e o id da pessoa;
// devolve null (pode apoiar) ou "proprio", "encerrado" ou "ja-apoiou".
export function motivoSemApoio(pedido, apoiados, idPessoa) {
  if (apoiados.includes(pedido.id)) return 'ja-apoiou';
  if (pedido.autorId === idPessoa) return 'proprio';
  // Concluído, avaliado ou recusado não recebe mais apoio
  if (!estaAberto(pedido)) return 'encerrado';
  return null;
}

// Diz se a pessoa pode apoiar o pedido. Recebe os mesmos dados de motivoSemApoio; devolve true ou false.
export function podeApoiar(pedido, apoiados, idPessoa) {
  return motivoSemApoio(pedido, apoiados, idPessoa) === null;
}

// Junta os apoios de todas as pessoas deste aparelho numa lista só.
// Recebe { idPessoa: [ids dos pedidos apoiados] }; devolve a lista de ids
// (um id aparece uma vez para cada pessoa que apoiou o pedido).
export function juntarApoios(apoiosPorPessoa) {
  return Object.values(apoiosPorPessoa).flat();
}

// Soma os apoios dados neste aparelho aos pedidos.
// Recebe a lista de pedidos e a lista de ids apoiados (com repetição, uma por pessoa);
// devolve uma nova lista com +1 apoio para cada vez que o id aparece.
export function aplicarApoios(pedidos, apoiados) {
  return pedidos.map((pedido) => {
    const novos = apoiados.filter((id) => id === pedido.id).length;
    return novos > 0 ? { ...pedido, apoios: pedido.apoios + novos } : pedido;
  });
}
