// O que o app guarda neste navegador e o que ele nunca guarda (página Privacidade dos dados).

export const DADOS_GUARDADOS = [
  {
    icone: 'person',
    texto:
      'Sua conta: nome, e-mail, celular e endereço. A senha fica embaralhada (em hash), nunca como você digitou.',
  },
  { icone: 'list_alt', texto: 'Os pedidos que você abriu e os apoios que você deu.' },
  {
    icone: 'description',
    texto: 'Os serviços que você pediu pelo app e as respostas do formulário.',
  },
  { icone: 'how_to_vote', texto: 'Seus votos nos grandes projetos da Cidade Aberta.' },
  {
    icone: 'tune',
    texto: 'Sua divisão do Orçamento do Bairro (Prefeito por 5 minutos) e a data do envio.',
  },
  { icone: 'notifications', texto: 'Quais alertas você já leu.' },
  {
    icone: 'accessibility_new',
    texto: 'Suas preferências de acessibilidade e o jeito de ver a lista de pedidos.',
  },
];

export const DADOS_NAO_GUARDADOS = [
  { icone: 'account_circle', texto: 'A foto de perfil: ela só aparece na prévia do cadastro.' },
  {
    icone: 'receipt_long',
    texto: 'O comprovante de endereço: o app só confere o tipo e o tamanho do arquivo.',
  },
  {
    icone: 'photo_camera',
    texto: 'As fotos dos pedidos: fica só o nome do arquivo, a imagem não é guardada.',
  },
];
