import { Link } from 'react-router-dom';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import classes from './CardsInicio.module.css';

// Card de algo que a pessoa segue (obra, pedido ou votação); o card inteiro é o link.
// Linha "ícone + tipo · lugar + selo", título e a meta; a obra ganha a barra do quanto já foi feito.
// Recebe o item de itensSeguidos() (logica/inicio.js).
export default function CardSeguido({ item }) {
  return (
    <Link to={item.caminho} className={`${classes.card} ${classes.cardLink}`}>
      <span className={classes.texto}>
        <span className={classes.topo}>
          <Icone nome={item.icone} tamanho={18} className={classes.icone} />
          <strong>{item.tipo}</strong>· {item.lugar}
          {item.selo && <SeloSituacao cor={item.selo.cor}>{item.selo.rotulo}</SeloSituacao>}
        </span>
        <h3 className={classes.titulo}>{item.titulo}</h3>
        <span className={classes.meta}>
          {item.meta.destaque && <strong>{item.meta.destaque}</strong>}
          {item.meta.texto}
        </span>
        {item.percentual !== undefined && (
          <progress
            className={classes.barra}
            value={item.percentual}
            max={100}
            aria-label="Quanto da obra já foi feito"
          />
        )}
      </span>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
