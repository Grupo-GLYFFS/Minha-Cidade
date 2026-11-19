import classes from './ListaAjustes.module.css';

// Lista de LinhaAjuste dentro de um <SecaoCard lista> ou de um popup.
// "noPopup": no corpo do popup, a lista ganha borda de cima e de baixo, de borda a borda.
// Recebe as linhas (children).
export default function ListaAjustes({ children, noPopup = false }) {
  return (
    <ul className={noPopup ? `${classes.lista} ${classes.popup}` : classes.lista}>{children}</ul>
  );
}
