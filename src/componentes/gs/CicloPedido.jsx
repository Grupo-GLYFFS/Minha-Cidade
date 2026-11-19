import SecaoCard from '../SecaoCard';
import SeloSituacao from '../SeloSituacao';
import AnelCiclo from './AnelCiclo';
import { CICLO_PEDIDO } from '../../dados/cicloPedido';
import { formatarNumero } from '../../logica/formatos';
import classes from './CicloPedido.module.css';

// Card "O ciclo do pedido" de Como funciona: o anel com os números à esquerda e a lista
// numerada das 5 etapas à direita, cada uma com o selo da situação.
// Recebe o total de apoios dos pedidos (aparece no selo de "Apoiar").
export default function CicloPedido({ apoios }) {
  return (
    <SecaoCard titulo="O ciclo do pedido">
      <div className={classes.grade}>
        <div className={classes.anel}>
          <AnelCiclo etapas={CICLO_PEDIDO.length} />
        </div>
        <ol className={classes.lista}>
          {CICLO_PEDIDO.map((etapa, indice) => (
            <li key={etapa.titulo} className={classes.etapa}>
              <span className={classes.numero} aria-hidden="true">
                {indice + 1}
              </span>
              <div>
                <h3 className={classes.titulo}>
                  {etapa.titulo}
                  <SeloSituacao cor={etapa.cor}>
                    {etapa.selo ?? `${formatarNumero(apoios)} apoios`}
                  </SeloSituacao>
                </h3>
                <p className={classes.texto}>{etapa.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SecaoCard>
  );
}
