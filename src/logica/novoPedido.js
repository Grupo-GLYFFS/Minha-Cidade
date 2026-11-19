import { HOJE, momentoDeHoje } from './datas';
import { CATEGORIAS_PEDIDO } from '../dados/categoriasPedido';
import { VALORES_INICIAIS } from './esquemaNovoPedido';
import { estimarGravidade } from './sugestaoPedido';
import { subprefeituraDoBairro } from './localPedido';

// Valores iniciais do formulário, com a categoria já escolhida quando ela vem do endereço
// (ex.: /pedidos/novo?categoria=iluminacao, vindo da página de um serviço).
// Recebe o id da categoria (ou null); ids que não existem são ignorados.
export function valoresIniciaisComCategoria(idCategoria) {
  const existe = CATEGORIAS_PEDIDO.some((categoria) => categoria.id === idCategoria);
  return existe ? { ...VALORES_INICIAIS, categoria: idCategoria } : VALORES_INICIAIS;
}

// Descobre o próximo número de protocolo, seguindo a sequência dos pedidos já existentes.
// Recebe a lista de pedidos e a data de hoje; devolve um texto como "2026-005121".
export function proximoProtocolo(pedidos, hoje = HOJE) {
  const ano = hoje.slice(0, 4);
  // Pega a parte numérica de cada protocolo do mesmo ano e acha o maior
  const numeros = pedidos
    .filter((pedido) => pedido.protocolo.startsWith(`${ano}-`))
    .map((pedido) => Number(pedido.protocolo.slice(5)));
  const proximo = Math.max(0, ...numeros) + 1;
  return `${ano}-${String(proximo).padStart(6, '0')}`;
}

// Gera um id que ainda não existe na lista.
// Recebe a lista de pedidos; devolve um texto como "p-036".
export function proximoIdPedido(pedidos) {
  const numeros = pedidos.map((pedido) => Number(pedido.id.slice(2)) || 0);
  const proximo = Math.max(0, ...numeros) + 1;
  return `p-${String(proximo).padStart(3, '0')}`;
}

// Escreve o número do endereço: "s/n", "sn" e "S/N" ficam todos como "S/N".
export function arrumarNumero(numero) {
  const limpo = numero.trim();
  return /^s\/?n$/i.test(limpo) ? 'S/N' : limpo;
}

// Transforma o que a pessoa preencheu no formulário nos dados do pedido.
// Recebe os valores já validados; devolve os dados que montarNovoPedido espera.
// A pessoa não escolhe a gravidade: o app estima pela descrição e a prefeitura confirma
// na análise. Urgência igual à gravidade e tendência 3 (meio da escala).
export function prepararDadosDoFormulario(valores) {
  const gravidade = estimarGravidade(valores.descricao, valores.categoria).valor;
  const bairro = valores.bairro.trim();
  return {
    categoria: valores.categoria,
    titulo: valores.titulo.trim(),
    descricao: valores.descricao.trim(),
    cep: valores.cep,
    rua: valores.rua.trim(),
    numero: arrumarNumero(valores.numero),
    bairro,
    subprefeitura: subprefeituraDoBairro(bairro),
    gravidade,
    urgencia: gravidade,
    tendencia: 3,
    // As fotos não são guardadas no protótipo, só os nomes dos arquivos
    fotos: valores.fotos.map((foto) => foto.nome),
  };
}

// Monta um pedido completo a partir do que a pessoa preencheu no formulário.
// Recebe os dados de prepararDadosDoFormulario, a lista atual, o id de quem abriu,
// o momento de agora e a hora real em milissegundos (usada pela análise simulada);
// devolve o pedido novo, com status "enviada" e nenhum apoio.
export function montarNovoPedido(
  dados,
  pedidos,
  idAutor,
  agora = momentoDeHoje(),
  agoraMs = Date.now(),
) {
  return {
    ...dados,
    id: proximoIdPedido(pedidos),
    protocolo: proximoProtocolo(pedidos, agora.slice(0, 10)),
    status: 'enviada',
    apoios: 0,
    criadoEm: agora,
    atualizadoEm: agora,
    enviadoEmMs: agoraMs,
    autorId: idAutor,
  };
}
