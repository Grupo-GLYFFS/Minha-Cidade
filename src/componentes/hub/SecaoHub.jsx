import { useId } from 'react';
import classes from './Hub.module.css';

// Seção de um hub: título h2 de 24/700 à esquerda, fora dos cards, e o conteúdo embaixo.
// Seções seguidas ficam a 96 px uma da outra (48 no celular).
// Recebe o titulo e o conteúdo. Se o conteúdo for uma função, ela recebe o id do título
// (para a lista usar aria-labelledby).
export default function SecaoHub({ titulo, children }) {
  const idTitulo = useId();

  return (
    <section className={classes.secao} aria-labelledby={idTitulo}>
      <h2 className={classes.tituloSecao} id={idTitulo}>
        {titulo}
      </h2>
      {typeof children === 'function' ? children(idTitulo) : children}
    </section>
  );
}
