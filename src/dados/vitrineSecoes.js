// Seções da página de componentes (/componentes), na ordem da tela.
// "id" é a âncora do título (ex.: /componentes#cores); "subsecoes" aparecem no índice lateral.
export const SECOES_VITRINE = [
  { id: 'principios', rotulo: 'Princípios' },
  { id: 'cores', rotulo: 'Cores' },
  { id: 'tipografia', rotulo: 'Tipografia' },
  { id: 'espacamento', rotulo: 'Espaçamento e raios' },
  { id: 'icones', rotulo: 'Ícones' },
  {
    id: 'base',
    rotulo: 'Componentes base',
    subsecoes: [
      { id: 'base-botoes', rotulo: 'Botões' },
      { id: 'base-campos', rotulo: 'Campos' },
      { id: 'base-escolhas', rotulo: 'Escolhas' },
      { id: 'base-estrutura', rotulo: 'Abas, sanfona e menu' },
      { id: 'base-avisos', rotulo: 'Avisos e janelas' },
    ],
  },
  {
    id: 'app',
    rotulo: 'Componentes do app',
    subsecoes: [
      { id: 'app-layout', rotulo: 'Layout' },
      { id: 'app-navegacao', rotulo: 'Navegação' },
      { id: 'app-inicio', rotulo: 'Início' },
      { id: 'app-pedidos', rotulo: 'Pedidos' },
      { id: 'app-formularios', rotulo: 'Formulários' },
      { id: 'app-conta', rotulo: 'Conta' },
      { id: 'app-servicos', rotulo: 'Serviços' },
      { id: 'app-perfil', rotulo: 'Perfil' },
      { id: 'app-alertas', rotulo: 'Alertas e ajuda' },
      { id: 'app-cidade-aberta', rotulo: 'Cidade Aberta' },
      { id: 'app-orcamento', rotulo: 'Orçamento' },
      { id: 'app-meu-bairro', rotulo: 'Meu Bairro' },
      { id: 'app-fora', rotulo: 'Vistos só na página' },
    ],
  },
  { id: 'textos', rotulo: 'Padrões de texto' },
];
