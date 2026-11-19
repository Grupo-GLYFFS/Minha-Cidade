import { Link } from 'react-router-dom';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import IconeServico from '../servicos/IconeServico';
import BarraEtapas from './BarraEtapas';
import classes from './CardsInicio.module.css';

// Card de algo em andamento (pedido ou solicitação): em cima, o link com ícone, "categoria +
// selo", título, a linha de meta e a seta; embaixo, a barra de etapas.
// Recebe o caminho do detalhe, o ícone, a categoria, o selo { cor, rotulo }, o título,
// a meta (children) e as etapas da barra.
export default function CardAndamento({ caminho, icone, categoria, selo, titulo, etapas, children }) {
  return (
    <article className={classes.card}>
      <Link to={caminho} className={classes.link}>
        <IconeServico nome={icone} />
        <span className={classes.texto}>
          <span className={classes.topo}>
            {categoria}
            {selo && <SeloSituacao cor={selo.cor}>{selo.rotulo}</SeloSituacao>}
          </span>
          <h3 className={classes.titulo}>{titulo}</h3>
          <span className={classes.meta}>{children}</span>
        </span>
        <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
      </Link>
      <BarraEtapas etapas={etapas} />
    </article>
  );
}
