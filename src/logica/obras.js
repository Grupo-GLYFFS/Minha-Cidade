import { SITUACOES_OBRA } from '../dados/situacaoObra';

// Procura os dados de uma situação de obra (rótulo, ícone e cores).
// Recebe o id (ex.: "atrasada"); devolve o objeto ou undefined.
export function buscarSituacaoObra(idSituacao) {
  return SITUACOES_OBRA.find((situacao) => situacao.id === idSituacao);
}

// Ordem dos grupos na lista de obras: primeiro as que precisam de atenção
const ORDEM_GRUPOS = ['atrasada', 'parada', 'no-prazo', 'concluida'];

// Procura uma obra pelo id. Recebe a lista e o id; devolve a obra ou undefined.
export function buscarObra(obras, idObra) {
  return obras.find((obra) => obra.id === idObra);
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
