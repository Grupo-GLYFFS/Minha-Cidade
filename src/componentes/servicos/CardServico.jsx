import { Link } from 'react-router-dom';
import Icone from '../Icone';
import IconeServico from './IconeServico';
import { caminhoCardServico, nomeSubcategoria } from '../../logica/servicos';
import classes from './CardServico.module.css';

// Card de um serviço no catálogo e nos relacionados: ícone, nome, a parte do assunto
// e a seta. O card inteiro é o link (para a ficha ou direto para a tela do app).
// Recebe o serviço.
export default function CardServico({ servico }) {
  return (
    <Link to={caminhoCardServico(servico)} className={classes.card}>
      <IconeServico nome={servico.icone} />
      <span className={classes.texto}>
        <span className={classes.nome}>{servico.nome}</span>
        <span className={classes.meta}>{nomeSubcategoria(servico)}</span>
      </span>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
