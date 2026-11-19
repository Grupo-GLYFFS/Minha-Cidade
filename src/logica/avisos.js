import { diaDaSemana, diasEntre } from './datas';

// "Hoje" das telas de avisos e alertas (sexta, 13 de novembro de 2026, regra 8).
// TODO: usar o HOJE de logica/datas.js quando ele passar para 13 de novembro
export const HOJE_AVISOS = '2026-11-13';

const MESES_CURTOS = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];
const DIAS_CURTOS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

// Escreve a data curta das listas. Recebe "2026-11-09"; devolve "9 nov".
export function dataCurta(data) {
  const [, mes, dia] = data.slice(0, 10).split('-').map(Number);
  return `${dia} ${MESES_CURTOS[mes - 1]}`;
}

// Escreve o dia ao lado da data na linha do tempo: "hoje", "ontem" ou o dia da semana.
// Recebe a data e o hoje; devolve o texto.
export function diaDaLinhaDoTempo(data, hoje = HOJE_AVISOS) {
  const dias = diasEntre(data, hoje);
  if (dias === 0) return 'hoje';
  if (dias === 1) return 'ontem';
  return DIAS_CURTOS[diaDaSemana(data)];
}

// Diz se um aviso ainda vale. Recebe o aviso e o hoje; devolve true ou false.
export function avisoValendo(aviso, hoje = HOJE_AVISOS) {
  return aviso.validoAte >= hoje;
}

// Escreve o prazo do aviso no cabeçalho do detalhe. Recebe o aviso; devolve
// "Até 30 nov · faltam 17 dias" (ou "último dia" / "falta 1 dia").
export function textoPrazo(aviso, hoje = HOJE_AVISOS) {
  const faltam = diasEntre(hoje, aviso.validoAte);
  let resto = `faltam ${faltam} dias`;
  if (faltam === 0) resto = 'último dia';
  if (faltam === 1) resto = 'falta 1 dia';
  return `Até ${dataCurta(aviso.validoAte)} · ${resto}`;
}

// Junta nomes numa frase: ["A", "B", "C"] vira "A, B e C".
export function juntarNomes(nomes) {
  if (nomes.length <= 1) return nomes.join('');
  return `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}`;
}

// Separa os avisos que valem num lugar, dos mais novos para os mais antigos.
// Recebe a lista e os nomes dos bairros do lugar (null = cidade: só os avisos da cidade toda).
// Os avisos do bairro são os que citam um dos bairros (os da cidade toda ficam na lista da cidade).
export function avisosDoLugar(avisos, bairros = null, hoje = HOJE_AVISOS) {
  return avisos
    .filter((aviso) => avisoValendo(aviso, hoje))
    .filter((aviso) =>
      bairros ? aviso.bairros.some((nome) => bairros.includes(nome)) : aviso.bairros.length === 0,
    )
    .sort((a, b) => b.data.localeCompare(a.data));
}

// Escolhe até 3 avisos parecidos com um aviso: primeiro os do mesmo assunto, depois os mais novos.
// Recebe o aviso aberto e a lista; devolve uma nova lista sem o próprio aviso.
export function avisosParecidos(aviso, avisos, hoje = HOJE_AVISOS) {
  const mesmoAssunto = (outro) => (outro.assunto.rotulo === aviso.assunto.rotulo ? 0 : 1);
  return avisos
    .filter((outro) => outro.id !== aviso.id && avisoValendo(outro, hoje))
    .sort((a, b) => mesmoAssunto(a) - mesmoAssunto(b) || b.data.localeCompare(a.data))
    .slice(0, 3);
}
