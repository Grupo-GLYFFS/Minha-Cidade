// Escala de títulos usada nas telas, do maior para o menor.
// Os tamanhos vêm das props "fz" dos componentes: { base: celular, md: computador }.
// "exemplo" é um texto de verdade do app; "onde" diz em que componente aparece.
export const ESCALA_TITULOS = [
  {
    nivel: 'h1 de página',
    fz: { base: 30, md: 32 },
    fw: 800,
    lh: 1.15,
    lts: '-0.02em',
    exemplo: 'Pedidos do bairro',
    onde: 'CabecalhoPagina, SaudacaoBusca',
  },
  {
    nivel: 'h1 de detalhe',
    fz: { base: 26, md: 32 },
    fw: 800,
    lh: 1.15,
    lts: '-0.02em',
    exemplo: 'Poste apagado há duas semanas',
    onde: 'CabecalhoDetalhe, CabecalhoProjeto',
  },
  {
    nivel: 'h2 de destaque',
    fz: { base: 20, md: 24 },
    fw: 800,
    lh: 1.25,
    lts: '-0.02em',
    exemplo: 'Por que o Minha Prefeitura existe',
    onde: 'PorQueExiste, DeCadaCem',
  },
  {
    nivel: 'h2 de seção',
    fz: { base: 18, md: 20 },
    fw: 700,
    lh: 1.3,
    lts: '-0.01em',
    exemplo: 'Meus pedidos em andamento',
    onde: 'SecaoCabecalho, GrupoOpcoesPerfil',
  },
  {
    nivel: 'h2 de cartão',
    fz: { base: 18, md: 18 },
    fw: 700,
    lh: 1.3,
    lts: 'normal',
    exemplo: 'Andamento',
    onde: 'LinhaDoTempoPedido, CartaoPrioridade',
  },
  {
    nivel: 'h3 de cartão',
    fz: { base: 16, md: 17 },
    fw: 700,
    lh: 1.3,
    lts: 'normal',
    exemplo: 'Buraco grande na faixa da direita',
    onde: 'CartaoPedido, CartaoObra, CartaoProjeto',
  },
];

// Tamanhos de texto do Mantine (o tema do app não muda estes valores)
export const TAMANHOS_TEXTO = [
  { id: 'xs', px: 12, uso: 'Notas de rodapé e fontes' },
  { id: 'sm', px: 14, uso: 'Textos de apoio e descrições' },
  { id: 'md', px: 16, uso: 'Texto padrão' },
  { id: 'lg', px: 18, uso: 'Texto em destaque' },
  { id: 'xl', px: 20, uso: 'Texto grande' },
];

// Pesos da fonte Plus Jakarta Sans usados no app
export const PESOS_FONTE = [
  { peso: 400, uso: 'Texto corrido' },
  { peso: 500, uso: 'Categoria e bairro nos cartões' },
  { peso: 600, uso: 'Links, rótulos e etiquetas' },
  { peso: 700, uso: 'Títulos de seção e de cartão' },
  { peso: 800, uso: 'Títulos de página e números grandes' },
];
