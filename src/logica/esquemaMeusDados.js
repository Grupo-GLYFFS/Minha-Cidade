import { esquemaPassoEndereco, esquemaPassoVoce } from './esquemaCriarConta';

// Regras do formulário "Meus dados": as mesmas do cadastro.
// Nome e celular vêm do passo "Você"; o endereço inteiro vem do passo "Endereço".
// O e-mail e a senha não entram (o e-mail só aparece, sem trocar).
export const esquemaMeusDados = esquemaPassoVoce
  .pick(['nome', 'celular'])
  .concat(esquemaPassoEndereco);

// Campos na ordem da tela: o primeiro com erro recebe o foco
export const CAMPOS_MEUS_DADOS = [
  'nome',
  'celular',
  'cep',
  'rua',
  'numero',
  'complemento',
  'bairro',
  'regiao',
];
