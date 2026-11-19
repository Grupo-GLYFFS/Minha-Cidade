import { ALERTAS } from '../dados/alertas';
import { AVISOS } from '../dados/avisos';
import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { alertasDoLugar } from './alertas';
import { avisosDoLugar } from './avisos';
import { estaAberto } from './pedidos';
import { projetosEmVotacao } from './votacao';
import { contarObrasEmAndamento, votacoesDoRecorte } from './recorte';

// Situações de obra que contam como "em andamento" (parada e concluída não contam)
const OBRA_EM_ANDAMENTO = ['no-prazo', 'atrasada'];

// Escreve uma quantidade com a palavra no singular ou no plural.
// Recebe o número e as duas formas; devolve "1 aberta" ou "3 abertas".
export function contar(numero, singular, plural) {
  return `${numero} ${numero === 1 ? singular : plural}`;
}

// Diz se um item com bairro (pedido, obra) é do lugar. bairros = null vale para a cidade toda.
function noLugar(nomeBairro, bairros) {
  return !bairros || bairros.includes(nomeBairro);
}

// Conta o que acontece num lugar, para os cards "O que acontece" e "Bairros".
// Recebe os pedidos (do contexto, com os novos da pessoa) e os nomes dos bairros do lugar
// (null = cidade toda) e, para o bairro da pessoa, o recorte (logica/recorte.js): com ele,
// obras e votações seguem a regra do recorte, a mesma das páginas /meu-bairro/obras e /votacoes.
// Devolve { alertas, avisos, pedidos, obras, votacoes } com os números.
export function resumirLugar(pedidos, bairros = null, recorte = null) {
  if (recorte) {
    return {
      ...resumirLugar(pedidos, bairros),
      obras: contarObrasEmAndamento(OBRAS, recorte),
      votacoes: projetosEmVotacao(votacoesDoRecorte(PROJETOS, recorte)).length,
    };
  }
  const votacoes = projetosEmVotacao(PROJETOS).filter(
    (projeto) =>
      // Cidade toda: só as votações da cidade (as de subprefeitura ficam no recorte dela)
      (!bairros && projeto.escopo === 'cidade') ||
      (bairros && projeto.bairros.some((b) => bairros.includes(b))),
  );
  return {
    alertas: alertasDoLugar(ALERTAS, bairros).ativos.length,
    avisos: avisosDoLugar(AVISOS, bairros).length,
    pedidos: pedidos.filter((p) => estaAberto(p) && noLugar(p.bairro, bairros)).length,
    obras: OBRAS.filter((o) => OBRA_EM_ANDAMENTO.includes(o.situacao) && noLugar(o.bairro, bairros))
      .length,
    votacoes: votacoes.length,
  };
}

// Monta os 6 cards de "O que acontece" de um lugar.
// Recebe o resumo (de resumirLugar), a base das rotas ("/minha-cidade" ou "/meu-bairro"),
// o nome do card de pedidos e o percentual do orçamento pago (opcional).
// Devolve [{ id, icone, nome, meta, para, alerta }].
export function cardsAcontece(resumo, base, nomePedidos, percentualPago) {
  return [
    {
      id: 'alertas',
      icone: 'warning',
      nome: 'Alertas',
      meta: contar(resumo.alertas, 'ativo', 'ativos'),
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
      meta: contar(resumo.pedidos, 'aberto', 'abertos'),
      para: `${base}/pedidos`,
    },
    {
      id: 'obras',
      icone: 'construction',
      nome: 'Obras',
      meta: `${resumo.obras} em andamento`,
      para: `${base}/obras`,
    },
    {
      id: 'votacoes',
      icone: 'how_to_vote',
      nome: 'Votações',
      meta: contar(resumo.votacoes, 'aberta', 'abertas'),
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
