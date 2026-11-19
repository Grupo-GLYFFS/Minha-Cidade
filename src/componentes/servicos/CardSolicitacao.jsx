import { Link } from 'react-router-dom';
import Icone from '../Icone';
import IconeServico from './IconeServico';
import { buscarServico } from '../../logica/servicos';
import { distanciaEmPalavras, formatarDiaMes, textoFaltam } from '../../logica/datasExtenso';
import classes from './CardsSolicitacao.module.css';

// Linha de baixo do card: quando foi pedida e quanto falta (solicitadas),
// ou quando foi concluída ou cancelada. Recebe a solicitação; devolve { icone, texto }.
function linhaFinal(solicitacao) {
  if (solicitacao.status === 'concluida') {
    return {
      icone: 'check_circle',
      texto: `Concluída em ${formatarDiaMes(solicitacao.concluidaEm)}`,
    };
  }
  if (solicitacao.status === 'cancelada') {
    return {
      icone: 'event_busy',
      texto: `Cancelada em ${formatarDiaMes(solicitacao.canceladaEm)}`,
    };
  }
  const relativa = distanciaEmPalavras(solicitacao.criadoEm);
  const quando =
    relativa === 'hoje' || relativa === 'ontem'
      ? relativa
      : `em ${formatarDiaMes(solicitacao.criadoEm)}`;
  const partes = [`Solicitada ${quando}`];
  if (solicitacao.prazoData) partes.push(textoFaltam(solicitacao.prazoData));
  return { texto: partes.join(' · ') };
}

// Card de uma solicitação ainda sem dia (solicitadas) ou já encerrada (concluídas, canceladas):
// ícone, nome (link para o detalhe), o que foi pedido, o prazo da prefeitura e a linha final.
// Recebe a solicitação.
export default function CardSolicitacao({ solicitacao }) {
  const servico = buscarServico(solicitacao.idServico);
  const final = linhaFinal(solicitacao);
  const aberta = solicitacao.status === 'solicitada' || solicitacao.status === 'em-analise';

  return (
    <article className={classes.card}>
      <div className={classes.linhaSemHora}>
        <span className={classes.iconeCard}>
          <IconeServico nome={servico?.icone ?? 'event'} tamanho={72} />
        </span>
        <div className={classes.conteudo}>
          <h3 className={classes.titulo}>
            <Link to={`/servicos/minhas-solicitacoes/${solicitacao.id}`} className={classes.link}>
              {solicitacao.nomeServico}
            </Link>
          </h3>
          <p className={classes.resumo}>{solicitacao.resumo}</p>
          {aberta && solicitacao.prazoData && (
            <p className={classes.prazo}>
              <Icone nome="event_upcoming" tamanho={20} />
              {solicitacao.textoPrazo} {formatarDiaMes(solicitacao.prazoData)}
            </p>
          )}
          <p
            className={`${classes.meta} ${final.icone === 'check_circle' ? classes.metaFeita : ''}`}
          >
            {final.icone && <Icone nome={final.icone} tamanho={18} />}
            {final.texto}
          </p>
        </div>
      </div>
    </article>
  );
}
