import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './Hub.module.css';

// Card de "O que acontece" (Alertas, Avisos, Pedidos, Obras, Votações, Orçamento):
// ícone numa caixa azul-clara, nome, o número vivo embaixo e a seta no canto.
// Recebe { icone, nome, meta, para, alerta }; com alerta, o card fica amarelo como a faixa.
export default function CardAcontece({ icone, nome, meta, para, alerta = false }) {
  const lista = [classes.card, classes.acontece];
  if (alerta) lista.push(classes.aconteceAlerta);

  return (
    <Link to={para} className={lista.join(' ')}>
      <span className={classes.iconeCaixa}>
        <Icone nome={icone} />
      </span>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
      <span className={classes.aconteceNome}>{nome}</span>
      {meta && <span className={classes.aconteceMeta}>{meta}</span>}
    </Link>
  );
}
