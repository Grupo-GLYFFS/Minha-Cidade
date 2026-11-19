import classes from './NovoPedido.module.css';

// Alturas das 5 barras do medidor de gravidade, da mais baixa para a mais alta
const BARRAS = [1, 2, 3, 4, 5];

// Gravidade estimada pelo app (só leitura): 5 barras cinza, as da gravidade escuras,
// o nome ("Grave"), "4 de 5" e o aviso de que a prefeitura confirma na análise.
// Recebe a gravidade { valor, rotulo }.
export default function GravidadeEstimada({ gravidade }) {
  return (
    <div>
      <p className={classes.gravidade}>
        <span className={classes.barras} aria-hidden="true">
          {BARRAS.map((barra) => (
            <i
              key={barra}
              className={`${classes.barrinha} ${classes[`barrinha${barra}`]} ${
                barra <= gravidade.valor ? classes.barrinhaLigada : ''
              }`}
            />
          ))}
        </span>
        <b>{gravidade.rotulo}</b>
        <span className={classes.gravidadeNota}>{gravidade.valor} de 5</span>
      </p>
      <p className={`${classes.gravidadeAviso} m-2l-cel`}>
        A prefeitura confirma a gravidade na análise.
      </p>
    </div>
  );
}
