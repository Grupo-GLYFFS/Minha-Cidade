import Pagina from '../componentes/Pagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import HeroiInicio from '../componentes/inicio/HeroiInicio';
import SecaoInicio from '../componentes/inicio/SecaoInicio';
import ConviteEntrar from '../componentes/inicio/ConviteEntrar';
import CardProximoAgendamento from '../componentes/inicio/CardProximoAgendamento';
import ListaAgendamentos from '../componentes/inicio/ListaAgendamentos';
import CardAndamento from '../componentes/inicio/CardAndamento';
import CardAvisoInicio from '../componentes/inicio/CardAvisoInicio';
import CardVotacaoInicio from '../componentes/inicio/CardVotacaoInicio';
import CardSeguido from '../componentes/inicio/CardSeguido';
import { AVISOS } from '../dados/avisos';
import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { useSessao } from '../contexto/useSessao';
import { usePedidos } from '../contexto/usePedidos';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useVotos } from '../contexto/useVotos';
import { useSeguidos } from '../contexto/useSeguidos';
import { buscarCategoria, buscarStatus, pedidosAbertosDaPessoa, textoUltimaMudanca } from '../logica/pedidos';
import { buscarStatusSolicitacao, textoContagemSolicitacoes } from '../logica/solicitacoes';
import { buscarServico } from '../logica/servicos';
import { contar, resumirLugar } from '../logica/resumoLugar';
import {
  agendaDoInicio,
  avisosDoInicio,
  etapasDaSolicitacao,
  etapasDoPedidoInicio,
  itensSeguidos,
  solicitacoesEsperando,
  textosDaSolicitacao,
  votacoesDoInicio,
} from '../logica/inicio';
import classes from './Inicio.module.css';

// Página Início (/inicio): o resumo da cidade para a pessoa.
// Com conta: herói "Olá, <nome>", serviços agendados, pedidos em andamento, solicitações
// esperando resposta, avisos, votações abertas, o que ela segue e "Para onde ir".
// Visitante: herói "Olá", convite para entrar, avisos da cidade e votações da cidade.
// Seções pessoais vazias não aparecem.
export default function Inicio() {
  const { usuario } = useSessao();
  const { pedidos, seguidos: pedidosSeguidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const { votoDe, resultado } = useVotos();
  const obrasSeguidas = useSeguidos('obras');
  const votacoesSeguidas = useSeguidos('votacoes');
  const bairro = usuario?.bairro ?? null;

  const agenda = agendaDoInicio(solicitacoes);
  const meusPedidos = usuario ? pedidosAbertosDaPessoa(pedidos, usuario.id) : [];
  const esperando = solicitacoesEsperando(solicitacoes);
  const avisos = avisosDoInicio(AVISOS, bairro);
  const votacoes = votacoesDoInicio(PROJETOS, bairro);
  const seguidos = usuario
    ? itensSeguidos({
        obras: OBRAS,
        idsObras: obrasSeguidas.seguidos,
        pedidos,
        idsPedidos: pedidosSeguidos,
        projetos: PROJETOS,
        idsVotacoes: votacoesSeguidas.seguidos,
      })
    : [];

  // "Para onde ir": as páginas da conta e os dois hubs, cada um com um número real
  const alertasCidade = resumirLugar(pedidos).alertas;
  const destinosHubs = [
    {
      icone: 'home_pin',
      titulo: 'Meu bairro',
      meta: bairro
        ? `${bairro} · ${contar(resumirLugar(pedidos, [bairro]).alertas, 'alerta ativo', 'alertas ativos')}`
        : 'O resumo do seu bairro',
      para: '/meu-bairro',
    },
    {
      icone: 'location_city',
      titulo: 'Minha cidade',
      meta: `Cidade de São Paulo · ${contar(alertasCidade, 'alerta ativo', 'alertas ativos')}`,
      para: '/minha-cidade',
    },
  ];
  const destinos = usuario
    ? [
        {
          icone: 'assignment',
          titulo: 'Meus pedidos',
          meta: contar(
            pedidos.filter((pedido) => pedido.autorId === usuario.id).length,
            'feito por você',
            'feitos por você',
          ),
          para: '/perfil/pedidos',
        },
        {
          icone: 'event_available',
          titulo: 'Minhas solicitações',
          meta: textoContagemSolicitacoes(solicitacoes),
          para: '/servicos/minhas-solicitacoes',
        },
        ...destinosHubs,
      ]
    : destinosHubs;

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
            {meusPedidos.map((pedido) => {
              const status = buscarStatus(pedido.status);
              const categoria = buscarCategoria(pedido.categoria);
              return (
                <li key={pedido.id}>
                  <CardAndamento
                    caminho={`/pedidos/${pedido.id}`}
                    icone={categoria?.icone ?? 'assignment'}
                    categoria={categoria?.rotulo}
                    selo={status && { cor: status.cor, rotulo: status.rotulo }}
                    titulo={pedido.titulo}
                    etapas={etapasDoPedidoInicio(pedido)}
                  >
                    {pedido.rua} · {textoUltimaMudanca(pedido)}
                  </CardAndamento>
                </li>
              );
            })}
          </SecaoInicio>
        )}

        {esperando.length > 0 && (
          <SecaoInicio
            titulo="Solicitações esperando resposta"
            contagem={esperando.length}
            rotuloVer="Ver todas"
            para="/servicos/minhas-solicitacoes"
          >
            {esperando.map((solicitacao) => {
              const status = buscarStatusSolicitacao(solicitacao.status);
              const textos = textosDaSolicitacao(solicitacao);
              return (
                <li key={solicitacao.id}>
                  <CardAndamento
                    caminho={`/servicos/minhas-solicitacoes/${solicitacao.id}`}
                    icone={buscarServico(solicitacao.idServico)?.icone ?? 'event'}
                    categoria="Solicitação"
                    selo={{ cor: status.cor, rotulo: status.rotulo }}
                    titulo={solicitacao.nomeServico}
                    etapas={etapasDaSolicitacao(solicitacao)}
                  >
                    {textos.quando}
                    {textos.prazo && (
                      <>
                        {' · '}
                        <strong className={classes.prazo}>{textos.prazo}</strong>
                      </>
                    )}
                  </CardAndamento>
                </li>
              );
            })}
          </SecaoInicio>
        )}

        {avisos.length > 0 && (
          <SecaoInicio titulo="Avisos" contagem={avisos.length} para="/minha-cidade/avisos">
            {avisos.map((aviso) => (
              <li key={aviso.id}>
                <CardAvisoInicio aviso={aviso} />
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
            para="/minha-cidade/votacoes"
          >
            {votacoes.map((votacao) => (
              <li key={votacao.id}>
                <CardVotacaoInicio
                  votacao={votacao}
                  totalVotos={resultado(votacao).total}
                  voto={votoDe(votacao.id)}
                  segue={votacoesSeguidas.segue(votacao.id)}
                  aoSeguir={() => votacoesSeguidas.alternar(votacao.id)}
                  logado={Boolean(usuario)}
                />
              </li>
            ))}
          </SecaoInicio>
        )}

        {seguidos.length > 0 && (
          <SecaoInicio titulo="O que você segue" contagem={seguidos.length} cor="verde" para="/perfil">
            {seguidos.map((item) => (
              <li key={item.id}>
                <CardSeguido item={item} />
              </li>
            ))}
          </SecaoInicio>
        )}
      </div>

      <ParaOndeIr destinos={destinos} />
    </Pagina>
  );
}
