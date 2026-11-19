// Dados da pesquisa TIC Governo 2025 (Cetic.br/NIC.br) usados no herói da Apresentação.
// Cada número é a porcentagem de prefeituras (base: prefeituras com acesso à internet)
// que ofereceram o recurso nos últimos 12 meses. Coleta de julho de 2025 a abril de 2026.
// Campos de cada número:
// - lado: em que lado do mapa o card fica no computador ("esquerda" ou "direita");
// - icone: ícone do Material Symbols do card;
// - fonte e link: a tabela da pesquisa de onde o número saiu.

// Fonte geral, mostrada embaixo dos cards
export const FONTE_TIC = {
  texto: 'TIC Governo 2025, Cetic.br/NIC.br',
  link: 'https://cetic.br/pt/pesquisa/governo/indicadores/',
};

export const NUMEROS_TIC = [
  {
    id: 'votacao',
    lado: 'esquerda',
    icone: 'how_to_vote',
    porcentagem: 27,
    texto: 'deixaram votar pela internet',
    fonte: 'TIC Governo 2025, tabela E4A (votação online)',
    link: 'https://cetic.br/pt/tics/governo/2025/prefeituras/E4A/',
  },
  {
    id: 'forum',
    lado: 'esquerda',
    icone: 'forum',
    porcentagem: 14,
    texto: 'têm fórum para discutir a cidade',
    fonte: 'TIC Governo 2025, tabela E4A (fóruns ou comunidades de discussão)',
    link: 'https://cetic.br/pt/tics/governo/2025/prefeituras/E4A/',
  },
  {
    id: 'app',
    lado: 'direita',
    icone: 'smartphone',
    porcentagem: 24,
    texto: 'têm app próprio',
    fonte: 'TIC Governo 2025, tabela C6B (aplicativos criados pela prefeitura)',
    link: 'https://cetic.br/pt/tics/governo/2025/prefeituras/C6B/',
  },
];

// Mapa em pontos: municípios com até 10 mil habitantes (IBGE, Censo 2022)
export const FONTE_IBGE = {
  texto: 'IBGE, Censo 2022',
  link: 'https://censo2022.ibge.gov.br/',
};
