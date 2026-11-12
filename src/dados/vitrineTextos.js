// Regras de texto da interface (UX writing), com exemplos tirados do app.
// "bom" são textos que o app usa; "ruim" mostra o que evitar no lugar deles.
export const REGRAS_TEXTO = [
  {
    regra: 'Botão com verbo do que acontece',
    bom: ['Enviar pedido', 'Apoiar este pedido', 'Confirmar voto', 'Começar solicitação'],
    ruim: ['OK', 'Enviar', 'Clique aqui'],
  },
  {
    regra: 'Erro diz como resolver',
    bom: [
      'Digite o celular com DDD, ex.: (11) 91234-5678',
      'Escolha Sim, Não ou Abstenção para confirmar o voto.',
      'Corrija os 3 campos marcados para enviar.',
    ],
    ruim: ['Campo inválido', 'Erro no formulário', 'Valor incorreto'],
  },
  {
    regra: 'Lista vazia dá um próximo passo',
    bom: [
      'Você ainda não abriu pedidos. [Abrir meu primeiro pedido]',
      'Nenhum pedido com esses filtros. [Limpar filtros] [Abrir pedido]',
    ],
    ruim: ['Nenhum resultado.', 'Lista vazia'],
  },
  {
    regra: 'Mesma ação, mesmo nome do início ao fim',
    bom: ['Apoiar → Você apoiou', 'Votar → Você votou: Sim', 'Abrir pedido → Pedido enviado'],
    ruim: ['Apoiar → Curtido', 'Votar → Participação registrada'],
  },
  {
    regra: 'Linguagem simples, sem juridiquês',
    bom: ['Pedido', 'Quem pode usar', 'Encaminhado à Câmara Municipal'],
    ruim: ['Requerimento', 'Munícipe elegível', 'Remetido ao Poder Legislativo'],
  },
  {
    regra: 'Avisos na própria página, nunca alert()',
    bom: ['Voto registrado. Obrigado por participar! (aviso verde no cartão)'],
    ruim: ['Janela do navegador com "Sucesso!"'],
  },
];
