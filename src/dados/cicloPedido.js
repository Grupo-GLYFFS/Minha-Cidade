// As 5 etapas do ciclo do pedido de melhoria, na página Como funciona (/como-funciona).
// Campos: titulo, texto, cor (uma das 5 cores do SeloSituacao) e selo (texto do selo).
// O selo de "Apoiar" mostra a soma dos apoios dos pedidos de exemplo (selo: null; a página calcula).
export const CICLO_PEDIDO = [
  { titulo: 'Relatar', texto: 'Descreve o problema e manda foto.', cor: 'cinza', selo: 'Enviado' },
  {
    titulo: 'Apoiar',
    texto: 'Vizinhos apoiam. Pedido repetido vira apoio.',
    cor: 'cinza',
    selo: null,
  },
  {
    titulo: 'Decidir',
    texto: 'A subprefeitura aprova ou recusa, com o motivo.',
    cor: 'ambar',
    selo: 'Em análise',
  },
  {
    titulo: 'Acompanhar',
    texto: 'Cada etapa tem data e avisa quem segue.',
    cor: 'azul',
    selo: 'Em execução',
  },
  { titulo: 'Avaliar', texto: 'Quem pediu diz se ficou bom.', cor: 'verde', selo: 'Avaliado' },
];
