import classes from './PassosNumerados.module.css';

// Lista de passos numerados ("Como fazer", "O que acontece agora"), com o número
// num círculo azul-claro e uma linha fina ligando os passos.
// Recebe os passos (lista de frases).
export default function PassosNumerados({ passos }) {
  return (
    <ol className={classes.passos}>
      {passos.map((passo, indice) => (
        <li key={passo} className={classes.passo}>
          <span className={classes.numero} aria-hidden="true">
            {indice + 1}
          </span>
          <p className={classes.texto}>{passo}</p>
        </li>
      ))}
    </ol>
  );
}
