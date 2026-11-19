import { boolean, object, ref, string } from 'yup';
import { SENHA_MAX, SENHA_MIN } from './senha';

// Ordem dos campos da tela "Entrar" e nome de cada um (para o resumo de erros)
export const CAMPOS_ENTRAR = ['login', 'senha'];
export const NOMES_CAMPOS_ENTRAR = { login: 'E-mail', senha: 'Senha' };

// Regra do campo "E-mail": usada no "Entrar" e no "Esqueci minha senha".
export const regraLogin = string()
  .trim()
  .required('Digite seu e-mail, ex.: nome@exemplo.com.')
  .email('Confira o e-mail: ele precisa ter @ e um domínio, ex.: nome@exemplo.com.')
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    'Confira o e-mail: ele precisa ter @ e um domínio, ex.: nome@exemplo.com.',
  );

// Regras da tela "Entrar": e-mail, senha preenchida e "Manter conectado".
export const esquemaEntrar = object({
  login: regraLogin,
  senha: string().required('Digite sua senha.'),
  manter: boolean(),
});

// Regras da tela "Esqueci minha senha": só o e-mail.
export const esquemaEsqueciSenha = object({ login: regraLogin });

// Ordem dos campos da tela "Nova senha" e nome de cada um (para o resumo de erros)
export const CAMPOS_NOVA_SENHA = ['senha', 'repetir'];
export const NOMES_NOVA_SENHA = { senha: 'Nova senha', repetir: 'Repita a senha' };

// Regras da tela "Nova senha": as mesmas da senha do Criar conta, digitada duas vezes.
export const esquemaNovaSenha = object({
  senha: string()
    .required('Crie uma senha com pelo menos 8 caracteres, letras e números.')
    .min(SENHA_MIN, `Use pelo menos ${SENHA_MIN} caracteres na senha.`)
    .max(SENHA_MAX, `Use até ${SENHA_MAX} caracteres na senha.`)
    .matches(/[a-zA-Z]/, 'Coloque pelo menos uma letra na senha.')
    .matches(/\d/, 'Coloque pelo menos um número na senha.'),
  repetir: string()
    .required('Digite a senha nova de novo.')
    .oneOf([ref('senha')], 'As senhas não são iguais. Digite a mesma senha nos dois campos.'),
});
