import { formatarCelular } from './celular';
import { CIDADE_ATENDIDA } from './buscarCep';
import { formatarCpf, limparCpf } from './cpf';

// Mensagens de erro da conta. A de entrar é a mesma para e-mail, CPF ou senha errados,
// para não revelar quais e-mails têm conta.
export const ERRO_ENTRAR = 'E-mail, CPF ou senha não conferem.';
export const ERRO_EMAIL_EM_USO = 'Já existe uma conta com este e-mail.';
export const ERRO_CPF_EM_USO = 'Já existe uma conta com este CPF.';

// Deixa o e-mail pronto para comparar: sem espaços e em minúsculas.
// Recebe " Maria@Exemplo.com "; devolve "maria@exemplo.com".
export function normalizarEmail(email = '') {
  return email.trim().toLowerCase();
}

// Arruma o nome digitado: tira espaços extras. Recebe "  ana   lima "; devolve "ana lima".
function limparNome(nome = '') {
  return nome.trim().replace(/\s+/g, ' ');
}

// Pega o primeiro nome. Recebe "Ana Lima"; devolve "Ana".
export function primeiroNome(nome = '') {
  return limparNome(nome).split(' ')[0];
}

// Monta as iniciais do avatar: primeira letra do primeiro e do último nome.
// Recebe "Ana Paula Lima"; devolve "AL".
export function iniciaisDoNome(nome = '') {
  const partes = limparNome(nome).split(' ');
  const ultima = partes.length > 1 ? partes[partes.length - 1] : '';
  return `${partes[0].charAt(0)}${ultima.charAt(0)}`.toUpperCase();
}

// Procura uma conta pelo e-mail. Recebe a lista de contas e o e-mail; devolve a conta ou undefined.
export function buscarContaPorEmail(contas, email) {
  const procurado = normalizarEmail(email);
  return contas.find((conta) => conta.email === procurado);
}

// Procura uma conta pelo CPF. Recebe a lista de contas e o CPF (com ou sem máscara);
// devolve a conta ou undefined.
export function buscarContaPorCpf(contas, cpf) {
  const procurado = limparCpf(cpf);
  return contas.find((conta) => conta.cpf && limparCpf(conta.cpf) === procurado);
}

// Procura a conta de quem está entrando, pelo e-mail (se o texto tem @) ou pelo CPF.
// Recebe a lista de contas (a de demonstração junto) e o que a pessoa digitou; devolve a conta ou undefined.
export function buscarContaPorLogin(contas, login = '') {
  return login.includes('@')
    ? buscarContaPorEmail(contas, login)
    : buscarContaPorCpf(contas, login);
}

// Arruma os dados pessoais que a pessoa digita (no cadastro e em "Meus dados").
// Recebe os valores já validados; devolve nome, celular e endereço limpos
// (e o e-mail e o CPF, quando vêm do Meu perfil).
// Também é o que fica salvo como mudança da conta de demonstração.
export function limparDadosPessoais(valores) {
  const numero = valores.numero.trim();
  return {
    ...(valores.email ? { email: normalizarEmail(valores.email) } : {}),
    ...(valores.cpf ? { cpf: valores.cpf } : {}),
    nome: limparNome(valores.nome),
    celular: formatarCelular(valores.celular),
    cep: valores.cep,
    rua: valores.rua.trim(),
    // "s/n", "sn" e "S/N" ficam todos como "S/N"
    numero: /^s\/?n$/i.test(numero) ? 'S/N' : numero,
    complemento: (valores.complemento ?? '').trim(),
    bairro: valores.bairro.trim(),
    regiao: valores.regiao,
  };
}

// Monta a conta nova a partir do formulário "Criar conta".
// Recebe os valores já validados, o hash da senha e o id novo; devolve a conta para salvar.
export function montarConta(valores, hashSenha, id) {
  return {
    id,
    ...limparDadosPessoais(valores),
    email: normalizarEmail(valores.email),
    cpf: formatarCpf(valores.cpf),
    hashSenha,
  };
}

// Troca os dados pessoais de uma conta pelos novos (tela "Meus dados").
// Recebe a conta e os valores validados; devolve uma conta nova com o mesmo id, e-mail e senha.
export function aplicarDadosNaConta(conta, valores) {
  return { ...conta, ...limparDadosPessoais(valores) };
}

// Monta a pessoa da conta de demonstração com as mudanças feitas em "Meus dados".
// A Maria fica no código (não no navegador); as mudanças dela ficam salvas à parte.
// Recebe a Maria original e as mudanças (ou null); devolve a pessoa no formato das telas.
// A coleta, a UBS e os outros serviços do bairro vêm de buscarBairro() (logica/bairros.js).
export function aplicarAjustesDemonstracao(demonstracao, ajustes) {
  if (!ajustes) return demonstracao;
  const juntos = { ...demonstracao, ...ajustes };
  return {
    ...juntos,
    primeiroNome: primeiroNome(juntos.nome),
    iniciais: iniciaisDoNome(juntos.nome),
  };
}

// Preenche o formulário "Meus dados" com a pessoa logada.
// Recebe a pessoa; devolve os valores iniciais do formulário (campos vazios viram "").
export function valoresMeusDados(usuario) {
  return {
    nome: usuario.nome ?? '',
    celular: usuario.celular ?? '',
    cep: usuario.cep ?? '',
    cidadeDoCep: '',
    rua: usuario.rua ?? '',
    numero: usuario.numero ?? '',
    complemento: usuario.complemento ?? '',
    bairro: usuario.bairro ?? '',
    regiao: usuario.regiao ?? '',
  };
}

// Transforma a conta salva na pessoa usada pelas telas (mesmo formato da conta de demonstração).
// Recebe a conta; devolve a pessoa sem o hash da senha, com primeiro nome, iniciais,
// e cidade. Os serviços do bairro vêm de buscarBairro() (logica/bairros.js).
export function montarUsuario(conta) {
  const { hashSenha: _hash, ...dados } = conta;
  return {
    ...dados,
    primeiroNome: primeiroNome(conta.nome),
    iniciais: iniciaisDoNome(conta.nome),
    cidade: CIDADE_ATENDIDA,
    estado: 'SP',
  };
}
