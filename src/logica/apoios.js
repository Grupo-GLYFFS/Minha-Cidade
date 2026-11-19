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
