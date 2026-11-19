import { Link } from 'react-router-dom';
import Icone from '../Icone';
import { PAGINAS_GLOBAL_SOLUTION } from '../../dados/paginasGlobalSolution';
import classes from './PassosGs.module.css';

// Passos entre as 4 páginas da Global Solution, no mesmo desenho das etapas do formulário,
// com o ícone de cada página no lugar do número. Cada passo é um link.
// Recebe:
// - atual: id da página aberta (fica marcada e leva aria-current="page");
// - azul: versão sobre o fundo azul (banner do fim da página);
// - semNav: não põe o <nav> em volta (quando quem usa já é um <nav>).
// Os passos antes do atual aparecem como feitos.
export default function PassosGs({ atual, azul = false, semNav = false }) {
  const posicaoAtual = PAGINAS_GLOBAL_SOLUTION.findIndex((pagina) => pagina.id === atual);

  const lista = (
    <ol
      className={`${classes.passos} ${azul ? classes.azul : ''}`}
      aria-label={semNav ? 'Páginas da Global Solution' : undefined}
    >
      {PAGINAS_GLOBAL_SOLUTION.map((pagina, indice) => {
        const ehAtual = indice === posicaoAtual;
        const feita = indice < posicaoAtual;
        const classesPasso = [classes.passo];
        if (feita) classesPasso.push(classes.feito);
        if (ehAtual) classesPasso.push(classes.atual);

        return (
          <li key={pagina.id} className={classesPasso.join(' ')}>
            <Link
              to={pagina.caminho}
              className={classes.link}
              aria-current={ehAtual ? 'page' : undefined}
            >
              <span className={classes.bolinha} aria-hidden="true">
                <Icone nome={pagina.icone} tamanho={20} />
              </span>
              {pagina.rotulo}
              {feita && <span className={classes.oculto}> (vista)</span>}
            </Link>
          </li>
        );
      })}
    </ol>
  );

  if (semNav) return lista;
  return <nav aria-label="Páginas da Global Solution">{lista}</nav>;
}
