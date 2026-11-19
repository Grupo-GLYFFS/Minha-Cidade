import Pagina from '../Pagina';
import CabecalhoPagina from '../CabecalhoPagina';
import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import GrupoBotoes from '../GrupoBotoes';
import CartaoProtocolo from './CartaoProtocolo';
import PassosNumerados from './PassosNumerados';
import ListaRespostas from './ListaRespostas';
import { buscarStatusSolicitacao } from '../../logica/solicitacoes';
import classes from './SolicitacaoEnviada.module.css';

// Tela "Solicitação enviada": cabeçalho de confirmação com o protocolo, o que acontece
// agora (o prazo e os passos depois do envio) e o que a pessoa enviou.
// No celular, os dois botões do fim empilham em largura total, com o principal em cima.
// Recebe o serviço e a solicitação salva.
export default function SolicitacaoEnviada({ servico, solicitacao }) {
  // O 1º passo do "como fazer" é o próprio formulário; os outros vêm depois do envio
  const passos = (servico.info.comoFazer ?? []).slice(1, 4);

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina tipo="confirmacao" titulo="Solicitação enviada" subtitulo={servico.nome}>
          <CartaoProtocolo
            protocolo={solicitacao.protocolo}
            situacao={buscarStatusSolicitacao(solicitacao.status)}
          />
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        <SecaoCard titulo="O que acontece agora">
          <p className={classes.prazo}>{servico.info.prazo}</p>
          {passos.length > 0 && <PassosNumerados passos={passos} />}
        </SecaoCard>

        <SecaoCard titulo="O que você enviou">
          <ListaRespostas itens={solicitacao.respostas} />
        </SecaoCard>

        <div className={classes.fim}>
          <GrupoBotoes>
            <Botao variante="secundario" icone="arrow_back" para="/servicos">
              Voltar para Serviços
            </Botao>
            <Botao
              variante="principal"
              icone="arrow_forward"
              iconeDireita
              para={`/servicos/minhas-solicitacoes/${solicitacao.id}`}
            >
              Ver em Minhas solicitações
            </Botao>
          </GrupoBotoes>
        </div>
      </div>
    </Pagina>
  );
}
