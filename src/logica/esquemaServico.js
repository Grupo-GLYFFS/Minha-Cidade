import { boolean, mixed, number, object, string } from 'yup';
import { HOJE, formatarDataCurta, resolverDataRelativa } from './datas';
import { cpfValido } from './cpf';
import { LIMITE_ARQUIVO_MB, regraArquivo, regrasEndereco } from './regrasFormulario';

// Regras do formulário online de qualquer serviço, montadas a partir de servico.campos
// (o formato dos campos está explicado em src/dados/servicos/index.js).

// Tipos de arquivo que um campo pode aceitar: o tipo que o navegador informa e o nome na tela
export const TIPOS_ARQUIVO = {
  pdf: { mime: 'application/pdf', nome: 'PDF' },
  jpg: { mime: 'image/jpeg', nome: 'JPG' },
  png: { mime: 'image/png', nome: 'PNG' },
};

// Campos que um campo do tipo 'cep' traz junto: o endereço completo
export const CAMPOS_ENDERECO = ['cep', 'rua', 'numero', 'bairro', 'regiao'];

// Nome dos campos do endereço, para a lista de erros
const NOMES_ENDERECO = { rua: 'Rua', numero: 'Número', bairro: 'Bairro', regiao: 'Região' };

// Caixa de confirmação no fim de todo formulário de serviço
export const CAMPO_CONFIRMACAO = 'confirmacao';

// Junta uma lista de nomes com vírgula e "ou". Recebe ['PDF', 'JPG', 'PNG']; devolve "PDF, JPG ou PNG".
function juntarComOu(nomes) {
  if (nomes.length <= 1) return nomes.join('');
  return `${nomes.slice(0, -1).join(', ')} ou ${nomes[nomes.length - 1]}`;
}

// Tipos aceitos por um campo de arquivo. Recebe o campo; devolve { mimes, nomes }
// (ex.: nomes "PDF, JPG ou PNG"). Sem "aceita", vale PDF, JPG e PNG.
export function tiposAceitos(campo) {
  const tipos = (campo.aceita ?? Object.keys(TIPOS_ARQUIVO))
    .map((tipo) => TIPOS_ARQUIVO[tipo])
    .filter(Boolean);
  return { mimes: tipos.map((tipo) => tipo.mime), nomes: juntarComOu(tipos.map((t) => t.nome)) };
}

// Datas permitidas em um campo de data. Recebe o campo e a data de hoje;
// devolve { min, max } em texto ISO (ou null quando o campo não tem limite).
export function limitesData(campo, hoje = HOJE) {
  return {
    min: campo.min ? resolverDataRelativa(campo.min, hoje) : null,
    max: campo.max ? resolverDataRelativa(campo.max, hoje) : null,
  };
}

// Frase com as datas permitidas, para a ajuda e o erro do campo.
// Recebe o campo; devolve, por exemplo, "entre 7/11/2026 e 6/12/2026" ou "" sem limites.
export function textoFaixaData(campo, hoje = HOJE) {
  const { min, max } = limitesData(campo, hoje);
  if (min && max) return `entre ${formatarDataCurta(min)} e ${formatarDataCurta(max)}`;
  if (min) return `a partir de ${formatarDataCurta(min)}`;
  if (max) return `até ${formatarDataCurta(max)}`;
  return '';
}

// Regra de um campo de texto (curto ou longo), com os limites de tamanho.
function regraTexto(campo) {
  let regra = string().trim();
  // Quando a ajuda traz um exemplo ("Ex.: ..."), ele entra na mensagem
  const exemplo = /^Ex\.:/.test(campo.ajuda ?? '') ? ` ${campo.ajuda}` : '';
  if (campo.obrigatorio) regra = regra.required(`Preencha este campo.${exemplo}`);
  // Com min e max iguais (ex.: Cartão SUS), o texto precisa ter o tamanho exato
  if (campo.min && campo.min === campo.max) {
    return regra.test(
      'tamanho-exato',
      `Digite exatamente ${campo.min} caracteres.`,
      function exato(valor) {
        if (!valor || valor.length === campo.min) return true;
        return this.createError({
          message: `Digite exatamente ${campo.min} caracteres. Agora são ${valor.length}.`,
        });
      },
    );
  }
  if (campo.min) {
    // Campo opcional vazio passa; preenchido, precisa do tamanho mínimo
    regra = regra.test(
      'minimo',
      `Escreva pelo menos ${campo.min} caracteres.`,
      (valor) => !valor || valor.length >= campo.min,
    );
  }
  if (campo.max) regra = regra.max(campo.max, `Encurte o texto para até ${campo.max} caracteres.`);
  return regra;
}

// Regra de um campo de número inteiro, com o menor e o maior valor.
function regraNumero(campo) {
  const faixa =
    campo.min !== undefined && campo.max !== undefined
      ? `Digite um número de ${campo.min} a ${campo.max}.`
      : 'Digite um número inteiro.';
  // O campo vazio chega como texto vazio: vira "sem valor" para a regra de obrigatório
  let regra = number()
    .transform((valor, original) => (original === '' || original === null ? undefined : valor))
    .typeError(faixa)
    .integer('Use só números inteiros, sem vírgula.');
  if (campo.obrigatorio) regra = regra.required(faixa);
  if (campo.min !== undefined) regra = regra.min(campo.min, faixa);
  if (campo.max !== undefined) regra = regra.max(campo.max, faixa);
  return regra;
}

// Regra de um campo de data: formato do calendário e dentro das datas permitidas.
function regraData(campo, hoje) {
  const { min, max } = limitesData(campo, hoje);
  const faixa = textoFaixaData(campo, hoje);
  const mensagemFaixa = faixa ? `Escolha uma data ${faixa}.` : 'Escolha uma data válida.';
  let regra = string();
  if (campo.obrigatorio) regra = regra.required(mensagemFaixa);
  return regra.test('faixa', mensagemFaixa, (valor) => {
    if (!valor) return true;
    // Datas ISO podem ser comparadas como texto
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
    return (!min || valor >= min) && (!max || valor <= max);
  });
}

// Regra de um campo de hora ("HH:MM"), dentro do horário permitido.
function regraHora(campo) {
  const faixa =
    campo.min && campo.max
      ? `Escolha um horário entre ${campo.min} e ${campo.max}.`
      : 'Escolha um horário válido.';
  let regra = string();
  if (campo.obrigatorio) regra = regra.required(faixa);
  return regra.test('faixa', faixa, (valor) => {
    if (!valor) return true;
    if (!/^\d{2}:\d{2}$/.test(valor)) return false;
    return (!campo.min || valor >= campo.min) && (!campo.max || valor <= campo.max);
  });
}

// Regra de um campo de escolha: precisa ser uma das opções da lista.
function regraSelecao(campo) {
  const mensagem = 'Escolha uma das opções.';
  const valores = (campo.opcoes ?? []).map((opcao) => opcao.valor);
  let regra = string();
  if (campo.obrigatorio) regra = regra.required(mensagem);
  return regra.test('opcao', mensagem, (valor) => !valor || valores.includes(valor));
}

// Regra de um campo de CPF: 11 números e dígitos verificadores certos.
function regraCpf(campo) {
  let regra = string();
  if (campo.obrigatorio)
    regra = regra.required('Digite o CPF com 11 números, ex.: 123.456.789-09.');
  return regra
    .test(
      'formato',
      'Digite os 11 números do CPF, ex.: 123.456.789-09.',
      (valor) => !valor || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor),
    )
    .test(
      'digitos',
      'Este CPF não existe. Confira os números no documento.',
      (valor) => !valor || valor.length < 14 || cpfValido(valor),
    );
}

// Regra de um campo de arquivo: tipos de "aceita" e até 5 MB.
function regraArquivoServico(campo) {
  const { mimes, nomes } = tiposAceitos(campo);
  return regraArquivo({
    aceito: (arquivo) => mimes.includes(arquivo.type),
    mensagemTipo: `Escolha um arquivo ${nomes}.`,
    nomeArquivo: 'Este arquivo',
    obrigatorio: campo.obrigatorio ? `Escolha um arquivo ${nomes} para enviar.` : null,
  });
}

// Monta as regras do yup de todos os campos de um serviço.
// Recebe a lista de campos e a data de hoje; devolve o esquema do formulário,
// com a caixa "Confirmo que as informações estão corretas." no fim.
// Um campo 'cep' traz o endereço completo (rua, número, bairro e região), sempre obrigatório.
export function montarEsquemaServico(campos, hoje = HOJE) {
  const regras = {};
  campos.forEach((campo) => {
    if (campo.tipo === 'cep') {
      const complemento = campo.rotulo.replace(/^CEP\s*/i, '') || 'do endereço';
      Object.assign(regras, regrasEndereco(complemento));
      return;
    }
    const montar = {
      texto: regraTexto,
      textoLongo: regraTexto,
      numero: regraNumero,
      data: (item) => regraData(item, hoje),
      hora: regraHora,
      selecao: regraSelecao,
      cpf: regraCpf,
      arquivo: regraArquivoServico,
    }[campo.tipo];
    regras[campo.nome] = montar ? montar(campo) : mixed();
  });
  regras[CAMPO_CONFIRMACAO] = boolean().oneOf(
    [true],
    'Marque a confirmação de que as informações estão corretas.',
  );
  return object(regras);
}

// Valores do formulário vazio. Recebe a lista de campos; devolve { nome: valor inicial }.
// Arquivo começa em null; o resto, em texto vazio. "cidadeDoCep" guarda a cidade do ViaCEP.
export function valoresIniciais(campos) {
  const valores = {};
  campos.forEach((campo) => {
    if (campo.tipo === 'cep') {
      CAMPOS_ENDERECO.forEach((nome) => {
        valores[nome] = '';
      });
      valores.cidadeDoCep = '';
      return;
    }
    valores[campo.nome] = campo.tipo === 'arquivo' ? null : '';
  });
  valores[CAMPO_CONFIRMACAO] = false;
  return valores;
}

// Ordem dos campos na tela (o primeiro com erro recebe o foco) e o nome de cada um,
// para a lista de erros. Recebe a lista de campos; devolve { ordem, nomes }.
export function ordemENomesCampos(campos) {
  const ordem = [];
  const nomes = {};
  campos.forEach((campo) => {
    if (campo.tipo === 'cep') {
      ordem.push(...CAMPOS_ENDERECO);
      Object.assign(nomes, NOMES_ENDERECO, { cep: campo.rotulo });
      return;
    }
    ordem.push(campo.nome);
    nomes[campo.nome] = campo.rotulo;
  });
  ordem.push(CAMPO_CONFIRMACAO);
  nomes[CAMPO_CONFIRMACAO] = 'Confirmação';
  return { ordem, nomes };
}

// Rótulo do campo na tela: os que não são obrigatórios ganham "(opcional)".
// Recebe o campo; devolve, por exemplo, "Foto do local (opcional)".
export function rotuloCampo(campo) {
  return campo.obrigatorio ? campo.rotulo : `${campo.rotulo} (opcional)`;
}

// Texto de ajuda embaixo do rótulo: a ajuda do serviço mais os limites do campo
// (datas e horários aceitos, tipos e tamanho de arquivo, tamanho mínimo do texto).
// Recebe o campo e a data de hoje; devolve o texto ou undefined quando não há nada a dizer.
export function descricaoCampo(campo, hoje = HOJE) {
  const partes = [campo.ajuda];
  if (campo.tipo === 'data') {
    const faixa = textoFaixaData(campo, hoje);
    if (faixa) partes.push(`Datas aceitas: ${faixa}.`);
  }
  if (campo.tipo === 'hora' && campo.min && campo.max && !campo.ajuda) {
    partes.push(`Horários aceitos: entre ${campo.min} e ${campo.max}.`);
  }
  if (
    campo.tipo === 'numero' &&
    !campo.ajuda &&
    campo.min !== undefined &&
    campo.max !== undefined
  ) {
    partes.push(`De ${campo.min} a ${campo.max}.`);
  }
  if (campo.tipo === 'textoLongo' && campo.min) partes.push(`Mínimo de ${campo.min} caracteres.`);
  if (campo.tipo === 'arquivo') {
    partes.push(
      `${tiposAceitos(campo).nomes} de até ${LIMITE_ARQUIVO_MB} MB. O arquivo é conferido, mas não é salvo neste protótipo.`,
    );
  }
  const texto = partes.filter(Boolean).join(' ');
  return texto || undefined;
}
