import { mixed, string } from 'yup';
import { REGIOES } from '../dados/regioes';
import { CIDADE_ATENDIDA } from './buscarCep';

// Regras de validação usadas em mais de um formulário (Abrir pedido e Criar conta).

// Tamanho máximo dos arquivos enviados (foto e comprovante)
export const LIMITE_ARQUIVO_MB = 5;

// CEP com máscara: 00000-000
export const FORMATO_CEP = /^\d{5}-\d{3}$/;

// Número do endereço: números (com uma letra no fim, ex.: 120A) ou "s/n"
export const FORMATO_NUMERO = /^(\d{1,6}[a-zA-Z]?|s\/?n)$/i;

// Escreve o tamanho de um arquivo em MB. Recebe bytes; devolve, por exemplo, "7,2 MB".
export function emMegabytes(bytes) {
  return `${(bytes / 1024 / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`;
}

// Regra do CEP: obrigatório, com 8 números e da cidade atendida.
// Recebe as mensagens { vazio, foraDaCidade }; devolve a regra do yup.
// A cidade vem da busca no ViaCEP e fica no campo escondido "cidadeDoCep".
export function regraCep({ vazio, foraDaCidade }) {
  return string()
    .required(vazio)
    .matches(FORMATO_CEP, 'Digite os 8 números do CEP, ex.: 04015-001.')
    .test('cidade-atendida', foraDaCidade, function cepDaCidade() {
      const cidade = this.parent.cidadeDoCep;
      return !cidade || cidade === CIDADE_ATENDIDA;
    });
}

// Regra da região: só é pedida quando o bairro está preenchido
// (se o app reconhece o bairro, ela vem sozinha). Devolve a regra do yup.
export function regraRegiao() {
  return string().when('bairro', {
    is: (bairro) => Boolean(bairro?.trim()),
    then: (regra) =>
      regra.required('Escolha a região da cidade onde fica o bairro.').oneOf(
        REGIOES.map((r) => r.nome),
        'Escolha a região da cidade onde fica o bairro.',
      ),
  });
}

// Regra de arquivo: confere o tipo e o tamanho (até LIMITE_ARQUIVO_MB).
// Recebe { aceito(arquivo) → true/false, mensagemTipo, nomeArquivo (ex.: "Esta foto"),
// tipoPedido (ex.: "uma imagem"), obrigatorio (mensagem quando falta, ou null se é opcional) };
// devolve a regra do yup.
export function regraArquivo({
  aceito,
  mensagemTipo,
  nomeArquivo,
  tipoPedido = 'um arquivo',
  obrigatorio = null,
}) {
  let regra = mixed().nullable();
  if (obrigatorio) regra = regra.test('obrigatorio', obrigatorio, (arquivo) => Boolean(arquivo));
  return regra
    .test('tipo', mensagemTipo, (arquivo) => !arquivo || aceito(arquivo))
    .test('tamanho', `${nomeArquivo} é grande demais.`, function arquivoPequeno(arquivo) {
      if (!arquivo || arquivo.size <= LIMITE_ARQUIVO_MB * 1024 * 1024) return true;
      return this.createError({
        message: `${nomeArquivo} tem ${emMegabytes(arquivo.size)}. Escolha ${tipoPedido} de até ${LIMITE_ARQUIVO_MB} MB.`,
      });
    });
}
