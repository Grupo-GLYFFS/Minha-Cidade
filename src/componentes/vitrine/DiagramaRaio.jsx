import classes from './DiagramaRaio.module.css';

// Desenho do raio aninhado feito com caixas de verdade:
// cartão com raio 20 e padding 16 (área do padding listrada) e, dentro, uma caixa com raio 8.
export default function DiagramaRaio() {
  return (
    <div className={classes.diagrama}>
      <p className={classes.rotuloFora}>Cartão · raio 20 · padding 16 (área listrada)</p>
      <div className={classes.fora}>
        <div className={classes.dentro}>
          <span>Caixa de dentro · raio 8</span>
          <span className={classes.conta}>20 − 16 = 4 → mínimo 8</span>
        </div>
      </div>
    </div>
  );
}
