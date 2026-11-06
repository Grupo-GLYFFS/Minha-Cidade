// Data fixa que o app usa como "hoje", para os dados de exemplo ficarem sempre iguais.
export const HOJE = '2026-11-06';

const NOMES_DIAS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const UM_DIA_MS = 24 * 60 * 60 * 1000;

// Transforma uma data em número de dias, para comparar dias de calendário.
// Recebe um texto ISO ("2026-11-04" ou "2026-11-04T10:40:00-03:00"); devolve um número inteiro.
function emDias(data) {
  // Usa só a parte "AAAA-MM-DD", que já está no horário de Brasília
  const [ano, mes, dia] = data.slice(0, 10).split('-').map(Number);
  return Date.UTC(ano, mes - 1, dia) / UM_DIA_MS;
}

// Conta quantos dias de calendário vão de uma data até outra.
// Recebe as duas datas em texto ISO; devolve o número de dias (negativo se "fim" vier antes).
export function diasEntre(inicio, fim) {
  return emDias(fim) - emDias(inicio);
}

// Escreve há quanto tempo algo aconteceu, em linguagem simples.
// Recebe a data do acontecimento e a data de hoje; devolve "hoje", "ontem" ou "há N dias".
export function tempoRelativo(data, hoje = HOJE) {
  const dias = diasEntre(data, hoje);
  if (dias <= 0) return 'hoje';
  if (dias === 1) return 'ontem';
  return `há ${dias} dias`;
}

// Conta quantos dias faltam até uma data.
// Recebe a data final e a data de hoje; devolve o número de dias (0 se já passou).
export function diasAte(data, hoje = HOJE) {
  return Math.max(0, diasEntre(hoje, data));
}

// Diz o dia da semana de uma data. Recebe a data em texto ISO; devolve de 0 (domingo) a 6 (sábado).
export function diaDaSemana(data) {
  // 1º de janeiro de 1970 (dia 0) foi uma quinta-feira, por isso o "+ 4"
  return (((emDias(data) + 4) % 7) + 7) % 7;
}

// Descobre o próximo dia, a partir de hoje, que está em uma lista de dias da semana.
// Recebe os dias (0 = domingo ... 6 = sábado) e a data de hoje;
// devolve "Hoje", "Amanhã" ou o nome do dia (ex.: "Quinta-feira").
export function proximoDiaDaLista(dias, hoje = HOJE) {
  const diaHoje = diaDaSemana(hoje);
  // Testa hoje e os próximos 6 dias, até achar um que está na lista
  for (let distancia = 0; distancia < 7; distancia++) {
    const dia = (diaHoje + distancia) % 7;
    if (dias.includes(dia)) {
      if (distancia === 0) return 'Hoje';
      if (distancia === 1) return 'Amanhã';
      return NOMES_DIAS[dia];
    }
  }
  return '';
}

const NOMES_MESES = [
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

// Escreve uma data por extenso. Recebe um texto ISO; devolve, por exemplo, "4 de novembro de 2026".
export function formatarDataExtenso(data) {
  const [ano, mes, dia] = data.slice(0, 10).split('-').map(Number);
  return `${dia} de ${NOMES_MESES[mes - 1]} de ${ano}`;
}

// Monta o momento atual usando a data fixa de "hoje" e a hora do relógio.
// Recebe a data de hoje e um relógio (Date); devolve um texto ISO como "2026-11-06T14:05:00-03:00".
export function momentoDeHoje(hoje = HOJE, relogio = new Date()) {
  const doisDigitos = (numero) => String(numero).padStart(2, '0');
  const hora = `${doisDigitos(relogio.getHours())}:${doisDigitos(relogio.getMinutes())}:${doisDigitos(relogio.getSeconds())}`;
  return `${hoje}T${hora}-03:00`;
}
