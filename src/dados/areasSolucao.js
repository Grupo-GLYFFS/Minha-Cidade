// As 4 áreas do app na seção "A solução" da Apresentação (/).
// Campos: icone, titulo, texto e para (rota).
// Em Serviços o texto começa pela quantidade de serviços do catálogo, que a página calcula.
export const AREAS_SOLUCAO = [
  {
    icone: 'apps',
    titulo: 'Serviços',
    texto: 'serviços por assunto, com busca',
    para: '/servicos',
  },
  {
    icone: 'assignment',
    titulo: 'Pedidos de melhoria',
    texto: 'Buraco, poste, poda: do pedido até a entrega',
    para: '/minha-cidade/pedidos',
  },
  {
    icone: 'location_city',
    titulo: 'Minha cidade',
    texto: 'Orçamento, votações e obras',
    para: '/minha-cidade',
  },
  {
    icone: 'home_pin',
    titulo: 'Meu bairro',
    texto: 'Tudo o que acontece perto de casa',
    para: '/meu-bairro',
  },
];
