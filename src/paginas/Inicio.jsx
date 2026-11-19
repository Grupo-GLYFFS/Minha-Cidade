import Pagina from '../componentes/Pagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import HeroiInicio from '../componentes/inicio/HeroiInicio';
import SecaoInicio from '../componentes/inicio/SecaoInicio';
import ConviteEntrar from '../componentes/inicio/ConviteEntrar';
import CardProximoAgendamento from '../componentes/inicio/CardProximoAgendamento';
import ListaAgendamentos from '../componentes/inicio/ListaAgendamentos';
import CardPedidoAndamento from '../componentes/inicio/CardPedidoAndamento';
import CardSolicitacaoEspera from '../componentes/inicio/CardSolicitacaoEspera';
import CardObraSeguida from '../componentes/inicio/CardObraSeguida';
import CardAviso from '../componentes/avisos/CardAviso';
import CardPedido from '../componentes/CardPedido';
import CartaoVotacaoLista from '../componentes/votacoes/CartaoVotacaoLista';
import IlustracaoPedido from '../componentes/pedidos/IlustracaoPedido';
import SeloTipo from '../componentes/seguindo/SeloTipo';
import { AVISOS } from '../dados/avisos';
import { PROJETOS } from '../dados/projetos';
import { useSessao } from '../contexto/useSessao';
import { usePedidos } from '../contexto/usePedidos';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useVotos } from '../contexto/useVotos';
import { useOQueSegue } from '../contexto/useOQueSegue';
import { useBairroDaPessoa } from '../contexto/useBairroDaPessoa';
import { pedidosAbertosDaPessoa } from '../logica/pedidos';
import { lugarDaVotacao } from '../logica/votacao';
import {
  agendaDoInicio,
  avisosDoInicio,
  destinosDoInicio,
  solicitacoesEsperando,
  votacoesDoInicio,
  destinoVotacoesDoInicio,
} from '../logica/inicio';
import classes from './Inicio.module.css';

// Página Início (/inicio): o resumo da cidade para a pessoa.
// Com conta: herói "Olá, <nome>", serviços agendados, pedidos em andamento, solicitações
// esperando resposta, avisos, votações abertas, o que ela segue e "Para onde ir".
// Visitante: herói "Olá", convite para entrar, avisos da cidade e votações da cidade.
// Seções vazias não aparecem.
export default function Inicio() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const { votoDe, resultado } = useVotos();
  // O que a pessoa segue: mesma regra de O que você segue e do Meu perfil
  const { seguidos: tudoSeguido, seguirVotacoes: votacoesSeguidas } = useOQueSegue();
  // Bairro da pessoa: com conta, o distrito do endereço; sem conta, o escolhido (ou nenhum)
  const daPessoa = useBairroDaPessoa();
  const bairro = usuario ? daPessoa.nome : null;
  const bairroDoCard = daPessoa.temConta || daPessoa.definido ? daPessoa.nome : null;

  const agenda = agendaDoInicio(solicitacoes);
  const meusPedidos = usuario ? pedidosAbertosDaPessoa(pedidos, usuario.id) : [];
  const esperando = solicitacoesEsperando(solicitacoes);
  const avisos = avisosDoInicio(AVISOS, bairro);
  const votacoes = votacoesDoInicio(PROJETOS, bairro);
  const seguidos = usuario ? tudoSeguido : null;

  // Card de votação igual ao das listas (com ou sem o selo de tipo)
  function cardVotacao(votacao, selo) {
    return (
      <CartaoVotacaoLista
        projeto={votacao}
        resultado={resultado(votacao)}
        voto={votoDe(votacao.id)}
        lugar={lugarDaVotacao(votacao)}
        seguindo={votacoesSeguidas.segue(votacao.id)}
        aoAlternarSeguir={() => votacoesSeguidas.alternar(votacao.id)}
        logado={Boolean(usuario)}
        selo={selo}
      />
    );
  }

  return (
    <Pagina cabecalho={<HeroiInicio primeiroNome={usuario?.primeiroNome} />}>
      {!usuario && <ConviteEntrar />}

      <div className={classes.secoes}>
        {agenda.proxima && (
          <SecaoInicio
            titulo="Serviços agendados"
            contagem={agenda.total}
            cor="azul"
            para="/servicos/minhas-solicitacoes"
            lista={false}
          >
            <CardProximoAgendamento solicitacao={agenda.proxima} />
            {agenda.seguintes.length > 0 && <ListaAgendamentos solicitacoes={agenda.seguintes} />}
          </SecaoInicio>
        )}

        {meusPedidos.length > 0 && (
          <SecaoInicio
            titulo="Pedidos em andamento"
            contagem={meusPedidos.length}
            cor="azul"
            para="/perfil/pedidos"
          >
            {meusPedidos.map((pedido) => (
              <li key={pedido.id}>
                <CardPedidoAndamento pedido={pedido} />
              </li>
            ))}
          </SecaoInicio>
        )}

        {esperando.length > 0 && (
          <SecaoInicio
            titulo="Solicitações esperando resposta"
            contagem={esperando.length}
            rotuloVer="Ver todas"
            para="/servicos/minhas-solicitacoes"
          >
            {esperando.map((solicitacao) => (
              <li key={solicitacao.id}>
                <CardSolicitacaoEspera solicitacao={solicitacao} />
              </li>
            ))}
          </SecaoInicio>
        )}

        {avisos.length > 0 && (
          <SecaoInicio titulo="Avisos" contagem={avisos.length} para="/minha-cidade/avisos">
            {avisos.map((aviso) => (
              <li key={aviso.id}>
                <CardAviso aviso={aviso} caminho={aviso.caminho} />
              </li>
            ))}
          </SecaoInicio>
        )}

        {votacoes.length > 0 && (
          <SecaoInicio
            titulo="Votações abertas"
            contagem={votacoes.length}
            cor="azul"
            rotuloVer="Ver todas"
            para={destinoVotacoesDoInicio(bairro)}
          >
            {votacoes.map((votacao) => (
              <li key={votacao.id}>{cardVotacao(votacao)}</li>
            ))}
          </SecaoInicio>
        )}

        {seguidos?.total > 0 && (
          <SecaoInicio
            titulo="O que você segue"
            contagem={seguidos.total}
            cor="verde"
            para="/perfil/seguindo"
          >
            {seguidos.obras.map((obra) => (
              <li key={`obra-${obra.id}`}>
                <CardObraSeguida obra={obra} />
              </li>
            ))}
            {seguidos.pedidos.map((pedido) => (
              <li key={`pedido-${pedido.id}`}>
                <CardPedido
                  pedido={pedido}
                  selo={<SeloTipo tipo="pedido" />}
                  midia={pedido.ilustracao && <IlustracaoPedido nome={pedido.ilustracao} />}
                />
              </li>
            ))}
            {seguidos.votacoes.map((votacao) => (
              <li key={`votacao-${votacao.id}`}>
                {cardVotacao(votacao, <SeloTipo tipo="votacao" />)}
              </li>
            ))}
          </SecaoInicio>
        )}
      </div>

      <ParaOndeIr
        destinos={destinosDoInicio({ usuario, bairro: bairroDoCard, pedidos, solicitacoes })}
      />
    </Pagina>
  );
}
