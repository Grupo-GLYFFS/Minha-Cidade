import { SITUACOES_OBRA } from '../dados/situacaoObra';

// Filtro "todas as situações" da lista de obras
export const TODAS_SITUACOES = 'todas';

// Procura os dados de uma situação de obra (rótulo, ícone e cores).
// Recebe o id (ex.: "atrasada"); devolve o objeto ou undefined.
export function buscarSituacaoObra(idSituacao) {
  return SITUACOES_OBRA.find((situacao) => situacao.id === idSituacao);
}

// Diz se a obra ainda não terminou (no prazo, atrasada ou parada). Recebe a obra; devolve true ou false.
export function obraEmAndamento(obra) {
  return obra.situacao !== 'concluida';
}

// Diz se a obra precisa de atenção (atrasada ou parada). Recebe a obra; devolve true ou false.
export function obraComProblema(obra) {
  return obra.situacao === 'atrasada' || obra.situacao === 'parada';
}

// Filtra as obras pela região e pela situação escolhidas.
// Recebe a lista e { regiao, situacao } (região vazia ou situação "todas" não filtram);
// devolve uma nova lista: primeiro as que precisam de atenção, depois as mais adiantadas.
export function filtrarObras(obras, { regiao, situacao }) {
  return obras
    .filter((obra) => !regiao || obra.regiao === regiao)
    .filter((obra) => !situacao || situacao === TODAS_SITUACOES || obra.situacao === situacao)
    .sort(
      (a, b) =>
        Number(obraComProblema(b)) - Number(obraComProblema(a)) ||
        // Concluídas vão para o fim
        Number(obraEmAndamento(b)) - Number(obraEmAndamento(a)) ||
        b.percentual - a.percentual,
    );
}

// Soma os números do resumo da lista de obras.
// Recebe a lista; devolve { valorTotal, valorPago, emAndamento, comProblema }.
export function resumirObras(obras) {
  return {
    valorTotal: obras.reduce((soma, obra) => soma + obra.valorTotal, 0),
    valorPago: obras.reduce((soma, obra) => soma + obra.valorPago, 0),
    emAndamento: obras.filter(obraEmAndamento).length,
    comProblema: obras.filter(obraComProblema).length,
  };
}

// Conta as obras ainda não concluídas de um bairro. Recebe a lista e o nome do bairro.
export function contarObrasDoBairro(obras, bairro) {
  return obras.filter((obra) => obra.bairro === bairro && obraEmAndamento(obra)).length;
}

// Separa todas as obras de um bairro (em andamento e concluídas), na mesma ordem da lista
// de obras: primeiro as que precisam de atenção, depois as mais adiantadas, concluídas no fim.
// Recebe a lista e o nome do bairro; devolve uma nova lista.
export function obrasDoBairro(obras, bairro) {
  return filtrarObras(
    obras.filter((obra) => obra.bairro === bairro),
    { regiao: '', situacao: TODAS_SITUACOES },
  );
}

// Escolhe as obras para "Obras perto de você".
// Recebe a lista, a região da pessoa (null para visitante) e quantas mostrar.
// Com região: as obras em andamento da região. Sem região: as da cidade toda.
// Devolve as mais adiantadas primeiro.
export function obrasPerto(obras, regiao, quantidade = 3) {
  return obras
    .filter((obra) => obraEmAndamento(obra) && (!regiao || obra.regiao === regiao))
    .sort((a, b) => b.percentual - a.percentual)
    .slice(0, quantidade);
}

// Monta o link de onde a obra veio. Recebe a obra;
// devolve { texto, caminho, icone } ou null se a obra não veio de um pedido nem de um projeto votado.
export function origemDaObra(obra) {
  if (obra.origem?.tipo === 'pedido') {
    return {
      texto: 'Pedido de moradores',
      caminho: `/pedidos/${obra.origem.id}`,
      icone: 'campaign',
    };
  }
  if (obra.origem?.tipo === 'projeto') {
    return {
      texto: 'Projeto votado',
      caminho: `/minha-cidade/votacoes/${obra.origem.id}`,
      icone: 'how_to_vote',
    };
  }
  return null;
}

// Ordem dos grupos na lista de obras: primeiro as que precisam de atenção
const ORDEM_GRUPOS = ['atrasada', 'parada', 'no-prazo', 'concluida'];

// Procura uma obra pelo id. Recebe a lista e o id; devolve a obra ou undefined.
export function buscarObra(obras, idObra) {
  return obras.find((obra) => obra.id === idObra);
}

// Separa as obras do recorte do bairro: as da subprefeitura do bairro.
// Recebe a lista e o nome da subprefeitura (ex.: "Vila Mariana"); devolve uma nova lista.
export function obrasDaSubprefeitura(obras, subprefeitura) {
  return obras.filter((obra) => obra.subprefeitura === subprefeitura);
}

// Agrupa as obras pela situação, na ordem Atrasadas, Paradas, No prazo e Concluídas.
// Dentro do grupo, mantém a ordem da lista de dados.
// Recebe a lista; devolve [{ situacao, obras }] só com os grupos que têm obra.
export function agruparObras(obras) {
  return ORDEM_GRUPOS.map((id) => ({
    situacao: buscarSituacaoObra(id),
    obras: obras.filter((obra) => obra.situacao === id),
  })).filter((grupo) => grupo.obras.length > 0);
}

// Diz o dia da última atualização da obra (a mensagem mais nova). Recebe a obra; devolve a data ISO.
export function dataAtualizacao(obra) {
  return obra.atualizacoes?.[0]?.data ?? obra.inicio;
}

// Calcula quanto do valor da obra já foi pago, em %. Recebe a obra; devolve um inteiro de 0 a 100.
export function percentualPago(obra) {
  if (!obra.valorTotal) return 0;
  return Math.round((obra.valorPago / obra.valorTotal) * 100);
}

// Monta a frase da previsão que vai no pé do card da lista.
// Recebe a obra e as funções de data (dataPrevisao e dataLista, de datasTexto.js).
// Devolve, por exemplo, "Previsão 18 dez (era 30 out)", "Sem previsão, parada desde 17 ago"
// ou "Entregue em 30 set".
export function textoPrevisao(obra, { dataPrevisao, dataLista }) {
  if (obra.situacao === 'concluida') return `Entregue em ${dataLista(obra.previsaoFim)}`;
  if (obra.situacao === 'parada')
    return `Sem previsão, parada desde ${dataLista(obra.paradaDesde)}`;
  const nova = `Previsão ${dataPrevisao(obra.previsaoFim)}`;
  if (obra.previsaoAnterior) return `${nova} (era ${dataPrevisao(obra.previsaoAnterior)})`;
  return nova;
}

// Monta as etapas da obra para a linha do tempo do detalhe.
// Recebe a obra e as funções de data (dataDetalhe e dataLista, de datasTexto.js).
// Devolve [{ id, rotulo, estado ("feita" | "atual" | "futura"), data, texto, icone }].
export function etapasDaObra(obra, { dataDetalhe, dataLista }) {
  const atualizacoes = obra.atualizacoes ?? [];
  const primeira = atualizacoes[atualizacoes.length - 1];
  const ultima = atualizacoes[0];
  const comecou = {
    id: 'comecou',
    rotulo: 'Começou',
    estado: 'feita',
    data: dataDetalhe(obra.inicio),
    texto: primeira?.texto,
  };

  if (obra.situacao === 'concluida') {
    return [
      comecou,
      {
        id: 'obra',
        rotulo: 'Em obra',
        estado: 'feita',
        data: `${dataLista(obra.inicio)} a ${dataLista(obra.previsaoFim)}`,
      },
      {
        id: 'entrega',
        rotulo: 'Entregue',
        estado: 'feita',
        data: dataDetalhe(obra.previsaoFim),
        texto: ultima?.texto,
      },
    ];
  }

  if (obra.situacao === 'parada') {
    return [
      comecou,
      {
        id: 'obra',
        rotulo: 'Em obra',
        estado: 'feita',
        data: `Até ${dataDetalhe(obra.paradaDesde)}, com ${obra.percentual}% feita`,
      },
      {
        id: 'parada',
        rotulo: 'Parada',
        estado: 'atual',
        icone: 'pause',
        data: `Desde ${dataDetalhe(obra.paradaDesde)}`,
        texto: obra.motivo,
      },
      { id: 'entrega', rotulo: 'Entrega', estado: 'futura' },
    ];
  }

  return [
    comecou,
    {
      id: 'obra',
      rotulo: 'Em obra',
      estado: 'atual',
      data: `${obra.percentual}% feita`,
      texto: ultima?.texto,
    },
    { id: 'entrega', rotulo: 'Entrega', estado: 'futura' },
  ];
}
