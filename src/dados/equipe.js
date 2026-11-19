// Integrantes do grupo GLFFYS, na página Equipe (/equipe).
// Campos: nome, rm (só os números), papel (o que a pessoa fez no projeto) e foto
// (public/img/equipe/<primeiro-nome>.jpg; sem o arquivo, o card mostra o ícone).
export const INTEGRANTES = [
  {
    nome: 'Felipe Santos',
    rm: '574050',
    papel: 'Design e protótipo',
    foto: 'img/equipe/felipe.jpg',
  },
  {
    nome: 'Samuel Almeida Santos',
    rm: '572554',
    papel: 'Páginas e menu',
    foto: 'img/equipe/samuel.jpg',
  },
  {
    nome: 'Gabriel de Lucca Chiapetta Santana',
    rm: '573610',
    papel: 'Simulação dos pedidos',
    foto: 'img/equipe/gabriel.jpg',
  },
  {
    nome: 'Leonardo de Lima Dias',
    rm: '569286',
    papel: 'Formulários e acessibilidade',
    foto: 'img/equipe/leonardo.jpg',
  },
  {
    nome: 'Fabricio Cardoso Nicoli',
    rm: '571627',
    papel: 'Pesquisa, README e pitch',
    foto: 'img/equipe/fabricio.jpg',
  },
];

// Links do card "Pitch".
// - repositorio: endereço do código no GitHub;
// - video: link do vídeo do pitch. Enquanto for null, "Assistir ao pitch" fica desabilitado.
// TODO: colocar o link do vídeo quando estiver pronto.
export const LINKS_PITCH = {
  repositorio: 'https://github.com/Grupo-GLYFFS/Minha-Cidade',
  video: null,
};
