import classes from './Hub.module.css';

// Card de quem governa ou cuida: iniciais num círculo, nome e cargo.
// Recebe { iniciais, nome, cargo } e pequeno (secretarias e coordenações).
export default function CardPessoa({ iniciais, nome, cargo, pequeno = false }) {
  const lista = [classes.pessoa];
  if (pequeno) lista.push(classes.pessoaPequena);

  return (
    <div className={lista.join(' ')}>
      <span className={classes.avatar} aria-hidden="true">
        {iniciais}
      </span>
      <div>
        <p className={classes.pessoaNome}>{nome}</p>
        <p className={classes.pessoaCargo}>{cargo}</p>
      </div>
    </div>
  );
}
