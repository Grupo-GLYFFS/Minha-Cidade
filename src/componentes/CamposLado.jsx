import classes from './CamposLado.module.css';

// Dois campos na mesma linha, sempre com a mesma largura (ex.: CEP e número).
// No celular, um embaixo do outro. Recebe os campos (children).
export default function CamposLado({ children }) {
  return <div className={classes.lado}>{children}</div>;
}
