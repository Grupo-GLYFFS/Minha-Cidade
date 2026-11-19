import Icone from '../Icone';
import classes from './CardIntegrante.module.css';

// Card de um integrante da equipe: faixa azul-clara em cima, avatar sobreposto,
// nome, RM, divisória de borda a borda e o papel no projeto.
// Recebe o integrante { nome, rm, papel } (dados/equipe.js).
export default function CardIntegrante({ integrante }) {
  return (
    <li className={classes.card}>
      <div className={classes.faixa} />
      <span className={classes.avatar} aria-hidden="true">
        <Icone nome="person" tamanho={32} />
      </span>
      <div className={classes.texto}>
        <h3 className={classes.nome}>{integrante.nome}</h3>
        <p className={classes.rm}>RM {integrante.rm}</p>
      </div>
      <p className={classes.papel}>{integrante.papel}</p>
    </li>
  );
}
