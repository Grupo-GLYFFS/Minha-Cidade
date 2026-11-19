import { string } from 'yup';
import { esquemaPassoEndereco, esquemaPassoVoce, regraEmail } from './esquemaCriarConta';
import { cpfValido, formatarCpf } from './cpf';
import { formatarCelular } from './celular';

// Os dados que dá para editar um a um no Meu perfil (30, quadro 4), na ordem da tela.
// Cada um tem o rótulo, o ícone da linha, o tipo do campo, a máscara (opcional)
// e a regra do yup (as mesmas do cadastro).
export const DADOS_PERFIL = [
  {
    campo: 'nome',
    rotulo: 'Nome',
    icone: 'person',
    autoComplete: 'name',
    regra: esquemaPassoVoce.fields.nome,
  },
  {
    campo: 'celular',
    rotulo: 'Celular',
    icone: 'smartphone',
    tipo: 'tel',
    autoComplete: 'tel-national',
    mascara: formatarCelular,
    regra: esquemaPassoVoce.fields.celular,
  },
  {
    campo: 'email',
    rotulo: 'E-mail',
    icone: 'mail',
    tipo: 'email',
    autoComplete: 'email',
    regra: regraEmail,
  },
  {
    campo: 'cpf',
    rotulo: 'CPF',
    icone: 'badge',
    modoTeclado: 'numeric',
    mascara: formatarCpf,
    regra: string()
      .required('Digite o CPF com 11 números, ex.: 123.456.789-09.')
      .test('cpf', 'Confira o CPF: os números não formam um CPF válido.', (valor) =>
        cpfValido(valor),
      ),
  },
];

// Regras do popup "Editar endereço": as do cadastro, sem a região
// (ela sai do bairro na hora de salvar).
export const esquemaEnderecoPerfil = esquemaPassoEndereco.omit(['regiao']);

// Nome de cada campo do endereço, para a lista de erros
export const NOMES_CAMPOS_ENDERECO = {
  cep: 'CEP',
  rua: 'Rua',
  numero: 'Número',
  complemento: 'Complemento',
  bairro: 'Bairro',
};
