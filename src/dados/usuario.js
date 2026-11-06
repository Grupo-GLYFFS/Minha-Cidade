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
  cep: '04015-001',
  rua: 'Rua Joaquim Távora',
  numero: '120',
  complemento: '',
  bairro: 'Vila Mariana',
  regiao: 'Zona Sul',
  cidade: 'São Paulo',
  estado: 'SP',
  ubs: 'UBS Vila Mariana',
  // Dias da semana em que o caminhão passa: 0 = domingo, 1 = segunda ... 6 = sábado
  coleta: {
    comum: { dias: [1, 3, 5], horario: '19h' },
    seletiva: { dias: [4], horario: '8h' },
  },
};

// Senha pública da conta de demonstração (só serve para apresentar o protótipo)
export const SENHA_DEMONSTRACAO = 'demo1234';
