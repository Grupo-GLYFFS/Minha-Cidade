import { object, string } from 'yup';
import { CATEGORIAS_PEDIDO } from '../dados/categoriasPedido';
import { FORMATO_NUMERO, LIMITE_ARQUIVO_MB, emMegabytes, regraCep } from './regrasFormulario';

// Limites dos campos (usados nas regras e nos textos de ajuda da tela)
export const TITULO_MIN = 10;
export const TITULO_MAX = 80;
export const DESCRICAO_MIN = 20;
export const DESCRICAO_MAX = 500;
export const MAXIMO_FOTOS = 3;
export const TIPOS_FOTO = ['image/jpeg', 'image/png', 'image/webp'];

// Etapas do Abrir pedido, na ordem
export const ETAPAS_NOVO_PEDIDO = ['Descreva o problema', 'Onde fica', 'Fotos', 'Revisar'];

// Nome de cada campo, para a lista de erros no topo da etapa
export const NOMES_CAMPOS = {
  descricao: 'O que está acontecendo?',
  categoria: 'Categoria',
  cep: 'CEP',
  rua: 'Rua',
  numero: 'Número',
  bairro: 'Bairro',
  titulo: 'Título',
};

// Valores do formulário vazio. "cidadeDoCep" não aparece na tela: guarda a cidade
// que o ViaCEP devolveu, para avisar quando o CEP é de outra cidade.
export const VALORES_INICIAIS = {
  descricao: '',
  categoria: '',
  titulo: '',
  cep: '',
  cidadeDoCep: '',
  rua: '',
  numero: '',
  bairro: '',
  fotos: [],
};

// Etapa 1: a descrição e a categoria (sugerida pelo app ou trocada pela pessoa)
export const esquemaDescreva = object({
  descricao: string()
    .trim()
    .required('Conte o que está acontecendo no local.')
    .min(
      DESCRICAO_MIN,
      `Escreva pelo menos ${DESCRICAO_MIN} caracteres para a prefeitura entender o problema.`,
    )
    .max(DESCRICAO_MAX, `Encurte a descrição para até ${DESCRICAO_MAX} caracteres.`),
  categoria: string()
    .required('Escolha a categoria que mais combina com o problema.')
    .oneOf(
      CATEGORIAS_PEDIDO.map((c) => c.id),
      'Escolha a categoria que mais combina com o problema.',
    ),
});

// Etapa 2: o endereço do problema (qualquer lugar da cidade de São Paulo)
export const esquemaOnde = object({
  cep: regraCep({
    vazio: 'Digite o CEP do local, ex.: 04015-001.',
    foraDaCidade: 'Este CEP não é da cidade de São Paulo. Use o CEP do local do problema.',
  }),
  cidadeDoCep: string(),
  rua: string()
    .trim()
    .required('Digite o nome da rua, ex.: Rua Joaquim Távora.')
    .min(3, 'Digite o nome completo da rua, ex.: Rua Joaquim Távora.')
    .max(120, 'Encurte o nome da rua para até 120 caracteres.'),
  numero: string()
    .trim()
    .required('Digite o número mais perto do problema ou s/n se não houver.')
    .matches(FORMATO_NUMERO, 'Use só números (ex.: 120) ou s/n se o local não tiver número.'),
  bairro: string()
    .trim()
    .required('Digite o bairro, ex.: Vila Mariana.')
    .min(2, 'Digite o nome completo do bairro, ex.: Vila Mariana.')
    .max(60, 'Encurte o nome do bairro para até 60 caracteres.'),
});

// Título, que o app monta e a pessoa pode editar na revisão
export const esquemaTitulo = object({
  titulo: string()
    .trim()
    .required('Escreva um título curto, ex.: Poste apagado em frente ao número 120.')
    .min(TITULO_MIN, `Escreva pelo menos ${TITULO_MIN} caracteres no título.`)
    .max(TITULO_MAX, `Encurte o título para até ${TITULO_MAX} caracteres.`),
});

// Confere os valores de uma etapa.
// Recebe o esquema e os valores; devolve { campo: mensagem } (vazio quando está tudo certo).
export function validarEtapa(esquema, valores) {
  try {
    esquema.validateSync(valores, { abortEarly: false });
    return {};
  } catch (erro) {
    const erros = {};
    // Fica só a primeira mensagem de cada campo
    erro.inner.forEach((item) => {
      if (!erros[item.path]) erros[item.path] = item.message;
    });
    return erros;
  }
}

// Monta a lista do resumo de erros, na ordem dos campos na tela.
// Recebe { campo: mensagem } e a ordem dos campos; devolve [{ campo, rotulo, mensagem }].
export function listarErros(erros, ordem) {
  return ordem
    .filter((campo) => erros[campo])
    .map((campo) => ({ campo, rotulo: NOMES_CAMPOS[campo], mensagem: erros[campo] }));
}

// Confere as fotos escolhidas antes de entrarem na lista.
// Recebe os arquivos novos e quantas fotos já existem;
// devolve { aceitas: [arquivos], erro: mensagem ou "" }.
export function conferirFotos(arquivos, jaTem) {
  const vagas = MAXIMO_FOTOS - jaTem;
  const aceitas = [];
  let erro = '';
  arquivos.forEach((arquivo) => {
    if (!TIPOS_FOTO.includes(arquivo.type)) {
      erro = `${arquivo.name} não é uma foto. Escolha um arquivo JPG, PNG ou WEBP.`;
    } else if (arquivo.size > LIMITE_ARQUIVO_MB * 1024 * 1024) {
      erro = `${arquivo.name} tem ${emMegabytes(arquivo.size)}. Escolha uma foto de até ${LIMITE_ARQUIVO_MB} MB.`;
    } else if (aceitas.length >= vagas) {
      erro = `Dá para enviar até ${MAXIMO_FOTOS} fotos. Tire uma para colocar outra.`;
    } else {
      aceitas.push(arquivo);
    }
  });
  return { aceitas, erro };
}
