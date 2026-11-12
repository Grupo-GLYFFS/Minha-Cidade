// Opções da página Perfil, em grupos. No celular, a aba Perfil é o único caminho até estas páginas.
// Cada opção tem rótulo, uma frase curta, o ícone (Material Symbols) e o caminho.
export const GRUPOS_PERFIL = [
  {
    id: 'conta',
    titulo: 'Minha conta',
    opcoes: [
      {
        rotulo: 'Meus pedidos e protocolos',
        descricao: 'Pedidos de melhoria e serviços que você pediu',
        icone: 'list_alt',
        caminho: '/perfil/pedidos',
      },
      {
        rotulo: 'Meus dados',
        descricao: 'Nome, celular e endereço',
        icone: 'badge',
        caminho: '/perfil/dados',
      },
      {
        rotulo: 'Acessibilidade',
        descricao: 'Tamanho da letra e alto contraste',
        icone: 'accessibility_new',
        caminho: '/perfil/acessibilidade',
      },
    ],
  },
  {
    id: 'ajuda',
    titulo: 'Ajuda',
    opcoes: [
      {
        rotulo: 'Telefones úteis',
        descricao: '156, Defesa Civil, SAMU e outros',
        icone: 'call',
        caminho: '/ajuda/telefones',
      },
      {
        rotulo: 'Perguntas frequentes',
        descricao: 'Dúvidas sobre o app e os serviços',
        icone: 'help',
        caminho: '/ajuda/perguntas',
      },
      {
        rotulo: 'Ouvidoria',
        descricao: 'Reclamações, elogios e sugestões',
        icone: 'campaign',
        caminho: '/servicos/ouvidoria',
      },
    ],
  },
  {
    id: 'sobre',
    titulo: 'Sobre o app',
    opcoes: [
      {
        rotulo: 'Como funciona',
        descricao: 'Do pedido à solução, passo a passo',
        icone: 'route',
        caminho: '/como-funciona',
      },
      {
        rotulo: 'Impacto',
        descricao: 'O problema que o app ajuda a resolver',
        icone: 'insights',
        caminho: '/impacto',
      },
      {
        rotulo: 'Equipe',
        descricao: 'Quem fez o Minha Prefeitura',
        icone: 'groups',
        caminho: '/equipe',
      },
      {
        rotulo: 'Privacidade dos dados',
        descricao: 'O que guardamos e como usamos',
        icone: 'lock',
        caminho: '/privacidade',
      },
      {
        rotulo: 'Componentes (desenvolvimento)',
        descricao: 'Cores, letras e peças do app, para revisar o visual',
        icone: 'palette',
        caminho: '/componentes',
      },
    ],
  },
];
