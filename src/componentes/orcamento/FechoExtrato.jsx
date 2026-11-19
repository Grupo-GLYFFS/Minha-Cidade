import classes from './FechoExtrato.module.css';

// Fecho do extrato: "Pago até outubro" em número grande à esquerda e o % do previsto à direita.
// Recebe o valor pago já escrito (ex.: "R$ 90,25 bi") e o percentual.
export default function FechoExtrato({ pago, percentual }) {
  return (
    <div className={classes.fecho}>
      <p>
        <span>Pago até outubro</span>
        <b>{pago}</b>
      </p>
      <p className={classes.direita}>
        <span>do previsto</span>
        <b>{percentual}%</b>
      </p>
    </div>
  );
}
