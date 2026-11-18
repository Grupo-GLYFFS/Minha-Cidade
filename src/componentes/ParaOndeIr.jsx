import { useId } from 'react';
import { Link } from 'react-router-dom';
import Icone from './Icone';
import classes from './ParaOndeIr.module.css';

// Bloco "Para onde ir" (regra 14): último bloco do conteúdo em listas, hubs e detalhes,
// com 2 a 4 cards que levam a páginas relacionadas. Não entra em formulários nem em Configurações.
// 1 card: largura toda. 2 ou 4: duas colunas. 3: três colunas, com o ícone em cima do nome.
// Recebe os destinos [{ icone, titulo, meta, para }] (meta = uma linha com um número real
// da página, ex.: "3 abertas para votar") e o título (padrão "Para onde ir").
export default function ParaOndeIr({ destinos, titulo = 'Para onde ir' }) {
  const idTitulo = useId();
  const classesGrade = [classes.grade];
  if (destinos.length === 1) classesGrade.push(classes.um);
  if (destinos.length === 3) classesGrade.push(classes.tres);

  return (
    <nav className={classes.bloco} aria-labelledby={idTitulo}>
      <h2 className={classes.titulo} id={idTitulo}>
        {titulo}
      </h2>
      <ul className={classesGrade.join(' ')}>
        {destinos.map((destino) => (
          <li key={destino.para}>
            <Link to={destino.para} className={classes.destino}>
              <span className={classes.icone} aria-hidden="true">
                <Icone nome={destino.icone} />
              </span>
              <span className={classes.texto}>
                <span className={classes.nome}>{destino.titulo}</span>
                {destino.meta && <span className={classes.meta}>{destino.meta}</span>}
              </span>
              <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
