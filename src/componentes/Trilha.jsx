import { Link } from 'react-router-dom';
import Icone from './Icone';
import classes from './Trilha.module.css';

// Trilha de navegação ("Você está em"): Cidade de São Paulo › Obras › Nome da obra.
// Recebe a lista de níveis [{ rotulo, para }]. O último nível é a página atual: vira texto
// (sem link), leva aria-current="page" e corta com reticências se for longo.
export default function Trilha({ itens }) {
  return (
    <nav className={classes.trilha} aria-label="Você está em">
      <ol className={classes.lista}>
        {itens.map((item, indice) => {
          const ultimo = indice === itens.length - 1;
          if (ultimo) {
            return (
              <li
                key={item.rotulo}
                className={classes.atual}
                aria-current="page"
                title={item.rotulo}
              >
                {item.rotulo}
              </li>
            );
          }
          return (
            <li key={item.rotulo} className={classes.nivel}>
              <Link to={item.para} className={classes.link}>
                {item.rotulo}
              </Link>
              <Icone nome="chevron_right" tamanho={20} className={classes.seta} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
