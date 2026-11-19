// O que a pessoa recebe e por onde (página Configurações).
// - CANAIS_AVISO: por onde o app avisa (o detalhe do e-mail e do SMS vem da conta);
// - TIPOS_AVISO: cada linha da seção Notificações, com os canais ligados por padrão.
// Os alertas de emergência ficam à parte: ligados por padrão, no app e por SMS.

export const CANAIS_AVISO = [
  { id: 'app', rotulo: 'No app', detalhe: 'No sino do app', icone: 'notifications' },
  { id: 'email', rotulo: 'E-mail', icone: 'mail' },
  { id: 'sms', rotulo: 'SMS', icone: 'sms' },
];

export const TIPOS_AVISO = [
  {
    id: 'pedidos',
    rotulo: 'Meus pedidos e os que você segue',
    icone: 'assignment',
    canais: ['app', 'email'],
  },
  { id: 'votacoes', rotulo: 'Votações novas e prazos', icone: 'how_to_vote', canais: ['app'] },
  {
    id: 'servicos',
    rotulo: 'Serviços e agendamentos',
    icone: 'event_available',
    canais: ['app', 'sms'],
  },
  { id: 'obras', rotulo: 'Obras que você segue', icone: 'construction', canais: ['app'] },
  {
    id: 'avisos',
    // O bairro entra no lugar de {bairro}
    rotulo: 'Avisos da prefeitura na {bairro}',
    icone: 'campaign',
    canais: ['app', 'email'],
  },
];

export const ALERTAS_PADRAO = { ligados: true, canais: ['app', 'sms'] };
