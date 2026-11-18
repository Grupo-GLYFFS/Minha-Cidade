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
