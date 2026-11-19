import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './Hub.module.css';

// Card de um lugar: nome, selo opcional ("Sua", "Seu") e uma linha cinza
// (os bairros da subprefeitura, por exemplo), com a seta no canto.
// Recebe:
// - nome, selo e linha;
// - para (rota) ou aoClicar (vira botão, como o "Ver todas" que abre o popup);
// - sua: pinta o card de azul-claro (o lugar da pessoa);
// - rotulo: aria-label do botão (opcional).
export default function CardLugar({ nome, selo, linha, para, aoClicar, sua = false, rotulo }) {
  const lista = [classes.card, classes.lugar];
  if (sua) lista.push(classes.sua);

  const conteudo = (
    <>
      <span className={classes.lugarNome}>
        <span className={classes.lugarNomeTexto}>{nome}</span>
        {selo && <span className={classes.selo}>{selo}</span>}
      </span>
      {linha && <small className={classes.lugarLinha}>{linha}</small>}
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </>
  );

  if (para) {
    return (
      <Link to={para} className={lista.join(' ')}>
        {conteudo}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={lista.join(' ')}
      onClick={aoClicar}
      aria-label={rotulo}
      aria-haspopup="dialog"
    >
      {conteudo}
    </button>
  );
}
