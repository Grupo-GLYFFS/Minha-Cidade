// Simulação da prefeitura recebendo o pedido (no protótipo não existe servidor).
// Alguns segundos depois de enviado, o pedido da pessoa passa de "enviada" para "em análise".
// O PedidosProvider cuida do relógio, então funciona mesmo se a pessoa mudar de página.
// Se a página for recarregada, o tempo continua contando a partir do envio (enviadoEmMs).

// Quanto tempo o pedido fica como "enviada" antes de entrar em análise
export const ESPERA_ANALISE_MS = 5000;

// Separa os pedidos da pessoa que ainda esperam a análise simulada.
// Recebe a lista de pedidos e o id da pessoa; devolve só os enviados por ela neste navegador.
export function pedidosEsperandoAnalise(pedidos, idPessoa) {
  return pedidos.filter(
    (pedido) =>
      pedido.autorId === idPessoa &&
      pedido.status === 'enviada' &&
      // Só os criados no app têm a hora real do envio; os de exemplo ficam como estão
      typeof pedido.enviadoEmMs === 'number',
  );
}

// Calcula quanto falta para o pedido entrar em análise.
// Recebe o pedido e o momento atual em milissegundos; devolve a espera (0 se já passou da hora).
export function tempoAteAnalise(pedido, agoraMs = Date.now()) {
  return Math.max(0, pedido.enviadoEmMs + ESPERA_ANALISE_MS - agoraMs);
}
