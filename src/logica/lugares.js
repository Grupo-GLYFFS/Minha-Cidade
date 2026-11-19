import { SUBPREFEITURAS } from '../dados/subprefeituras';
import { BAIRROS_CIDADE } from '../dados/bairrosCidade';
import { PERFIS_BAIRROS } from '../dados/perfisBairros';
import { normalizarTexto } from './enderecos';

// Bairro usado quando ninguém entrou na conta (o mesmo da conta de demonstração)
export const BAIRRO_PADRAO = 'Vila Mariana';

// Ordena por nome, de A a Z, ignorando acentos. Recebe a lista; devolve uma nova lista.
export function ordenarPorNome(lista) {
  return [...lista].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

// Procura uma subprefeitura pelo id. Devolve a subprefeitura ou undefined.
export function buscarSubprefeitura(id) {
  return SUBPREFEITURAS.find((sub) => sub.id === id);
}

// Procura um bairro pelo id. Devolve o bairro ou undefined.
export function buscarBairro(id) {
  return BAIRROS_CIDADE.find((bairro) => bairro.id === id);
}

// Procura um bairro pelo nome (com ou sem acento). Devolve o bairro ou undefined.
export function bairroPorNome(nome) {
  const procurado = normalizarTexto(nome);
  return BAIRROS_CIDADE.find((bairro) => normalizarTexto(bairro.nome) === procurado);
}

// Lista os bairros de uma subprefeitura, de A a Z. Recebe o id da subprefeitura.
export function bairrosDaSubprefeitura(idSubprefeitura) {
  return ordenarPorNome(BAIRROS_CIDADE.filter((b) => b.subprefeitura === idSubprefeitura));
}

// Devolve o perfil detalhado de um bairro (números, serviços, mapa) ou undefined.
export function perfilDoBairro(idBairro) {
  return PERFIS_BAIRROS.find((perfil) => perfil.id === idBairro);
}

// Dias da semana abreviados (0 = domingo), para a coleta de lixo
const DIAS_ABREVIADOS = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
const DIAS_INTEIROS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

// Escreve os dias da coleta. Recebe [1, 3, 5]; devolve "Seg., qua. e sex." (um dia só: "Quinta-feira").
function textoDias(dias) {
  if (dias.length === 1) return DIAS_INTEIROS[dias[0]];
  const nomes = dias.map((dia, indice) =>
    indice === 0 ? DIAS_ABREVIADOS[dia] : DIAS_ABREVIADOS[dia].toLowerCase(),
  );
  return `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}`;
}

// Monta os cards de serviços perto de um bairro: os do perfil, se houver; senão, os da lista
// de serviços de referência (dados/bairros.js). Recebe o bairro e a lista de referência;
// devolve [{ icone, nome, linhas }] (vazia se o app ainda não conhece o bairro).
export function servicosDoBairro(bairro, referencias) {
  const perfil = perfilDoBairro(bairro.id);
  if (perfil?.servicos) return perfil.servicos;
  const ref = referencias.find(
    (item) => normalizarTexto(item.bairro) === normalizarTexto(bairro.nome),
  );
  if (!ref) return [];
  return [
    { icone: 'local_hospital', nome: ref.ubs.nome, linhas: [ref.ubs.endereco, ref.ubs.horario] },
    { icone: 'school', nome: ref.escola.nome, linhas: [ref.escola.endereco, 'Matrícula pelo app'] },
    { icone: 'diversity_1', nome: ref.cras.nome, linhas: [ref.cras.endereco] },
    {
      icone: 'delete',
      nome: 'Coleta comum',
      linhas: [textoDias(ref.coleta.comum), `A partir das ${ref.coleta.horarioComum}`],
    },
    { icone: 'recycling', nome: 'Coleta seletiva', linhas: [textoDias(ref.coleta.seletiva)] },
  ];
}

// Escreve o lugar com a preposição certa. Recebe { nome, prep }; devolve "na Vila Mariana".
export function noLugar(lugar) {
  return `${lugar.prep} ${lugar.nome}`;
}

// Escreve o lugar depois de "de". Recebe { nome, prep }; devolve "da Vila Mariana", "do Butantã"
// ou "de Moema" (para títulos como "Alertas da Vila Mariana").
export function doLugar(lugar) {
  const contracao = { na: 'da', no: 'do', em: 'de' };
  return `${contracao[lugar.prep]} ${lugar.nome}`;
}

// Escreve o lugar com o artigo (para "inclui a Vila Mariana").
// Recebe { nome, prep }; devolve "a Vila Mariana", "o Butantã" ou só "Moema".
export function comArtigo(lugar) {
  if (lugar.prep === 'na') return `a ${lugar.nome}`;
  if (lugar.prep === 'no') return `o ${lugar.nome}`;
  return lugar.nome;
}

// Diz para onde leva o link de um bairro: o bairro da pessoa vai para /meu-bairro,
// os outros para /minha-cidade/bairros/:id. Recebe o bairro e o nome do bairro da pessoa.
export function caminhoDoBairro(bairro, nomeBairroDaPessoa) {
  if (bairro.nome === nomeBairroDaPessoa) return '/meu-bairro';
  return `/minha-cidade/bairros/${bairro.id}`;
}

// Filtra as subprefeituras pela busca do popup: vale o nome da subprefeitura ou de um bairro dela.
// Recebe a lista [{ ...subprefeitura, bairros: [nomes] }] e o texto; devolve a lista filtrada.
export function filtrarPorBusca(lista, texto) {
  const procurado = normalizarTexto(texto);
  if (!procurado) return lista;
  return lista.filter(
    (item) =>
      normalizarTexto(item.nome).includes(procurado) ||
      (item.bairros ?? []).some((nome) => normalizarTexto(nome).includes(procurado)),
  );
}
