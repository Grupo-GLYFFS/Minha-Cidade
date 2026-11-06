import Cartao from '../Cartao';
import Icone from '../Icone';
import { formatarNumero, formatarValorCurto } from '../../logica/formatos';
import { resumirObras } from '../../logica/obras';
import classes from './ResumoObras.module.css';

// Resumo das obras da lista: valor total e quanto já foi pago, quantas estão em andamento
// e quantas estão atrasadas ou paradas. Recebe a lista de obras (já filtrada).
export default function ResumoObras({ obras }) {
  const resumo = resumirObras(obras);

  return (
    <Cartao>
      <dl className={classes.resumo}>
        <div className={classes.item}>
          <dt>
            <Icone nome="payments" tamanho={18} />
            Total investido
          </dt>
          <dd>
            {formatarValorCurto(resumo.valorTotal)}
            <span className={classes.detalhe}>{formatarValorCurto(resumo.valorPago)} já pagos</span>
          </dd>
        </div>
        <div className={classes.item}>
          <dt>
            <Icone nome="construction" tamanho={18} />
            Em andamento
          </dt>
          <dd>{formatarNumero(resumo.emAndamento)}</dd>
        </div>
        <div className={classes.item}>
          <dt>
            <Icone nome="warning" tamanho={18} />
            Atrasadas ou paradas
          </dt>
          <dd>{formatarNumero(resumo.comProblema)}</dd>
        </div>
      </dl>
    </Cartao>
  );
}
