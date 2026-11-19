import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import GruposVotacoes from '../componentes/votacoes/GruposVotacoes';
import { PROJETOS } from '../dados/projetos';
import { votacoesDoRecorte } from '../logica/recorte';
import { noLugar } from '../logica/lugares';
import { projetosVotados } from '../logica/votacao';
import { destinoObras, destinoOrcamento } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import { useSeguidos } from '../contexto/useSeguidos';
import { useVotos } from '../contexto/useVotos';
import { useSessao } from '../contexto/useSessao';
import { useCarregamentoSimulado } from '../contexto/useCarregamentoSimulado';

// Página Votações (/minha-cidade/votacoes e /meu-bairro/votacoes): votações agrupadas em Abertas
// e Encerradas, com Seguir e "Avaliar e votar" em cada card. Os votos da pessoa ficam em
// Meus votos: o botão no cabeçalho leva para lá, com a contagem da mesma regra.
// Recebe o escopo: "cidade" (as da cidade toda) ou "bairro" (as da subprefeitura do bairro e as
// da cidade que incluem o bairro).
export default function Votacoes({ escopo = 'cidade' }) {
  const recorte = useRecorte(escopo);
  const seguir = useSeguidos('votacoes');
  const { votosDaPessoa } = useVotos();
  const { logado } = useSessao();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();

  const visiveis = votacoesDoRecorte(PROJETOS, recorte);
  const meusVotos = projetosVotados(PROJETOS, votosDaPessoa).length;
  const subtitulo =
    escopo === 'cidade'
      ? 'Projetos abertos para quem mora na cidade votar e acompanhar o resultado.'
      : `Projetos abertos para quem mora ${noLugar(recorte.lugar)} votar e acompanhar o resultado.`;

  // Lista do bairro sem votação aberta: aviso no lugar do grupo Abertas
  const semAbertas =
    escopo === 'bairro' ? (
      <EstadoVazio
        icone="how_to_vote"
        titulo={`Nenhuma votação aberta ${noLugar(recorte.lugar)}`}
        texto="Quando a subprefeitura abrir uma votação, ela aparece aqui."
      >
        <Botao variante="secundario" para="/minha-cidade/votacoes">
          Ver as votações da cidade
        </Botao>
      </EstadoVazio>
    ) : undefined;

  // O que aparece no painel da aba, conforme o estado da lista
  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando as votações…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar as votações agora"
        texto="Pode ser a sua conexão ou o sistema da prefeitura. Os votos que você já deu continuam valendo."
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else if (visiveis.length === 0) {
    conteudo = semAbertas ?? (
      <EstadoVazio
        icone="how_to_vote"
        titulo="Nenhuma votação por enquanto"
        texto="Quando a prefeitura abrir uma votação, ela aparece aqui."
      />
    );
  } else {
    conteudo = (
      <GruposVotacoes
        projetos={visiveis}
        prefixo="votacoes"
        recorte={recorte}
        seguir={seguir}
        semAbertas={semAbertas}
      />
    );
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo={`Votações ${recorte.sufixo}`}
          subtitulo={subtitulo}
          icone="how_to_vote"
          trilha={[...recorte.trilha, { rotulo: 'Votações' }]}
          acoes={
            logado && (
              <Botao
                variante="secundario"
                icone="how_to_vote"
                contagem={meusVotos}
                para="/perfil/votos"
              >
                Meus votos
              </Botao>
            )
          }
        />
      }
    >
      {conteudo}
      <ParaOndeIr destinos={[destinoObras(recorte), destinoOrcamento(recorte)]} />
    </Pagina>
  );
}
