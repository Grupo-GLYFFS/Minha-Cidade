import { Link } from 'react-router-dom';
import Botao from '../Botao';
import Cartao from '../Cartao';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import IconeServico from './IconeServico';
import AcoesAgendamento from './AcoesAgendamento';
import { buscarServico } from '../../logica/servicos';
import { linkComoChegar } from '../../logica/solicitacoes';
import { formatarHora } from '../../logica/datasExtenso';
import classes from './CardsSolicitacao.module.css';

// Card de um agendamento em Minhas solicitações: hora, ícone, nome do serviço (link para
// o detalhe), o que foi pedido e o local. O próximo agendamento ganha o selo "Próxima"
// e a faixa com 4 botões: Como chegar, Remarcar, Cancelar e Ver agendamento.
// Recebe a solicitação, proxima (true no primeiro da lista) e aoAvisar(texto, link); o aviso
// de Remarcar e Cancelar ganha o "Ver" para o detalhe.
export default function CardAgendamento({ solicitacao, proxima = false, aoAvisar }) {
  const { agendamento, local } = solicitacao;
  const servico = buscarServico(solicitacao.idServico);
  const caminho = `/servicos/minhas-solicitacoes/${solicitacao.id}`;

  return (
    <Cartao component="article" destaque={proxima} className={classes.card}>
      <div className={classes.linha}>
        <p className={classes.hora}>
          {formatarHora(agendamento.hora)}
          {agendamento.horaFim && (
            <span className={classes.horaFim}>até {formatarHora(agendamento.horaFim)}</span>
          )}
        </p>
        <IconeServico nome={servico?.icone ?? 'event'} tamanho={72} />
        <div className={classes.conteudo}>
          <h4 className={classes.titulo}>
            <Link to={caminho} className={classes.link}>
              {solicitacao.nomeServico}
            </Link>
          </h4>
          <p className={classes.resumo}>{solicitacao.resumo}</p>
          {local && (
            <p className={classes.onde}>
              <Icone nome="location_on" tamanho={18} />
              {local.nome}
            </p>
          )}
        </div>
        {proxima && (
          <span className={classes.selo}>
            <SeloSituacao cor="azul">Próxima</SeloSituacao>
          </span>
        )}
      </div>

      {proxima && (
        <div className={classes.botoes}>
          {local && (
            <Botao
              variante="secundario"
              compacto
              icone="directions"
              href={linkComoChegar(local)}
              target="_blank"
              rel="noreferrer"
            >
              Como chegar<span className={classes.oculto}> a {local.nome} (abre o mapa)</span>
            </Botao>
          )}
          <AcoesAgendamento
            solicitacao={solicitacao}
            compacto
            aoAvisar={aoAvisar}
            linkDoAviso={caminho}
          />
          <Botao variante="principal" compacto para={caminho}>
            Ver agendamento
          </Botao>
        </div>
      )}
    </Cartao>
  );
}
