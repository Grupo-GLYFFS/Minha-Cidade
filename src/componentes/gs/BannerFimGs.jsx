import { useId } from 'react';
import Botao from '../Botao';
import PassosGs from './PassosGs';
import { FIM_GLOBAL_SOLUTION, PAGINAS_GLOBAL_SOLUTION } from '../../dados/paginasGlobalSolution';
import classes from './BannerFimGs.module.css';

// Banner azul do fim das páginas 2 a 4 da Global Solution: os passos em cima e, embaixo,
// o título "Próxima: …" com uma linha e os botões Anterior (contorno) e Próxima (branco).
// Recebe o id da página aberta; título, linha e destinos vêm de dados/paginasGlobalSolution.js.
// Na última página, "Próxima" leva ao Início do app.
export default function BannerFimGs({ atual }) {
  const idTitulo = useId();
  const posicao = PAGINAS_GLOBAL_SOLUTION.findIndex((pagina) => pagina.id === atual);
  const pagina = PAGINAS_GLOBAL_SOLUTION[posicao];
  const anterior = PAGINAS_GLOBAL_SOLUTION[posicao - 1];
  const proxima = PAGINAS_GLOBAL_SOLUTION[posicao + 1] ?? FIM_GLOBAL_SOLUTION;

  return (
    <nav className={classes.banner} aria-labelledby={idTitulo}>
      <div className={classes.passos}>
        <PassosGs atual={atual} azul semNav />
      </div>
      <div className={classes.base}>
        <div>
          <h2 className={classes.titulo} id={idTitulo}>
            {pagina.fim.titulo}
          </h2>
          <p className={classes.linha}>{pagina.fim.linha}</p>
        </div>
        <div className={classes.botoes}>
          {anterior && (
            <Botao
              variante="secundario"
              icone="arrow_back"
              para={anterior.caminho}
              className={classes.contorno}
            >
              {anterior.rotulo}
            </Botao>
          )}
          <Botao variante="branco" icone="arrow_forward" iconeDireita para={proxima.caminho}>
            {proxima.rotulo}
          </Botao>
        </div>
      </div>
    </nav>
  );
}
