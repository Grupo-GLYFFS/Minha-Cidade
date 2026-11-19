import { SERVICOS } from '../dados/servicos';
import { CATEGORIAS_SERVICOS } from '../dados/categoriasServicos';

// Procura um serviço pelo id. Recebe o id e, se quiser, a lista; devolve o serviço ou null.
export function buscarServico(id, servicos = SERVICOS) {
  return servicos.find((servico) => servico.id === id) ?? null;
}

// Procura uma categoria do catálogo pelo id. Devolve a categoria ou null.
export function buscarCategoriaServico(id) {
  return CATEGORIAS_SERVICOS.find((categoria) => categoria.id === id) ?? null;
}

// Nome da parte do assunto em que o serviço está (a linha cinza dos cards).
// Recebe o serviço; devolve, por exemplo, "Consultas e cadastro".
export function nomeSubcategoria(servico) {
  const categoria = buscarCategoriaServico(servico.categoria);
  return categoria?.subcategorias.find((parte) => parte.id === servico.subcategoria)?.nome ?? '';
}

// Endereço da ficha de um serviço. Recebe o serviço; devolve "/servicos/<id>".
export function caminhoServico(servico) {
  return `/servicos/${servico.id}`;
}

// Para onde o card do catálogo leva: direto à tela do app (atalho) ou à ficha do serviço.
// Recebe o serviço; devolve a rota.
export function caminhoCardServico(servico) {
  return servico.atalho ?? caminhoServico(servico);
}

// Endereço do catálogo já aberto num assunto. Recebe a categoria; devolve "/servicos?categoria=<id>".
export function caminhoCategoria(categoria) {
  return `/servicos?categoria=${categoria.id}`;
}

// Endereço do formulário online de um serviço. Recebe o serviço; devolve "/servicos/<id>/solicitar".
export function caminhoSolicitacao(servico) {
  return `/servicos/${servico.id}/solicitar`;
}

// Lista os serviços de uma categoria. Recebe o id da categoria e, se quiser, a lista completa.
export function servicosDaCategoria(idCategoria, servicos = SERVICOS) {
  return servicos.filter((servico) => servico.categoria === idCategoria);
}

// Texto com a quantidade de serviços. Recebe um número; devolve "1 serviço" ou "8 serviços".
export function textoQuantidadeServicos(quantidade) {
  return quantidade === 1 ? '1 serviço' : `${quantidade} serviços`;
}

// Serviços marcados como mais usados, para os atalhos.
// Devolve a lista na ordem de "maisUsado" (1, 2, 3…).
export function servicosMaisUsados(servicos = SERVICOS) {
  return servicos
    .filter((servico) => servico.maisUsado)
    .sort((a, b) => Number(a.maisUsado) - Number(b.maisUsado));
}

// Escolhe serviços parecidos para sugerir no fim da ficha de um serviço.
// Recebe o serviço e o limite; devolve primeiro os da mesma subcategoria e,
// se faltar, completa com outros da mesma categoria.
export function servicosRelacionados(servico, limite = 3, servicos = SERVICOS) {
  const outros = servicosDaCategoria(servico.categoria, servicos).filter(
    (item) => item.id !== servico.id,
  );
  const mesmaParte = outros.filter((item) => item.subcategoria === servico.subcategoria);
  const resto = outros.filter((item) => item.subcategoria !== servico.subcategoria);
  return [...mesmaParte, ...resto].slice(0, limite);
}

// Campos que dizem quando a pessoa quer ser atendida
const CAMPOS_DE_AGENDA = ['dataPreferida', 'data', 'periodo'];

// Separa os campos do formulário online nas etapas da tela.
// 1ª etapa: as perguntas do serviço (nome em servico.nomeEtapa, padrão "Detalhes").
// 2ª etapa: o endereço da pessoa, a data, a hora e o período ("Atendimento"),
// ou só o endereço ("Endereço") quando o serviço não marca dia.
// O campo de CEP não aparece: o endereço é o da conta (um endereço por pessoa).
// Recebe o serviço; devolve [{ id, nome, campos }] com as duas etapas de campos.
export function etapasDoFormulario(servico) {
  const campos = (servico.campos ?? []).filter((campo) => campo.tipo !== 'cep');
  // Datas de agenda (não entram as datas de nascimento ou de infração, que são da 1ª etapa)
  const ehDeAgenda = (campo) => CAMPOS_DE_AGENDA.includes(campo.nome) || campo.tipo === 'hora';
  const agenda = campos.filter(ehDeAgenda);
  return [
    {
      id: 'detalhes',
      nome: servico.nomeEtapa ?? 'Detalhes',
      campos: campos.filter((c) => !ehDeAgenda(c)),
    },
    { id: 'atendimento', nome: agenda.length > 0 ? 'Atendimento' : 'Endereço', campos: agenda },
  ];
}

// Botão principal da ficha: "Solicitar serviço" (formulário online), o atalho para a tela
// do app (ex.: "Ver a coleta no Meu bairro") ou nenhum (serviço só de informação).
// Recebe o serviço; devolve { rotulo, para } ou null.
export function acaoDoServico(servico) {
  if (servico.tipo === 'solicitacao') {
    return { rotulo: 'Solicitar serviço', para: caminhoSolicitacao(servico) };
  }
  if (servico.tipo === 'proprio' && servico.destino) {
    return { rotulo: servico.rotuloDestino, para: servico.destino };
  }
  return null;
}
