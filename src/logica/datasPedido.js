// Datas escritas do jeito das telas de pedido (regra 8):
// listas "5 nov"; detalhes "quinta-feira, 5 de novembro"; hora "9h40".

const DIAS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];
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

// Separa ano, mês e dia de um texto ISO ("2026-11-05" ou com hora). Devolve [ano, mes, dia].
function partes(data) {
  return data.slice(0, 10).split('-').map(Number);
}

// Diz o dia da semana (0 = domingo). Recebe a data em texto ISO.
function diaDaSemana(data) {
  const [ano, mes, dia] = partes(data);
  return new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay();
}

// Escreve a data longa. Recebe "2026-11-05"; devolve "quinta-feira, 5 de novembro".
export function formatarDiaLongo(data) {
  const [, mes, dia] = partes(data);
  return `${DIAS[diaDaSemana(data)]}, ${dia} de ${MESES[mes - 1]}`;
}

// Escreve "na quinta-feira, 5 de novembro" ou "no domingo, 18 de outubro" (sábado e domingo usam "no").
export function formatarNoDia(data) {
  const fimDeSemana = [0, 6].includes(diaDaSemana(data));
  return `${fimDeSemana ? 'no' : 'na'} ${formatarDiaLongo(data)}`;
}

// Escreve a hora de um texto ISO com hora. Recebe "2026-11-06T09:40:00-03:00"; devolve "9h40".
export function formatarHora(momento) {
  const [hora, minuto] = momento.slice(11, 16).split(':').map(Number);
  return minuto === 0 ? `${hora}h` : `${hora}h${String(minuto).padStart(2, '0')}`;
}
