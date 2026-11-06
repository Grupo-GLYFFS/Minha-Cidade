// Perguntas frequentes sobre o app, em grupos, com respostas curtas em linguagem simples.
export const GRUPOS_PERGUNTAS = [
  {
    id: 'conta',
    titulo: 'Conta',
    perguntas: [
      {
        id: 'criar-conta',
        pergunta: 'Preciso de conta para usar o app?',
        resposta:
          'Não para consultar. Sem conta você vê os serviços, os pedidos do bairro e os telefones. A conta é pedida para abrir pedidos, apoiar, pedir serviços online e receber alertas.',
      },
      {
        id: 'demonstracao',
        pergunta: 'O que é a conta de demonstração?',
        resposta:
          'É a conta da Maria, com pedidos de exemplo, para conhecer o app sem cadastrar nada. Toque em "Entrar com conta de demonstração" na tela Entrar.',
      },
    ],
  },
  {
    id: 'pedidos',
    titulo: 'Pedidos',
    perguntas: [
      {
        id: 'abrir-pedido',
        pergunta: 'Como abro um pedido?',
        resposta:
          'Entre na sua conta, abra Pedidos (no celular, fica na aba Cidade) e toque em "Abrir pedido". Escolha o tipo de problema, diga o endereço, conte a gravidade e envie. Você recebe um número de protocolo na hora.',
      },
      {
        id: 'apoiar',
        pergunta: 'O que é apoiar um pedido?',
        resposta:
          'É dizer "esse problema também me afeta". Cada apoio soma pontos na prioridade do pedido. Assim, em vez de abrir outro pedido igual, o bairro junta força num só.',
      },
      {
        id: 'prioridade',
        pergunta: 'Como a prioridade é calculada?',
        resposta:
          'Usamos a matriz GUT: gravidade, urgência e tendência recebem notas de 1 a 5 e são multiplicadas (de 1 a 125 pontos). Depois, cada apoio soma 1 ponto. Com 75 pontos ou mais a prioridade é alta; de 35 a 74, média; abaixo disso, baixa.',
      },
      {
        id: 'recusado',
        pergunta: 'Por que meu pedido foi recusado?',
        resposta:
          'O motivo aparece no andamento do pedido. Os mais comuns: o problema não é da prefeitura (por exemplo, terreno particular) ou o pedido não segue as regras do serviço. Quando possível, a prefeitura diz o que vai fazer no lugar.',
      },
      {
        id: 'repetido',
        pergunta: 'E se alguém já pediu a mesma coisa?',
        resposta:
          'Antes de enviar, o app procura um pedido aberto com o mesmo tipo de problema, no mesmo bairro e na mesma rua. Se achar, sugere apoiar o que já existe.',
      },
    ],
  },
  {
    id: 'servicos',
    titulo: 'Serviços',
    perguntas: [
      {
        id: 'servico-sem-conta',
        pergunta: 'Posso pedir um serviço sem conta?',
        resposta:
          'Você pode ler como cada serviço funciona, os documentos e os telefones sem conta. Para pedir pelo app, é preciso entrar. Sem conta, você também pode ligar para a Central 156.',
      },
      {
        id: 'acompanhar',
        pergunta: 'Onde acompanho o que pedi?',
        resposta:
          'Em Perfil, na opção "Meus pedidos e protocolos". Lá ficam os pedidos de melhoria e os serviços que você pediu, com o andamento de cada um.',
      },
    ],
  },
  {
    id: 'privacidade',
    titulo: 'Privacidade',
    perguntas: [
      {
        id: 'onde-ficam',
        pergunta: 'Meus dados ficam salvos onde?',
        resposta:
          'Só neste navegador, porque o app é um protótipo e não tem servidor. Nada é enviado para a prefeitura nem para outra pessoa. Você pode apagar tudo na página Privacidade dos dados.',
      },
      {
        id: 'oficial',
        pergunta: 'Este é o app oficial da prefeitura?',
        resposta:
          'Não. É um protótipo feito por estudantes da FIAP. Para pedidos de verdade, use a Central 156 ou os canais oficiais da Prefeitura de São Paulo.',
      },
    ],
  },
  {
    id: 'acessibilidade',
    titulo: 'Acessibilidade',
    perguntas: [
      {
        id: 'aumentar-letra',
        pergunta: 'Como aumento a letra?',
        resposta:
          'No computador, use os botões A− e A+ no topo da página. No celular, abra Perfil e depois Acessibilidade (sem conta, o link fica na tela Entrar). Lá também dá para ligar o alto contraste.',
      },
      {
        id: 'leitor-de-tela',
        pergunta: 'O app funciona com leitor de tela?',
        resposta:
          'Sim. Os títulos seguem uma ordem, todos os campos e botões têm nome e os avisos são lidos em voz alta. Também dá para usar tudo só pelo teclado.',
      },
    ],
  },
];
