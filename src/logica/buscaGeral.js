import { normalizarTexto } from './enderecos';
import { buscarServicos } from './buscaServicos';

// Busca do popup do topo: serviços, pedidos (da pessoa e do bairro dela) e solicitações,
// pelo nome, pelo texto ou pelo número do protocolo.

// Quantos serviços o popup mostra no máximo
const LIMITE_SERVICOS = 5;

// Quantos pedidos de cada grupo o popup mostra no máximo
const LIMITE_PEDIDOS = 3;

// Diz se um item combina com a busca: todas as palavras aparecem em algum dos textos.
// Recebe a busca e a lista de textos do item; devolve true ou false.
function combinaTexto(texto, partes) {
  const palavras = normalizarTexto(texto).split(' ').filter(Boolean);
  const alvo = normalizarTexto(partes.filter(Boolean).join(' '));
  return palavras.length > 0 && palavras.every((palavra) => alvo.includes(palavra));
}

// Procura em tudo o que o popup mostra.
// Recebe o texto, os serviços, os pedidos, as solicitações da pessoa e o usuário (ou null);
// devolve { servicos, meusPedidos, pertoDeVoce, solicitacoes, total }.
export function buscarNoApp(texto, { servicos, pedidos, solicitacoes, usuario }) {
  const achados = {
    servicos: buscarServicos(texto, servicos).slice(0, LIMITE_SERVICOS),
    meusPedidos: [],
    pertoDeVoce: [],
    solicitacoes: [],
  };
  const combinaPedido = (pedido) =>
    combinaTexto(texto, [pedido.titulo, pedido.descricao, pedido.protocolo]);

  if (usuario) {
    achados.meusPedidos = pedidos
      .filter((pedido) => pedido.autorId === usuario.id && combinaPedido(pedido))
      .slice(0, LIMITE_PEDIDOS);
    achados.pertoDeVoce = pedidos
      .filter(
        (pedido) =>
          pedido.autorId !== usuario.id &&
          pedido.bairro === usuario.bairro &&
          combinaPedido(pedido),
      )
      .slice(0, LIMITE_PEDIDOS);
    achados.solicitacoes = solicitacoes
      .filter((item) => combinaTexto(texto, [item.nomeServico, item.resumo, item.protocolo]))
      .slice(0, LIMITE_PEDIDOS);
  }

  achados.total =
    achados.servicos.length +
    achados.meusPedidos.length +
    achados.pertoDeVoce.length +
    achados.solicitacoes.length;
  return achados;
}

// Divide um texto nas partes que combinam com a busca, para marcar com <mark>.
// Recebe o texto e a busca; devolve [{ texto, marcado }].
// Compara sem acentos e maiúsculas, mas devolve as partes como estavam escritas.
export function partesMarcadas(texto, busca) {
  const palavras = normalizarTexto(busca)
    .split(' ')
    .filter((palavra) => palavra.length >= 2);
  // Sem acentos, cada letra continua no mesmo lugar (as letras acentuadas são de 1 caractere)
  const comparar = texto.normalize('NFC').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const original = texto.normalize('NFC');
  const marcado = Array.from({ length: original.length }, () => false);
  palavras.forEach((palavra) => {
    let inicio = comparar.indexOf(palavra);
    while (inicio !== -1) {
      for (let i = inicio; i < inicio + palavra.length; i++) marcado[i] = true;
      inicio = comparar.indexOf(palavra, inicio + palavra.length);
    }
  });
  // Junta as letras seguidas que têm a mesma marcação
  const partes = [];
  for (let i = 0; i < original.length; i++) {
    const ultima = partes[partes.length - 1];
    if (ultima && ultima.marcado === marcado[i]) ultima.texto += original[i];
    else partes.push({ texto: original[i], marcado: marcado[i] });
  }
  return partes;
}

// Conta quantos serviços cada termo popular acha, para os chips "Mais buscados".
// Recebe os termos e os serviços; devolve [{ termo, quantidade }].
export function contarTermos(termos, servicos) {
  return termos.map((termo) => ({ termo, quantidade: buscarServicos(termo, servicos).length }));
}
