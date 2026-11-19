import { boolean, object, ref, string } from 'yup';
import { celularValido } from './celular';
import { cpfValido } from './cpf';
import { SENHA_MAX, SENHA_MIN } from './senha';
import {
  FORMATO_CEP,
  FORMATO_NUMERO,
  regraArquivo,
  regraCep,
  regraRegiao,
} from './regrasFormulario';

// Nome de cada campo, para a lista de erros no topo do formulário
export const NOMES_CAMPOS_CONTA = {
  nome: 'Nome completo',
  celular: 'Celular',
  email: 'E-mail',
  senha: 'Senha',
  confirmarSenha: 'Confirmar senha',
  foto: 'Foto de perfil',
  cep: 'CEP',
  rua: 'Rua',
  numero: 'Número',
  complemento: 'Complemento',
  bairro: 'Bairro',
  regiao: 'Região',
};

// Nome: só letras (com acento), espaço, apóstrofo e hífen, ex.: "Ana Lima", "Joana D'Arc"
const SO_LETRAS = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
// Duas ou mais palavras, cada uma começando com letra
const DUAS_PALAVRAS = /^[A-Za-zÀ-ÖØ-öø-ÿ]\S*(\s+[A-Za-zÀ-ÖØ-öø-ÿ]\S*)+$/;

// Regras do e-mail: também usadas na tela "Entrar"
export const regraEmail = string()
  .trim()
  .required('Digite seu e-mail, ex.: nome@exemplo.com.')
  .email('Confira o e-mail: ele precisa ter @ e um domínio, ex.: nome@exemplo.com.')
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    'Confira o e-mail: ele precisa ter @ e um domínio, ex.: nome@exemplo.com.',
  );

// Passo 1 (Você): nome, celular, e-mail, senha, confirmação e foto opcional.
export const esquemaPassoVoce = object({
  nome: string()
    .trim()
    .required('Digite seu nome completo, ex.: Ana Lima.')
    .matches(SO_LETRAS, 'Use só letras no nome, sem números ou símbolos.')
    .matches(DUAS_PALAVRAS, 'Digite nome e sobrenome, ex.: Ana Lima.')
    .max(80, 'Encurte o nome para até 80 caracteres.'),

  celular: string()
    .required('Digite o celular com DDD, ex.: (11) 91234-5678.')
    .test(
      'celular',
      'Digite o celular com DDD e 9 números começando com 9, ex.: (11) 91234-5678.',
      (valor) => celularValido(valor),
    ),

  email: regraEmail,

  senha: string()
    .required('Crie uma senha com pelo menos 8 caracteres, letras e números.')
    .min(SENHA_MIN, `Use pelo menos ${SENHA_MIN} caracteres na senha.`)
    .max(SENHA_MAX, `Use até ${SENHA_MAX} caracteres na senha.`)
    .matches(/[a-zA-Z]/, 'Coloque pelo menos uma letra na senha.')
    .matches(/\d/, 'Coloque pelo menos um número na senha.'),

  confirmarSenha: string()
    .required('Digite a senha de novo para confirmar.')
    .oneOf([ref('senha')], 'As senhas não são iguais. Digite a mesma senha nos dois campos.'),

  // Foto opcional: se tiver, precisa ser imagem de até 5 MB
  foto: regraArquivo({
    aceito: (arquivo) => arquivo.type.startsWith('image/'),
    mensagemTipo: 'Escolha um arquivo de imagem (JPG, PNG ou WEBP).',
    nomeArquivo: 'Esta foto',
    tipoPedido: 'uma imagem',
  }),
});

// Passo 2 (Endereço): mesmo jeito do endereço do "Abrir pedido", com complemento opcional.
export const esquemaPassoEndereco = object({
  cep: regraCep({
    vazio: 'Digite o CEP da sua casa, ex.: 04015-001.',
    foraDaCidade:
      'Este CEP não é da cidade de São Paulo. Confira os números: o app atende só moradores da capital.',
  }),
  cidadeDoCep: string(),
  rua: string()
    .trim()
    .required('Digite o nome da rua, ex.: Rua Joaquim Távora.')
    .min(3, 'Digite o nome completo da rua, ex.: Rua Joaquim Távora.')
    .max(120, 'Encurte o nome da rua para até 120 caracteres.'),
  numero: string()
    .trim()
    .required('Digite o número da casa ou s/n se não houver.')
    .matches(FORMATO_NUMERO, 'Use só números (ex.: 120) ou s/n se a casa não tiver número.'),
  complemento: string().trim().max(60, 'Encurte o complemento para até 60 caracteres.'),
  bairro: string()
    .trim()
    .required('Digite o bairro, ex.: Vila Mariana.')
    .min(2, 'Digite o nome completo do bairro, ex.: Vila Mariana.')
    .max(60, 'Encurte o nome do bairro para até 60 caracteres.'),
  regiao: regraRegiao(),
});

// ---------- Tela "Criar conta" (uma página só, com confirmação por código no e-mail) ----------

// Ordem dos campos na tela: o resumo de erros e o foco seguem esta ordem
export const CAMPOS_CRIAR_CONTA = [
  'nome',
  'cpf',
  'celular',
  'email',
  'senha',
  'cep',
  'numero',
  'distrito',
  'complemento',
  'termos',
];

// Nome de cada campo da tela, para o resumo de erros
export const NOMES_CRIAR_CONTA = {
  nome: 'Nome completo',
  cpf: 'CPF',
  celular: 'Celular',
  email: 'E-mail',
  senha: 'Senha',
  cep: 'CEP',
  numero: 'Número',
  distrito: 'Distrito',
  complemento: 'Complemento',
  termos: 'Política de privacidade',
};

// Formulário vazio. "situacaoCep", "rua", "bairro", "cidadeDoCep" e "distrito" vêm da busca
// no ViaCEP (o distrito a pessoa escolhe quando o app não reconhece o bairro do CEP).
export const VALORES_CRIAR_CONTA = {
  nome: '',
  cpf: '',
  celular: '',
  email: '',
  senha: '',
  cep: '',
  numero: '',
  complemento: '',
  termos: false,
  situacaoCep: '',
  rua: '',
  bairro: '',
  cidadeDoCep: '',
  distrito: '',
  distritoAutomatico: false,
};

// O que falta no CEP depois da busca, conforme a situação devolvida pelo ViaCEP
const ERROS_BUSCA_CEP = {
  '': 'Digite os 8 números do CEP e espere o endereço aparecer.',
  buscando: 'Espere o endereço aparecer.',
  'nao-encontrado': 'Não achamos este CEP. Confira os números.',
  'fora-da-cidade': 'Este CEP não é da cidade de São Paulo. O app atende só quem mora na capital.',
  falha: 'Não conseguimos buscar o CEP agora. Tente de novo em instantes.',
};

// Regras da tela "Criar conta".
// Nome, celular e e-mail seguem as mesmas regras do "Meus dados"; o CEP só passa
// quando o ViaCEP achou um endereço da cidade (o endereço define o bairro da pessoa).
export const esquemaCriarConta = esquemaPassoVoce.pick(['nome', 'celular', 'email']).concat(
  object({
    cpf: string()
      .required('Digite seu CPF, ex.: 123.456.789-09.')
      .test('cpf', 'Este CPF não existe. Confira os números no documento.', (valor) =>
        cpfValido(valor),
      ),
    senha: string()
      .required('Crie uma senha com pelo menos 8 caracteres, letras e números.')
      .min(SENHA_MIN, `Use pelo menos ${SENHA_MIN} caracteres na senha.`)
      .max(SENHA_MAX, `Use até ${SENHA_MAX} caracteres na senha.`)
      .matches(/[a-zA-Z]/, 'Coloque pelo menos uma letra na senha.')
      .matches(/\d/, 'Coloque pelo menos um número na senha.'),
    situacaoCep: string(),
    cep: string()
      .required('Digite o CEP da sua casa, ex.: 04015-001.')
      .matches(FORMATO_CEP, 'Digite os 8 números do CEP, ex.: 04015-001.')
      .test('endereco', function cepComEndereco() {
        const situacao = this.parent.situacaoCep ?? '';
        if (situacao === 'encontrado') return true;
        return this.createError({ message: ERROS_BUSCA_CEP[situacao] ?? ERROS_BUSCA_CEP[''] });
      }),
    numero: string()
      .trim()
      .required('Digite o número da casa ou s/n se não houver.')
      .matches(FORMATO_NUMERO, 'Use só números (ex.: 120) ou s/n se a casa não tiver número.'),
    complemento: string().trim().max(60, 'Encurte o complemento para até 60 caracteres.'),
    // Distrito (um dos 96): só é pedido depois de um CEP de São Paulo achado
    distrito: string().when('situacaoCep', {
      is: 'encontrado',
      then: (regra) => regra.required('Escolha o distrito onde fica o seu endereço.'),
    }),
    termos: boolean().oneOf(
      [true],
      'Marque a caixa para aceitar a política de privacidade e criar a conta.',
    ),
  }),
);
