import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './Hub.module.css';

// Card "Quem cuida" de um bairro: a subprefeitura responsável, que leva à página dela.
// Recebe a subprefeitura ({ id, nome, subprefeito }).
export default function CardQuemCuida({ subprefeitura }) {
  const chefe = subprefeitura.subprefeito;

  return (
    <Link
      to={`/minha-cidade/subprefeituras/${subprefeitura.id}`}
      className={`${classes.card} ${classes.quemCuida}`}
    >
      <span className={classes.iconeCaixa}>
        <Icone nome="account_balance" />
      </span>
      <span className={classes.quemCuidaTexto}>
        <b>Subprefeitura {subprefeitura.nome}</b>
        {chefe && (
          <span>
            {chefe.cargo} {chefe.nome}
          </span>
        )}
      </span>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
