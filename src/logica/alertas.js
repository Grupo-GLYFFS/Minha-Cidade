import { HOJE, diasAte } from './datas';

// Procura o alerta da Defesa Civil que vale hoje para a região da pessoa.
// Recebe a lista de alertas e a região (ex.: "Zona Sul"). Sem região (visitante),
// vale o primeiro alerta ativo de qualquer região (o texto do alerta diz qual é).
// Devolve o alerta ou undefined se não houver nenhum.
export function alertaDefesaCivilAtivo(alertas, regiao) {
  return alertas.find(
    (alerta) =>
      alerta.tipo === 'defesa-civil' &&
      alerta.ativo &&
      // Alerta sem região vale para a cidade toda
      (!regiao || alerta.regiao === '' || alerta.regiao === regiao),
  );
}

// Aviso de cada status do pedido da pessoa: título e ícone.
// "enviada" não gera aviso (foi a própria pessoa que enviou) e "avaliada" também não
// (quem avaliou foi ela). O texto do aviso é montado em avisoDoPedido().
const AVISOS_STATUS = {
  'em-analise': { titulo: 'Seu pedido entrou em análise', icone: 'manage_search' },
  aprovada: { titulo: 'Seu pedido foi aprovado', icone: 'thumb_up' },
  'em-execucao': { titulo: 'Começou a obra do seu pedido', icone: 'construction' },
  concluida: { titulo: 'Seu pedido foi concluído: avalie o serviço', icone: 'task_alt' },
  recusada: { titulo: 'Seu pedido foi recusado', icone: 'block' },
};

// Põe a primeira letra em maiúscula. Recebe "chuva forte..."; devolve "Chuva forte...".
function comMaiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Escreve quanto falta para a votação acabar. Recebe a data final e hoje;
// devolve "encerra hoje", "encerra amanhã" ou "encerra em N dias".
function textoEncerramento(encerraEm, hoje) {
  const dias = diasAte(encerraEm, hoje);
  if (dias === 0) return 'encerra hoje';
  if (dias === 1) return 'encerra amanhã';
  return `encerra em ${dias} dias`;
}

// Monta o aviso do status atual de um pedido da pessoa.
// Recebe o pedido; devolve o aviso ou null se o status não gera aviso.
// O id inclui o status: quando o pedido muda de novo, chega um aviso novo (ainda não lido).
function avisoDoPedido(pedido) {
  const aviso = AVISOS_STATUS[pedido.status];
  if (!aviso) return null;
  const texto =
    pedido.status === 'recusada' && pedido.motivoRecusa
      ? `${pedido.titulo}. Motivo: ${pedido.motivoRecusa}`
      : `${pedido.titulo} · Protocolo ${pedido.protocolo}`;
  return {
    id: `pedido-${pedido.id}-${pedido.status}`,
    tipo: 'pedido',
    titulo: aviso.titulo,
    texto,
    data: pedido.atualizadoEm,
    link: `/pedidos/${pedido.id}`,
    icone: aviso.icone,
  };
}

// Junta todos os avisos da pessoa em uma lista só, do mais importante e recente para o mais antigo.
// Recebe { usuario, pedidos, solicitacoes, projetos, alertasCidade, lidos, hoje }:
// - alertas da Defesa Civil ativos na região da pessoa (ou na cidade toda): marcados como importantes;
// - um aviso para o status atual de cada pedido da pessoa (menos "enviada" e "avaliada");
// - um aviso para cada solicitação de serviço recebida;
// - um aviso para cada votação aberta que ainda não acabou.
// Devolve [{ id, tipo, titulo, texto, data, link, icone, importante, lido }].
export function montarAlertas({
  usuario,
  pedidos = [],
  solicitacoes = [],
  projetos = [],
  alertasCidade = [],
  lidos = [],
  hoje = HOJE,
}) {
  if (!usuario) return [];

  const defesaCivil = alertasCidade
    .filter(
      (alerta) =>
        alerta.tipo === 'defesa-civil' &&
        alerta.ativo &&
        (alerta.regiao === '' || alerta.regiao === usuario.regiao),
    )
    .map((alerta) => ({
      id: `defesa-civil-${alerta.id}`,
      tipo: 'defesa-civil',
      titulo: alerta.titulo,
      texto: comMaiuscula(alerta.mensagem),
      data: alerta.criadoEm,
      link: '/servicos/alertas-de-risco',
      icone: 'warning',
      importante: true,
    }));

  const dosPedidos = pedidos
    .filter((pedido) => pedido.autorId === usuario.id)
    .map(avisoDoPedido)
    .filter(Boolean);

  const dosServicos = solicitacoes.map((solicitacao) => ({
    id: `servico-${solicitacao.id}`,
    tipo: 'servico',
    titulo: `Recebemos sua solicitação: ${solicitacao.nomeServico}`,
    texto: `Protocolo ${solicitacao.protocolo}. Guarde este número para acompanhar.`,
    data: solicitacao.criadoEm,
    link: '/perfil/pedidos?aba=servicos',
    icone: 'inbox',
  }));

  const votacoes = projetos
    .filter((projeto) => projeto.status === 'votacao-aberta' && projeto.encerraEm >= hoje)
    .map((projeto) => ({
      id: `votacao-${projeto.id}`,
      tipo: 'votacao',
      titulo: `Votação aberta: ${projeto.titulo}`,
      texto: `A votação ${textoEncerramento(projeto.encerraEm, hoje)}. Dê sua opinião antes de o projeto ir para a Câmara.`,
      data: projeto.abertoEm,
      link: '/cidade-aberta',
      icone: 'how_to_vote',
    }));

  return [...defesaCivil, ...dosPedidos, ...dosServicos, ...votacoes]
    .map((alerta) => ({ importante: false, ...alerta, lido: lidos.includes(alerta.id) }))
    .sort((a, b) => Number(b.importante) - Number(a.importante) || b.data.localeCompare(a.data));
}
