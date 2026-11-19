import Icone from '../Icone';
import MiniBarra from './MiniBarra';
import classes from './CardIndicador.module.css';

// Card de um indicador da página Impacto: faixa do título (ícone + nome) separada por linha e,
// embaixo, o número grande, o detalhe e, quando houver, a minibarra.
// Recebe o indicador { icone, titulo, numero, detalhe, barra } (ver logica/impacto.js).
export default function CardIndicador({ indicador }) {
  return (
    <li className={classes.card}>
      <h2 className={classes.titulo}>
        <Icone nome={indicador.icone} tamanho={20} className={classes.icone} />
        {indicador.titulo}
      </h2>
      <div className={classes.corpo}>
        <p className={classes.numero}>{indicador.numero}</p>
        <p className={classes.detalhe}>{indicador.detalhe}</p>
        {indicador.barra && <MiniBarra segmentos={indicador.barra} />}
      </div>
    </li>
  );
}
