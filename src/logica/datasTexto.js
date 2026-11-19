import { HOJE, diaDaSemana, diasEntre } from './datas';

// Datas escritas do jeito da regra 8 de consistência:
// listas "14 nov", detalhes "sábado, 14 de novembro", relativas ("há 2 dias") só dentro da semana.

const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

// Separa uma data ISO em números. Recebe "2026-11-14"; devolve { ano, mes, dia } (mes de 1 a 12).
function partes(data) {
  const [ano, mes, dia] = data.slice(0, 10).split('-').map(Number);
  return { ano, mes, dia };
}

// Escreve dia e mês curtos. Recebe "2026-11-14"; devolve "14 nov".
// Se o ano não for o de hoje, junta o ano: "4 mar 2027".
export function dataLista(data, hoje = HOJE) {
  const { ano, mes, dia } = partes(data);
  const texto = `${dia} ${MESES[mes - 1].slice(0, 3)}`;
  return ano === partes(hoje).ano ? texto : `${texto} ${ano}`;
}

// Escreve o dia da semana e a data curta. Recebe "2026-11-18"; devolve "quarta, 18 nov".
export function dataListaComDia(data) {
  return `${DIAS[diaDaSemana(data)]}, ${dataLista(data)}`;
}

// Escreve a data de um detalhe. Recebe "2026-11-14"; devolve "sábado, 14 de novembro".
// Se o ano não for o de hoje, junta o ano: "sexta, 28 de maio de 2027".
export function dataDetalhe(data, hoje = HOJE) {
  const { ano, mes, dia } = partes(data);
  const texto = `${DIAS[diaDaSemana(data)]}, ${dia} de ${MESES[mes - 1]}`;
  return ano === partes(hoje).ano ? texto : `${texto} de ${ano}`;
}

// Escreve dia e mês por extenso, sem dia da semana. Recebe "2026-12-04"; devolve "4 de dezembro".
export function dataDiaMes(data) {
  const { mes, dia } = partes(data);
  return `${dia} de ${MESES[mes - 1]}`;
}

// Escreve uma data de previsão, curta: no ano de hoje "11 dez"; em outro ano só "mar 2027".
export function dataPrevisao(data, hoje = HOJE) {
  const { ano, mes } = partes(data);
  if (ano === partes(hoje).ano) return dataLista(data, hoje);
  return `${MESES[mes - 1].slice(0, 3)} ${ano}`;
}

// Escreve há quanto tempo algo mudou: até 6 dias "hoje", "ontem" ou "há 3 dias";
// depois disso a data, com a preposição: "em 5 nov".
// Recebe a data e devolve o texto (sem a palavra antes, ex.: "Atualizada").
export function quandoMudou(data, hoje = HOJE) {
  const dias = diasEntre(data, hoje);
  if (dias <= 0) return 'hoje';
  if (dias === 1) return 'ontem';
  if (dias < 7) return `há ${dias} dias`;
  return `em ${dataLista(data, hoje)}`;
}

// Igual a quandoMudou, mas com a data do detalhe a partir de 7 dias: "em sexta, 30 de outubro".
export function quandoMudouDetalhe(data, hoje = HOJE) {
  const dias = diasEntre(data, hoje);
  if (dias < 7) return quandoMudou(data, hoje);
  return `em ${dataDetalhe(data, hoje)}`;
}
