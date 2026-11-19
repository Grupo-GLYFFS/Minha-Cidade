import { Navigate, useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import MetaCabecalho from '../componentes/MetaCabecalho';
import SeloSituacao from '../componentes/SeloSituacao';
import Icone from '../componentes/Icone';
import SecaoCard from '../componentes/SecaoCard';
import LinhaDado from '../componentes/LinhaDado';
import Botao from '../componentes/Botao';
import NaoEncontrado from '../componentes/NaoEncontrado';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import IlustracaoPedido from '../componentes/pedidos/IlustracaoPedido';
import AcoesPedido from '../componentes/pedidos/AcoesPedido';
import FotosRelatadas from '../componentes/pedidos/FotosRelatadas';
import SecaoPrioridade from '../componentes/pedidos/SecaoPrioridade';
import AndamentoPedido from '../componentes/pedidos/AndamentoPedido';
import SecaoAtualizacoes from '../componentes/pedidos/SecaoAtualizacoes';
import SecaoAvaliacao from '../componentes/pedidos/SecaoAvaliacao';
import CancelarPedido from '../componentes/pedidos/CancelarPedido';
import { useCarregamentoSimulado } from '../componentes/pedidos/useCarregamentoSimulado';
import { useDestinosPedidos } from '../componentes/pedidos/useDestinosPedidos';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { useRecorte } from '../contexto/useRecorte';
import { pedidosDoLugar } from '../logica/gruposPedidos';
import {
  buscarCategoria,
  buscarPedido,
  buscarStatus,
  mostraAvaliacao,
  podeCancelar,
} from '../logica/pedidos';
import { nivelPrioridade } from '../logica/prioridade';
import { etapasDoPedido } from '../logica/linhaDoTempo';
import { formatarNoDia } from '../logica/datasPedido';
import { enderecoDoPedido, nomeSubprefeitura } from '../logica/localPedido';
import classes from '../componentes/pedidos/DetalhePedido.module.css';

// Detalhe do pedido (/minha-cidade/pedidos/:id, /meu-bairro/pedidos/:id e as rotas de outro
// bairro ou subprefeitura). Recebe o escopo ("cidade" ou "bairro"), que muda só a trilha e o
// menu marcado; pedido de fora do lugar aberto pelo bairro vai para /minha-cidade/pedidos/:id.
// Cabeçalho com desenho (ou ícone da categoria), protocolo, prioridade, situação e as ações
// Apoiar, Seguir e Compartilhar (e Cancelar pedido no da pessoa, enquanto Enviado ou Em análise);
// depois, no pedido concluído da pessoa, Avalie o serviço; e as seções O que foi relatado, Prioridade, Onde,
// Andamento e Atualizações da prefeitura. Pedido que não existe mostra "não encontrado".
export default function DetalhePedido({ escopo = 'cidade' }) {
  const { id } = useParams();
  const recorte = useRecorte(escopo);
  const lista = escopo === 'bairro' ? `${recorte.base}/pedidos` : '/minha-cidade/pedidos';
  const { pedidos } = usePedidos();
  const { usuario } = useSessao();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const destinos = useDestinosPedidos();
  const pedido = buscarPedido(pedidos, id);

  if (!pedido) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos este pedido"
          texto="O link pode estar incompleto ou o pedido foi tirado do app."
          icone="assignment_late"
        >
          <Botao variante="principal" para={lista}>
            Ver os pedidos
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  if (escopo === 'bairro' && pedidosDoLugar([pedido], recorte.bairros).length === 0) {
    return <Navigate to={`/minha-cidade/pedidos/${pedido.id}`} replace />;
  }

  const categoria = buscarCategoria(pedido.categoria);
  const status = buscarStatus(pedido.status);
  const prioridade = nivelPrioridade(pedido);
  const ehSeu = usuario && pedido.autorId === usuario.id;

  const cabecalho = (
    <CabecalhoPagina
      tipo="detalhe"
      titulo={pedido.titulo}
      trilha={[
        ...recorte.trilha,
        { rotulo: 'Pedidos', para: lista },
        { rotulo: `Pedido ${pedido.protocolo}` },
      ]}
      midia={
        pedido.ilustracao && (
          <IlustracaoPedido
            nome={pedido.ilustracao}
            alt={`Foto do local: ${pedido.titulo}`}
            embaixo
          />
        )
      }
      icone={categoria?.icone}
      categoria={{ icone: categoria?.icone, rotulo: categoria?.rotulo }}
      acoes={
        <>
          <AcoesPedido pedido={pedido} />
          {podeCancelar(pedido, usuario?.id) && <CancelarPedido pedido={pedido} />}
        </>
      }
    >
      <MetaCabecalho>
        <span>
          Protocolo <b>{pedido.protocolo}</b>
        </span>
        <span className={classes.prioridade}>
          <Icone nome={prioridade.icone} tamanho={20} />
          {prioridade.rotulo}
        </span>
        {ehSeu && (
          <span className={classes.seuPedido}>
            <Icone nome="person" tamanho={20} preenchido />
            Seu pedido
          </span>
        )}
        {status && <SeloSituacao cor={status.cor}>{status.rotulo}</SeloSituacao>}
      </MetaCabecalho>
      <MetaCabecalho>
        <span>Enviado {formatarNoDia(pedido.criadoEm)}</span>
      </MetaCabecalho>
    </CabecalhoPagina>
  );

  // O cabeçalho aparece já; as seções esperam a busca (carregando e erro)
  let conteudo;
  if (estado === 'carregando') conteudo = <EstadoCarregando texto="Carregando o pedido…" />;
  else if (estado === 'erro') {
    conteudo = (
      <EstadoErro titulo="Não conseguimos carregar o pedido agora" aoTentarDeNovo={tentarDeNovo} />
    );
  } else {
    conteudo = (
      <div className={classes.secoes}>
        {mostraAvaliacao(pedido, usuario?.id) && <SecaoAvaliacao pedido={pedido} />}
        <SecaoCard titulo="O que foi relatado">
          <p className={classes.descricao}>{pedido.descricao}</p>
          <FotosRelatadas pedido={pedido} />
        </SecaoCard>
        <SecaoPrioridade pedido={pedido} />
        <SecaoCard titulo="Onde" lista>
          <LinhaDado icone="location_on" rotulo="Rua" valor={enderecoDoPedido(pedido)} />
          <LinhaDado icone="home_work" rotulo="Bairro" valor={pedido.bairro} />
          {pedido.subprefeitura && (
            <LinhaDado
              icone="account_balance"
              rotulo="Subprefeitura"
              valor={nomeSubprefeitura(pedido.subprefeitura)}
            />
          )}
        </SecaoCard>
        <SecaoCard titulo="Andamento">
          <AndamentoPedido etapas={etapasDoPedido(pedido)} />
        </SecaoCard>
        <SecaoAtualizacoes pedido={pedido} />
      </div>
    );
  }

  return (
    <Pagina cabecalho={cabecalho}>
      {conteudo}
      <ParaOndeIr destinos={[destinos.bairro, destinos.meus, destinos.obras]} />
      <AcoesPedido pedido={pedido} pe />
    </Pagina>
  );
}
