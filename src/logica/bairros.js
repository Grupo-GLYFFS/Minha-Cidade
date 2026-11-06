import { BAIRROS } from '../dados/bairros';
import { REGIOES } from '../dados/regioes';
import { proximoDiaDaLista } from './datas';
import { normalizarTexto, regiaoDoBairro } from './enderecos';

// Bairro aberto em Meu Bairro quando a pessoa não está logada e não escolheu outro
export const BAIRRO_PADRAO = 'Vila Mariana';

// Nomes curtos dos dias da semana, de domingo (0) a sábado (6)
const DIAS_CURTOS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

// Procura os dados de um bairro (coleta, UBS, escola e CRAS).
// Recebe o nome do bairro (com ou sem acento, ou null); devolve o objeto de BAIRROS ou undefined.
export function buscarBairro(bairro) {
  const procurado = normalizarTexto(bairro ?? '');
  if (!procurado) return undefined;
  return BAIRROS.find((item) => normalizarTexto(item.bairro) === procurado);
}

// Descobre a região de um bairro: primeiro nos dados do bairro, depois na lista de regiões.
// Recebe o nome do bairro e uma região reserva (ex.: a do cadastro); devolve o nome da região ou "".
export function regiaoDe(bairro, reserva = '') {
  return buscarBairro(bairro)?.regiao ?? regiaoDoBairro(bairro ?? '') ?? reserva;
}

// Escreve quando passa a próxima coleta de lixo comum.
// Recebe a coleta do bairro e a data de hoje; devolve, por exemplo, "Hoje, a partir das 19h".
export function textoProximaColeta(coleta, hoje) {
  return `${proximoDiaDaLista(coleta.comum, hoje)}, a partir das ${coleta.horarioComum}`;
}

// Escreve uma lista de dias da semana em linguagem simples.
// Recebe os dias (0 = domingo ... 6 = sábado); devolve "Segunda, quarta e sexta",
// "De segunda a sábado" (6 dias seguidos) ou "Quinta" (um dia só).
export function listarDias(dias) {
  const ordenados = [...dias].sort((a, b) => a - b);
  const nomes = ordenados.map((dia) => DIAS_CURTOS[dia]);
  let texto;
  if (ordenados.length === 6 && ordenados[0] === 1 && ordenados[5] === 6) {
    texto = 'de segunda a sábado';
  } else if (nomes.length === 1) {
    texto = nomes[0];
  } else {
    texto = `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}`;
  }
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Monta o link do Google Maps que procura um endereço da cidade.
// Recebe o endereço e o bairro; devolve a URL de busca do Maps.
export function linkComoChegar(endereco, bairro) {
  const consulta = `${endereco}, ${bairro}, São Paulo - SP`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

// Monta as opções da lista "Escolha um bairro", separadas por região.
// Recebe um bairro extra (ex.: o da pessoa, se o app não conhece) para entrar na lista;
// devolve [{ group: "Zona Sul", items: ["Campo Belo", ...] }, ...] em ordem alfabética.
export function opcoesDeBairros(bairroExtra) {
  const grupos = REGIOES.map((regiao) => ({
    group: regiao.nome,
    items: BAIRROS.filter((item) => item.regiao === regiao.nome).map((item) => item.bairro),
  }));
  if (bairroExtra && !buscarBairro(bairroExtra)) {
    grupos.push({ group: 'Seu cadastro', items: [bairroExtra] });
  }
  return grupos;
}

// Decide qual bairro a página Meu Bairro mostra.
// Recebe o bairro do endereço (?bairro=, pode ser null) e o bairro do cadastro (null para visitante).
// Vale o do endereço se o app conhece o bairro ou se é o do cadastro; senão, o do cadastro;
// sem cadastro, a Vila Mariana. Devolve o nome do bairro como está nos dados.
export function escolherBairro(doEndereco, doCadastro) {
  const conhecido = buscarBairro(doEndereco);
  if (conhecido) return conhecido.bairro;
  if (doCadastro && normalizarTexto(doEndereco ?? '') === normalizarTexto(doCadastro)) {
    return doCadastro;
  }
  return doCadastro || BAIRRO_PADRAO;
}
