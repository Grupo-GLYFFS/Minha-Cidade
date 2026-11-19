// Rotas do mapa do app (18/11) que ainda não têm tela.
// Cada uma abre a PaginaEmConstrucao com o título, o ícone do cabeçalho e a trilha.
// Quando a tela ficar pronta, tire a rota daqui e coloque a página em App.jsx.
// TODO: esvaziar esta lista

// Primeiros níveis da trilha da cidade e do bairro do usuário
const CIDADE = { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' };
const BAIRRO = [
  CIDADE,
  { rotulo: 'Subprefeitura Vila Mariana', para: '/minha-cidade/subprefeituras/vila-mariana' },
  { rotulo: 'Vila Mariana', para: '/meu-bairro' },
];

// Subpáginas que existem na cidade e no bairro: [caminho, título, ícone]
const SUBPAGINAS = [
  ['alertas', 'Alertas', 'warning'],
  ['avisos', 'Avisos', 'campaign'],
  ['pedidos', 'Pedidos', 'assignment'],
  ['obras', 'Obras', 'construction'],
  ['votacoes', 'Votações', 'how_to_vote'],
  ['orcamento', 'Orçamento', 'payments'],
];

// Monta a lista e o detalhe de uma subpágina da cidade ou do bairro
function subpaginas(base, trilhaBase, sufixo, jaExistem) {
  return SUBPAGINAS.flatMap(([caminho, titulo, icone]) => {
    const lista = {
      caminho: `${base}/${caminho}`,
      titulo: `${titulo} ${sufixo}`,
      icone,
      trilha: [...trilhaBase, { rotulo: titulo }],
    };
    const detalhe = {
      caminho: `${base}/${caminho}/:id`,
      titulo: `Detalhe: ${titulo.toLowerCase()}`,
      icone,
      trilha: [
        ...trilhaBase,
        { rotulo: titulo, para: `${base}/${caminho}` },
        { rotulo: 'Detalhe' },
      ],
    };
    // Páginas antigas que já atendem a rota não entram aqui
    return [lista, detalhe].filter((pagina) => !jaExistem.includes(pagina.caminho));
  });
}

export const PAGINAS_EM_CONSTRUCAO = [
  // Global Solution
  { caminho: '/', titulo: 'Global Solution', icone: 'school' },
  { caminho: '/como-funciona', titulo: 'Como funciona', icone: 'route' },
  { caminho: '/impacto', titulo: 'Impacto', icone: 'insights' },
  { caminho: '/equipe', titulo: 'Equipe', icone: 'groups' },
  // Conta (sem trilha)
  {
    caminho: '/servicos/minhas-solicitacoes',
    titulo: 'Minhas solicitações',
    icone: 'event_available',
  },
  { caminho: '/perfil/votos', titulo: 'Meus votos', icone: 'how_to_vote' },
  { caminho: '/notificacoes', titulo: 'Notificações', icone: 'notifications' },
  { caminho: '/configuracoes', titulo: 'Configurações', icone: 'settings' },
  // Cidade, subprefeitura e bairro
  {
    caminho: '/minha-cidade/subprefeituras/:id',
    titulo: 'Subprefeitura',
    icone: 'account_balance',
    trilha: [CIDADE, { rotulo: 'Subprefeitura' }],
  },
  {
    caminho: '/minha-cidade/bairros/:id',
    titulo: 'Bairro',
    icone: 'home_pin',
    trilha: [CIDADE, { rotulo: 'Bairro' }],
  },
  ...subpaginas('/minha-cidade', [CIDADE], 'da cidade de São Paulo', [
    '/minha-cidade/alertas',
    '/minha-cidade/pedidos',
    '/minha-cidade/pedidos/:id',
    '/minha-cidade/obras',
    '/minha-cidade/votacoes',
    '/minha-cidade/votacoes/:id',
    '/minha-cidade/orcamento',
  ]),
  ...subpaginas('/meu-bairro', BAIRRO, 'da Vila Mariana', [
    '/meu-bairro/pedidos',
    '/meu-bairro/pedidos/:id',
    '/meu-bairro/orcamento',
  ]),
];
