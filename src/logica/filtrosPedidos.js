import { REGIOES } from '../dados/regioes';
import { calcularPrioridade } from './prioridade';
import { estaAberto } from './pedidos';

// Jeitos de ordenar a lista de pedidos. O primeiro é o padrão.
export const ORDENS_PEDIDOS = [
  { value: 'prioridade', label: 'Mais prioritários' },
  { value: 'apoios', label: 'Mais apoiados' },
  { value: 'recentes', label: 'Mais recentes' },
];

export const ORDEM_PADRAO = 'prioridade';

// Valor do filtro de status que junta todos os status em andamento
export const STATUS_EM_ANDAMENTO = 'em-andamento';

// Filtros sem nada escolhido. Os nomes são os mesmos usados no endereço da página (?regiao=...).
export const FILTROS_VAZIOS = {
  busca: '',
  regiao: '',
  bairro: '',
  categoria: '',
  status: '',
  ordem: ORDEM_PADRAO,
};

// Filtros que ficam escondidos no botão "Filtros" do celular
const FILTROS_DA_GAVETA = ['regiao', 'bairro', 'categoria', 'status'];

// Lê os filtros do endereço da página.
// Recebe os parâmetros da URL (URLSearchParams); devolve um objeto com todos os filtros.
export function lerFiltros(parametros) {
  const filtros = { ...FILTROS_VAZIOS };
  for (const nome of Object.keys(FILTROS_VAZIOS)) {
    filtros[nome] = parametros.get(nome) ?? FILTROS_VAZIOS[nome];
  }
  // Ordem desconhecida no endereço volta para o padrão
  if (!ORDENS_PEDIDOS.some((ordem) => ordem.value === filtros.ordem)) filtros.ordem = ORDEM_PADRAO;
  return filtros;
}

// Escreve os filtros no endereço da página, mantendo outros parâmetros que já existam.
// Recebe os parâmetros atuais e os filtros; devolve novos parâmetros (só com os filtros usados).
export function escreverFiltros(parametros, filtros) {
  const novos = new URLSearchParams(parametros);
  for (const nome of Object.keys(FILTROS_VAZIOS)) {
    const valor = filtros[nome];
    // Filtro vazio ou com o valor padrão não precisa aparecer no endereço
    if (!valor || valor === FILTROS_VAZIOS[nome]) novos.delete(nome);
    else novos.set(nome, valor);
  }
  return novos;
}

// Conta os filtros escolhidos dentro do botão "Filtros". Recebe os filtros; devolve um número.
export function contarFiltrosAtivos(filtros) {
  return FILTROS_DA_GAVETA.filter((nome) => filtros[nome]).length;
}

// Diz se há algum filtro ou busca em uso (a ordem não conta). Recebe os filtros; devolve true ou false.
export function temFiltroAtivo(filtros) {
  return filtros.busca.trim() !== '' || contarFiltrosAtivos(filtros) > 0;
}

// Descobre a região de um bairro. Recebe o nome do bairro; devolve o nome da região ou "".
export function regiaoDoBairro(bairro) {
  return REGIOES.find((regiao) => regiao.bairros.includes(bairro))?.nome ?? '';
}

// Troca um filtro, mantendo região e bairro coerentes entre si.
// Recebe os filtros atuais, o nome do filtro e o novo valor; devolve os novos filtros.
export function atualizarFiltro(filtros, nome, valor) {
  const novos = { ...filtros, [nome]: valor ?? '' };
  // Mudou a região: o bairro escolhido só continua se for dessa região
  if (nome === 'regiao' && novos.bairro && regiaoDoBairro(novos.bairro) !== novos.regiao) {
    novos.bairro = '';
  }
  // Escolheu um bairro: a região passa a ser a dele
  if (nome === 'bairro' && valor) novos.regiao = regiaoDoBairro(valor) || novos.regiao;
  return novos;
}

// Tira a busca e todos os filtros, mas mantém a ordem escolhida.
// Recebe os filtros atuais; devolve os filtros limpos.
export function limparFiltros(filtros) {
  return { ...FILTROS_VAZIOS, ordem: filtros.ordem };
}

// Deixa o texto fácil de comparar: minúsculas, sem acentos e sem espaços nas pontas.
// Recebe um texto; devolve o texto limpo (ex.: "Calçada " vira "calcada").
export function normalizarTexto(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

// Diz se o pedido tem o status pedido no filtro. "Em andamento" aceita todos os status abertos.
function combinaStatus(pedido, status) {
  if (!status) return true;
  if (status === STATUS_EM_ANDAMENTO) return estaAberto(pedido);
  return pedido.status === status;
}

// Filtra os pedidos pela busca, região, bairro, categoria e status.
// Recebe a lista de pedidos e os filtros; devolve uma nova lista só com os que combinam.
export function filtrarPedidos(pedidos, filtros) {
  const busca = normalizarTexto(filtros.busca);
  return pedidos.filter((pedido) => {
    // A busca procura no título, na descrição e na rua
    const textoDoPedido = normalizarTexto(`${pedido.titulo} ${pedido.descricao} ${pedido.rua}`);
    return (
      (!busca || textoDoPedido.includes(busca)) &&
      (!filtros.regiao || pedido.regiao === filtros.regiao) &&
      (!filtros.bairro || pedido.bairro === filtros.bairro) &&
      (!filtros.categoria || pedido.categoria === filtros.categoria) &&
      combinaStatus(pedido, filtros.status)
    );
  });
}

// Ordena os pedidos sem mudar a lista original.
// Recebe a lista e a ordem ("prioridade", "apoios" ou "recentes"); devolve uma nova lista.
export function ordenarPedidos(pedidos, ordem) {
  const maisRecente = (a, b) => b.criadoEm.localeCompare(a.criadoEm);
  const comparar = {
    prioridade: (a, b) => calcularPrioridade(b) - calcularPrioridade(a) || maisRecente(a, b),
    apoios: (a, b) => b.apoios - a.apoios || maisRecente(a, b),
    recentes: maisRecente,
  };
  return [...pedidos].sort(comparar[ordem] ?? comparar[ORDEM_PADRAO]);
}

// Lista os bairros que têm pedidos, para o filtro de bairro.
// Recebe a lista de pedidos e a região escolhida (ou "");
// devolve os bairros em ordem alfabética, agrupados por região quando nenhuma foi escolhida.
export function opcoesDeBairro(pedidos, regiao) {
  const bairrosDa = (nomeRegiao) =>
    [...new Set(pedidos.filter((p) => p.regiao === nomeRegiao).map((p) => p.bairro))].sort((a, b) =>
      a.localeCompare(b, 'pt-BR'),
    );
  if (regiao) return bairrosDa(regiao);
  return REGIOES.map((r) => ({ group: r.nome, items: bairrosDa(r.nome) })).filter(
    (grupo) => grupo.items.length > 0,
  );
}
