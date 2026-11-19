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
  // Cidade, subprefeitura e bairro
  ...subpaginas('/minha-cidade', [CIDADE], 'da cidade de São Paulo', [
    '/minha-cidade/alertas',
    '/minha-cidade/alertas/:id',
    '/minha-cidade/avisos',
    '/minha-cidade/avisos/:id',
    '/minha-cidade/pedidos',
    '/minha-cidade/pedidos/:id',
    '/minha-cidade/obras',
    '/minha-cidade/obras/:id',
    '/minha-cidade/votacoes',
    '/minha-cidade/votacoes/:id',
    '/minha-cidade/orcamento',
  ]),
  ...subpaginas('/meu-bairro', BAIRRO, 'da Vila Mariana', [
    '/meu-bairro/alertas',
    '/meu-bairro/alertas/:id',
    '/meu-bairro/avisos',
    '/meu-bairro/avisos/:id',
    '/meu-bairro/pedidos',
    '/meu-bairro/pedidos/:id',
    '/meu-bairro/obras',
    '/meu-bairro/obras/:id',
    '/meu-bairro/votacoes',
    '/meu-bairro/votacoes/:id',
    '/meu-bairro/orcamento',
  ]),
];
