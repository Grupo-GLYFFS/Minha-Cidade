// O que o app guarda neste navegador e o que ele nunca guarda (página Privacidade).
// Cada item vira uma linha: ícone, rótulo e o detalhe à direita.

export const DADOS_GUARDADOS = [
  { icone: 'person', rotulo: 'Sua conta', detalhe: 'Nome, e-mail, celular e endereço' },
  { icone: 'key', rotulo: 'Senha', detalhe: 'Embaralhada, nunca como você digitou' },
  { icone: 'assignment', rotulo: 'Pedidos', detalhe: 'Os que você abriu, apoiou ou segue' },
  { icone: 'event_available', rotulo: 'Solicitações', detalhe: 'Serviços agendados e respostas' },
  { icone: 'how_to_vote', rotulo: 'Votos', detalhe: 'Em que você votou' },
  { icone: 'tune', rotulo: 'Preferências', detalhe: 'Letra, contraste e notificações' },
];

export const DADOS_NAO_GUARDADOS = [
  {
    icone: 'receipt_long',
    rotulo: 'Comprovante de endereço',
    detalhe: 'O app só confere o tipo e o tamanho',
  },
  { icone: 'photo_camera', rotulo: 'Fotos dos pedidos', detalhe: 'Fica só o nome do arquivo' },
];
