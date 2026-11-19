import { normalizarTexto } from './enderecos';
import { GRAVIDADES } from '../dados/gravidades';

// Palavras que indicam cada categoria (sem acento e em minúsculas, como fica depois de normalizar).
// A pessoa descreve o problema e o app sugere a categoria; ela pode trocar.
const PALAVRAS_CATEGORIA = {
  iluminacao: ['poste', 'luz', 'lampada', 'escur', 'ilumina', 'apagad'],
  pavimentacao: ['buraco', 'asfalto', 'cratera', 'paralelep', 'paviment', 'afund', 'remendo'],
  poda: ['arvore', 'galho', 'poda', 'tronco'],
  entulho: ['lixo', 'entulho', 'sofa', 'movel', 'moveis', 'sujeira', 'descarte', 'sacos'],
  'boca-de-lobo': ['boca de lobo', 'bueiro', 'alag', 'enchente', 'galeria', 'esgoto'],
  calcada: ['calcada', 'rampa', 'piso', 'desnivel', 'raiz'],
  sinalizacao: ['placa', 'semaforo', 'faixa de pedestre', 'sinaliza', 'lombada', 'transito'],
};

// Gravidade de partida de cada categoria, antes de olhar as palavras de risco
const GRAVIDADE_BASE = {
  iluminacao: 3,
  pavimentacao: 3,
  poda: 3,
  entulho: 2,
  'boca-de-lobo': 3,
  calcada: 2,
  sinalizacao: 3,
};

// Palavras que sobem a gravidade: risco para quem passa (+1) e risco imediato (+2)
const PALAVRAS_RISCO = [
  'acidente',
  'caindo',
  'caiu',
  'cair',
  'moto',
  'perigo',
  'risco',
  'crianca',
  'idoso',
  'machuc',
];
const PALAVRAS_RISCO_IMEDIATO = [
  'fio solto',
  'fios soltos',
  'choque',
  'desab',
  'ferid',
  'incendio',
];

// Começos de frase que não ajudam no título ("Tem um buraco…" vira "Buraco…")
const COMECOS_VAZIOS =
  /^(tem|há|ha|existe|existem|está|esta|estão|estao)\s+((um|uma|uns|umas|o|a|os|as)\s+)?/i;

// Sugere a categoria a partir da descrição.
// Conta quantas palavras de cada categoria aparecem; no empate, vence a que aparece primeiro.
// Recebe o texto; devolve o id da categoria ou "" se nada combinar.
export function sugerirCategoria(texto) {
  const normal = normalizarTexto(texto);
  let melhor = { id: '', pontos: 0, posicao: Infinity };
  Object.entries(PALAVRAS_CATEGORIA).forEach(([id, palavras]) => {
    const achadas = palavras.map((palavra) => normal.indexOf(palavra)).filter((p) => p >= 0);
    if (achadas.length === 0) return;
    const posicao = Math.min(...achadas);
    const ganha =
      achadas.length > melhor.pontos ||
      (achadas.length === melhor.pontos && posicao < melhor.posicao);
    if (ganha) melhor = { id, pontos: achadas.length, posicao };
  });
  return melhor.id;
}

// Monta um título curto a partir da descrição: primeira frase, sem "Tem um…", até 60 caracteres.
// Recebe o texto; devolve o título com a primeira letra maiúscula.
export function montarTitulo(texto) {
  const primeira = texto
    .trim()
    .split(/[.,;!?\n]/)[0]
    .trim();
  let titulo = primeira.replace(COMECOS_VAZIOS, '');
  // Corta na última palavra inteira que cabe em 60 caracteres
  if (titulo.length > 60) titulo = titulo.slice(0, 60).replace(/\s+\S*$/, '');
  if (titulo.length < 10)
    titulo = texto
      .trim()
      .slice(0, 60)
      .replace(/\s+\S*$/, '');
  return titulo.charAt(0).toUpperCase() + titulo.slice(1);
}

// Estima a gravidade (1 a 5) pela categoria e pelas palavras de risco da descrição.
// A prefeitura confirma na análise. Recebe o texto e o id da categoria;
// devolve { valor, rotulo } de dados/gravidades.js.
export function estimarGravidade(texto, categoria) {
  const normal = normalizarTexto(texto);
  let valor = GRAVIDADE_BASE[categoria] ?? 3;
  if (PALAVRAS_RISCO.some((palavra) => normal.includes(palavra))) valor += 1;
  if (PALAVRAS_RISCO_IMEDIATO.some((palavra) => normal.includes(palavra))) valor += 2;
  valor = Math.min(5, valor);
  const gravidade = GRAVIDADES.find((item) => Number(item.valor) === valor);
  return { valor, rotulo: gravidade.rotulo };
}
