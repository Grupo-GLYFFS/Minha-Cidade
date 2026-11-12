// Componentes que não aparecem soltos na página de componentes, com o motivo
// e onde vê-los funcionando de verdade.
export const FORA_DA_VITRINE = [
  {
    nome: 'LayoutApp',
    arquivo: 'src/componentes/LayoutApp.jsx',
    motivo: 'É a moldura desta própria página (cabeçalho, conteúdo, rodapé e abas).',
    caminho: '/',
  },
  {
    nome: 'CabecalhoDesktop, BarraAcessibilidade',
    arquivo: 'src/componentes/CabecalhoDesktop.jsx',
    motivo: 'Visível no topo desta página no computador. Repetir criaria outro menu principal.',
    caminho: '/',
  },
  {
    nome: 'Rodape',
    arquivo: 'src/componentes/Rodape.jsx',
    motivo: 'Visível no fim desta página no computador.',
    caminho: '/',
  },
  {
    nome: 'BarraAbas',
    arquivo: 'src/componentes/BarraAbas.jsx',
    motivo: 'Fica presa embaixo da tela do celular; visível nesta página com a tela estreita.',
    caminho: '/',
  },
  {
    nome: 'RotaProtegida',
    arquivo: 'src/componentes/RotaProtegida.jsx',
    motivo: 'Não desenha nada: só manda o visitante para "Entrar".',
    caminho: '/perfil',
  },
  {
    nome: 'PaginaProvisoria',
    arquivo: 'src/componentes/PaginaProvisoria.jsx',
    motivo: 'Tem o h1 da página. Usada em Como funciona, Impacto e Equipe.',
    caminho: '/como-funciona',
  },
  {
    nome: 'PaginaAjuda',
    arquivo: 'src/componentes/ajuda/PaginaAjuda.jsx',
    motivo: 'Moldura com o h1 das páginas de ajuda.',
    caminho: '/ajuda/telefones',
  },
  {
    nome: 'MolduraConta',
    arquivo: 'src/componentes/conta/MolduraConta.jsx',
    motivo: 'Moldura com o h1 das telas Entrar e Criar conta.',
    caminho: '/entrar',
  },
  {
    nome: 'SaudacaoBusca',
    arquivo: 'src/componentes/inicio/SaudacaoBusca.jsx',
    motivo: 'Tem o h1 do Início ("Olá, Maria").',
    caminho: '/',
  },
  {
    nome: 'AvisoSessao',
    arquivo: 'src/componentes/inicio/AvisoSessao.jsx',
    motivo: 'Só aparece depois de sair ou criar a conta (vem do estado da navegação).',
    caminho: '/',
  },
  {
    nome: 'SemFormulario, CatalogoNaoEncontrado',
    arquivo: 'src/componentes/formularioServico/SemFormulario.jsx',
    motivo: 'Têm o h1 da página (usam CabecalhoPagina).',
    caminho: '/servicos/nao-existe',
  },
  {
    nome: 'ConteudoBusca',
    arquivo: 'src/componentes/servicos/ConteudoBusca.jsx',
    motivo: 'Tem o h1 da Busca, muda o endereço (?q=) e leva o foco ao campo.',
    caminho: '/busca',
  },
  {
    nome: 'ListaPedidos',
    arquivo: 'src/componentes/pedidos/ListaPedidos.jsx',
    motivo: 'Grava os filtros no endereço e salva a visão escolhida no navegador.',
    caminho: '/pedidos',
  },
  {
    nome: 'AvisoDuplicado',
    arquivo: 'src/componentes/novoPedido/AvisoDuplicado.jsx',
    motivo: 'Leva o foco ao título ao aparecer e soma apoio de verdade.',
    caminho: '/pedidos/novo',
  },
  {
    nome: 'FormularioPedido (SecaoProblema, SecaoEndereco, SecaoFoto)',
    arquivo: 'src/componentes/novoPedido/FormularioPedido.jsx',
    motivo:
      'Precisa de conta e envia o pedido. As partes dele (GrupoOpcoes, CampoCep, CampoArquivo, TituloSecao) estão nesta página.',
    caminho: '/pedidos/novo',
  },
  {
    nome: 'SecoesCidadeAberta',
    arquivo: 'src/componentes/cidadeAberta/SecoesCidadeAberta.jsx',
    motivo: 'Junta CartaoArea, CartaoProjeto e CartaoObra, que estão nesta página.',
    caminho: '/cidade-aberta',
  },
  {
    nome: 'ApagarDados',
    arquivo: 'src/componentes/privacidade/ApagarDados.jsx',
    motivo: 'Apaga de verdade os dados do navegador. Não fica solto aqui por segurança.',
    caminho: '/privacidade',
  },
];
