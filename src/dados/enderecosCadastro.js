// Endereços prontos para escolher no cadastro, em bairros que existem no app.
// O bairro do endereço escolhido vira o bairro da pessoa em Meu bairro.
export const ENDERECOS_CADASTRO = [
  {
    id: 'vila-mariana',
    rotulo: 'Rua Joaquim Távora, 85 – Vila Mariana',
    rua: 'Rua Joaquim Távora',
    numero: '85',
    cep: '04015-000',
    bairro: 'Vila Mariana',
  },
  {
    id: 'pinheiros-1',
    rotulo: 'Rua dos Pinheiros, 1200 – Pinheiros',
    rua: 'Rua dos Pinheiros',
    numero: '1200',
    cep: '05422-002',
    bairro: 'Pinheiros',
  },
  {
    id: 'moema',
    rotulo: 'Avenida Ibirapuera, 2300 – Moema',
    rua: 'Avenida Ibirapuera',
    numero: '2300',
    cep: '04028-001',
    bairro: 'Moema',
  },
  {
    id: 'santana',
    rotulo: 'Rua Voluntários da Pátria, 1500 – Santana',
    rua: 'Rua Voluntários da Pátria',
    numero: '1500',
    cep: '02010-200',
    bairro: 'Santana',
  },
  {
    id: 'pinheiros-2',
    rotulo: 'Rua Teodoro Sampaio, 700 – Pinheiros',
    rua: 'Rua Teodoro Sampaio',
    numero: '700',
    cep: '05406-000',
    bairro: 'Pinheiros',
  },
  {
    id: 'consolacao',
    rotulo: 'Rua Augusta, 900 – Consolação',
    rua: 'Rua Augusta',
    numero: '900',
    cep: '01304-001',
    bairro: 'Consolação',
  },
];

// Procura um endereço da lista pelo id. Devolve o objeto ou undefined.
export function buscarEnderecoCadastro(id) {
  return ENDERECOS_CADASTRO.find((item) => item.id === id);
}
