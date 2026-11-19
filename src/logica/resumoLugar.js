import { ALERTAS } from '../dados/alertas';
import { AVISOS } from '../dados/avisos';
import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { alertasDoLugar } from './alertas';
import { avisosDoLugar } from './avisos';
import { estaAberto } from './pedidos';
import { projetosEmVotacao } from './votacao';
import { contarObrasEmAndamento, obrasDoRecorte, votacoesDoRecorte } from './recorte';

// Situações de obra que contam como "em andamento" (parada e concluída não contam)
const OBRA_EM_ANDAMENTO = ['no-prazo', 'atrasada'];

// Escreve uma quantidade com a palavra no singular ou no plural.
// Recebe o número e as duas formas; devolve "1 aberta" ou "3 abertas".
export function contar(numero, singular, plural) {
  return `${numero} ${numero === 1 ? singular : plural}`;
}

// Meta de um card que leva a uma lista: o total da lista e, junto, quantos estão na situação
// que importa. Recebe o total, as formas do item (["obra", "obras"]), o número da parte, as
// formas da parte (["em andamento", "em andamento"]) e o "nenhum" do item ("nenhuma").
// Devolve "3 obras · 1 em andamento", "1 obra · nenhuma em andamento" ou "Nenhuma obra".
export function metaComTotal(total, item, parte, formasParte, nenhum) {
  if (total === 0) return `${nenhum[0].toUpperCase()}${nenhum.slice(1)} ${item[0]}`;
  const detalhe =
    parte === 0 ? `${nenhum} ${formasParte[0]}` : contar(parte, formasParte[0], formasParte[1]);
  return `${contar(total, item[0], item[1])} · ${detalhe}`;
}

// Diz se um item com bairro (pedido, obra) é do lugar. bairros = null vale para a cidade toda.
function noLugar(nomeBairro, bairros) {
  return !bairros || bairros.includes(nomeBairro);
}

// Conta o que acontece num lugar, para os cards "O que acontece" e "Bairros".
// Recebe os pedidos (do contexto, com os novos da pessoa) e os nomes dos bairros do lugar
// (null = cidade toda) e, para o bairro da pessoa, o recorte (logica/recorte.js): com ele,
// obras e votações seguem a regra do recorte, a mesma das páginas /meu-bairro/obras e /votacoes.
// Devolve { alertas, avisos, pedidos, obras, votacoes } com os números (alertas ativos, pedidos
// abertos, obras em andamento, votações abertas) e, para os cards, o total de cada lista
// ({ total: { alertas, pedidos, obras, votacoes } }).
export function resumirLugar(pedidos, bairros = null, recorte = null) {
  if (recorte) {
    const doLugar = resumirLugar(pedidos, bairros);
    const votacoesDaLista = votacoesDoRecorte(PROJETOS, recorte);
    return {
      ...doLugar,
      obras: contarObrasEmAndamento(OBRAS, recorte),
      votacoes: projetosEmVotacao(votacoesDaLista).length,
      total: {
        ...doLugar.total,
        obras: obrasDoRecorte(OBRAS, recorte).length,
        votacoes: votacoesDaLista.length,
      },
    };
  }
  const alertas = alertasDoLugar(ALERTAS, bairros);
  const pedidosDoLugar = pedidos.filter((p) => noLugar(p.bairro, bairros));
  const obrasDoLugar = OBRAS.filter((o) => noLugar(o.bairro, bairros));
  // Votações do lugar, abertas e encerradas. Cidade toda: só as da cidade (as de subprefeitura
  // ficam no recorte dela)
  const votacoesDaLista = PROJETOS.filter(
    (projeto) =>
      (!bairros && projeto.escopo === 'cidade') ||
      (bairros && projeto.bairros.some((b) => bairros.includes(b))),
  );
  return {
    alertas: alertas.ativos.length,
    avisos: avisosDoLugar(AVISOS, bairros).length,
    pedidos: pedidosDoLugar.filter(estaAberto).length,
    obras: obrasDoLugar.filter((o) => OBRA_EM_ANDAMENTO.includes(o.situacao)).length,
    votacoes: projetosEmVotacao(votacoesDaLista).length,
    total: {
      alertas: alertas.ativos.length + alertas.encerrados.length,
      pedidos: pedidosDoLugar.length,
      obras: obrasDoLugar.length,
      votacoes: votacoesDaLista.length,
    },
  };
}

// Monta os 6 cards de "O que acontece" de um lugar. Os cards de lista mostram o total da lista
// que abrem e, junto, a parte que importa ("2 obras · 1 em andamento").
// Recebe o resumo (de resumirLugar), a base das rotas ("/minha-cidade" ou "/meu-bairro"),
// o nome do card de pedidos e o percentual do orçamento pago (opcional).
// Devolve [{ id, icone, nome, meta, para, alerta }].
export function cardsAcontece(resumo, base, nomePedidos, percentualPago) {
  return [
    {
      id: 'alertas',
      icone: 'warning',
      nome: 'Alertas',
      meta: metaComTotal(
        resumo.total.alertas,
        ['alerta', 'alertas'],
        resumo.alertas,
        ['ativo', 'ativos'],
        'nenhum',
      ),
      para: `${base}/alertas`,
      alerta: resumo.alertas > 0,
    },
    {
      id: 'avisos',
      icone: 'campaign',
      nome: 'Avisos',
      meta: `${resumo.avisos} valendo`,
      para: `${base}/avisos`,
    },
    {
      id: 'pedidos',
      icone: 'assignment',
      nome: nomePedidos,
      meta: metaComTotal(
        resumo.total.pedidos,
        ['pedido', 'pedidos'],
        resumo.pedidos,
        ['aberto', 'abertos'],
        'nenhum',
      ),
      para: `${base}/pedidos`,
    },
    {
      id: 'obras',
      icone: 'construction',
      nome: 'Obras',
      meta: metaComTotal(
        resumo.total.obras,
        ['obra', 'obras'],
        resumo.obras,
        ['em andamento', 'em andamento'],
        'nenhuma',
      ),
      para: `${base}/obras`,
    },
    {
      id: 'votacoes',
      icone: 'how_to_vote',
      nome: 'Votações',
      meta: metaComTotal(
        resumo.total.votacoes,
        ['votação', 'votações'],
        resumo.votacoes,
        ['aberta', 'abertas'],
        'nenhuma',
      ),
      para: `${base}/votacoes`,
    },
    {
      id: 'orcamento',
      icone: 'payments',
      nome: 'Orçamento',
      meta: percentualPago ? `${percentualPago}% pago até outubro` : undefined,
      para: `${base}/orcamento`,
    },
  ];
}
