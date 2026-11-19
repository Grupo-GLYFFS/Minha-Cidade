import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './EscolherBairro.module.css';

// Card compacto de um bairro na página Escolher bairro: nome, subprefeitura em cinza e a seta.
// Recebe o nome, a subprefeitura (nome sem "Subprefeitura"), para (rota de destino)
// e aoEscolher (guarda a escolha antes de ir para o destino).
export default function CardEscolherBairro({ nome, subprefeitura, para, aoEscolher }) {
  return (
    <Link to={para} className={classes.card} onClick={aoEscolher}>
      <span className={classes.nome}>{nome}</span>
      <small className={classes.sub}>Subprefeitura {subprefeitura}</small>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
