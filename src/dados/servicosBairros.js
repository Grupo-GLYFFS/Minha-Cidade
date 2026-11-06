// UBS e dias de coleta dos bairros que o protótipo conhece.
// Bairros fora desta lista mostram "Consulte em Meu Bairro" (sem inventar dados).
// Dias da semana: 0 = domingo, 1 = segunda ... 6 = sábado.
export const SERVICOS_BAIRROS = [
  {
    bairro: 'Vila Mariana',
    ubs: 'UBS Vila Mariana',
    coleta: {
      comum: { dias: [1, 3, 5], horario: '19h' },
      seletiva: { dias: [4], horario: '8h' },
    },
  },
];
