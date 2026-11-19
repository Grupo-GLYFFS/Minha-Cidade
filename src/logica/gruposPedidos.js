import { estaAberto } from './pedidos';

// Grupos das listas de pedidos, na ordem em que aparecem (refino 1: agrupados por situação).
// - status: quais status entram no grupo; cor: bolinha do título (regra 7);
// - singular e plural: o fim do botão "Mostrar mais 3 pedidos em execução".
export const GRUPOS_PEDIDO = [
  {
    id: 'em-execucao',
    titulo: 'Em execução',
    status: ['em-execucao'],
    cor: 'azul',
    singular: 'em execução',
    plural: 'em execução',
  },
  {
    id: 'aprovados',
    titulo: 'Aprovados',
    status: ['aprovada'],
    cor: 'azul',
    singular: 'aprovado',
    plural: 'aprovados',
  },
  {
    id: 'em-analise',
    titulo: 'Em análise',
    status: ['em-analise'],
    cor: 'ambar',
    singular: 'em análise',
    plural: 'em análise',
  },
  {
    id: 'enviados',
    titulo: 'Enviados',
    status: ['enviada'],
    cor: 'cinza',
    singular: 'enviado',
    plural: 'enviados',
  },
  {
    id: 'encerrados',
    titulo: 'Encerrados',
    status: ['concluida', 'avaliada', 'recusada', 'cancelada'],
    cor: 'cinza',
    singular: 'encerrado',
    plural: 'encerrados',
  },
];

// Quantos pedidos cada grupo mostra antes do "Mostrar mais"
export const PEDIDOS_POR_GRUPO = 3;

// Separa os pedidos pelos grupos de situação, com os mais recentes primeiro em cada grupo.
// Recebe a lista de pedidos; devolve só os grupos que têm pedidos: [{ ...grupo, pedidos }].
export function agruparPorSituacao(pedidos) {
  const recentesPrimeiro = [...pedidos].sort((a, b) =>
    b.atualizadoEm.localeCompare(a.atualizadoEm),
  );
  return GRUPOS_PEDIDO.map((grupo) => ({
    ...grupo,
    pedidos: recentesPrimeiro.filter((pedido) => grupo.status.includes(pedido.status)),
  })).filter((grupo) => grupo.pedidos.length > 0);
}

// Escreve o texto do botão que mostra o resto do grupo.
// Recebe o grupo e quantos pedidos faltam; devolve "Mostrar mais 3 pedidos em execução".
export function textoMostrarMais(grupo, faltam) {
  return faltam === 1
    ? `Mostrar mais 1 pedido ${grupo.singular}`
    : `Mostrar mais ${faltam} pedidos ${grupo.plural}`;
}

// Separa os pedidos de um bairro. Recebe a lista e o nome do bairro; devolve uma nova lista.
export function pedidosDoBairro(pedidos, bairro) {
  return pedidos.filter((pedido) => pedido.bairro === bairro);
}

// Conta os pedidos em andamento de uma lista. Recebe a lista; devolve o número.
export function contarAbertos(pedidos) {
  return pedidos.filter(estaAberto).length;
}
