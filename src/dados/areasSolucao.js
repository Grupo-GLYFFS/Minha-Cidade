// As 4 áreas do app na seção "A solução" da Apresentação (/).
// Campos: titulo, texto, link (texto do "Ver…"), para (rota),
// imagem (celular com a tela da área, em public/img/gs) e alt (o que a tela mostra).
// Em Serviços o texto começa pela quantidade de serviços do catálogo, que a página calcula.
export const AREAS_SOLUCAO = [
  {
    titulo: 'Serviços',
    texto: 'serviços por assunto, com busca',
    link: 'Ver os serviços',
    para: '/servicos',
    imagem: '/img/gs/celular-servicos.png',
    alt: 'Tela de Serviços no celular: busca e serviços de saúde, como agendar consulta na UBS e tomar vacina.',
  },
  {
    titulo: 'Pedidos de melhoria',
    texto: 'Buraco, poste, poda: do pedido até a entrega',
    link: 'Ver os pedidos',
    para: '/minha-cidade/pedidos',
    imagem: '/img/gs/celular-pedidos.png',
    alt: 'Tela de Pedidos da cidade no celular: três pedidos com a etapa de cada um e o botão Abrir pedido.',
  },
  {
    titulo: 'Minha cidade',
    texto: 'Orçamento, votações e obras',
    link: 'Ver a cidade',
    para: '/minha-cidade',
    imagem: '/img/gs/celular-cidade.png',
    alt: 'Tela da Cidade de São Paulo no celular: uma votação aberta, o orçamento pago e as obras.',
  },
  {
    titulo: 'Meu bairro',
    texto: 'Tudo o que acontece perto de casa',
    link: 'Ver o meu bairro',
    para: '/meu-bairro',
    imagem: '/img/gs/celular-bairro.png',
    alt: 'Tela da Vila Mariana no celular: alerta de chuva, mapa do bairro, um pedido, uma obra e um aviso.',
  },
];
