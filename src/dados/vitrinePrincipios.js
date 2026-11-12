// Regras do design system do Minha Prefeitura, resumidas das regras de código e da visão do projeto.
export const PRINCIPIOS = [
  {
    titulo: 'Escala de 4 px',
    texto: 'Espaços só de 4, 8, 12, 16, 24, 32 ou 48 px. Nada de números soltos.',
  },
  {
    titulo: 'Padding padrão de 16 px',
    texto:
      'Igual nos 4 lados em telas, barras e cartões (variável --pad). Botões, campos e chips têm altura fixa e só padding lateral.',
  },
  {
    titulo: 'Raio aninhado',
    texto: 'Raio de dentro = raio de fora − padding, com mínimo de 8 px.',
  },
  {
    titulo: 'Raios base',
    texto:
      'Botões e campos 12 px, cartões 20 px, checkbox 6 px e etiquetas de status totalmente redondas.',
  },
  {
    titulo: 'Cor nunca é a única informação',
    texto: 'Status, prioridade e situação sempre trazem texto e, quando cabe, ícone.',
  },
  {
    titulo: 'Foco amarelo visível',
    texto:
      'Contorno de 3 px em #F5A300 com 2 px de folga. No alto contraste, contorno preto com halo amarelo.',
  },
  {
    titulo: 'Alvos de toque de 44 px ou mais',
    texto: 'Botões, links de lista e ícones clicáveis têm pelo menos 44 × 44 px.',
  },
  {
    titulo: 'Linguagem simples',
    texto: 'Frases curtas, sem juridiquês. Botão diz o que acontece; erro diz como resolver.',
  },
];
