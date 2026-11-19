import CardAgendamento from './CardAgendamento';
import { agruparPorDia } from '../../logica/solicitacoes';
import { distanciaEmPalavras, formatarDiaMes } from '../../logica/datasExtenso';
import classes from './DiasAgendados.module.css';

// Agendamentos por dia: a data aparece uma vez, como título acima dos cards daquele dia
// ("14 nov · amanhã"). O primeiro card da lista é o próximo agendamento.
// Recebe as agendadas já em ordem e aoAvisar(texto, link).
export default function DiasAgendados({ agendadas, aoAvisar }) {
  const dias = agruparPorDia(agendadas);
  const primeiro = agendadas[0]?.id;

  return (
    <ul className={classes.dias}>
      {dias.map((dia) => {
        const relativa = distanciaEmPalavras(dia.data);
        return (
          <li key={dia.data} className={classes.dia}>
            <h3 className={classes.data}>
              {formatarDiaMes(dia.data)}
              {relativa && <span className={classes.relativa}>{relativa}</span>}
            </h3>
            <ul className={classes.cards}>
              {dia.itens.map((item) => (
                <li key={item.id}>
                  <CardAgendamento
                    solicitacao={item}
                    proxima={item.id === primeiro}
                    aoAvisar={aoAvisar}
                  />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
