import { Link } from 'react-router-dom';
import Icone from '../Icone';
import { dataCurta } from '../../logica/avisos';
import classes from './CardsInicio.module.css';

// Card de um aviso no Início (o card inteiro é o link): miniatura à esquerda (a ilustração
// do aviso ou, sem ela, o ícone do assunto), "órgão · data", título e "Até … · onde vale".
// Recebe o aviso de avisosDoInicio() (com caminho e onde).
export default function CardAvisoInicio({ aviso }) {
  return (
    <Link to={aviso.caminho} className={`${classes.card} ${classes.cardLink}`}>
      <span className={classes.miniatura} aria-hidden="true">
        {aviso.imagem ? (
          <img src={aviso.imagem} alt="" />
        ) : (
          <Icone nome={aviso.assunto?.icone ?? 'campaign'} tamanho={32} />
        )}
      </span>
      <span className={classes.texto}>
        <span className={classes.topo}>
          <Icone nome={aviso.orgao.icone} tamanho={18} className={classes.icone} />
          {aviso.orgao.nome} · {dataCurta(aviso.data)}
        </span>
        <h3 className={classes.titulo}>{aviso.titulo}</h3>
        <span className={classes.meta}>
          Até {dataCurta(aviso.validoAte)} · {aviso.onde}
        </span>
      </span>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
