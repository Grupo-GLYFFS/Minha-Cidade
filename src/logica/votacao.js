import { OPCOES_VOTO } from '../dados/opcoesVoto';
import { SITUACOES_PROJETO, STATUS_PROJETO } from '../dados/statusProjeto';
import { HOJE, diasAte, formatarDataCurta } from './datas';
import { pluralizar } from './formatos';

// Procura um projeto pelo id. Recebe a lista e o id; devolve o projeto ou undefined.
export function buscarProjeto(projetos, idProjeto) {
  return projetos.find((projeto) => projeto.id === idProjeto);
}

// Procura os dados de um status de projeto (rótulo e cores). Recebe o id; devolve o objeto ou undefined.
export function buscarStatusProjeto(idStatus) {
  return STATUS_PROJETO.find((status) => status.id === idStatus);
}

// Procura o rótulo e o ícone de uma opção de voto. Recebe "sim" ou "nao".
export function buscarOpcaoVoto(valor) {
  return OPCOES_VOTO.find((opcao) => opcao.valor === valor);
}

// Diz se a votação do projeto ainda aceita votos: status aberto e último dia hoje ou depois.
// Recebe o projeto e a data de hoje; devolve true ou false.
export function votacaoAberta(projeto, hoje = HOJE) {
  return projeto.status === 'votacao-aberta' && projeto.fimVotacao >= hoje;
}

// Separa os projetos com votação aberta, do que encerra antes para o que encerra depois.
// Recebe a lista e a data de hoje; devolve uma nova lista.
export function projetosEmVotacao(projetos, hoje = HOJE) {
  return projetos
    .filter((projeto) => votacaoAberta(projeto, hoje))
    .sort((a, b) => a.fimVotacao.localeCompare(b.fimVotacao));
}

// Separa os projetos com votação aberta de uma região. Recebe a lista, a região e a data de hoje.
export function votacoesDaRegiao(projetos, regiao, hoje = HOJE) {
  return projetosEmVotacao(projetos, hoje).filter((projeto) => projeto.regiao === regiao);
}

// Separa os projetos com votação encerrada, do que encerrou por último para o mais antigo.
// Recebe a lista e a data de hoje; devolve uma nova lista.
export function projetosEncerrados(projetos, hoje = HOJE) {
  return projetos
    .filter((projeto) => !votacaoAberta(projeto, hoje))
    .sort((a, b) => b.fimVotacao.localeCompare(a.fimVotacao));
}

// Diz por que a pessoa não pode votar no projeto, ou null se ela pode.
// Recebe o projeto, o voto que ela já deu (ou undefined), se está logada e a data de hoje.
// Regras: precisa ter conta, a votação precisa estar aberta e o voto é um só, sem troca.
// Devolve "visitante", "encerrada", "ja-votou" ou null.
export function motivoSemVoto(projeto, votoAtual, logado, hoje = HOJE) {
  if (!votacaoAberta(projeto, hoje)) return 'encerrada';
  if (!logado) return 'visitante';
  if (votoAtual) return 'ja-votou';
  return null;
}

// Diz se a opção recebida é um voto válido. Recebe o texto; devolve true ou false.
export function ehOpcaoValida(opcao) {
  return OPCOES_VOTO.some((item) => item.valor === opcao);
}

// Calcula o resultado de um projeto: votos que já existiam + votos feitos neste aparelho.
// Recebe o projeto e os votos guardados no formato { idPessoa: { idProjeto: opcao } }.
// Devolve { total, opcoes: [{ valor, rotulo, icone, cor, quantidade, percentual }], vencedora }.
// O percentual é arredondado para inteiro; "vencedora" é a opção com mais votos entre Sim e Não.
export function calcularResultado(projeto, votosPorPessoa = {}) {
  const contagem = { ...projeto.votosIniciais };
  // Soma o voto de cada pessoa que votou neste projeto neste aparelho
  Object.values(votosPorPessoa).forEach((votosDaPessoa) => {
    const opcao = votosDaPessoa[projeto.id];
    if (ehOpcaoValida(opcao)) contagem[opcao] = (contagem[opcao] ?? 0) + 1;
  });

  const total = OPCOES_VOTO.reduce((soma, opcao) => soma + (contagem[opcao.valor] ?? 0), 0);
  const opcoes = OPCOES_VOTO.map((opcao) => {
    const quantidade = contagem[opcao.valor] ?? 0;
    return {
      ...opcao,
      quantidade,
      percentual: total > 0 ? Math.round((quantidade / total) * 100) : 0,
    };
  });
  const vencedora = (contagem.sim ?? 0) >= (contagem.nao ?? 0) ? opcoes[0] : opcoes[1];

  return { total, opcoes, vencedora };
}

// Escreve o resultado em uma frase. Recebe o resultado de calcularResultado();
// devolve, por exemplo, "Sim venceu com 72% dos votos".
export function frasePlacar(resultado) {
  const { vencedora } = resultado;
  return `${vencedora.rotulo} venceu com ${vencedora.percentual}% dos votos`;
}

// Escreve quanto falta para a votação acabar. Recebe a data final e hoje;
// devolve "Encerra hoje", "Encerra amanhã" ou "Encerra em N dias".
export function textoPrazoVotacao(fimVotacao, hoje = HOJE) {
  const dias = diasAte(fimVotacao, hoje);
  if (dias === 0) return 'Encerra hoje';
  if (dias === 1) return 'Encerra amanhã';
  return `Encerra em ${pluralizar(dias, 'dia', 'dias')}`;
}

// Descreve o que aconteceu com o projeto depois da votação.
// Recebe o projeto; devolve { rotulo, frase, icone } (ex.: frase "Encaminhado à Câmara
// Municipal em 22/10/2026") ou null se o projeto ainda não tem situação.
export function descreverSituacao(projeto) {
  const situacao = SITUACOES_PROJETO.find((item) => item.id === projeto.situacao);
  if (!situacao) return null;
  const data = projeto.dataSituacao ? ` ${formatarDataCurta(projeto.dataSituacao)}` : '';
  return { rotulo: situacao.rotulo, frase: `${situacao.texto}${data}`, icone: situacao.icone };
}

// Diz em que endereço fica a página da votação: as da cidade em /minha-cidade/votacoes,
// as da subprefeitura do bairro em /meu-bairro/votacoes. Recebe o projeto; devolve o caminho.
export function caminhoVotacao(projeto) {
  const base = projeto.escopo === 'subprefeitura' ? '/meu-bairro' : '/minha-cidade';
  return `${base}/votacoes/${projeto.id}`;
}

// Separa as votações de um recorte (ver logica/recorte.js).
// Cidade: as votações da cidade toda. Bairro: as da subprefeitura do bairro e as da cidade
// que incluem o bairro. Recebe a lista e o recorte; devolve uma nova lista.
export function votacoesDoRecorte(projetos, recorte) {
  if (recorte.escopo !== 'bairro') return projetos.filter((p) => p.escopo === 'cidade');
  return projetos.filter(
    (p) =>
      (p.escopo === 'subprefeitura' && p.subprefeitura === recorte.subprefeitura.nome) ||
      (p.escopo === 'cidade' && p.bairros.includes(recorte.bairro)),
  );
}

// Separa uma lista de votações em abertas (a que termina antes primeiro) e encerradas
// (a que terminou por último primeiro). Recebe a lista e hoje; devolve { abertas, encerradas }.
export function separarVotacoes(projetos, hoje = HOJE) {
  return {
    abertas: projetosEmVotacao(projetos, hoje),
    encerradas: projetosEncerrados(projetos, hoje),
  };
}

// Escreve quanto falta para a votação acabar, para o card. Recebe a data final e hoje;
// devolve "Termina hoje", "Falta 1 dia" ou "Faltam N dias".
export function textoFaltam(fimVotacao, hoje = HOJE) {
  const dias = diasAte(fimVotacao, hoje);
  if (dias === 0) return 'Termina hoje';
  if (dias === 1) return 'Falta 1 dia';
  return `Faltam ${dias} dias`;
}

// Escreve o resultado curto de uma votação encerrada. Recebe o resultado de calcularResultado();
// devolve "Aprovada, 58% sim" ou "Recusada, 60% não".
export function resultadoCurto(resultado) {
  const { vencedora } = resultado;
  if (vencedora.valor === 'sim') return `Aprovada, ${vencedora.percentual}% sim`;
  return `Recusada, ${vencedora.percentual}% não`;
}

// Escreve o que aconteceu depois da votação, curto, para o card.
// Recebe o projeto e a função que escreve a data curta ("4 nov");
// devolve "Encaminhado à Câmara em 4 nov" ou null se ainda não aconteceu nada.
export function depoisCurto(projeto, dataLista) {
  const situacao = SITUACOES_PROJETO.find((item) => item.id === projeto.situacao);
  if (!situacao) return null;
  return `${situacao.curto} ${dataLista(projeto.dataSituacao)}`;
}

// Escreve onde a votação vale, para o card: o bairro da obra ("Jabaquara"), a subprefeitura
// ("Subprefeitura Vila Mariana") ou, na lista do bairro, "Cidade toda · inclui a Vila Mariana".
// Recebe o projeto e o recorte da página (ou nada, fora das listas da cidade e do bairro).
export function lugarDaVotacao(projeto, recorte) {
  if (recorte?.escopo === 'bairro' && projeto.escopo === 'cidade') {
    return `Cidade toda · inclui a ${recorte.bairro}`;
  }
  return projeto.bairro ?? `Subprefeitura ${projeto.subprefeitura}`;
}
