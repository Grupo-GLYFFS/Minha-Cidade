// Itens de navegação do topo e do rodapé (menu da regra 18).
// Ordem do menu: Serviços · Minha cidade ▾ · Meu bairro ▾ · Global Solution ▾.
// Não existe item "Início": o Início do app (/inicio) abre pelo logo.
// Itens com "painel" são grupos: o nome leva à página e a seta abre o painel.
// "ativoEm" lista os caminhos em que o item aparece como selecionado
// ("page" no próprio caminho, "true" nas subpáginas).

// Painel comum de Minha cidade e Meu bairro (o caminho base muda)
function painelRegiao(base) {
  return [
    { rotulo: 'Alertas', caminho: `${base}/alertas`, icone: 'warning' },
    { rotulo: 'Avisos', caminho: `${base}/avisos`, icone: 'campaign' },
    { rotulo: 'Pedidos', caminho: `${base}/pedidos`, icone: 'assignment' },
    { rotulo: 'Obras', caminho: `${base}/obras`, icone: 'construction' },
    { rotulo: 'Votações', caminho: `${base}/votacoes`, icone: 'how_to_vote' },
    { rotulo: 'Orçamento', caminho: `${base}/orcamento`, icone: 'payments' },
  ];
}

export const MENU_PRINCIPAL = [
  {
    id: 'servicos',
    rotulo: 'Serviços',
    caminho: '/servicos',
    // Minhas solicitações é página da conta: não marca Serviços
    ativoEm: ['/servicos/'],
    foraDe: ['/servicos/minhas-solicitacoes'],
  },
  {
    id: 'cidade',
    rotulo: 'Minha cidade',
    caminho: '/minha-cidade',
    // O detalhe do pedido fica em /pedidos/:id e é da cidade (Abrir pedido não marca nada)
    ativoEm: ['/minha-cidade/', '/pedidos/'],
    foraDe: ['/pedidos/novo'],
    rotuloSeta: 'Mais páginas de Minha cidade',
    painel: painelRegiao('/minha-cidade'),
  },
  {
    id: 'bairro',
    rotulo: 'Meu bairro',
    caminho: '/meu-bairro',
    ativoEm: ['/meu-bairro/'],
    rotuloSeta: 'Mais páginas de Meu bairro',
    painel: painelRegiao('/meu-bairro'),
  },
  {
    id: 'gs',
    rotulo: 'Global Solution',
    caminho: '/',
    ativoEm: ['/como-funciona', '/impacto', '/equipe'],
    rotuloSeta: 'Mais páginas da Global Solution',
    painel: [
      { rotulo: 'Como funciona', caminho: '/como-funciona', icone: 'route' },
      { rotulo: 'Impacto', caminho: '/impacto', icone: 'insights' },
      { rotulo: 'Equipe', caminho: '/equipe', icone: 'groups' },
    ],
  },
];

// Itens do menu da conta, abaixo do resumo (que leva a /perfil)
export const MENU_CONTA = [
  {
    rotulo: 'Minhas solicitações',
    caminho: '/servicos/minhas-solicitacoes',
    icone: 'event_available',
  },
  { rotulo: 'Meus pedidos', caminho: '/perfil/pedidos', icone: 'assignment' },
  { rotulo: 'Meus votos', caminho: '/perfil/votos', icone: 'how_to_vote' },
  { rotulo: 'O que você segue', caminho: '/perfil/seguindo', icone: 'bookmark' },
  { rotulo: 'Configurações', caminho: '/configuracoes', icone: 'settings' },
];

// Colunas de links do rodapé provisório
export const LINKS_RODAPE = [
  {
    titulo: 'Navegar',
    links: [
      { rotulo: 'Início', caminho: '/inicio' },
      { rotulo: 'Serviços', caminho: '/servicos' },
      { rotulo: 'Minha cidade', caminho: '/minha-cidade' },
      { rotulo: 'Meu bairro', caminho: '/meu-bairro' },
    ],
  },
  {
    titulo: 'Ajuda',
    links: [
      { rotulo: 'Perguntas frequentes', caminho: '/ajuda/perguntas-frequentes' },
      { rotulo: 'Telefones úteis', caminho: '/ajuda/telefones' },
      { rotulo: 'Acessibilidade', caminho: '/ajuda/acessibilidade' },
      { rotulo: 'Privacidade', caminho: '/ajuda/privacidade' },
    ],
  },
  {
    titulo: 'Sobre',
    links: [
      { rotulo: 'Como funciona', caminho: '/como-funciona' },
      { rotulo: 'Impacto', caminho: '/impacto' },
      { rotulo: 'Equipe', caminho: '/equipe' },
    ],
  },
];

// Diz como um item do menu aparece no caminho atual.
// Recebe o item e o caminho da página (ex.: "/minha-cidade/obras");
// devolve "page" (é a própria página do item), "true" (é uma subpágina) ou undefined.
export function estadoItemMenu(item, caminhoAtual) {
  if (caminhoAtual === item.caminho) return 'page';
  if (item.foraDe?.some((caminho) => caminhoAtual.startsWith(caminho))) return undefined;
  const subpagina = item.ativoEm.some(
    (caminho) => caminhoAtual === caminho || caminhoAtual.startsWith(caminho),
  );
  return subpagina ? 'true' : undefined;
}
