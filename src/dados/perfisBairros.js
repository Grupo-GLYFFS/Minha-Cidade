// Perfil dos bairros que o app já conhece em detalhe (dados de exemplo, parecidos com os reais).
// Bairros fora desta lista mostram só o que existe nos outros arquivos (sem inventar números).
// - id: id de BAIRROS_CIDADE (dados/bairrosCidade.js)
// - mapa: imagem do cabeçalho em public/img/mapas
// - numeros: cards de "O bairro em números" [{ icone, valor, rotulo }]
// - servicos: cards de "Perto de você" / "No bairro" [{ icone, nome, linhas }]
export const PERFIS_BAIRROS = [
  {
    id: 'vila-mariana',
    mapa: 'img/mapas/bairro-vila-mariana.svg',
    numeros: [
      { icone: 'groups', valor: '130 mil', rotulo: 'moradores' },
      { icone: 'straighten', valor: '8,6 km²', rotulo: 'de área' },
      { icone: 'payments', valor: 'R$ 1 mi', rotulo: 'verba dos moradores' },
      { icone: 'local_hospital', valor: '3', rotulo: 'UBS' },
      { icone: 'school', valor: '12', rotulo: 'escolas municipais' },
      { icone: 'park', valor: '9', rotulo: 'praças e parques' },
      { icone: 'storefront', valor: '7', rotulo: 'feiras livres' },
      { icone: 'diversity_1', valor: '1', rotulo: 'CRAS' },
      { icone: 'local_library', valor: '1', rotulo: 'biblioteca' },
    ],
    servicos: [
      {
        icone: 'local_hospital',
        nome: 'UBS Vila Mariana',
        linhas: ['Rua Joaquim Távora, 800', 'Seg. a sex., das 7h às 19h'],
      },
      {
        icone: 'school',
        nome: 'EMEF Vila Mariana',
        linhas: ['Rua França Pinto, 450', 'Matrícula pelo app'],
      },
      {
        icone: 'diversity_1',
        nome: 'CRAS Vila Mariana',
        linhas: ['Rua Sena Madureira, 1.200', 'Seg. a sex., das 8h às 17h'],
      },
      {
        icone: 'storefront',
        nome: 'Feira livre',
        linhas: ['Rua Cubatão', 'Quarta, das 7h às 13h'],
      },
      { icone: 'delete', nome: 'Coleta comum', linhas: ['Seg., qua. e sex.', 'A partir das 19h'] },
      { icone: 'recycling', nome: 'Coleta seletiva', linhas: ['Quinta-feira', 'A partir das 19h'] },
    ],
  },
  {
    id: 'moema',
    mapa: 'img/mapas/bairro-moema.svg',
    numeros: [
      { icone: 'groups', valor: '83 mil', rotulo: 'moradores' },
      { icone: 'straighten', valor: '9 km²', rotulo: 'de área' },
      { icone: 'payments', valor: 'R$ 1 mi', rotulo: 'verba dos moradores' },
      { icone: 'local_hospital', valor: '2', rotulo: 'UBS' },
      { icone: 'school', valor: '8', rotulo: 'escolas municipais' },
      { icone: 'park', valor: '11', rotulo: 'praças e parques' },
      { icone: 'storefront', valor: '6', rotulo: 'feiras livres' },
      { icone: 'diversity_1', valor: '1', rotulo: 'CRAS' },
      { icone: 'local_library', valor: '1', rotulo: 'biblioteca' },
    ],
    servicos: [
      {
        icone: 'local_hospital',
        nome: 'UBS Moema',
        linhas: ['Rua Iraí, 410', 'Seg. a sex., das 7h às 19h'],
      },
      {
        icone: 'school',
        nome: 'EMEF Moema',
        linhas: ['Avenida Jamaris, 260', 'Matrícula pelo app'],
      },
      {
        icone: 'diversity_1',
        nome: 'CRAS Moema',
        linhas: ['Rua Gaivota, 720', 'Seg. a sex., das 8h às 17h'],
      },
      {
        icone: 'storefront',
        nome: 'Feira livre',
        linhas: ['Avenida Jamaris', 'Sexta, das 7h às 13h'],
      },
      { icone: 'delete', nome: 'Coleta comum', linhas: ['Ter., qui. e sáb.', 'A partir das 19h'] },
      { icone: 'recycling', nome: 'Coleta seletiva', linhas: ['Sexta-feira', 'A partir das 19h'] },
    ],
  },
  {
    id: 'saude',
    numeros: [
      { icone: 'groups', valor: '131 mil', rotulo: 'moradores' },
      { icone: 'straighten', valor: '8,9 km²', rotulo: 'de área' },
      { icone: 'payments', valor: 'R$ 1 mi', rotulo: 'verba dos moradores' },
      { icone: 'local_hospital', valor: '4', rotulo: 'UBS' },
      { icone: 'school', valor: '18', rotulo: 'escolas municipais' },
      { icone: 'park', valor: '6', rotulo: 'praças e parques' },
      { icone: 'storefront', valor: '8', rotulo: 'feiras livres' },
      { icone: 'diversity_1', valor: '1', rotulo: 'CRAS' },
      { icone: 'local_library', valor: '1', rotulo: 'biblioteca' },
    ],
    servicos: [
      {
        icone: 'local_hospital',
        nome: 'UBS Saúde',
        linhas: ['Rua Luís Góis, 1.100', 'Seg. a sex., das 7h às 19h'],
      },
      {
        icone: 'school',
        nome: 'EMEF Saúde',
        linhas: ['Avenida Bosque da Saúde, 1.040', 'Matrícula pelo app'],
      },
      {
        icone: 'diversity_1',
        nome: 'CRAS Saúde',
        linhas: ['Rua Carneiro da Cunha, 300', 'Seg. a sex., das 8h às 17h'],
      },
      {
        icone: 'storefront',
        nome: 'Feira livre',
        linhas: ['Rua Paulo Bourroul', 'Terça, das 7h às 13h'],
      },
      { icone: 'delete', nome: 'Coleta comum', linhas: ['Seg., qua. e sex.', 'A partir das 20h'] },
      { icone: 'recycling', nome: 'Coleta seletiva', linhas: ['Sábado', 'A partir das 19h'] },
    ],
  },
];
