import { Link } from 'react-router-dom';
import Icone from '../Icone';
import IconeServico from '../servicos/IconeServico';
import { buscarServico } from '../../logica/servicos';
import { textoHorario } from '../../logica/solicitacoes';
import { formatarDiaMes } from '../../logica/datasExtenso';
import { dataListaComDia } from '../../logica/datasTexto';
import classes from './CardsInicio.module.css';

// Card com os serviços agendados depois do próximo, um por linha: data ("17 nov" e o dia da
// semana embaixo), ícone, serviço, "hora · local" e a seta. Cada linha leva ao agendamento.
// Recebe as solicitações agendadas, já em ordem.
export default function ListaAgendamentos({ solicitacoes }) {
  return (
    <div className={classes.card}>
      <ul className={classes.linhas}>
        {solicitacoes.map((solicitacao) => {
          const { agendamento, local } = solicitacao;
          const servico = buscarServico(solicitacao.idServico);
          // "terça, 17 nov" → o dia da semana fica embaixo da data
          const diaSemana = dataListaComDia(agendamento.data).split(',')[0];
          return (
            <li key={solicitacao.id}>
              <Link
                to={`/servicos/minhas-solicitacoes/${solicitacao.id}`}
                className={classes.linha}
              >
                <span className={classes.data}>
                  {formatarDiaMes(agendamento.data)}
                  <small>{diaSemana}</small>
                </span>
                <IconeServico nome={servico?.icone ?? 'event'} />
                <span className={classes.texto}>
                  <span className={classes.linhaTitulo}>{solicitacao.nomeServico}</span>
                  <span className={classes.meta}>
                    {textoHorario(agendamento)}
                    {local && ` · ${local.nome}`}
                  </span>
                </span>
                <Icone nome="chevron_right" tamanho={22} className={classes.seta} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
