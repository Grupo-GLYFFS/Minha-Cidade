import BarraPercentual from '../obras/BarraPercentual';
import { valorCurto } from '../../logica/orcamento';
import classes from './ResumoPago.module.css';

// Resumo do orçamento no cabeçalho: quanto já foi pago (número grande, à esquerda),
// o previsto (à direita), a barra e, embaixo, o % pago e quanto falta.
// Recebe pago, previsto (em reais) e o rótulo do previsto (ex.: "Previsto para 2026").
export default function ResumoPago({ pago, previsto, rotuloPrevisto = 'Previsto' }) {
  const percentual = Math.round((pago / previsto) * 100);

  return (
    <div className={classes.resumo}>
      <div className={classes.valores}>
        <p>
          <span>Pago até outubro</span>
          <b className={classes.pago}>{valorCurto(pago)}</b>
        </p>
        <p className={classes.direita}>
          <span>{rotuloPrevisto}</span>
          <b className={classes.previsto}>{valorCurto(previsto)}</b>
        </p>
      </div>
      <BarraPercentual percentual={percentual} altura={14} clara />
      <div className={classes.rodape}>
        <span>
          <b>{percentual}%</b> pago
        </span>
        <span>
          faltam <b>{valorCurto(previsto - pago)}</b>
        </span>
      </div>
    </div>
  );
}
