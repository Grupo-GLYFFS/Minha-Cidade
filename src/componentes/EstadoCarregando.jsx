import classes from './Estados.module.css';

// Estado carregando: esqueleto no formato dos cards, no lugar da lista.
// O leitor de tela ouve só o texto (ex.: "Carregando os pedidos…").
// Recebe o texto e quantos cards falsos mostrar (padrão 3).
export default function EstadoCarregando({ texto = 'Carregando…', itens = 3 }) {
  const lista = Array.from({ length: itens }, (_, indice) => indice);

  return (
    <div aria-busy="true">
      <p className={classes.oculto} role="status">
        {texto}
      </p>
      <ul className={classes.esqueleto} aria-hidden="true">
        {lista.map((indice) => (
          <li key={indice}>
            <span className={`${classes.sk} ${classes.skMini}`} />
            <span className={classes.esqueletoTexto}>
              <span className={`${classes.sk} ${classes.skTitulo}`} />
              <span className={`${classes.sk} ${classes.skMeta}`} />
              <span className={`${classes.sk} ${classes.skCurta}`} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
