import classes from './SeparadorOu.module.css';

// Linha com um texto no meio ("ou", "ou preencha seus dados") entre o gov.br e o formulário.
// Recebe o texto (children).
export default function SeparadorOu({ children = 'ou' }) {
  return <p className={classes.ou}>{children}</p>;
}
