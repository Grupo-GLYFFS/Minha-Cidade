import classes from './TextoCard.module.css';

// Texto corrido dentro de um card de seção (página Privacidade).
// Recebe os parágrafos (children) e "antesDaLista": dentro de um <SecaoCard lista>,
// o texto ganha o respiro do card e uma linha de borda a borda embaixo, antes das linhas.
export default function TextoCard({ children, antesDaLista = false }) {
  return (
    <div className={antesDaLista ? `${classes.texto} ${classes.antesDaLista}` : classes.texto}>
      {children}
    </div>
  );
}
