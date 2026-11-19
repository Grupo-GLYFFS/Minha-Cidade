import { HOJE, diaDaSemana, diasEntre } from './datas';

// Datas no formato da regra 8: listas "14 nov"; detalhes "sábado, 14 de novembro";
// hora "8h30"; relativas ("amanhã", "em 4 dias", "há 2 dias") só até 7 dias.

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

// Separa o dia e o mês de uma data ISO. Recebe "2026-11-14..."; devolve { dia: 14, mes: 11 }.
function partes(data) {
  const [, mes, dia] = data.slice(0, 10).split('-').map(Number);
  return { dia, mes };
}

// Data curta das listas. Recebe "2026-11-14"; devolve "14 nov".
export function formatarDiaMes(data) {
  const { dia, mes } = partes(data);
  return `${dia} ${MESES[mes - 1].slice(0, 3)}`;
}

// Dia e mês por extenso, sem o dia da semana. Recebe "2026-11-21"; devolve "21 de novembro".
export function formatarDiaMesExtenso(data) {
  const { dia, mes } = partes(data);
  return `${dia} de ${MESES[mes - 1]}`;
}

// Data dos detalhes. Recebe "2026-11-14"; devolve "sábado, 14 de novembro".
export function formatarDataDetalhe(data) {
  return `${DIAS[diaDaSemana(data.slice(0, 10))]}, ${formatarDiaMesExtenso(data)}`;
}

// Hora no formato do app. Recebe "08:30" ou uma data ISO com hora; devolve "8h30" (ou "16h").
export function formatarHora(texto) {
  const hora = texto.length > 5 ? texto.slice(11, 16) : texto;
  const [h, m] = hora.split(':').map(Number);
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
}

// Momento completo. Recebe uma data ISO com hora e o separador;
// devolve "terça, 3 de novembro · 20h15" (ou com ", " no lugar do " · ").
export function formatarMomento(dataHora, separador = ' · ') {
  return `${formatarDataDetalhe(dataHora)}${separador}${formatarHora(dataHora)}`;
}

// Distância até uma data em palavras, só até 7 dias para frente ou para trás.
// Recebe a data e o "hoje"; devolve "hoje", "amanhã", "em 4 dias", "ontem", "há 2 dias" ou "".
export function distanciaEmPalavras(data, hoje = HOJE) {
  const dias = diasEntre(hoje, data);
  if (dias === 0) return 'hoje';
  if (dias === 1) return 'amanhã';
  if (dias === -1) return 'ontem';
  if (dias > 1 && dias <= 7) return `em ${dias} dias`;
  if (dias < -1 && dias >= -7) return `há ${-dias} dias`;
  return '';
}

// Quanto falta até um prazo. Recebe a data do prazo e o "hoje";
// devolve "faltam 15 dias", "falta 1 dia", "vence hoje" ou "prazo vencido".
export function textoFaltam(data, hoje = HOJE) {
  const dias = diasEntre(hoje, data);
  if (dias < 0) return 'prazo vencido';
  if (dias === 0) return 'vence hoje';
  return dias === 1 ? 'falta 1 dia' : `faltam ${dias} dias`;
}

// Soma dias a uma data. Recebe "2026-11-13" e 15; devolve "2026-11-28".
export function somarDias(data, dias) {
  const [ano, mes, dia] = data.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia + dias)).toISOString().slice(0, 10);
}

// Data dos detalhes com "na" ou "no" na frente (sábado e domingo pedem "no").
// Recebe "2026-11-03"; devolve "na terça, 3 de novembro" (ou "no sábado, 14 de novembro").
export function naData(data) {
  const dia = diaDaSemana(data.slice(0, 10));
  const artigo = dia === 0 || dia === 6 ? 'no' : 'na';
  return `${artigo} ${formatarDataDetalhe(data)}`;
}
