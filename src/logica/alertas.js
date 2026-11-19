import { HOJE } from './datas';
import { projetosEmVotacao, textoPrazoVotacao } from './votacao';
import { juntarNomes } from './avisos';
import { buscarSubprefeitura, comArtigo, distritoDoBairro } from './lugares';
import { NIVEIS_ALERTA } from '../dados/niveisAlerta';

// Diz se um alerta vale num bairro. Alerta sem bairros vale para a cidade toda.
// Recebe o alerta e o nome do bairro; devolve true ou false.
export function alertaValeNoBairro(alerta, bairro) {
  return alerta.bairros.length === 0 || alerta.bairros.includes(bairro);
}

// Procura o alerta da Defesa Civil que vale hoje no bairro da pessoa.
// Recebe a lista de alertas e o nome do bairro. Sem bairro (visitante), vale o primeiro
// alerta ativo de qualquer lugar (o texto do alerta diz qual é).
// Devolve o alerta ou undefined se não houver nenhum.
export function alertaDefesaCivilAtivo(alertas, bairro) {
  return alertas.find(
    (alerta) =>
      alerta.tipo === 'defesa-civil' &&
      alerta.ativo &&
      (!bairro || alertaValeNoBairro(alerta, bairro)),
  );
}

// Separa os alertas de um lugar. Recebe a lista e os nomes dos bairros do lugar
// (null = cidade toda, que recebe todos). Devolve { ativos, encerrados }, na ordem dos dados
// (dados/alertas.js já vem do mais importante para o menos importante).
export function alertasDoLugar(alertas, bairros = null) {
  const doLugar = alertas.filter(
    (alerta) =>
      !bairros ||
      alerta.bairros.length === 0 ||
      alerta.bairros.some((nome) => bairros.includes(nome)),
  );
  return {
    ativos: doLugar.filter((alerta) => alerta.ativo),
    encerrados: doLugar.filter((alerta) => !alerta.ativo),
  };
}

// Procura o nível de um alerta (Atenção, Alerta, Emergência), com o ícone e a cor do selo.
// Recebe o id do nível; devolve o nível.
export function buscarNivel(idNivel) {
  return NIVEIS_ALERTA.find((nivel) => nivel.id === idNivel) ?? NIVEIS_ALERTA[0];
}

// Monta as partes do texto "onde" de um alerta, separadas por "·" na tela.
// Recebe o alerta e, nas listas do bairro, o bairro da lista ({ nome, prep }).
// Devolve, por exemplo, ["Santana e Tucuruvi", "Subprefeitura Santana/Tucuruvi"]
// ou ["Cidade toda", "inclui a Vila Mariana"].
export function partesDaArea(alerta, bairroDaLista = null) {
  if (alerta.bairros.length === 0) {
    return bairroDaLista ? ['Cidade toda', `inclui ${comArtigo(bairroDaLista)}`] : ['Cidade toda'];
  }
  const subs = alerta.subprefeituras.map((id) => buscarSubprefeitura(id)?.nome).filter(Boolean);
  const partes = [juntarNomes(alerta.bairros)];
  if (subs.length > 0) {
    partes.push(`${subs.length === 1 ? 'Subprefeitura' : 'Subprefeituras'} ${juntarNomes(subs)}`);
  }
  return partes;
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
// Recebe { usuario, pedidos, solicitacoes, projetos, votos, alertasCidade, lidos, hoje }:
// - alertas da Defesa Civil ativos no bairro da pessoa (ou na cidade toda): marcados como importantes;
// - um aviso para o status atual de cada pedido da pessoa (menos "enviada" e "avaliada");
// - um aviso para cada solicitação de serviço recebida;
// - um aviso para cada votação aberta em que a pessoa ainda não votou
//   (votos = { idProjeto: opcao } da pessoa; votar tira o aviso da lista).
// Devolve [{ id, tipo, titulo, texto, data, link, icone, importante, lido }].
export function montarAlertas({
  usuario,
  pedidos = [],
  solicitacoes = [],
  projetos = [],
  votos = {},
  alertasCidade = [],
  lidos = [],
  hoje = HOJE,
}) {
  if (!usuario) return [];
  // Distrito do endereço (uma conta antiga pode ter o bairro do CEP)
  const bairro = distritoDoBairro(usuario.bairro)?.nome ?? usuario.bairro;

  const defesaCivil = alertasCidade
    .filter(
      (alerta) =>
        alerta.tipo === 'defesa-civil' && alerta.ativo && alertaValeNoBairro(alerta, bairro),
    )
    .map((alerta) => ({
      id: `defesa-civil-${alerta.id}`,
      tipo: 'defesa-civil',
      titulo: alerta.titulo,
      texto: comMaiuscula(alerta.mensagem),
      data: alerta.criadoEm,
      link: `/minha-cidade/alertas/${alerta.id}`,
      icone: 'warning',
      importante: true,
    }));

  const dosPedidos = pedidos
    .filter((pedido) => pedido.autorId === usuario.id)
    .map(avisoDoPedido)
    .filter(Boolean);

  // As solicitações de exemplo não geram aviso; só as que a pessoa enviou
  const dosServicos = solicitacoes
    .filter((solicitacao) => !solicitacao.exemplo)
    .map((solicitacao) => ({
      id: `servico-${solicitacao.id}`,
      tipo: 'servico',
      titulo: `Recebemos sua solicitação: ${solicitacao.nomeServico}`,
      texto: `Protocolo ${solicitacao.protocolo}. Guarde este número para acompanhar.`,
      data: solicitacao.criadoEm,
      link: `/servicos/minhas-solicitacoes/${solicitacao.id}`,
      icone: 'inbox',
    }));

  const votacoes = projetosEmVotacao(projetos, hoje)
    .filter((projeto) => !votos[projeto.id])
    .map((projeto) => ({
      id: `votacao-${projeto.id}`,
      tipo: 'votacao',
      titulo: `Votação aberta: ${projeto.titulo}`,
      texto: `${textoPrazoVotacao(projeto.fimVotacao, hoje)}. Dê sua opinião antes de o projeto ir para a Câmara.`,
      data: projeto.inicioVotacao,
      link: `/minha-cidade/votacoes/${projeto.id}`,
      icone: 'how_to_vote',
    }));

  return [...defesaCivil, ...dosPedidos, ...dosServicos, ...votacoes]
    .map((alerta) => ({ importante: false, ...alerta, lido: lidos.includes(alerta.id) }))
    .sort((a, b) => Number(b.importante) - Number(a.importante) || b.data.localeCompare(a.data));
}
