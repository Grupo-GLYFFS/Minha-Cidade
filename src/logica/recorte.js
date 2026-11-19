import { subprefeiturasComOrcamento } from './orcamento';
import { BAIRRO_PADRAO, doLugar, lugarPorNome } from './lugares';
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
// Devolve { escopo, bairro, lugar, subprefeitura, base, trilha, sufixo, deQuem }:
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
      bairro,
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
    bairro,
    lugar,
    subprefeitura,
    base: '/minha-cidade',
    trilha: [NIVEL_CIDADE],
    sufixo: 'da cidade de São Paulo',
    deQuem: 'da cidade',
  };
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

// Separa as votações de um recorte. Cidade: as votações da cidade toda. Bairro: as da
// subprefeitura do bairro e as da cidade que incluem o bairro. Recebe a lista e o recorte.
export function votacoesDoRecorte(projetos, recorte) {
  if (recorte.escopo !== 'bairro') return projetos.filter((p) => p.escopo === 'cidade');
  return projetos.filter(
    (p) =>
      (p.escopo === 'subprefeitura' && p.subprefeitura === recorte.subprefeitura.nome) ||
      (p.escopo === 'cidade' && p.bairros.includes(recorte.bairro)),
  );
}
