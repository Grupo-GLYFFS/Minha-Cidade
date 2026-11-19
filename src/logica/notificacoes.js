import { diaDaSemana, diasEntre, formatarDataExtenso } from './datas';
import { formatarDataDetalhe, formatarHora } from './datasExtenso';

// Começo do endereço das notificações que falam de uma solicitação de serviço
const CAMINHO_SOLICITACAO = '/servicos/minhas-solicitacoes/';

// Atualiza as notificações de agendamento com a situação de agora da solicitação:
// cancelada pela pessoa ou remarcada para outro dia (o texto fixo do exemplo ficaria velho).
// Recebe as notificações e as solicitações da pessoa; devolve a lista nova (as outras iguais).
export function aplicarSituacaoDasSolicitacoes(notificacoes, solicitacoes) {
  return notificacoes.map((item) => {
    if (!item.para?.startsWith(CAMINHO_SOLICITACAO)) return item;
    const id = item.para.slice(CAMINHO_SOLICITACAO.length);
    const solicitacao = solicitacoes.find((s) => s.id === id);
    if (!solicitacao) return item;
    if (solicitacao.status === 'cancelada') {
      return {
        ...item,
        texto: 'Você cancelou este agendamento.',
        situacao: { cor: 'vermelho', rotulo: 'Cancelado' },
        acao: { rotulo: 'Ver a solicitação' },
      };
    }
    const remarcada = (solicitacao.historico ?? []).some((etapa) => etapa.rotulo === 'Remarcada');
    if (remarcada && solicitacao.agendamento) {
      const { data, hora, horaFim } = solicitacao.agendamento;
      // "às 8h30" ou, com hora de fim, "das 7h às 13h"
      const horario = horaFim
        ? `das ${formatarHora(hora)} às ${formatarHora(horaFim)}`
        : `às ${formatarHora(hora)}`;
      return {
        ...item,
        texto: `Remarcado para ${formatarDataDetalhe(data)}, ${horario}.`,
        situacao: { cor: 'azul', rotulo: 'Remarcado' },
      };
    }
    return item;
  });
}

// "Hoje" das notificações: sexta, 13 de novembro de 2026 (regra 8 das telas)
export const HOJE_NOTIFICACOES = '2026-11-13';

// Nome curto do dia da semana, usado no título de cada dia ("Quarta, 11 de novembro")
const DIAS_CURTOS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Escreve o dia sem o ano. Recebe "2026-11-11"; devolve "11 de novembro".
function diaEMes(data) {
  return formatarDataExtenso(data).replace(/ de \d{4}$/, '');
}

// Nome do dia no título do grupo. Recebe a data e o "hoje";
// devolve "Hoje", "Ontem" ou o dia da semana ("Quarta").
export function nomeDoDia(data, hoje = HOJE_NOTIFICACOES) {
  const dias = diasEntre(data, hoje);
  if (dias === 0) return 'Hoje';
  if (dias === 1) return 'Ontem';
  return DIAS_CURTOS[diaDaSemana(data)];
}

// Separa as notificações por dia, mantendo a ordem (mais novas primeiro).
// Recebe a lista e o "hoje"; devolve [{ data, nome: "Hoje", dia: "13 de novembro", itens }].
export function agruparPorDia(notificacoes, hoje = HOJE_NOTIFICACOES) {
  const grupos = [];
  notificacoes.forEach((item) => {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo?.data === item.data) {
      ultimo.itens.push(item);
      return;
    }
    grupos.push({
      data: item.data,
      nome: nomeDoDia(item.data, hoje),
      dia: diaEMes(item.data),
      itens: [item],
    });
  });
  return grupos;
}

// Hora mostrada na caixa do sino, que não agrupa por dia.
// Recebe a notificação e o "hoje"; devolve "8h", "ontem, 17h10" ou "11 de novembro, 14h20".
export function horaNaCaixa(notificacao, hoje = HOJE_NOTIFICACOES) {
  const dias = diasEntre(notificacao.data, hoje);
  if (dias === 0) return notificacao.hora;
  if (dias === 1) return `ontem, ${notificacao.hora}`;
  return `${diaEMes(notificacao.data)}, ${notificacao.hora}`;
}

// Monta o datetime da tag <time>. Recebe a notificação; devolve "2026-11-13T08:00".
export function dataHoraIso(notificacao) {
  const [horas, minutos = '00'] = notificacao.hora.split('h');
  return `${notificacao.data}T${horas.padStart(2, '0')}:${(minutos || '00').padStart(2, '0')}`;
}
