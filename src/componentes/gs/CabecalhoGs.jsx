import CabecalhoPagina from '../CabecalhoPagina';
import PassosGs from './PassosGs';
import { PAGINAS_GLOBAL_SOLUTION } from '../../dados/paginasGlobalSolution';
import classes from './CabecalhoGs.module.css';

// Cabeçalho das páginas 2 a 4 da Global Solution (regra 16, sem o ícone de 64):
// trilha "Global Solution › Página", título 48, subtítulo e os passos entre as páginas.
// Recebe o id da página aberta e o subtítulo.
export default function CabecalhoGs({ atual, subtitulo }) {
  const pagina = PAGINAS_GLOBAL_SOLUTION.find((item) => item.id === atual);

  return (
    <CabecalhoPagina
      tipo="lista"
      titulo={pagina.rotulo}
      subtitulo={subtitulo}
      trilha={[{ rotulo: 'Global Solution', para: '/' }, { rotulo: pagina.rotulo }]}
    >
      <div className={classes.passos}>
        <PassosGs atual={atual} />
      </div>
    </CabecalhoPagina>
  );
}
