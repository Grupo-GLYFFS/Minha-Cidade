import CabecalhoPagina from '../componentes/CabecalhoPagina';
import BarraModos from '../componentes/vitrine/BarraModos';
import IndiceVitrine from '../componentes/vitrine/IndiceVitrine';
import SecaoPrincipios from '../componentes/vitrine/secoes/SecaoPrincipios';
import SecaoCores from '../componentes/vitrine/secoes/SecaoCores';
import SecaoTipografia from '../componentes/vitrine/secoes/SecaoTipografia';
import SecaoEspacamento from '../componentes/vitrine/secoes/SecaoEspacamento';
import SecaoIcones from '../componentes/vitrine/secoes/SecaoIcones';
import SecaoBase from '../componentes/vitrine/secoes/SecaoBase';
import SecaoApp from '../componentes/vitrine/secoes/SecaoApp';
import SecaoTextos from '../componentes/vitrine/secoes/SecaoTextos';
import classes from './Componentes.module.css';

// Página de desenvolvimento /componentes: o design system do app ao vivo.
// Mostra os tokens (cores, letras, espaços, raios, ícones), as regras e todos os componentes
// reutilizáveis com seus estados. A barra de modos troca letra, contraste e animações do app,
// para conferir tudo em cada modo. Nada aqui muda os dados do app.
export default function Componentes() {
  return (
    <div className={classes.pagina}>
      <CabecalhoPagina
        titulo="Componentes"
        descricao="Tokens, regras e componentes do design system do Minha Prefeitura. Página de desenvolvimento."
      />
      <BarraModos />

      <div className={classes.grade}>
        <div>
          <IndiceVitrine />
        </div>
        <div className={classes.conteudo}>
          <SecaoPrincipios />
          <SecaoCores />
          <SecaoTipografia />
          <SecaoEspacamento />
          <SecaoIcones />
          <SecaoBase />
          <SecaoApp />
          <SecaoTextos />
        </div>
      </div>
    </div>
  );
}
