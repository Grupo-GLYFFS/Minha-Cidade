import { boolean, object, string } from 'yup';
import { cpfValido, limparCpf } from './cpf';

// Ordem dos campos da tela "Entrar" e nome de cada um (para o resumo de erros)
export const CAMPOS_ENTRAR = ['login', 'senha'];
export const NOMES_CAMPOS_ENTRAR = { login: 'E-mail ou CPF', senha: 'Senha' };

// E-mail no formato nome@dominio.com
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Diz se o texto digitado em "E-mail ou CPF" é um e-mail (tem @). Recebe o texto; devolve true ou false.
export function ehEmail(login = '') {
  return login.includes('@');
}

// Regra do campo "E-mail ou CPF": aceita um e-mail válido ou um CPF que existe.
// Usada no "Entrar" e no "Esqueci minha senha".
export const regraLogin = string()
  .trim()
  .required('Digite seu e-mail ou CPF.')
  .test('login', function loginValido(valor = '') {
    if (ehEmail(valor)) {
      if (FORMATO_EMAIL.test(valor)) return true;
      return this.createError({
        message: 'Confira o e-mail: ele precisa ter @ e um domínio, ex.: nome@exemplo.com.',
      });
    }
    if (limparCpf(valor).length !== 11 || /[^\d.\-\s]/.test(valor)) {
      return this.createError({
        message: 'Digite um e-mail, ex.: nome@exemplo.com, ou os 11 números do CPF.',
      });
    }
    if (!cpfValido(valor)) {
      return this.createError({ message: 'Este CPF não existe. Confira os números.' });
    }
    return true;
  });

// Regras da tela "Entrar": e-mail ou CPF, senha preenchida e "Manter conectado".
export const esquemaEntrar = object({
  login: regraLogin,
  senha: string().required('Digite sua senha.'),
  manter: boolean(),
});

// Regras da tela "Esqueci minha senha": só o e-mail ou CPF.
export const esquemaEsqueciSenha = object({ login: regraLogin });
