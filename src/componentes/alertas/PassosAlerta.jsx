import classes from './Alertas.module.css';

// Lista numerada de "O que fazer" de um alerta. Recebe os passos (textos) e o id da lista.
export default function PassosAlerta({ passos, id }) {
  return (
    <ol className={classes.passos} id={id}>
      {passos.map((passo, indice) => (
        <li key={passo}>
          <span className={classes.numeroPasso} aria-hidden="true">
            {indice + 1}
          </span>
          {passo}
        </li>
      ))}
    </ol>
  );
}
