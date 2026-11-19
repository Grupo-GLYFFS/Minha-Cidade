import { subprefeiturasComOrcamento } from './orcamento';
import { BAIRRO_PADRAO, buscarBairro, doLugar, lugarPorNome } from './lugares';
import { subprefeituraDoBairro as nomeDaSubprefeitura } from './localPedido';

// Primeiro nível da trilha de toda subpágina da cidade
const NIVEL_CIDADE = { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' };

// Procura a subprefeitura que cuida de um bairro. Recebe o nome do bairro;
// devolve o objeto de subprefeiturasComOrcamento() (ou a da Vila Mariana, se o bairro não for achado).
export function subprefeituraDoBairro(bairro) {
  const todas = subprefeiturasComOrcamento();
  const nome = nomeDaSubprefeitura(bairro);
  return todas.find((sub) => sub.nome === nome) ?? todas.find((sub) => sub.id === 'vila-mariana');
}

// Monta o recorte de uma subpágina (Obras, Votações, Orçamento) da cidade ou do bairro.
// Recebe o escopo ("cidade" ou "bairro") e o bairro da pessoa.
// Devolve { escopo, tipo, bairro, bairros, lugar, subprefeitura, base, trilha, sufixo, deQuem }:
// - tipo: "cidade", "bairro" ou "subprefeitura" (montarRecorteLugar);
// - bairros: os nomes dos bairros do recorte (null na cidade);
// - lugar: o bairro com a preposição (para noLugar/doLugar/comArtigo);
// - base: "/minha-cidade" ou "/meu-bairro" (início das rotas);
// - trilha: os níveis antes do nome da página;
// - sufixo: o fim do título ("da cidade de São Paulo" ou "da Vila Mariana");
// - deQuem: o fim dos nomes no "Para onde ir" ("da cidade" ou "do bairro").
export function montarRecorte(escopo, bairro = BAIRRO_PADRAO) {
  const subprefeitura = subprefeituraDoBairro(bairro);
  const lugar = lugarPorNome(bairro);
  if (escopo === 'bairro') {
    return {
      escopo,
      tipo: 'bairro',
      bairro,
      bairros: [bairro],
      lugar,
      subprefeitura,
      base: '/meu-bairro',
      trilha: [
        NIVEL_CIDADE,
        {
          rotulo: `Subprefeitura ${subprefeitura.nome}`,
          para: `/minha-cidade/subprefeituras/${subprefeitura.id}`,
        },
        { rotulo: bairro, para: '/meu-bairro' },
      ],
      sufixo: doLugar(lugar),
      deQuem: 'do bairro',
    };
  }
  return {
    escopo: 'cidade',
    tipo: 'cidade',
    bairro,
    bairros: null,
    lugar,
    subprefeitura,
    base: '/minha-cidade',
    trilha: [NIVEL_CIDADE],
    sufixo: 'da cidade de São Paulo',
    deQuem: 'da cidade',
  };
}

// Monta o recorte de um lugar que não é o bairro da pessoa, para as mesmas páginas do bairro
// abertas pela cidade: /minha-cidade/bairros/:idBairro/... e /minha-cidade/subprefeituras/:idSub/...
// O escopo continua "bairro" (as regras de obras, votações e orçamento são as do recorte local).
// Recebe { idBairro } ou { idSub }; devolve o recorte (como montarRecorte) ou null se o lugar não existe.
export function montarRecorteLugar({ idBairro, idSub }) {
  if (idBairro) {
    const achado = buscarBairro(idBairro);
    if (!achado) return null;
    const recorte = montarRecorte('bairro', achado.nome);
    const base = `/minha-cidade/bairros/${achado.id}`;
    return {
      ...recorte,
      base,
      trilha: [...recorte.trilha.slice(0, -1), { rotulo: achado.nome, para: base }],
    };
  }
  const subprefeitura = subprefeiturasComOrcamento().find((sub) => sub.id === idSub);
  if (!subprefeitura) return null;
  const base = `/minha-cidade/subprefeituras/${subprefeitura.id}`;
  const lugar = { nome: `Subprefeitura ${subprefeitura.nome}`, prep: 'na' };
  return {
    escopo: 'bairro',
    tipo: 'subprefeitura',
    bairro: null,
    bairros: subprefeitura.bairros,
    lugar,
    subprefeitura,
    base,
    trilha: [NIVEL_CIDADE, { rotulo: lugar.nome, para: base }],
    sufixo: doLugar(lugar),
    deQuem: 'da subprefeitura',
  };
}

// Valor do ?de= do Abrir pedido aberto por uma lista de pedidos, para a trilha voltar ao lugar.
// Recebe o recorte da lista; devolve "bairro" (Meu bairro), "bairro:santana" (outro bairro)
// ou "subprefeitura:lapa" (uma subprefeitura).
export function origemDoRecorte(recorte) {
  if (recorte.base === '/meu-bairro') return 'bairro';
  return `${recorte.tipo}:${recorte.base.split('/').pop()}`;
}

// Recorte do lugar de onde o Abrir pedido foi aberto. Recebe o valor do ?de= e o recorte do
// bairro da pessoa; devolve o recorte do lugar ou null (aberto de outra página ou lugar que
// não existe).
export function recorteDaOrigem(de, recorteDaPessoa) {
  if (de === 'bairro') return recorteDaPessoa;
  const [tipo, id] = (de ?? '').split(':');
  if (!id) return null;
  if (tipo === 'bairro') return montarRecorteLugar({ idBairro: id });
  if (tipo === 'subprefeitura') return montarRecorteLugar({ idSub: id });
  return null;
}

// Situações de obra que contam como "em andamento" (parada e concluída não contam)
const OBRA_EM_ANDAMENTO = ['no-prazo', 'atrasada'];

// Regra única do recorte do bairro (regra de 17/11): itens da subprefeitura do bairro
// + itens da cidade cuja área inclui o bairro. Usada nas listas, nos hubs e no "Para onde ir".

// Separa as obras de um recorte. Cidade: todas. Bairro: as da subprefeitura do bairro
// (as obras não têm área da cidade toda). Recebe a lista e o recorte; devolve uma nova lista.
export function obrasDoRecorte(obras, recorte) {
  if (recorte.escopo !== 'bairro') return obras;
  return obras.filter((obra) => obra.subprefeitura === recorte.subprefeitura.nome);
}

// Conta as obras em andamento (no prazo ou atrasadas) de um recorte. Recebe a lista e o recorte.
export function contarObrasEmAndamento(obras, recorte) {
  return obrasDoRecorte(obras, recorte).filter((obra) => OBRA_EM_ANDAMENTO.includes(obra.situacao))
    .length;
}

// Separa as votações de um recorte. Cidade: as votações da cidade toda. Bairro (ou
// subprefeitura): as da subprefeitura e as da cidade que incluem um dos bairros do recorte.
// Recebe a lista e o recorte.
export function votacoesDoRecorte(projetos, recorte) {
  if (recorte.escopo !== 'bairro') return projetos.filter((p) => p.escopo === 'cidade');
  return projetos.filter(
    (p) =>
      (p.escopo === 'subprefeitura' && p.subprefeitura === recorte.subprefeitura.nome) ||
      (p.escopo === 'cidade' && p.bairros.some((nome) => recorte.bairros.includes(nome))),
  );
}
