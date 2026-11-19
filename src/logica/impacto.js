import { formatarNumero, pluralizar } from './formatos';

// Conta quantos itens de uma lista têm cada valor de um campo.
// Recebe a lista e o nome do campo; devolve um objeto { valor: quantidade }.
function contarPor(lista, campo) {
  return lista.reduce((contagem, item) => {
    contagem[item[campo]] = (contagem[item[campo]] ?? 0) + 1;
    return contagem;
  }, {});
}

// Soma os apoios de todos os pedidos.
// Recebe a lista de pedidos; devolve o total de apoios.
export function somarApoios(pedidos) {
  return pedidos.reduce((total, pedido) => total + pedido.apoios, 0);
}

// Monta os 6 indicadores da página Impacto a partir dos dados de exemplo do app.
// Recebe { pedidos, projetos, obras, servicos }; devolve uma lista de indicadores
// { id, icone, titulo, numero (texto), detalhe, barra }, em que "barra" (opcional) é a lista
// de segmentos { quantidade, cor, rotulo, claro } da minibarra.
export function montarIndicadores({ pedidos, projetos, obras, servicos }) {
  const porStatus = contarPor(pedidos, 'status');
  const status = (id) => porStatus[id] ?? 0;
  const resolvidos = status('concluida') + status('avaliada');
  const bairros = new Set(pedidos.map((pedido) => pedido.bairro)).size;

  // Votos: soma do Sim e do Não de cada votação (não existe abstenção)
  const votos = projetos.reduce(
    (total, projeto) => total + projeto.votosIniciais.sim + projeto.votosIniciais.nao,
    0,
  );
  const abertos = projetos.filter((projeto) => projeto.status === 'votacao-aberta').length;

  const porSituacao = contarPor(obras, 'situacao');
  const situacao = (id) => porSituacao[id] ?? 0;
  const comProblema = situacao('atrasada') + situacao('parada');
  const deOrigem = obras.filter((obra) => obra.origem).length;

  // Serviços que a pessoa pede pelo próprio app (formulário de solicitação)
  const pelosApp = servicos.filter((servico) => servico.tipo === 'solicitacao').length;

  return [
    {
      id: 'pedidos',
      icone: 'assignment',
      titulo: 'Pedidos',
      numero: formatarNumero(pedidos.length),
      detalhe: `${pluralizar(resolvidos, 'resolvido', 'resolvidos')}, ${pluralizar(status('recusada'), 'recusado', 'recusados')}`,
      barra: [
        { quantidade: status('enviada'), cor: 'cinza', rotulo: 'enviados' },
        { quantidade: status('em-analise'), cor: 'ambar', rotulo: 'em análise' },
        { quantidade: status('aprovada'), cor: 'azul', rotulo: 'aprovados' },
        { quantidade: status('em-execucao'), cor: 'azul', rotulo: 'em execução' },
        { quantidade: status('concluida'), cor: 'verde', rotulo: 'concluídos' },
        { quantidade: status('avaliada'), cor: 'verde', rotulo: 'avaliados' },
        { quantidade: status('recusada'), cor: 'vermelho', rotulo: 'recusados' },
      ],
    },
    {
      id: 'apoios',
      icone: 'volunteer_activism',
      titulo: 'Apoios',
      numero: formatarNumero(somarApoios(pedidos)),
      detalhe: `em ${pluralizar(bairros, 'bairro', 'bairros')}`,
    },
    {
      id: 'votos',
      icone: 'how_to_vote',
      titulo: 'Votos',
      numero: formatarNumero(votos),
      detalhe: `em ${pluralizar(projetos.length, 'projeto', 'projetos')}, ${pluralizar(abertos, 'aberto', 'abertos')}`,
    },
    {
      id: 'obras',
      icone: 'construction',
      titulo: 'Obras',
      numero: formatarNumero(obras.length),
      detalhe: `${situacao('no-prazo')} no prazo, ${comProblema} atrasadas ou paradas`,
      barra: [
        { quantidade: situacao('no-prazo'), cor: 'verde', rotulo: 'no prazo' },
        { quantidade: situacao('atrasada'), cor: 'ambar', rotulo: 'atrasadas' },
        { quantidade: situacao('parada'), cor: 'vermelho', rotulo: 'paradas' },
        { quantidade: situacao('concluida'), cor: 'verde', rotulo: 'concluídas', claro: true },
      ],
    },
    {
      id: 'do-pedido-a-obra',
      icone: 'call_merge',
      titulo: 'Do pedido à obra',
      numero: formatarNumero(deOrigem),
      detalhe: `${deOrigem === 1 ? 'obra nasceu' : 'obras nasceram'} de pedido ou votação`,
    },
    {
      id: 'servicos',
      icone: 'apps',
      titulo: 'Serviços',
      numero: formatarNumero(servicos.length),
      detalhe: `${pluralizar(pelosApp, 'pedido', 'pedidos')} pelo app`,
    },
  ];
}
