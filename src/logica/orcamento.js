import { SUBPREFEITURAS } from '../dados/subprefeituras';
import { ORCAMENTO_SUBPREFEITURAS } from '../dados/subprefeiturasOrcamento';
import { bairrosDaSubprefeitura } from './lugares';

// Contas da página Orçamento da Cidade.

// Divide 100 entre vários valores, proporcionalmente, sem casas decimais e somando exatamente 100.
// Usa o método do maior resto: cada um fica com a parte inteira da sua fatia e as unidades que
// faltam para chegar a 100 vão, uma a uma, para quem tinha a maior parte quebrada.
// Recebe uma lista de números; devolve uma lista de inteiros na mesma ordem.
export function distribuirEmCem(valores) {
  const total = valores.reduce((soma, valor) => soma + valor, 0);
  if (total === 0) return valores.map(() => 0);

  const fatias = valores.map((valor, indice) => {
    const exata = (valor / total) * 100;
    return { indice, inteira: Math.floor(exata), resto: exata - Math.floor(exata) };
  });
  let faltam = 100 - fatias.reduce((soma, fatia) => soma + fatia.inteira, 0);

  // Entrega as unidades que faltam para as maiores partes quebradas
  const porResto = [...fatias].sort((a, b) => b.resto - a.resto);
  for (const fatia of porResto) {
    if (faltam === 0) break;
    fatia.inteira += 1;
    faltam -= 1;
  }
  return fatias.map((fatia) => fatia.inteira);
}

// Monta as linhas de "De cada R$ 100 gastos pela prefeitura".
// Recebe as áreas do orçamento; devolve as áreas com "deCem" (reais de cada R$ 100),
// da que recebe mais para a que recebe menos. A soma de "deCem" é sempre 100.
export function montarDeCadaCem(areas) {
  const partes = distribuirEmCem(areas.map((area) => area.previsto));
  return areas
    .map((area, indice) => ({ ...area, deCem: partes[indice] }))
    .sort((a, b) => b.deCem - a.deCem || b.previsto - a.previsto);
}

// Calcula quanto do previsto já foi gasto. Recebe a área; devolve o percentual inteiro (ex.: 82).
export function percentualGasto(area) {
  if (area.previsto === 0) return 0;
  return Math.round((area.gasto / area.previsto) * 100);
}

// Soma o previsto e o gasto de todas as áreas.
// Recebe as áreas; devolve { previsto, gasto, percentual }.
export function totalOrcamento(areas) {
  const previsto = areas.reduce((soma, area) => soma + area.previsto, 0);
  const gasto = areas.reduce((soma, area) => soma + area.gasto, 0);
  return { previsto, gasto, percentual: percentualGasto({ previsto, gasto }) };
}

// Confere os mínimos da Constituição (educação e saúde).
// Recebe os mínimos e as áreas do orçamento; devolve cada mínimo com "aplicado"
// (percentual inteiro do orçamento total que vai para a área) e "cumprido" (true ou false).
// A conta usa o orçamento total, para ficar simples; a regra oficial usa só a receita de impostos.
export function conferirMinimos(minimos, areas) {
  const { previsto: total } = totalOrcamento(areas);
  return minimos.map((minimo) => {
    const area = areas.find((item) => item.id === minimo.idArea);
    const exato = area && total > 0 ? (area.previsto / total) * 100 : 0;
    return { ...minimo, aplicado: Math.floor(exato), cumprido: exato >= minimo.minimo };
  });
}

// Junta cada subprefeitura (nome, de dados/subprefeituras.js) com os bairros dela
// (de dados/bairrosCidade.js) e os números do orçamento. O bairro com o mesmo nome da
// subprefeitura vem primeiro (ex.: Vila Mariana, Moema, Saúde).
// Não recebe nada; devolve [{ id, nome, bairros (nomes), custeio, custeioPago }].
export function subprefeiturasComOrcamento() {
  return SUBPREFEITURAS.map((sub) => {
    const numeros = ORCAMENTO_SUBPREFEITURAS.find((item) => item.id === sub.id) ?? { custeio: 0 };
    const bairros = bairrosDaSubprefeitura(sub.id)
      .map((bairro) => bairro.nome)
      .sort((a, b) => Number(b === sub.nome) - Number(a === sub.nome));
    return { id: sub.id, nome: sub.nome, bairros, ...numeros };
  });
}

// Verba que cada bairro recebe para os moradores decidirem, em reais
export const VERBA_POR_BAIRRO = 1000000;

// Parte do custeio paga até outubro quando a subprefeitura não tem o valor próprio
const PAGO_PADRAO = 0.79;

// Escreve um valor em reais bem curto, para extratos: "R$ 90,25 bi", "R$ 2,4 mi", "R$ 400 mil".
// Recebe o valor em reais; devolve o texto ("R$ 0" para zero).
export function valorCurto(valor) {
  const formatar = (numero, casas) =>
    numero.toLocaleString('pt-BR', { maximumFractionDigits: casas });
  if (valor >= 1e9) return `R$ ${formatar(valor / 1e9, 2)} bi`;
  if (valor >= 1e6) return `R$ ${formatar(valor / 1e6, 1)} mi`;
  if (valor >= 1e3) return `R$ ${formatar(valor / 1e3, 0)} mil`;
  return `R$ ${formatar(valor, 0)}`;
}

// Junta as fontes de receita nos grupos da conta, na ordem em que aparecem.
// Recebe as fontes; devolve [{ nome, previsto, arrecadado }].
export function agruparReceitas(fontes) {
  const grupos = [];
  fontes.forEach((fonte) => {
    let grupo = grupos.find((item) => item.nome === fonte.grupo);
    if (!grupo) {
      grupo = { nome: fonte.grupo, previsto: 0, arrecadado: 0 };
      grupos.push(grupo);
    }
    grupo.previsto += fonte.previsto;
    grupo.arrecadado += fonte.arrecadado;
  });
  return grupos;
}

// Soma um campo de uma lista. Recebe a lista e o nome do campo; devolve o total.
export function somar(lista, campo) {
  return lista.reduce((soma, item) => soma + (item[campo] ?? 0), 0);
}

// Separa as obras em andamento (não concluídas) de uma subprefeitura.
// Recebe as obras e o nome da subprefeitura; devolve uma nova lista.
function obrasEmAndamento(obras, nomeSubprefeitura) {
  return obras.filter(
    (obra) => obra.subprefeitura === nomeSubprefeitura && obra.situacao !== 'concluida',
  );
}

// Monta as linhas da comparação entre subprefeituras, da que tem mais custeio para a que tem menos.
// Recebe as subprefeituras e as obras; devolve cada uma com "emObras" e "verbaMoradores" (em reais).
export function compararSubprefeituras(subprefeituras, obras) {
  return [...subprefeituras]
    .sort((a, b) => b.custeio - a.custeio)
    .map((sub) => ({
      ...sub,
      emObras: somar(obrasEmAndamento(obras, sub.nome), 'valorTotal'),
      verbaMoradores: sub.bairros.length * VERBA_POR_BAIRRO,
    }));
}

// Monta a conta de uma subprefeitura: custeio, obras (uma linha por obra) e verba dos moradores.
// Recebe a subprefeitura e a lista de obras.
// Devolve { custeio: { previsto, pago }, obras, obrasPrevisto, obrasPago,
// verba: [{ bairro, valor }], verbaTotal, previsto, pago, percentual }.
export function contaDaSubprefeitura(sub, obras) {
  // As obras mais caras primeiro
  const daSub = obrasEmAndamento(obras, sub.nome).sort((a, b) => b.valorTotal - a.valorTotal);
  const custeio = {
    previsto: sub.custeio,
    pago: sub.custeioPago ?? Math.round(sub.custeio * PAGO_PADRAO),
  };
  const obrasPrevisto = somar(daSub, 'valorTotal');
  const obrasPago = somar(daSub, 'valorPago');
  // A verba dos moradores ainda não foi gasta: os moradores decidem o uso
  const verba = sub.bairros.map((bairro) => ({ bairro, valor: VERBA_POR_BAIRRO }));
  const verbaTotal = verba.length * VERBA_POR_BAIRRO;
  const previsto = custeio.previsto + obrasPrevisto + verbaTotal;
  const pago = custeio.pago + obrasPago;
  return {
    custeio,
    obras: daSub,
    obrasPrevisto,
    obrasPago,
    verba,
    verbaTotal,
    previsto,
    pago,
    percentual: Math.round((pago / previsto) * 100),
  };
}
