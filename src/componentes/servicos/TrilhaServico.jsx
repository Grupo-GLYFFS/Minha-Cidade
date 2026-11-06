import { Link } from 'react-router-dom';
import Icone from '../Icone';
import { caminhoCategoria } from '../../logica/servicos';
import classes from './TrilhaServico.module.css';

// Caminho até o serviço ("Serviços › Saúde"), para a pessoa voltar a qualquer nível.
// Recebe a categoria do serviço.
export default function TrilhaServico({ categoria }) {
  return (
    <nav aria-label="Você está em">
      <ol className={classes.trilha}>
        <li className={classes.item}>
          <Link to="/servicos" className={classes.link}>
            Serviços
          </Link>
        </li>
        <li className={classes.item}>
          <Icone nome="chevron_right" tamanho={18} />
          <Link to={caminhoCategoria(categoria)} className={classes.link}>
            {categoria.nome}
          </Link>
        </li>
      </ol>
    </nav>
  );
}
