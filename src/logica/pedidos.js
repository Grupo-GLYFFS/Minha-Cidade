import { STATUS_PEDIDO } from '../dados/statusPedido';
import { CATEGORIAS_PEDIDO } from '../dados/categoriasPedido';
import { HOJE, diasEntre, tempoRelativo } from './datas';
import { calcularPrioridade } from './prioridade';

// Procura os dados de um status (rótulo, cores, se está aberto).
// Recebe o id do status (ex.: "em-analise"); devolve o objeto do status ou undefined.
export function buscarStatus(idStatus) {
  return STATUS_PEDIDO.find((status) => status.id === idStatus);
}

// Procura os dados de uma categoria (rótulo, ícone, órgão).
// Recebe o id da categoria (ex.: "iluminacao"); devolve o objeto da categoria ou undefined.
export function buscarCategoria(idCategoria) {
  return CATEGORIAS_PEDIDO.find((categoria) => categoria.id === idCategoria);
}

// Diz se o pedido ainda está em andamento. Recebe o pedido; devolve true ou false.
export function estaAberto(pedido) {
  return buscarStatus(pedido.status)?.aberto ?? false;
}

// Separa os pedidos em andamento de uma pessoa, do mais recente para o mais antigo.
// Recebe a lista de pedidos e o id da pessoa; devolve uma nova lista.
export function pedidosAbertosDaPessoa(pedidos, idPessoa) {
  return pedidos
    .filter((pedido) => pedido.autorId === idPessoa && estaAberto(pedido))
    .sort((a, b) => b.atualizadoEm.localeCompare(a.atualizadoEm));
}

// Separa todos os pedidos de uma pessoa: primeiro os em andamento, depois os encerrados;
// em cada grupo, do mais recente para o mais antigo.
// Recebe a lista de pedidos e o id da pessoa; devolve uma nova lista.
export function pedidosDaPessoa(pedidos, idPessoa) {
  return pedidos
    .filter((pedido) => pedido.autorId === idPessoa)
    .sort(
      (a, b) =>
        Number(estaAberto(b)) - Number(estaAberto(a)) ||
        b.atualizadoEm.localeCompare(a.atualizadoEm),
    );
}

// Filtros da lista "Meus pedidos": todos, só os em andamento ou só os encerrados
export const SITUACOES_PEDIDO = [
  { value: 'todos', label: 'Todos' },
  { value: 'andamento', label: 'Em andamento' },
  { value: 'encerrados', label: 'Encerrados' },
];

// Filtra os pedidos pela situação escolhida.
// Recebe a lista e a situação ("todos", "andamento" ou "encerrados"); devolve uma nova lista.
export function filtrarPorSituacao(pedidos, situacao) {
  if (situacao === 'andamento') return pedidos.filter(estaAberto);
  if (situacao === 'encerrados') return pedidos.filter((pedido) => !estaAberto(pedido));
  return pedidos;
}

// Resume os pedidos em andamento de um bairro.
// Recebe a lista de pedidos e o nome do bairro; devolve { abertos } com a quantidade.
// (As obras do bairro vêm de Obras da Cidade, não dos pedidos.)
export function resumirPedidosDoBairro(pedidos, bairro) {
  return {
    abertos: pedidos.filter((pedido) => pedido.bairro === bairro && estaAberto(pedido)).length,
  };
}

// Escolhe os pedidos em andamento de um bairro, dos mais prioritários para os menos.
// Recebe a lista de pedidos, o nome do bairro e quantos devolver; devolve uma nova lista.
export function pedidosPrioritariosDoBairro(pedidos, bairro, quantidade = 3) {
  return pedidos
    .filter((pedido) => pedido.bairro === bairro && estaAberto(pedido))
    .sort((a, b) => calcularPrioridade(b) - calcularPrioridade(a))
    .slice(0, quantidade);
}

// Escreve quando o pedido mudou pela última vez.
// Recebe o pedido e a data de hoje; devolve "Enviado ontem" (se nunca mudou depois de criado)
// ou "Atualizado há 2 dias".
export function textoUltimaMudanca(pedido, hoje = HOJE) {
  const nuncaMudou = diasEntre(pedido.criadoEm, pedido.atualizadoEm) === 0;
  const verbo = nuncaMudou ? 'Enviado' : 'Atualizado';
  return `${verbo} ${tempoRelativo(pedido.atualizadoEm, hoje)}`;
}

// Aplica as mudanças de status guardadas (ex.: um pedido novo que passou para "em análise").
// Recebe a lista de pedidos e um objeto { idPedido: { status, atualizadoEm } };
// devolve uma nova lista com os status trocados.
export function aplicarMudancasStatus(pedidos, mudancas) {
  return pedidos.map((pedido) =>
    mudancas[pedido.id] ? { ...pedido, ...mudancas[pedido.id] } : pedido,
  );
}

// Procura um pedido pelo id. Recebe a lista e o id; devolve o pedido ou undefined.
export function buscarPedido(pedidos, idPedido) {
  return pedidos.find((pedido) => pedido.id === idPedido);
}
