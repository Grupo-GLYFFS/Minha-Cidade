import { object, string } from 'yup';
import { regraEmail } from './esquemaCriarConta';

// Ordem dos campos da tela "Entrar" e nome de cada um (para a lista de erros)
export const CAMPOS_ENTRAR = ['email', 'senha'];
export const NOMES_CAMPOS_ENTRAR = { email: 'E-mail', senha: 'Senha' };

// Regras da tela "Entrar": e-mail no formato certo e senha preenchida.
export const esquemaEntrar = object({
  email: regraEmail,
  senha: string().required('Digite sua senha.'),
});
