// Conta de demonstração: a Maria, dona dos pedidos de exemplo.
// Ela sempre existe; dá para entrar com o botão "Entrar com conta de demonstração"
// ou digitando o e-mail e a senha abaixo. Os outros dados (pedidos, votos) apontam para ela pelo "id".
export const USUARIO = {
  id: 'u-001',
  nome: 'Maria Souza',
  primeiroNome: 'Maria',
  iniciais: 'MS',
  email: 'maria@exemplo.com',
  celular: '(11) 91234-5678',
  // CPF de exemplo (válido pelo cálculo, mas não é de ninguém); o Perfil mostra mascarado
  cpf: '123.456.789-09',
  cep: '04015-001',
  rua: 'Rua Joaquim Távora',
  numero: '120',
  complemento: '',
  bairro: 'Vila Mariana',
  regiao: 'Zona Sul',
  cidade: 'São Paulo',
  estado: 'SP',
};

// Senha pública da conta de demonstração (só serve para apresentar o protótipo)
export const SENHA_DEMONSTRACAO = 'demo1234';
