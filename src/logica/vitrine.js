import { nivelPrioridade, NIVEIS_PRIORIDADE } from './prioridade';
import { montarSolicitacao } from './solicitacoes';

// Tipos de campo do formulário de serviço, na ordem em que aparecem na página de componentes
const ORDEM_TIPOS = ['texto', 'textoLongo', 'numero', 'data', 'hora', 'cpf', 'arquivo', 'cep'];

// Escolhe um campo de verdade do catálogo para cada tipo do formulário de serviço.
// Para "selecao", pega dois: um com até 4 opções (blocos) e um com mais (lista suspensa).
// Os nomes são trocados por "exemplo1", "exemplo2"... para não repetir; o "cep" continua "cep",
// porque o campo de CEP grava rua, bairro e região com esses nomes.
// Recebe a lista de serviços; devolve a lista de campos.
export function exemplosDeCampos(servicos) {
  const todos = servicos.flatMap((servico) => servico.campos ?? []);
  const escolhidos = ORDEM_TIPOS.map((tipo) => todos.find((campo) => campo.tipo === tipo));
  const selecoes = todos.filter((campo) => campo.tipo === 'selecao');
  escolhidos.splice(
    5,
    0,
    selecoes.find((campo) => campo.opcoes.length <= 4),
    selecoes.find((campo) => campo.opcoes.length > 4),
  );
  return escolhidos
    .filter(Boolean)
    .map((campo, posicao) =>
      campo.tipo === 'cep' ? campo : { ...campo, nome: `exemplo${posicao + 1}` },
    );
}

// Confere valores com as regras de um formulário (esquema do yup) sem enviar nada.
// Recebe o esquema e os valores; devolve { nomeDoCampo: { message } } no formato do react-hook-form.
export function errosDoEsquema(esquema, valores) {
  try {
    esquema.validateSync(valores, { abortEarly: false });
    return {};
  } catch (erro) {
    const lista = erro.inner?.length ? erro.inner : [erro];
    return lista.reduce((erros, item) => {
      if (item.path && !erros[item.path]) erros[item.path] = { message: item.message };
      return erros;
    }, {});
  }
}

// Escolhe um pedido de exemplo para cada faixa de prioridade (alta, média e baixa).
// Recebe a lista de pedidos; devolve [{ nivel, pedido }] só com as faixas que têm pedido.
export function pedidosPorNivel(pedidos) {
  return NIVEIS_PRIORIDADE.map((nivel) => ({
    nivel,
    pedido: pedidos.find((pedido) => nivelPrioridade(pedido).id === nivel.id),
  })).filter((item) => item.pedido);
}

// Monta duas solicitações de exemplo (uma recebida, uma em andamento) só para mostrar na tela.
// Nada é salvo. Recebe a lista de serviços e o id da pessoa; devolve a lista de solicitações.
export function solicitacoesDeExemplo(servicos, idPessoa) {
  const comFormulario = servicos.filter((servico) => servico.tipo === 'solicitacao').slice(0, 2);
  return comFormulario.map((servico, posicao) => {
    const campo = servico.campos.find((item) => item.tipo === 'texto' || item.tipo === 'selecao');
    const respostas = campo ? [{ nome: campo.nome, rotulo: campo.rotulo, valor: 'Exemplo' }] : [];
    const solicitacao = montarSolicitacao(
      servico,
      respostas,
      [],
      idPessoa,
      `2026-11-0${posicao + 3}T10:00:00-03:00`,
    );
    return { ...solicitacao, id: `exemplo-${posicao + 1}`, status: STATUS_EXEMPLO[posicao] };
  });
}

// Status das solicitações de exemplo, na ordem
const STATUS_EXEMPLO = ['recebida', 'em-andamento'];

// Escolhe o primeiro item de cada valor de um campo (ex.: uma obra de cada situação).
// Recebe a lista, o nome do campo e os valores na ordem desejada; devolve os itens encontrados.
export function umDeCada(lista, campo, valores) {
  return valores.map((valor) => lista.find((item) => item[campo] === valor)).filter(Boolean);
}
