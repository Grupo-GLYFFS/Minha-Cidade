import { useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import MetaCabecalho from '../componentes/MetaCabecalho';
import SeloSituacao from '../componentes/SeloSituacao';
import SecaoCard from '../componentes/SecaoCard';
import LinhaDado from '../componentes/LinhaDado';
import Botao from '../componentes/Botao';
import ParaOndeIr from '../componentes/ParaOndeIr';
import NaoEncontrado from '../componentes/NaoEncontrado';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import CartaoAgenda from '../componentes/servicos/CartaoAgenda';
import AcoesAgendamento from '../componentes/servicos/AcoesAgendamento';
import CancelarSolicitacao from '../componentes/servicos/CancelarSolicitacao';
import LinhaDoTempoSolicitacao from '../componentes/servicos/LinhaDoTempoSolicitacao';
import SecaoOnde from '../componentes/servicos/SecaoOnde';
import ListaRespostas from '../componentes/servicos/ListaRespostas';
import { useCarregamento } from '../componentes/servicos/useCarregamento';
import { useResumoConta } from '../componentes/servicos/useResumoConta';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useAvisoTemporario } from '../contexto/useAvisoTemporario';
import { SERVICOS } from '../dados/servicos';
import { buscarCategoriaServico, buscarServico } from '../logica/servicos';
import { buscarSolicitacao, buscarStatusSolicitacao } from '../logica/solicitacoes';
import { formatarHora, formatarMomento, naData } from '../logica/datasExtenso';
import classes from './DetalheSolicitacao.module.css';

// Detalhe de uma solicitação (/servicos/minhas-solicitacoes/:id, só com conta):
// cabeçalho com a situação, o protocolo e o cartão da agenda (ou do prazo), Remarcar e
// Cancelar nos agendamentos (Cancelar solicitação na recém-enviada), andamento, instruções, onde e o que a pessoa enviou.
export default function DetalheSolicitacao() {
  const { id } = useParams();
  const { solicitacoes } = useSolicitacoes();
  const { carregando, erro, tentarDeNovo } = useCarregamento();
  const resumo = useResumoConta();
  const mostrarAviso = useAvisoTemporario();
  const solicitacao = buscarSolicitacao(solicitacoes, id);

  const trilhaBase = [{ rotulo: 'Minhas solicitações', para: '/servicos/minhas-solicitacoes' }];

  if (carregando || erro) {
    return (
      <Pagina
        cabecalho={
          <CabecalhoPagina
            tipo="detalhe"
            titulo="Solicitação"
            icone="event_available"
            trilha={[...trilhaBase, { rotulo: 'Solicitação' }]}
          />
        }
      >
        {carregando ? (
          <EstadoCarregando texto="Carregando a solicitação…" itens={2} />
        ) : (
          <EstadoErro
            titulo="Não conseguimos carregar esta solicitação agora"
            texto="Pode ser a sua conexão ou o sistema da prefeitura. Seus agendamentos continuam marcados."
            aoTentarDeNovo={tentarDeNovo}
          />
        )}
      </Pagina>
    );
  }

  if (!solicitacao) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos esta solicitação"
          texto="Confira o número do protocolo ou veja a lista das suas solicitações."
          icone="event_busy"
        >
          <Botao
            variante="principal"
            icone="arrow_forward"
            iconeDireita
            para="/servicos/minhas-solicitacoes"
          >
            Ver minhas solicitações
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  const servico = buscarServico(solicitacao.idServico);
  const categoria = buscarCategoriaServico(solicitacao.categoria);
  const situacao = buscarStatusSolicitacao(solicitacao.status);
  const agendada = solicitacao.status === 'agendada';
  const instrucoes = agendada ? (solicitacao.instrucoes ?? []) : [];
  const enviadas = [
    ...solicitacao.respostas.map((resposta) => ({
      rotulo: resposta.rotulo,
      valor: resposta.valor,
    })),
    { rotulo: 'Solicitada em', valor: formatarMomento(solicitacao.criadoEm, ', ') },
  ];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="detalhe"
          titulo={solicitacao.nomeServico}
          icone={servico?.icone ?? 'event_available'}
          categoria={categoria && { icone: categoria.icone, rotulo: categoria.nome }}
          trilha={[...trilhaBase, { rotulo: solicitacao.nomeServico }]}
          acoes={
            (agendada && <AcoesAgendamento solicitacao={solicitacao} aoAvisar={mostrarAviso} />) ||
            (solicitacao.status === 'solicitada' && (
              <CancelarSolicitacao solicitacao={solicitacao} />
            ))
          }
        >
          <MetaCabecalho>
            <SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>
            <span>
              Solicitada {naData(solicitacao.criadoEm)}, às {formatarHora(solicitacao.criadoEm)}
            </span>
          </MetaCabecalho>
          <p className={classes.protocolo}>
            Protocolo <b>{solicitacao.protocolo}</b>
          </p>
          <CartaoAgenda solicitacao={solicitacao} />
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        <SecaoCard titulo="Andamento">
          <LinhaDoTempoSolicitacao solicitacao={solicitacao} />
        </SecaoCard>

        {instrucoes.length > 0 && (
          <SecaoCard titulo="Instruções" lista>
            {instrucoes.map((instrucao) => (
              <LinhaDado
                key={instrucao.texto}
                icone={instrucao.icone}
                rotulo={<span className={classes.instrucao}>{instrucao.texto}</span>}
              />
            ))}
          </SecaoCard>
        )}

        {solicitacao.local && <SecaoOnde local={solicitacao.local} comoChegar={agendada} />}

        <SecaoCard titulo="O que você enviou">
          <div className={classes.enviadas}>
            <ListaRespostas itens={enviadas} />
          </div>
        </SecaoCard>
      </div>

      <ParaOndeIr
        destinos={[
          {
            icone: 'event_available',
            titulo: 'Minhas solicitações',
            meta: resumo.solicitacoesESolicitadas,
            para: '/servicos/minhas-solicitacoes',
          },
          {
            icone: 'grid_view',
            titulo: 'Serviços',
            meta: `${SERVICOS.length} serviços da prefeitura`,
            para: '/servicos',
          },
        ]}
      />
    </Pagina>
  );
}
