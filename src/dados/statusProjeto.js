// Etapas de um projeto da Cidade Aberta (votação da população).
// As cores são da etiqueta: fundo claro e texto escuro, com contraste de pelo menos 4,5:1.
export const STATUS_PROJETO = [
  { id: 'votacao-aberta', rotulo: 'Votação aberta', corFundo: '#E3ECFF', corTexto: '#0040C2' },
  { id: 'em-estudo', rotulo: 'Em estudo', corFundo: '#EEF0F4', corTexto: '#3B4351' },
  { id: 'encerrada', rotulo: 'Votação encerrada', corFundo: '#DDF5E6', corTexto: '#126336' },
];

// O que aconteceu com o projeto depois que a votação acabou.
// "texto" vem antes da data (ex.: "Encaminhado à Câmara Municipal em 31/10/2026");
// "curto" vai no card da lista, antes da data curta (ex.: "Encaminhado à Câmara em 4 nov").
export const SITUACOES_PROJETO = [
  {
    id: 'encaminhado-camara',
    rotulo: 'Encaminhado à Câmara',
    texto: 'Encaminhado à Câmara Municipal em',
    curto: 'Encaminhado à Câmara em',
    icone: 'send',
  },
  {
    id: 'aprovado-camara',
    rotulo: 'Aprovado pela Câmara',
    texto: 'Aprovado pela Câmara Municipal em',
    curto: 'Aprovado pela Câmara em',
    icone: 'gavel',
  },
  {
    id: 'programa-comecou',
    rotulo: 'Programa começou',
    texto: 'O programa começou em',
    curto: 'Programa começou',
    icone: 'event_available',
  },
];
