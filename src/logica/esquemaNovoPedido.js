import { mixed, object, string } from 'yup';
import { CATEGORIAS_PEDIDO } from '../dados/categoriasPedido';
import { GRAVIDADES } from '../dados/gravidades';
import { REGIOES } from '../dados/regioes';
import { CIDADE_ATENDIDA } from './buscarCep';

// Limites dos campos (usados nas regras e nos textos de ajuda da tela)
export const TITULO_MIN = 10;
export const TITULO_MAX = 80;
export const DESCRICAO_MIN = 20;
export const DESCRICAO_MAX = 500;
export const LIMITE_FOTO_MB = 5;

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

// Escreve o tamanho de um arquivo em MB. Recebe bytes; devolve, por exemplo, "7,2 MB".
function emMegabytes(bytes) {
  return `${(bytes / 1024 / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`;
}

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

  cep: string()
    .required('Digite o CEP do local, ex.: 04015-001.')
    .matches(/^\d{5}-\d{3}$/, 'Digite os 8 números do CEP, ex.: 04015-001.')
    // Bloqueia CEP de outra cidade (a cidade vem da busca no ViaCEP)
    .test(
      'cidade-atendida',
      'Este CEP não é da cidade de São Paulo. Confira os números ou use o CEP do local do problema.',
      function cepDaCidade() {
        const cidade = this.parent.cidadeDoCep;
        return !cidade || cidade === CIDADE_ATENDIDA;
      },
    ),

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
    .matches(
      /^(\d{1,6}[a-zA-Z]?|s\/?n)$/i,
      'Use só números (ex.: 120) ou s/n se o local não tiver número.',
    ),

  bairro: string()
    .trim()
    .required('Digite o bairro, ex.: Vila Mariana.')
    .min(2, 'Digite o nome completo do bairro, ex.: Vila Mariana.')
    .max(60, 'Encurte o nome do bairro para até 60 caracteres.'),

  // Só é pedida quando o bairro está preenchido (se o app reconhece o bairro, ela vem sozinha)
  regiao: string().when('bairro', {
    is: (bairro) => Boolean(bairro?.trim()),
    then: (regra) =>
      regra.required('Escolha a região da cidade onde fica o bairro.').oneOf(
        REGIOES.map((r) => r.nome),
        'Escolha a região da cidade onde fica o bairro.',
      ),
  }),

  // Foto opcional: se tiver, precisa ser imagem de até 5 MB
  foto: mixed()
    .nullable()
    .test('tipo', 'Escolha um arquivo de imagem (JPG, PNG ou WEBP).', (arquivo) => {
      return !arquivo || arquivo.type.startsWith('image/');
    })
    .test('tamanho', 'Foto grande demais.', function fotoPequena(arquivo) {
      if (!arquivo || arquivo.size <= LIMITE_FOTO_MB * 1024 * 1024) return true;
      return this.createError({
        message: `Esta foto tem ${emMegabytes(arquivo.size)}. Escolha uma imagem de até ${LIMITE_FOTO_MB} MB.`,
      });
    }),
});
