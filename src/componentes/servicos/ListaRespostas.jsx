import classes from './ListaRespostas.module.css';

// Lista "rótulo … valor" do que a pessoa enviou (revisão, confirmação e detalhe),
// com divisórias de borda a borda do card. Recebe os itens [{ rotulo, valor }].
export default function ListaRespostas({ itens }) {
  return (
    <dl className={classes.lista}>
      {itens.map((item) => (
        <div key={item.rotulo} className={classes.linha}>
          <dt className={classes.rotulo}>{item.rotulo}</dt>
          <dd className={classes.valor}>{item.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
