// As 4 páginas da Global Solution, na ordem dos passos (Apresentação → Equipe).
// Cada página tem:
// - id, rotulo (nome no passo e nos botões), caminho e icone (no lugar do número do passo);
// - fim: o banner do fim da página (título e linha); a Apresentação não tem,
//   porque a faixa "Conheça o projeto" faz esse papel.
// Depois da Equipe, o banner leva ao app (FIM_GLOBAL_SOLUTION).
export const PAGINAS_GLOBAL_SOLUTION = [
  { id: 'apresentacao', rotulo: 'Apresentação', caminho: '/', icone: 'flag' },
  {
    id: 'como-funciona',
    rotulo: 'Como funciona',
    caminho: '/como-funciona',
    icone: 'route',
    fim: { titulo: 'Próxima: Impacto', linha: 'O que a demonstração mostra e o que o app muda.' },
  },
  {
    id: 'impacto',
    rotulo: 'Impacto',
    caminho: '/impacto',
    icone: 'insights',
    fim: { titulo: 'Próxima: Equipe', linha: 'Grupo GLYFFS: quem fez o projeto e o pitch.' },
  },
  {
    id: 'equipe',
    rotulo: 'Equipe',
    caminho: '/equipe',
    icone: 'groups',
    fim: {
      titulo: 'Agora, abra o app',
      linha: 'O Início da Maria, na Vila Mariana, com dados de exemplo.',
    },
  },
];

// Destino do botão "Próxima" na última página: o Início do app
export const FIM_GLOBAL_SOLUTION = { rotulo: 'Abrir o app', caminho: '/inicio' };
