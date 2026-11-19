import { VisuallyHidden } from '@mantine/core';
import BarraPercentual from './BarraPercentual';
import { buscarSituacaoObra, percentualPago } from '../../logica/obras';
import { dataDetalhe } from '../../logica/datasTexto';
import { valorCurto } from '../../logica/orcamento';
import classes from './ResumoObra.module.css';

// Card de abertura do detalhe da obra: % feita em número grande, barra na cor da situação,
// início e entrega nas pontas, e embaixo o valor total e quanto já foi pago à empresa.
// A ponta da direita muda com a situação: entrega prevista (com a antiga riscada, se atrasou),
// "Sem data de entrega" (parada) ou "Entregue em" (concluída).
// Recebe a obra.
export default function ResumoObra({ obra }) {
  const situacao = buscarSituacaoObra(obra.situacao);

  // Ponta da direita, conforme a situação
  let fim = (
    <>
      <span className={classes.rotulo}>Entrega prevista</span>
      <b>{dataDetalhe(obra.previsaoFim)}</b>
      {obra.previsaoAnterior && (
        <s className={classes.era}>
          <VisuallyHidden>previsão anterior, </VisuallyHidden>
          era {dataDetalhe(obra.previsaoAnterior)}
        </s>
      )}
    </>
  );
  if (obra.situacao === 'parada') {
    fim = (
      <>
        <span className={classes.rotulo}>Parada desde {dataDetalhe(obra.paradaDesde)}</span>
        <b>Sem data de entrega</b>
      </>
    );
  } else if (obra.situacao === 'concluida') {
    fim = (
      <>
        <span className={classes.rotulo}>Entregue em</span>
        <b>{dataDetalhe(obra.previsaoFim)}</b>
      </>
    );
  }

  return (
    <section className={classes.card} aria-label="Andamento e valores da obra">
      <div className={classes.topo}>
        <p className={classes.numero}>
          <b>{obra.percentual}%</b>
          <span>da obra feita</span>
        </p>
        <BarraPercentual percentual={obra.percentual} cor={situacao.cor} altura={12} />
        <div className={classes.pontas}>
          <p>
            <span className={classes.rotulo}>Começou em</span>
            <b>{dataDetalhe(obra.inicio)}</b>
          </p>
          <p className={classes.fim}>{fim}</p>
        </div>
      </div>
      <dl className={classes.valores}>
        <div>
          <dt>Valor total</dt>
          <dd>{valorCurto(obra.valorTotal)}</dd>
        </div>
        <div>
          <dt>Já pago à empresa</dt>
          <dd>
            {valorCurto(obra.valorPago)} <span>({percentualPago(obra)}%)</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
