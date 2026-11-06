import { boolean, object, ref, string } from 'yup';
import { celularValido } from './celular';
import { SENHA_MAX, SENHA_MIN } from './senha';
import { FORMATO_NUMERO, regraArquivo, regraCep, regraRegiao } from './regrasFormulario';

// Tipos de arquivo aceitos como comprovante de residência
export const TIPOS_COMPROVANTE = ['application/pdf', 'image/jpeg', 'image/png'];

// Os 3 passos do cadastro: título curto (no Stepper) e explicação
export const PASSOS_CONTA = [
  { titulo: 'Você', descricao: 'Seus dados e senha' },
  { titulo: 'Endereço', descricao: 'Onde você mora' },
  { titulo: 'Comprovante', descricao: 'Confirme o endereço' },
];

// Campos de cada passo, na ordem da tela: o primeiro com erro recebe o foco
export const CAMPOS_POR_PASSO = [
  ['nome', 'celular', 'email', 'senha', 'confirmarSenha', 'foto'],
  ['cep', 'rua', 'numero', 'complemento', 'bairro', 'regiao'],
  ['comprovante', 'aceite'],
];

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
  comprovante: 'Comprovante de residência',
  aceite: 'Uso dos dados',
};

// Valores do formulário vazio ("cidadeDoCep" guarda a cidade que o ViaCEP devolveu)
export const VALORES_INICIAIS_CONTA = {
  nome: '',
  celular: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  foto: null,
  cep: '',
  cidadeDoCep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  regiao: '',
  comprovante: null,
  aceite: false,
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

// Passo 3 (Comprovante): arquivo obrigatório (PDF, JPG ou PNG até 5 MB) e aceite do uso dos dados.
export const esquemaPassoComprovante = object({
  comprovante: regraArquivo({
    aceito: (arquivo) => TIPOS_COMPROVANTE.includes(arquivo.type),
    mensagemTipo: 'Escolha um arquivo PDF, JPG ou PNG.',
    nomeArquivo: 'Este arquivo',
    obrigatorio: 'Escolha o comprovante de residência (conta de luz, água ou telefone).',
  }),
  aceite: boolean().oneOf(
    [true],
    'Marque a caixa para aceitar o uso dos dados. Sem isso não dá para acompanhar seus pedidos.',
  ),
});

// Esquema de cada passo, na ordem
export const ESQUEMAS_POR_PASSO = [esquemaPassoVoce, esquemaPassoEndereco, esquemaPassoComprovante];
