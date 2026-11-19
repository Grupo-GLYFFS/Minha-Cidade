import { SUBPREFEITURAS_ORCAMENTO } from '../dados/subprefeiturasOrcamento';

// Bairro usado quando ninguém está logado (o mesmo da conta de demonstração)
export const BAIRRO_PADRAO = 'Vila Mariana';

// Primeiro nível da trilha de toda subpágina da cidade
const NIVEL_CIDADE = { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' };

// Procura a subprefeitura que cuida de um bairro. Recebe o nome do bairro;
// devolve o objeto de SUBPREFEITURAS_ORCAMENTO (ou a da Vila Mariana, se o bairro não for achado).
export function subprefeituraDoBairro(bairro) {
  return (
    SUBPREFEITURAS_ORCAMENTO.find((sub) => sub.bairros.includes(bairro)) ??
    SUBPREFEITURAS_ORCAMENTO.find((sub) => sub.id === 'vila-mariana')
  );
}

// Monta o recorte de uma subpágina (Obras, Votações, Orçamento) da cidade ou do bairro.
// Recebe o escopo ("cidade" ou "bairro") e o bairro da pessoa.
// Devolve { escopo, bairro, subprefeitura, base, trilha, sufixo, deQuem }:
// - base: "/minha-cidade" ou "/meu-bairro" (início das rotas);
// - trilha: os níveis antes do nome da página;
// - sufixo: o fim do título ("da cidade de São Paulo" ou "da Vila Mariana");
// - deQuem: o fim dos nomes no "Para onde ir" ("da cidade" ou "do bairro").
export function montarRecorte(escopo, bairro = BAIRRO_PADRAO) {
  const subprefeitura = subprefeituraDoBairro(bairro);
  if (escopo === 'bairro') {
    return {
      escopo,
      bairro,
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
      sufixo: `da ${bairro}`,
      deQuem: 'do bairro',
    };
  }
  return {
    escopo: 'cidade',
    bairro,
    subprefeitura,
    base: '/minha-cidade',
    trilha: [NIVEL_CIDADE],
    sufixo: 'da cidade de São Paulo',
    deQuem: 'da cidade',
  };
}
