// Itens de navegação do app.
// O celular agrupa tudo em 5 abas; o computador mostra as opções separadas no cabeçalho.
// "ativoEm" lista os caminhos em que o item aparece como selecionado.

export const ABAS_CELULAR = [
  { rotulo: 'Início', caminho: '/', icone: 'home', ativoEm: ['/'] },
  { rotulo: 'Busca', caminho: '/busca', icone: 'search', ativoEm: ['/busca', '/servicos'] },
  {
    rotulo: 'Cidade',
    caminho: '/cidade',
    icone: 'location_city',
    ativoEm: ['/cidade', '/pedidos', '/cidade-aberta', '/meu-bairro'],
  },
  { rotulo: 'Alertas', caminho: '/alertas', icone: 'notifications', ativoEm: ['/alertas'] },
  {
    rotulo: 'Perfil',
    caminho: '/perfil',
    icone: 'person',
    ativoEm: ['/perfil', '/como-funciona', '/impacto', '/equipe'],
  },
];

// Para o visitante, a aba Perfil vira "Entrar" (o caminho com o destino de volta é montado na tela)
export const ABA_ENTRAR = {
  rotulo: 'Entrar',
  caminho: '/entrar',
  icone: 'login',
  ativoEm: ['/entrar', '/criar-conta'],
};

export const MENU_COMPUTADOR = [
  { rotulo: 'Início', caminho: '/', ativoEm: ['/'] },
  { rotulo: 'Serviços', caminho: '/servicos', ativoEm: ['/servicos', '/busca'] },
  { rotulo: 'Pedidos', caminho: '/pedidos', ativoEm: ['/pedidos'] },
  { rotulo: 'Cidade Aberta', caminho: '/cidade-aberta', ativoEm: ['/cidade-aberta', '/cidade'] },
  { rotulo: 'Meu Bairro', caminho: '/meu-bairro', ativoEm: ['/meu-bairro'] },
];

export const LINKS_RODAPE = [
  {
    titulo: 'O app',
    links: [
      { rotulo: 'Como funciona', caminho: '/como-funciona' },
      { rotulo: 'Impacto', caminho: '/impacto' },
      { rotulo: 'Equipe', caminho: '/equipe' },
    ],
  },
  {
    titulo: 'Ajuda',
    links: [
      { rotulo: 'Telefones úteis', caminho: '/ajuda/telefones' },
      { rotulo: 'Perguntas frequentes', caminho: '/ajuda/perguntas' },
      { rotulo: 'Ouvidoria', caminho: '/ajuda/ouvidoria' },
    ],
  },
  {
    titulo: 'Acessibilidade',
    links: [
      { rotulo: 'Recursos de acessibilidade', caminho: '/perfil/acessibilidade' },
      { rotulo: 'Privacidade dos dados', caminho: '/privacidade' },
    ],
  },
];

// Diz se um item de navegação deve aparecer selecionado no caminho atual.
// Recebe o item e o caminho da página (ex.: "/pedidos/12"); devolve true ou false.
export function estaAtivo(item, caminhoAtual) {
  return item.ativoEm.some((caminho) =>
    // A página inicial só fica ativa no "/" exato; as outras valem para subpáginas também
    caminho === '/' ? caminhoAtual === '/' : caminhoAtual.startsWith(caminho),
  );
}
