import classes from './Vitrine.module.css';

// Caixa com borda que mostra um componente funcionando, com uma legenda embaixo:
// o nome do componente (em fonte de código), o arquivo e as props usadas no exemplo.
// Recebe nome, arquivo, props (texto opcional), "fundo" ("tela" cinza ou "branco") e children.
export default function Vitrine({ nome, arquivo, props, fundo = 'tela', children }) {
  return (
    <figure className={classes.vitrine}>
      <div className={classes.palco} data-fundo={fundo}>
        {children}
      </div>
      <figcaption className={classes.legenda}>
        <code className={classes.nome}>{nome}</code>
        {arquivo && <span className={classes.arquivo}>{arquivo}</span>}
        {props && <span className={classes.props}>{props}</span>}
      </figcaption>
    </figure>
  );
}
