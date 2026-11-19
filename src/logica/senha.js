// Regras e proteção da senha das contas.

// Tamanho mínimo da senha (usado nas regras e nos textos da tela)
export const SENHA_MIN = 8;
export const SENHA_MAX = 64;

// Regras mostradas na lista "A senha precisa ter" enquanto a pessoa digita.
// Cada regra tem um texto e a função que confere a senha.
export const REGRAS_SENHA = [
  {
    id: 'tamanho',
    texto: `Pelo menos ${SENHA_MIN} caracteres`,
    cumpre: (senha) => senha.length >= SENHA_MIN,
  },
  {
    id: 'letrasNumeros',
    texto: 'Letras e números',
    cumpre: (senha) => /[a-zA-Z]/.test(senha) && /\d/.test(senha),
  },
];

// Transforma a senha em um código (hash SHA-256) para não guardar a senha em texto.
// Recebe o e-mail (usado como "sal", para duas pessoas com a mesma senha terem códigos
// diferentes) e a senha; devolve uma promessa com o código em hexadecimal.
// Atenção: isto é só um protótipo sem servidor. Num produto de verdade a senha iria
// por conexão segura para o servidor, que guardaria um hash lento (ex.: bcrypt ou Argon2).
export async function gerarHashSenha(email, senha) {
  const texto = new TextEncoder().encode(`${email}:${senha}`);
  const resumo = await crypto.subtle.digest('SHA-256', texto);
  // Converte os bytes do resumo em texto hexadecimal (ex.: "9f86d0...")
  return Array.from(new Uint8Array(resumo))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
