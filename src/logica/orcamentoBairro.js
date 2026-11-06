import { formatarValorCurto } from './formatos';
import { distribuirEmCem } from './orcamento';

// Contas do Orçamento do Bairro ("Prefeito por 5 minutos").
// A divisão é um objeto { idOpcao: valor em reais }.

// Escreve um valor do orçamento do bairro. Recebe 250000; devolve "R$ 250 mil" (0 vira "R$ 0").
export function textoValor(valor) {
  return formatarValorCurto(valor);
}

// Monta uma divisão com tudo zerado. Recebe as opções; devolve { idOpcao: 0 }.
export function divisaoZerada(opcoes) {
  return Object.fromEntries(opcoes.map((opcao) => [opcao.id, 0]));
}

// Divide o total igualmente entre as opções, respeitando o passo (ex.: de R$ 50 mil em R$ 50 mil).
// Recebe as opções, o total e o passo; devolve a divisão. Se a conta não fechar exata,
// os passos que sobram vão para as primeiras opções, para a soma bater com o total.
export function divisaoIgual(opcoes, total, passo) {
  const passos = Math.floor(total / passo);
  const base = Math.floor(passos / opcoes.length);
  const sobra = passos - base * opcoes.length;
  return Object.fromEntries(
    opcoes.map((opcao, indice) => [opcao.id, (base + (indice < sobra ? 1 : 0)) * passo]),
  );
}

// Soma os valores da divisão. Recebe a divisão; devolve o total distribuído em reais.
export function somarDivisao(divisao) {
  return Object.values(divisao).reduce((soma, valor) => soma + valor, 0);
}

// Resume a divisão para o quadro "Distribuídos".
// Recebe a divisão e o total disponível; devolve
// { distribuido, diferenca, situacao, percentual } em que situacao é
// "falta" (ainda sobra dinheiro), "passou" (passou do limite) ou "exato" (pronto para enviar)
// e diferenca é quanto falta ou quanto passou (sempre positivo).
export function resumirDivisao(divisao, total) {
  const distribuido = somarDivisao(divisao);
  let situacao = 'exato';
  if (distribuido < total) situacao = 'falta';
  if (distribuido > total) situacao = 'passou';
  return {
    distribuido,
    diferenca: Math.abs(total - distribuido),
    situacao,
    percentual: Math.min(100, Math.round((distribuido / total) * 100)),
  };
}

// Diz se a divisão pode ser enviada: todas as opções com valor válido e soma igual ao total.
// Recebe a divisão, as opções e o total; devolve true ou false.
export function divisaoValida(divisao, opcoes, total) {
  const valoresOk = opcoes.every((opcao) => {
    const valor = divisao[opcao.id];
    return Number.isFinite(valor) && valor >= 0 && valor <= total;
  });
  return valoresOk && somarDivisao(divisao) === total;
}

// Explica por que o botão "Enviar minha divisão" ainda não funciona.
// Recebe o resumo de resumirDivisao(); devolve a frase ou null se já pode enviar.
export function motivoSemEnvio(resumo) {
  if (resumo.situacao === 'falta') {
    return `Para enviar, distribua todo o dinheiro: ainda faltam ${textoValor(resumo.diferenca)}.`;
  }
  if (resumo.situacao === 'passou') {
    return `Para enviar, tire ${textoValor(resumo.diferenca)} de alguma melhoria.`;
  }
  return null;
}

// Compara a divisão da pessoa com a média dos vizinhos.
// Recebe a divisão e as opções (com mediaVizinhos); devolve, para cada opção,
// { ...opcao, voce, vizinhos } em percentuais inteiros. Os da pessoa somam exatamente 100.
export function compararComVizinhos(divisao, opcoes) {
  const voce = distribuirEmCem(opcoes.map((opcao) => divisao[opcao.id] ?? 0));
  return opcoes.map((opcao, indice) => ({
    ...opcao,
    voce: voce[indice],
    vizinhos: opcao.mediaVizinhos,
  }));
}
