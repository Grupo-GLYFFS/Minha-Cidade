// Tipos de problema que a pessoa pode relatar em um pedido.
// "orgao" é o setor da prefeitura que costuma resolver aquele tipo de problema.
export const CATEGORIAS_PEDIDO = [
  { id: 'iluminacao', rotulo: 'Iluminação pública', icone: 'lightbulb', orgao: 'Ilume' },
  { id: 'pavimentacao', rotulo: 'Pavimentação', icone: 'add_road', orgao: 'Subprefeitura' },
  { id: 'poda', rotulo: 'Poda de árvore', icone: 'park', orgao: 'Subprefeitura' },
  { id: 'entulho', rotulo: 'Entulho e lixo', icone: 'delete', orgao: 'Limpeza urbana' },
  { id: 'boca-de-lobo', rotulo: 'Boca de lobo', icone: 'water_drop', orgao: 'Subprefeitura' },
  { id: 'calcada', rotulo: 'Calçada', icone: 'directions_walk', orgao: 'Subprefeitura' },
  { id: 'sinalizacao', rotulo: 'Sinalização de trânsito', icone: 'traffic', orgao: 'CET' },
];
