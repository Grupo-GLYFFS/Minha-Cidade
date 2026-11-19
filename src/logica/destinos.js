import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { AREAS_ORCAMENTO } from '../dados/orcamento';
import { obrasDaSubprefeitura } from './obras';
import { projetosEmVotacao, votacoesDoRecorte } from './votacao';
import { contaDaSubprefeitura, totalOrcamento, valorCurto } from './orcamento';
import { pluralizar } from './formatos';

// Cards do bloco "Para onde ir" das páginas de Obras, Votações e Orçamento.
// Cada função recebe o recorte (logica/recorte.js) e devolve { icone, titulo, meta, para },
// com um número de verdade na meta.

// Card das obras: conta as que estão em andamento (no prazo ou atrasadas).
export function destinoObras(recorte) {
  const obras =
    recorte.escopo === 'bairro' ? obrasDaSubprefeitura(OBRAS, recorte.subprefeitura.nome) : OBRAS;
  const emAndamento = obras.filter(
    (obra) => obra.situacao === 'no-prazo' || obra.situacao === 'atrasada',
  ).length;
  return {
    icone: 'construction',
    titulo: `Obras ${recorte.deQuem}`,
    meta: `${emAndamento} em andamento`,
    para: `${recorte.base}/obras`,
  };
}

// Card das votações: conta as abertas para votar.
export function destinoVotacoes(recorte, titulo = `Votações ${recorte.deQuem}`) {
  const abertas = projetosEmVotacao(votacoesDoRecorte(PROJETOS, recorte)).length;
  return {
    icone: 'how_to_vote',
    titulo,
    meta: `${pluralizar(abertas, 'aberta', 'abertas')} para votar`,
    para: `${recorte.base}/votacoes`,
  };
}

// Card do orçamento: mostra quanto já foi pago no ano.
export function destinoOrcamento(recorte) {
  const pago =
    recorte.escopo === 'bairro'
      ? contaDaSubprefeitura(recorte.subprefeitura, OBRAS).pago
      : totalOrcamento(AREAS_ORCAMENTO).gasto;
  return {
    icone: 'payments',
    titulo: `Orçamento ${recorte.deQuem}`,
    meta: `${valorCurto(pago)} pagos até outubro`,
    para: `${recorte.base}/orcamento`,
  };
}
