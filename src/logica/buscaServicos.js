import { normalizarTexto } from './enderecos';
import { buscarCategoriaServico } from './servicos';

// Termos populares mostrados como sugestão quando a busca está vazia
export const SUGESTOES_BUSCA = [
  'IPTU',
  'Consulta',
  'Vacina',
  'Lixo',
  'Creche',
  'Buraco',
  'Ônibus',
  'Emprego',
];

// Palavras que não ajudam a achar o serviço (ex.: "imposto DA casa")
const PALAVRAS_IGNORADAS = [
  'a',
  'o',
  'as',
  'os',
  'de',
  'da',
  'do',
  'das',
  'dos',
  'e',
  'em',
  'na',
  'no',
  'nas',
  'nos',
  'um',
  'uma',
  'para',
  'pra',
  'por',
  'com',
  'meu',
  'minha',
  'meus',
  'minhas',
  'quero',
  'preciso',
  'como',
];

// Pontos de cada parte do serviço quando uma palavra da busca aparece nela
const PONTOS_PALAVRA = { nome: 10, palavrasChave: 7, categoria: 4, resumo: 3 };

// Quebra um texto em palavras normalizadas (sem acento, minúsculas).
// Recebe "Emitir 2ª via do IPTU"; devolve ["emitir", "2", "via", "do", "iptu"].
function separarPalavras(texto) {
  return normalizarTexto(texto)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

// Diz se a palavra da busca combina com alguma palavra da lista.
// Vale o começo da palavra ("remed" acha "remedio") e o plural ("remedios" acha "remedio").
function combina(termo, palavras) {
  return palavras.some(
    (palavra) =>
      palavra.startsWith(termo) ||
      (palavra.length >= 4 && termo.startsWith(palavra) && termo.length - palavra.length <= 2),
  );
}

// Junta as palavras de cada parte do serviço que entra na busca.
// Recebe o serviço; devolve { nome, palavrasChave, categoria, resumo } com listas de palavras.
function prepararServico(servico) {
  const categoria = buscarCategoriaServico(servico.categoria);
  const subcategoria = categoria?.subcategorias.find((s) => s.id === servico.subcategoria);
  return {
    nome: separarPalavras(servico.nome),
    palavrasChave: separarPalavras(servico.palavrasChave.join(' ')),
    categoria: separarPalavras(`${categoria?.nome ?? ''} ${subcategoria?.nome ?? ''}`),
    resumo: separarPalavras(servico.resumo),
  };
}

// Calcula a nota de um serviço para a busca.
// Recebe o serviço, a frase normalizada e as palavras da busca;
// devolve 0 se alguma palavra não aparece em lugar nenhum (o serviço fica de fora).
function pontuar(servico, frase, termos) {
  const partes = prepararServico(servico);
  let pontos = 0;

  // Cada palavra precisa aparecer em alguma parte; vale a parte de maior peso
  for (const termo of termos) {
    const melhor = Object.keys(PONTOS_PALAVRA)
      .filter((parte) => combina(termo, partes[parte]))
      .reduce((maior, parte) => Math.max(maior, PONTOS_PALAVRA[parte]), 0);
    if (melhor === 0) return 0;
    pontos += melhor;
  }

  // Bônus para a frase inteira: nome igual, nome que começa com ela ou a contém
  const nome = normalizarTexto(servico.nome);
  if (nome === frase) pontos += 100;
  else if (nome.startsWith(frase)) pontos += 60;
  else if (` ${nome}`.includes(` ${frase}`)) pontos += 40;

  // Bônus para a frase igual a um sinônimo (ex.: "imposto da casa") ou começo de um
  const chaves = servico.palavrasChave.map((chave) => normalizarTexto(chave));
  if (chaves.includes(frase)) pontos += 50;
  else if (chaves.some((chave) => chave.startsWith(frase))) pontos += 30;

  return pontos;
}

// Procura serviços pelo texto digitado, sem diferenciar acentos e maiúsculas.
// Recebe o texto e a lista de serviços; devolve os serviços encontrados, do mais ao menos
// parecido. Todas as palavras precisam aparecer no nome, nos sinônimos, na categoria ou no
// resumo. Texto vazio devolve lista vazia.
export function buscarServicos(texto, servicos) {
  const frase = normalizarTexto(texto);
  const palavras = separarPalavras(texto);
  // Tira as palavras comuns, a não ser que a busca seja só elas
  const termos = palavras.filter((palavra) => !PALAVRAS_IGNORADAS.includes(palavra));
  const usados = termos.length > 0 ? termos : palavras;
  if (usados.length === 0) return [];

  return servicos
    .map((servico) => ({ servico, pontos: pontuar(servico, frase, usados) }))
    .filter((item) => item.pontos > 0)
    .sort(
      (a, b) =>
        b.pontos - a.pontos ||
        // Empate: os mais usados primeiro, depois em ordem alfabética
        Number(Boolean(b.servico.maisUsado)) - Number(Boolean(a.servico.maisUsado)) ||
        a.servico.nome.localeCompare(b.servico.nome, 'pt-BR'),
    )
    .map((item) => item.servico);
}
