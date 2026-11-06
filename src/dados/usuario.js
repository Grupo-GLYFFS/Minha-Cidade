// Pessoa de exemplo que está usando o app (não existe login de verdade no protótipo).
// Os outros dados (pedidos, votos) apontam para ela pelo "id".
export const USUARIO = {
  id: 'u-001',
  nome: 'Maria Souza',
  primeiroNome: 'Maria',
  iniciais: 'MS',
  email: 'maria.souza@exemplo.com.br',
  celular: '(11) 91234-5678',
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
