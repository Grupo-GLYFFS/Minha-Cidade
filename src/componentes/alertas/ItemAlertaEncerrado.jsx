import { Link } from 'react-router-dom';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import { buscarNivel } from '../../logica/alertas';
import classes from './Alertas.module.css';

// Card de um alerta encerrado na lista: ícone cinza, órgão e período, título (o link),
// selos "Encerrado" + nível e onde foi. O card inteiro abre o detalhe.
// Recebe o alerta, o caminho do detalhe e o texto de onde foi.
export default function ItemAlertaEncerrado({ alerta, caminho, onde }) {
  const nivel = buscarNivel(alerta.nivel);

  return (
    <div className={classes.item}>
      <span className={classes.miniatura}>
        <Icone nome={alerta.icone} tamanho={32} />
      </span>
      <div className={classes.itemTexto}>
        <p className={classes.itemMeta}>
          {alerta.orgao}
          <span className={classes.ponto} aria-hidden="true">
            ·
          </span>
          {alerta.periodo}
        </p>
        <h3 className={classes.itemTitulo}>
          <Link to={caminho}>{alerta.manchete}</Link>
        </h3>
        <div className={classes.itemRodape}>
          <SeloSituacao cor="cinza">Encerrado</SeloSituacao>
          <SeloSituacao cor={nivel.cor}>{nivel.rotulo}</SeloSituacao>
          <p className={classes.onde}>
            <Icone nome="location_on" tamanho={18} />
            {onde}
          </p>
        </div>
      </div>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </div>
  );
}
