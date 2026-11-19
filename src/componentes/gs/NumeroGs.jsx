import Icone from '../Icone';
import classes from './NumeroGs.module.css';

// Card branco do herói com um ícone, a porcentagem grande (48/800) e a frase que explica o número.
// Recebe o icone (nome do Material Symbols), o numero (sem o %) e o texto.
export default function NumeroGs({ icone, numero, texto }) {
  return (
    <p className={classes.card}>
      <Icone nome={icone} tamanho={24} className={classes.icone} />
      <strong className={classes.numero}>{numero}%</strong>
      <span className={classes.texto}>{texto}</span>
    </p>
  );
}
