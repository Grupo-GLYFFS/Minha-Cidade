import { SERVICOS } from '../dados/servicos';
import { CATEGORIAS_SERVICOS } from '../dados/categoriasServicos';
import { TIPOS_SERVICO } from '../dados/tiposServico';

// Procura um serviço pelo id. Recebe o id e, se quiser, a lista; devolve o serviço ou null.
export function buscarServico(id, servicos = SERVICOS) {
  return servicos.find((servico) => servico.id === id) ?? null;
}

// Procura uma categoria do catálogo pelo id. Devolve a categoria ou null.
export function buscarCategoriaServico(id) {
  return CATEGORIAS_SERVICOS.find((categoria) => categoria.id === id) ?? null;
}

// Procura o jeito de mostrar um tipo de serviço (texto e cores da etiqueta).
// Recebe o tipo ('solicitacao', 'informativo' ou 'proprio'); devolve os dados ou null.
export function buscarTipoServico(tipo) {
  return TIPOS_SERVICO.find((item) => item.id === tipo) ?? null;
}

// Endereço da página de um serviço. Recebe o serviço; devolve "/servicos/<id>".
export function caminhoServico(servico) {
  return `/servicos/${servico.id}`;
}

// Endereço da página de uma categoria. Recebe a categoria; devolve "/servicos/categoria/<id>".
export function caminhoCategoria(categoria) {
  return `/servicos/categoria/${categoria.id}`;
}

// Lista os serviços de uma categoria. Recebe o id da categoria e, se quiser, a lista completa.
export function servicosDaCategoria(idCategoria, servicos = SERVICOS) {
  return servicos.filter((servico) => servico.categoria === idCategoria);
}

// Separa os serviços de uma categoria pelas suas subcategorias, na ordem do catálogo.
// Recebe a categoria; devolve [{ subcategoria, servicos }], sem subcategorias vazias.
export function agruparPorSubcategoria(categoria, servicos = SERVICOS) {
  const daCategoria = servicosDaCategoria(categoria.id, servicos);
  return categoria.subcategorias
    .map((subcategoria) => ({
      subcategoria,
      servicos: daCategoria.filter((servico) => servico.subcategoria === subcategoria.id),
    }))
    .filter((grupo) => grupo.servicos.length > 0);
}

// Texto com a quantidade de serviços. Recebe um número; devolve "1 serviço" ou "8 serviços".
export function textoQuantidadeServicos(quantidade) {
  return quantidade === 1 ? '1 serviço' : `${quantidade} serviços`;
}

// Serviços marcados como mais usados, para os atalhos. Devolve a lista na ordem do catálogo.
export function servicosMaisUsados(servicos = SERVICOS) {
  return servicos.filter((servico) => servico.maisUsado);
}

// Escolhe serviços parecidos para sugerir no fim da página de um serviço.
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

// Endereço do formulário online de um serviço. Recebe o serviço; devolve "/servicos/<id>/solicitar".
export function caminhoSolicitacao(servico) {
  return `/servicos/${servico.id}/solicitar`;
}
