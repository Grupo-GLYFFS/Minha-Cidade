// Variáveis de cor do global.css, com o uso de cada uma.
// "texto: true" marca as cores usadas em texto: a página calcula o contraste delas
// sobre o fundo indicado em "sobre" (padrão: --cor-superficie, o branco dos cartões).
export const CORES_GLOBAIS = [
  { nome: '--cor-fundo', uso: 'Fundo das telas' },
  { nome: '--cor-superficie', uso: 'Fundo de cartões, barras e campos' },
  { nome: '--cor-borda', uso: 'Borda de cartões e divisórias' },
  { nome: '--cor-borda-campo', uso: 'Borda de campos e caixas de busca' },
  { nome: '--cor-borda-destaque', uso: 'Borda de cartão clicável com o mouse em cima' },
  { nome: '--cor-texto-suave', uso: 'Textos de apoio, datas e descrições', texto: true },
  { nome: '--cor-foco', uso: 'Contorno do foco do teclado' },
  { nome: '--cor-link', uso: 'Links e textos azuis', texto: true },
  {
    nome: '--cor-sobre-primaria',
    uso: 'Texto sobre o azul principal',
    texto: true,
    sobre: '--mantine-color-azul-6',
  },
  { nome: '--cor-azul-suave', uso: 'Fundo de ícones e destaques azuis' },
  { nome: '--cor-cinza-suave', uso: 'Fundo cinza neutro' },
  { nome: '--cor-erro', uso: 'Texto e borda de erro', texto: true },
  { nome: '--cor-erro-fundo', uso: 'Fundo de erro e de obra parada' },
  {
    nome: '--cor-contador',
    uso: 'Bolinha do contador de alertas (número branco por cima)',
    texto: true,
    sobre: '--cor-sobre-primaria',
  },
  { nome: '--cor-sucesso-fundo', uso: 'Fundo de sucesso e de obra no prazo' },
  { nome: '--cor-sucesso-borda', uso: 'Borda de avisos de sucesso' },
  {
    nome: '--cor-sucesso-texto',
    uso: 'Texto de sucesso',
    texto: true,
    sobre: '--cor-sucesso-fundo',
  },
  { nome: '--cor-aviso-fundo', uso: 'Faixa de alerta e obra atrasada' },
  { nome: '--cor-aviso-fundo-claro', uso: 'Fundo claro de aviso' },
  { nome: '--cor-aviso-icone', uso: 'Fundo do ícone de aviso' },
  { nome: '--cor-aviso-borda', uso: 'Borda de aviso' },
  { nome: '--cor-aviso-texto', uso: 'Texto de aviso', texto: true, sobre: '--cor-aviso-fundo' },
  { nome: '--cor-roxo-fundo', uso: 'Fundo roxo (status "Em execução")' },
  {
    nome: '--cor-roxo-texto',
    uso: 'Texto roxo e barra do "Não"',
    texto: true,
    sobre: '--cor-roxo-fundo',
  },
];

// Outras variáveis do global.css que não são cor
export const OUTRAS_VARIAVEIS = [
  { nome: '--pad', uso: 'Padding padrão (igual nos 4 lados)' },
  { nome: '--espessura-borda', uso: 'Espessura das bordas de cartões' },
  { nome: '--sombra', uso: 'Sombra leve dos cartões' },
  { nome: '--sombra-destaque', uso: 'Sombra de cartão clicável com o mouse em cima' },
  { nome: '--foco-contorno', uso: 'Contorno do foco do teclado' },
  { nome: '--foco-sombra', uso: 'Halo amarelo do foco (só no alto contraste)' },
  { nome: '--altura-abas', uso: 'Altura da barra de abas do celular' },
];
