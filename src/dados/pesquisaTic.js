// Dados da pesquisa TIC Governo Eletrônico 2023 (Cetic.br/NIC.br) usados em "Por que o app existe".
// Cada item é a porcentagem de prefeituras com site que permitem agendar atendimento pela internet.
// "destaque" marca a barra que mostra o problema (aparece em vermelho).
export const AGENDAMENTO_ONLINE = [
  {
    id: 'ate-10-mil',
    rotulo: 'Cidades com até 10 mil habitantes',
    porcentagem: 27,
    destaque: true,
  },
  {
    id: 'mais-500-mil',
    rotulo: 'Cidades com mais de 500 mil habitantes',
    porcentagem: 88,
    destaque: false,
  },
];

// Média geral: porcentagem de todas as prefeituras com site que permitem agendar pela internet
export const AGENDAMENTO_ONLINE_GERAL = 33;
