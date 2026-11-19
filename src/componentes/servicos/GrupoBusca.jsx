import { useId } from 'react';
import classes from './PopupBusca.module.css';

// Grupo de resultados do popup de busca: título pequeno com a contagem e a lista.
// Recebe o titulo, a contagem (opcional), os itens já desenhados (children, um por <li>) e a
// variante da lista: 'linhas' (com divisória de borda a borda), 'cartoes' ou 'chips'.
const VARIANTES = { linhas: 'listaLinhas', cartoes: 'listaCartoes', chips: 'listaChips' };

export default function GrupoBusca({ titulo, contagem, variante = 'linhas', children }) {
  const idTitulo = useId();
  return (
    <section className={classes.grupo} aria-labelledby={idTitulo}>
      <h3 className={classes.tituloGrupo} id={idTitulo}>
        {titulo}
        {contagem !== undefined && <span className={classes.contagem}>{contagem}</span>}
      </h3>
      <ul className={`${classes.lista} ${classes[VARIANTES[variante]]}`}>{children}</ul>
    </section>
  );
}
