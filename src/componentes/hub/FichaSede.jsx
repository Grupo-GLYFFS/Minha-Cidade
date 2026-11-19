import Icone from '../Icone';
import classes from './Hub.module.css';

// Card com o endereço e o horário da sede (prefeitura ou subprefeitura), no topo do hub.
// Recebe o endereco e o horario.
export default function FichaSede({ endereco, horario }) {
  return (
    <dl className={classes.ficha}>
      <div className={classes.fichaLinha}>
        <dt>
          <Icone nome="location_on" tamanho={20} />
          Endereço
        </dt>
        <dd>{endereco}</dd>
      </div>
      <div className={classes.fichaLinha}>
        <dt>
          <Icone nome="schedule" tamanho={20} />
          Horário
        </dt>
        <dd>{horario}</dd>
      </div>
    </dl>
  );
}
