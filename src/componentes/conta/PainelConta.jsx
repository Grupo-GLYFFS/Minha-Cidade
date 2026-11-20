import Logo from '../Logo';
import classes from './PainelConta.module.css';

// Painel azul estreito à esquerda das páginas de conta (prancha AC3-V3): logo branco no alto
// e uma frase curta no pé. Só aparece no computador; no celular a moldura mostra só o logo.
// Recebe a frase do painel.
export default function PainelConta({ frase }) {
  return (
    <aside className={classes.painel} aria-label="Sobre a conta">
      <Logo sobreAzul className={classes.marca} />
      {frase && <p className={classes.frase}>{frase}</p>}
    </aside>
  );
}
