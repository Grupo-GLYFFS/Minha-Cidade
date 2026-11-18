import classes from './Vitrine.module.css';

// Uma seção da página /componentes: título, o nome do componente e os exemplos.
// Recebe o id (âncora do índice), o titulo, o nome do arquivo (ex.: "Botao.jsx") e os exemplos.
export default function VitrineSecao({ id, titulo, arquivo, children }) {
  return (
    <section className={classes.secao} id={id} aria-labelledby={`${id}-titulo`}>
      <h2 className={classes.titulo} id={`${id}-titulo`}>
        {titulo}
      </h2>
      {arquivo && <p className={classes.arquivo}>{arquivo}</p>}
      <div className={classes.exemplos}>{children}</div>
    </section>
  );
}
