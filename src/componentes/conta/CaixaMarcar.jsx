import Icone from '../Icone';
import classes from './CaixaMarcar.module.css';

// Caixa de seleção com o texto ao lado (ex.: "Manter conectado", aceite dos termos).
// Recebe id, o texto (children, pode ter links), erro (mensagem embaixo) e as props do input
// (ex.: {...register('termos')}).
export default function CaixaMarcar({ id, children, erro, ...props }) {
  const idErro = `${id}-erro`;
  return (
    <div className={erro ? `${classes.caixa} ${classes.comErro}` : classes.caixa}>
      <label className={classes.linha} htmlFor={id}>
        <span className={classes.quadro}>
          <input
            type="checkbox"
            id={id}
            className={classes.input}
            aria-invalid={erro ? true : undefined}
            aria-describedby={erro ? idErro : undefined}
            {...props}
          />
          <Icone nome="check" tamanho={18} className={classes.marca} />
        </span>
        <span>{children}</span>
      </label>
      {erro && (
        <p className={classes.erro} id={idErro}>
          <Icone nome="error" tamanho={20} preenchido />
          {erro}
        </p>
      )}
    </div>
  );
}
