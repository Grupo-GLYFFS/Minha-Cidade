import classes from './NumeroGs.module.css';

// Card branco com uma porcentagem grande (48/800) e a frase que explica o número.
// Recebe o numero (sem o %), o texto e a cor do número: "vermelho" (o problema),
// "azul" (a comparação) ou nada (texto escuro).
export default function NumeroGs({ numero, texto, cor }) {
  return (
    <p className={classes.card}>
      <strong className={`${classes.numero} ${cor ? classes[cor] : ''}`}>{numero}%</strong>
      <span className={classes.texto}>{texto}</span>
    </p>
  );
}
