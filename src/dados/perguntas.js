// Perguntas frequentes sobre o app, em grupos, com respostas curtas em linguagem simples.
// Cada grupo vira um card da página Perguntas frequentes; cada pergunta abre e fecha.
export const GRUPOS_PERGUNTAS = [
  {
    id: 'pedidos',
    titulo: 'Pedidos',
    perguntas: [
      {
        id: 'pedido-ou-solicitacao',
        pergunta: 'Qual a diferença entre pedido e solicitação?',
        resposta:
          'Pedido é um problema na rua para a prefeitura resolver, como buraco, lâmpada apagada ou entulho na calçada. Solicitação é um serviço para você, como vacina, matrícula na escola ou inscrição no CadÚnico.',
      },
      {
        id: 'abrir-pedido',
        pergunta: 'Como abro um pedido?',
        resposta:
          'Toque em Abrir pedido, no fim de qualquer página. São três passos: o tipo de problema, o lugar e os detalhes. O protocolo aparece assim que você envia.',
      },
      {
        id: 'repetido',
        pergunta: 'E se alguém já pediu a mesma coisa?',
        resposta:
          'Antes de enviar, o app mostra os pedidos parecidos perto do mesmo endereço. Se um deles for o seu problema, apoie esse pedido em vez de abrir outro.',
      },
      {
        id: 'apoiar',
        pergunta: 'O que é apoiar um pedido?',
        resposta:
          'É dizer que o problema também afeta você. Cada apoio aumenta a prioridade do pedido.',
      },
      {
        id: 'prioridade',
        pergunta: 'Como a prioridade é calculada?',
        resposta:
          'Pela gravidade, pela urgência e pela chance de o problema piorar, cada uma com nota de 1 a 5. Cada apoio soma mais um ponto. O resultado aparece no pedido como prioridade baixa, média ou alta.',
      },
      {
        id: 'recusado',
        pergunta: 'Por que meu pedido foi recusado?',
        resposta:
          'O motivo aparece no andamento do pedido. Os mais comuns são problema em terreno particular e pedido repetido.',
      },
    ],
  },
  {
    id: 'servicos',
    titulo: 'Serviços',
    perguntas: [
      {
        id: 'acompanhar',
        pergunta: 'Onde acompanho o que pedi?',
        resposta:
          'No menu da sua foto, no topo. Os serviços ficam em Minhas solicitações e os problemas da rua em Meus pedidos.',
      },
      {
        id: 'remarcar',
        pergunta: 'Posso remarcar ou cancelar um agendamento?',
        resposta:
          'Sim. Abra a solicitação em Minhas solicitações e use Remarcar ou Cancelar. O horário antigo fica livre para outra pessoa.',
      },
    ],
  },
  {
    id: 'conta',
    titulo: 'Conta',
    perguntas: [
      {
        id: 'precisa-conta',
        pergunta: 'Preciso de conta para usar o app?',
        resposta:
          'Não para consultar. Sem conta você vê serviços, pedidos, obras, votações e telefones. A conta é pedida para abrir pedidos, apoiar, votar e agendar serviços.',
      },
      {
        id: 'mudar-endereco',
        pergunta: 'Como mudo meu endereço?',
        resposta:
          'Em Meu perfil, na parte Endereço, ou no link Alterar endereço, no rodapé. A página Meu bairro muda junto.',
      },
    ],
  },
  {
    id: 'alertas',
    titulo: 'Alertas',
    perguntas: [
      {
        id: 'origem-alertas',
        pergunta: 'De onde vêm os alertas?',
        resposta:
          'Da Defesa Civil de São Paulo: chuva forte, alagamento, calor e frio intensos. O alerta do seu bairro também aparece na faixa amarela no topo das páginas.',
      },
      {
        id: 'desligar-notificacoes',
        pergunta: 'Como desligo as notificações?',
        resposta:
          'Em Configurações, escolha o que quer receber. Os alertas de emergência também podem ser desligados, mas o app pede confirmação antes.',
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
          'Use A− e A+ na barra do topo de qualquer página. Ao lado fica o botão Alto contraste.',
      },
      {
        id: 'leitor-de-tela',
        pergunta: 'O app funciona com leitor de tela?',
        resposta:
          'Sim. Os títulos seguem uma ordem, todos os campos e botões têm nome e os avisos são lidos em voz alta. Também dá para usar tudo só pelo teclado.',
      },
    ],
  },
  {
    id: 'privacidade',
    titulo: 'Privacidade',
    perguntas: [
      {
        id: 'onde-ficam',
        pergunta: 'Onde ficam os meus dados?',
        resposta:
          'Só neste navegador, porque o app é um protótipo e não tem servidor. Para ver o que fica guardado ou apagar tudo, abra a página Privacidade.',
      },
      {
        id: 'oficial',
        pergunta: 'Este é o app oficial da prefeitura?',
        resposta:
          'Não. É um protótipo feito por estudantes da FIAP, com dados de exemplo. Para pedidos de verdade, ligue 156.',
      },
    ],
  },
];
