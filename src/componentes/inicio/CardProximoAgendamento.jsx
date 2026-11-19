import Botao from '../Botao';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import IconeServico from '../servicos/IconeServico';
import { buscarServico } from '../../logica/servicos';
import { linkComoChegar } from '../../logica/solicitacoes';
import { formatarHora } from '../../logica/datasExtenso';
import { diaDoAgendamento } from '../../logica/inicio';
import classes from './CardsInicio.module.css';

// Card do próximo serviço agendado, com borda azul: faixa com o dia ("Amanhã · sábado,
// 14 de novembro") e o selo "Agendado"; hora, ícone, serviço, o que foi pedido e o local;
// embaixo, "Como chegar" (abre o mapa) e "Ver agendamento".
// Recebe a solicitação agendada.
export default function CardProximoAgendamento({ solicitacao }) {
  const { agendamento, local } = solicitacao;
  const servico = buscarServico(solicitacao.idServico);
  const dia = diaDoAgendamento(agendamento.data);
  const idTitulo = `proximo-${solicitacao.id}`;

  return (
    <article className={`${classes.card} ${classes.proximo}`} aria-labelledby={idTitulo}>
      <p className={classes.faixa}>
        <Icone nome="event" tamanho={20} className={classes.icone} />
        {dia.perto && <strong>{dia.perto}</strong>}
        <span>
          {dia.perto && '· '}
          {dia.data}
        </span>
        <span className={classes.faixaDireita}>
          <SeloSituacao cor="azul">Agendado</SeloSituacao>
        </span>
      </p>

      <div className={classes.agenda}>
        <p className={classes.hora}>{formatarHora(agendamento.hora)}</p>
        <IconeServico nome={servico?.icone ?? 'event'} />
        <div className={classes.texto}>
          <h3 className={classes.titulo} id={idTitulo}>
            {solicitacao.nomeServico}
          </h3>
          {solicitacao.resumo && <p className={classes.descricao}>{solicitacao.resumo}</p>}
          {local && (
            <p className={classes.onde}>
              <Icone nome="location_on" tamanho={18} />
              {local.nome}
            </p>
          )}
        </div>
      </div>

      <div className={classes.pe}>
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
        <Botao
          variante="principal"
          compacto
          icone="arrow_forward"
          iconeDireita
          para={`/servicos/minhas-solicitacoes/${solicitacao.id}`}
        >
          Ver agendamento
        </Botao>
      </div>
    </article>
  );
}
