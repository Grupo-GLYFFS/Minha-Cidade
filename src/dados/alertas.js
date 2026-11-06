// Avisos enviados para quem mora na região (Defesa Civil, saúde, serviços).
// "ativo" diz se o aviso ainda vale hoje; "regiao" vazia vale para a cidade toda.
export const ALERTAS = [
  {
    id: 'a-001',
    tipo: 'defesa-civil',
    titulo: 'Alerta da Defesa Civil',
    mensagem: 'chuva forte prevista para hoje à tarde na Zona Sul. Evite passar por ruas alagadas.',
    regiao: 'Zona Sul',
    ativo: true,
    criadoEm: '2026-11-06T07:30:00-03:00',
  },
  {
    id: 'a-002',
    tipo: 'saude',
    titulo: 'Campanha de vacinação',
    mensagem: 'vacina contra a gripe liberada para todas as idades nas UBS até 30 de novembro.',
    regiao: '',
    ativo: true,
    criadoEm: '2026-11-03T09:00:00-03:00',
  },
  {
    id: 'a-003',
    tipo: 'servico',
    titulo: 'Mudança na coleta',
    mensagem: 'por causa do feriado de 2 de novembro, a coleta comum passou para o dia seguinte.',
    regiao: 'Zona Sul',
    ativo: false,
    criadoEm: '2026-10-30T10:00:00-03:00',
  },
];
