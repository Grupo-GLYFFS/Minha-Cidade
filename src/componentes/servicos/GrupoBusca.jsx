import { useId } from 'react';
import classes from './PopupBusca.module.css';

// Grupo de resultados do popup de busca: título pequeno com a contagem e a lista.
// Recebe o titulo, a contagem (opcional) e os itens já desenhados (children, um por <li>).
export default function GrupoBusca({ titulo, contagem, children }) {
  const idTitulo = useId();
  return (
    <section className={classes.grupo} aria-labelledby={idTitulo}>
      <h3 className={classes.tituloGrupo} id={idTitulo}>
        {titulo}
        {contagem !== undefined && <span className={classes.contagem}>{contagem}</span>}
      </h3>
      <ul className={classes.lista}>{children}</ul>
    </section>
  );
}
