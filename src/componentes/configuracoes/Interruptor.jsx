import classes from './Interruptor.module.css';

// Interruptor de liga e desliga (role="switch"): trilho de 48 × 28 numa área de toque de 60 × 44.
// Recebe ligado (true/false), aoMudar(novoValor) e o nome para o leitor de tela:
// idRotulo (id do texto visível que dá nome a ele) ou rotulo (texto).
export default function Interruptor({ ligado, aoMudar, idRotulo, rotulo }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      aria-labelledby={idRotulo}
      aria-label={idRotulo ? undefined : rotulo}
      className={classes.interruptor}
      onClick={() => aoMudar(!ligado)}
    >
      <span className={classes.trilho} aria-hidden="true">
        <span className={classes.bolinha} />
      </span>
    </button>
  );
}
