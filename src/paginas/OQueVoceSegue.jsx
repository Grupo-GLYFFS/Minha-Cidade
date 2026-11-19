import { useSearchParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Abas from '../componentes/Abas';
import Botao from '../componentes/Botao';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import PainelSeguidos from '../componentes/seguindo/PainelSeguidos';
import { useListaSeguida } from '../componentes/seguindo/useListaSeguida';
import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { useSeguidos } from '../contexto/useSeguidos';
import { useVotos } from '../contexto/useVotos';
import { useCarregamentoSimulado } from '../contexto/useCarregamentoSimulado';
import { contar } from '../logica/resumoLugar';
import classes from './OQueVoceSegue.module.css';

// As três abas, na ordem da tela
const ABAS = [
  { id: 'votacoes', rotulo: 'Votações' },
  { id: 'obras', rotulo: 'Obras' },
  { id: 'pedidos', rotulo: 'Pedidos' },
];

// O que você segue (/perfil/seguindo, aberta pelo menu da conta; precisa de conta), tela 23c:
// abas Votações · Obras · Pedidos com contagem (a aba fica no endereço, ?aba=obras), os itens
// de cada aba agrupados pela situação, com o selo de tipo, e "Para onde ir".
// Página da conta: sem trilha.
export default function OQueVoceSegue() {
  const { usuario } = useSessao();
  const { pedidos, seguidos: idsPedidos } = usePedidos();
  const { votosDaPessoa } = useVotos();
  const seguirObras = useSeguidos('obras');
  const seguirVotacoes = useSeguidos('votacoes');
  const idsObras = useListaSeguida(seguirObras.seguidos);
  const idsVotacoes = useListaSeguida(seguirVotacoes.seguidos);
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const [parametros, setParametros] = useSearchParams();
  const pedida = parametros.get('aba');
  const aba = ABAS.some((item) => item.id === pedida) ? pedida : 'votacoes';

  const listas = {
    votacoes: PROJETOS.filter((projeto) => idsVotacoes.includes(projeto.id)),
    obras: OBRAS.filter((obra) => idsObras.includes(obra.id)),
    pedidos: pedidos.filter((pedido) => idsPedidos.includes(pedido.id)),
  };
  const total = listas.votacoes.length + listas.obras.length + listas.pedidos.length;

  // Troca a aba sem criar uma página nova no histórico
  function mudarAba(id) {
    setParametros(id === 'votacoes' ? {} : { aba: id }, { replace: true });
  }

  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando o que você segue…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar o que você segue agora"
        texto="Pode ser a sua conexão ou o sistema da prefeitura. O que você segue continua guardado."
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else if (total === 0) {
    conteudo = (
      <EstadoVazio
        icone="bookmark"
        titulo="Você ainda não segue nada"
        texto="Siga uma obra, uma votação ou um pedido para acompanhar as novidades aqui."
      >
        <Botao variante="secundario" para="/minha-cidade/obras">
          Obras
        </Botao>
        <Botao variante="secundario" para="/minha-cidade/votacoes">
          Votações
        </Botao>
        <Botao variante="secundario" para="/minha-cidade/pedidos">
          Pedidos
        </Botao>
      </EstadoVazio>
    );
  } else {
    conteudo = (
      <PainelSeguidos
        aba={aba}
        listas={listas}
        seguirObras={seguirObras}
        seguirVotacoes={seguirVotacoes}
      />
    );
  }

  const feitos = pedidos.filter((pedido) => pedido.autorId === usuario?.id).length;
  const votos = Object.keys(votosDaPessoa).length;

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="O que você segue"
          subtitulo="As votações, obras e pedidos que você segue."
          icone="bookmark"
        />
      }
    >
      <div className={classes.abas}>
        <Abas
          abas={ABAS.map((item) => ({ ...item, contagem: listas[item.id].length }))}
          ativa={aba}
          aoMudar={mudarAba}
          rotulo="O que você segue"
          prefixo="seguindo"
        />
      </div>
      <div role="tabpanel" id={`seguindo-painel-${aba}`} aria-labelledby={`seguindo-aba-${aba}`}>
        {conteudo}
      </div>
      <ParaOndeIr
        destinos={[
          {
            icone: 'assignment',
            titulo: 'Meus pedidos',
            meta: contar(feitos, 'feito por você', 'feitos por você'),
            para: '/perfil/pedidos',
          },
          {
            icone: 'how_to_vote',
            titulo: 'Meus votos',
            meta: contar(votos, 'voto', 'votos'),
            para: '/perfil/votos',
          },
        ]}
      />
    </Pagina>
  );
}
