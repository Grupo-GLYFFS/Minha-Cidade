import Icone from '../Icone';
import classes from './Hub.module.css';

// Card de um número ("11.451.999 moradores"): ícone azul de 20, valor grande e rótulo.
// Recebe { icone, valor, rotulo }. Vai dentro de um <li> da GradeHub.
export default function CardNumero({ icone, valor, rotulo }) {
  return (
    <div className={classes.numero}>
      <Icone nome={icone} tamanho={20} />
      <strong className={classes.numeroValor}>{valor}</strong>
      <span className={classes.numeroRotulo}>{rotulo}</span>
    </div>
  );
}
