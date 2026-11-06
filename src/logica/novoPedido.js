import { HOJE, momentoDeHoje } from './datas';

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

// Transforma o que a pessoa preencheu no formulário nos dados do pedido.
// Recebe os valores já validados; devolve os dados que montarNovoPedido espera.
// A pessoa só informa a gravidade. Na vida real, urgência e tendência são definidas pela
// prefeitura na análise; no protótipo usamos valores iniciais: urgência igual à gravidade
// e tendência 3 (meio da escala).
export function prepararDadosDoFormulario(valores) {
  const gravidade = Number(valores.gravidade);
  const numero = valores.numero.trim();

  return {
    categoria: valores.categoria,
    titulo: valores.titulo.trim(),
    descricao: valores.descricao.trim(),
    cep: valores.cep,
    rua: valores.rua.trim(),
    // "s/n", "sn" e "S/N" ficam todos como "S/N"
    numero: /^s\/?n$/i.test(numero) ? 'S/N' : numero,
    bairro: valores.bairro.trim(),
    regiao: valores.regiao,
    gravidade,
    urgencia: gravidade,
    tendencia: 3,
    // A foto não é guardada no protótipo, só o nome do arquivo
    nomeFoto: valores.foto ? valores.foto.name : null,
  };
}

// Monta um pedido completo a partir do que a pessoa preencheu no formulário.
// Recebe os dados do formulário (titulo, descricao, categoria, bairro, regiao, rua, numero,
// gravidade, urgencia, tendencia), a lista atual, o id de quem abriu, o momento de agora
// e a hora real em milissegundos (usada pela análise simulada);
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
