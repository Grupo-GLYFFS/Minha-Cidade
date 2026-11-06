import { object, string } from 'yup';
import { CATEGORIAS_PEDIDO } from '../dados/categoriasPedido';
import { GRAVIDADES } from '../dados/gravidades';
import {
  FORMATO_NUMERO,
  LIMITE_ARQUIVO_MB,
  regraArquivo,
  regraCep,
  regraRegiao,
} from './regrasFormulario';

// Limites dos campos (usados nas regras e nos textos de ajuda da tela)
export const TITULO_MIN = 10;
export const TITULO_MAX = 80;
export const DESCRICAO_MIN = 20;
export const DESCRICAO_MAX = 500;
export const LIMITE_FOTO_MB = LIMITE_ARQUIVO_MB;

// Ordem dos campos na tela: o primeiro com erro recebe o foco ao tentar enviar
export const ORDEM_CAMPOS = [
  'categoria',
  'titulo',
  'descricao',
  'gravidade',
  'cep',
  'rua',
  'numero',
  'bairro',
  'regiao',
  'foto',
];

// Nome de cada campo, para a lista de erros no topo do formulário
export const NOMES_CAMPOS = {
  categoria: 'Categoria',
  titulo: 'Título',
  descricao: 'Descrição',
  gravidade: 'Gravidade',
  cep: 'CEP',
  rua: 'Rua',
  numero: 'Número',
  bairro: 'Bairro',
  regiao: 'Região',
  foto: 'Foto',
};

// Valores do formulário vazio. "cidadeDoCep" não aparece na tela: guarda a cidade
// que o ViaCEP devolveu, para avisar quando o CEP é de outra cidade.
export const VALORES_INICIAIS = {
  categoria: '',
  titulo: '',
  descricao: '',
  gravidade: '',
  cep: '',
  cidadeDoCep: '',
  rua: '',
  numero: '',
  bairro: '',
  regiao: '',
  foto: null,
};

// Regras de cada campo do formulário "Abrir pedido".
// Toda mensagem diz o que fazer para corrigir.
export const esquemaNovoPedido = object({
  categoria: string()
    .required('Escolha a categoria que mais combina com o problema.')
    .oneOf(
      CATEGORIAS_PEDIDO.map((c) => c.id),
      'Escolha a categoria que mais combina com o problema.',
    ),

  titulo: string()
    .trim()
    .required('Escreva um título curto, ex.: Poste apagado em frente ao número 120.')
    .min(TITULO_MIN, `Escreva pelo menos ${TITULO_MIN} caracteres no título.`)
    .max(
      TITULO_MAX,
      `Encurte o título para até ${TITULO_MAX} caracteres. Os detalhes vão na descrição.`,
    ),

  descricao: string()
    .trim()
    .required('Conte o que está acontecendo no local.')
    .min(
      DESCRICAO_MIN,
      `Escreva pelo menos ${DESCRICAO_MIN} caracteres para a prefeitura entender o problema.`,
    )
    .max(DESCRICAO_MAX, `Encurte a descrição para até ${DESCRICAO_MAX} caracteres.`),

  gravidade: string()
    .required('Escolha quão grave é o problema, de 1 (leve) a 5 (muito grave).')
    .oneOf(
      GRAVIDADES.map((g) => g.valor),
      'Escolha quão grave é o problema, de 1 (leve) a 5 (muito grave).',
    ),

  cep: regraCep({
    vazio: 'Digite o CEP do local, ex.: 04015-001.',
    foraDaCidade:
      'Este CEP não é da cidade de São Paulo. Confira os números ou use o CEP do local do problema.',
  }),

  cidadeDoCep: string(),

  rua: string()
    .trim()
    .required('Digite o nome da rua, ex.: Rua Joaquim Távora.')
    .min(3, 'Digite o nome completo da rua, ex.: Rua Joaquim Távora.')
    .max(120, 'Encurte o nome da rua para até 120 caracteres.'),

  // Aceita números (com uma letra no fim, ex.: 120A) ou "s/n"
  numero: string()
    .trim()
    .required('Digite o número mais perto do problema ou s/n se não houver.')
    .matches(FORMATO_NUMERO, 'Use só números (ex.: 120) ou s/n se o local não tiver número.'),

  bairro: string()
    .trim()
    .required('Digite o bairro, ex.: Vila Mariana.')
    .min(2, 'Digite o nome completo do bairro, ex.: Vila Mariana.')
    .max(60, 'Encurte o nome do bairro para até 60 caracteres.'),

  // Só é pedida quando o bairro está preenchido (se o app reconhece o bairro, ela vem sozinha)
  regiao: regraRegiao(),

  // Foto opcional: se tiver, precisa ser imagem de até 5 MB
  foto: regraArquivo({
    aceito: (arquivo) => arquivo.type.startsWith('image/'),
    mensagemTipo: 'Escolha um arquivo de imagem (JPG, PNG ou WEBP).',
    nomeArquivo: 'Esta foto',
    tipoPedido: 'uma imagem',
  }),
});
