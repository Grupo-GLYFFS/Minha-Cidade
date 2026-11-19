import classes from './Hub.module.css';

// Esqueleto de cards enquanto um bloco do hub carrega (ícone, nome e meta cinzas).
// O leitor de tela ouve só o texto. Recebe o texto e quantos cards mostrar (padrão 6).
export default function EsqueletoCards({ texto, itens = 6 }) {
  const lista = Array.from({ length: itens }, (_, indice) => indice);

  return (
    <div aria-busy="true">
      <p className={classes.oculto} role="status">
        {texto}
      </p>
      <ul className={`${classes.grade} ${classes.gradeDupla}`} aria-hidden="true">
        {lista.map((indice) => (
          <li key={indice} className={classes.esqueleto}>
            <span className={`${classes.sk} ${classes.skIcone}`} />
            <span className={`${classes.sk} ${classes.skNome}`} />
            <span className={`${classes.sk} ${classes.skMeta}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
