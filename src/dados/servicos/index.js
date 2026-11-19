import { SERVICOS_SAUDE } from './saude';
import { SERVICOS_EDUCACAO } from './educacao';
import { SERVICOS_ZELADORIA } from './zeladoria';
import { SERVICOS_COLETA_MEIO_AMBIENTE } from './coletaMeioAmbiente';
import { SERVICOS_IMPOSTOS_TAXAS } from './impostosTaxas';
import { SERVICOS_TRANSPORTE_TRANSITO } from './transporteTransito';
import { SERVICOS_ASSISTENCIA_SOCIAL } from './assistenciaSocial';
import { SERVICOS_TRABALHO_HABITACAO } from './trabalhoHabitacao';
import { SERVICOS_CULTURA_ESPORTE_LAZER } from './culturaEsporteLazer';
import { SERVICOS_DEFESA_CIVIL } from './defesaCivil';
import { SERVICOS_ATENDIMENTO } from './atendimento';

// Catálogo completo de serviços da prefeitura, juntando os arquivos de cada assunto.
// Formato de cada serviço:
// - id, nome (começa pelo verbo quando é uma ação), nomeCurto (opcional, para os atalhos),
//   resumo (uma linha), categoria, subcategoria, icone e palavrasChave (sinônimos do dia a dia);
// - tipo: 'informativo' (só explica), 'solicitacao' (pedido online pelo formulário do app)
//   ou 'proprio' (leva a uma tela do app, em "destino", com o botão "rotuloDestino");
// - info: ficha com oQueE, quemPode, documentos, prazo, custo, comoFazer (passos),
//   ondeIr e telefones (opcionais);
// - campos (só em 'solicitacao'): perguntas do formulário, montado pelo motor de pedidos;
//   um campo 'cep' (com nome "cep") já traz rua, número, bairro e região junto,
//   então esses campos não precisam ser listados de novo;
// - maisUsado (opcional): posição (1, 2, 3…) nos atalhos "Mais usados" de Serviços e do Início;
// - atalho (opcional): rota aberta direto pelo card do catálogo, sem passar pela ficha;
// - nomeEtapa (opcional): nome da 1ª etapa do formulário (padrão "Detalhes");
// - prazoDias e textoPrazo (opcionais): em quantos dias a prefeitura responde e a frase
//   do prazo em Minhas solicitações (padrão 15 dias e "Resposta até").
export const SERVICOS = [
  ...SERVICOS_SAUDE,
  ...SERVICOS_EDUCACAO,
  ...SERVICOS_ZELADORIA,
  ...SERVICOS_COLETA_MEIO_AMBIENTE,
  ...SERVICOS_IMPOSTOS_TAXAS,
  ...SERVICOS_TRANSPORTE_TRANSITO,
  ...SERVICOS_ASSISTENCIA_SOCIAL,
  ...SERVICOS_TRABALHO_HABITACAO,
  ...SERVICOS_CULTURA_ESPORTE_LAZER,
  ...SERVICOS_DEFESA_CIVIL,
  ...SERVICOS_ATENDIMENTO,
];
