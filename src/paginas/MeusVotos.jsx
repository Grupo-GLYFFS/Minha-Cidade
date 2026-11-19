import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import GruposVotacoes from '../componentes/votacoes/GruposVotacoes';
import { PROJETOS } from '../dados/projetos';
import { destinoVotacoes } from '../logica/destinos';
import { doLugar } from '../logica/lugares';
import { useRecorte } from '../contexto/useRecorte';
import { useSeguidos } from '../contexto/useSeguidos';
import { useVotos } from '../contexto/useVotos';
import { useCarregamentoSimulado } from '../contexto/useCarregamentoSimulado';

// Página Meus votos (/perfil/votos, aberta pelo menu do perfil; precisa de conta):
// as votações em que a pessoa votou, da cidade e do bairro, em Abertas e Encerradas.
// Página da conta: sem trilha.
export default function MeusVotos() {
  const recorteCidade = useRecorte('cidade');
  const recorteBairro = useRecorte('bairro');
  const seguir = useSeguidos('votacoes');
  const { votosDaPessoa } = useVotos();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();

  const votadas = PROJETOS.filter((projeto) => votosDaPessoa[projeto.id]);

  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando os seus votos…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar os seus votos agora"
        texto="Pode ser a sua conexão ou o sistema da prefeitura. Os votos que você já deu continuam valendo."
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else if (votadas.length === 0) {
    conteudo = (
      <EstadoVazio
        icone="how_to_vote"
        titulo="Você ainda não votou"
        texto="Quando você votar, a votação aparece aqui com o seu voto."
      >
        <Botao variante="secundario" para="/minha-cidade/votacoes">
          Ver as votações abertas
        </Botao>
      </EstadoVazio>
    );
  } else {
    conteudo = <GruposVotacoes projetos={votadas} prefixo="meus-votos" seguir={seguir} />;
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Meus votos"
          subtitulo="As votações em que você votou, com o seu voto."
          icone="how_to_vote"
        />
      }
    >
      {conteudo}
      <ParaOndeIr
        destinos={[
          destinoVotacoes(recorteCidade),
          destinoVotacoes(recorteBairro, `Votações ${doLugar(recorteBairro.lugar)}`),
        ]}
      />
    </Pagina>
  );
}
