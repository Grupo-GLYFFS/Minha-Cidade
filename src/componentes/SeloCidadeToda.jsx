import Icone from './Icone';
import classes from './SeloCidadeToda.module.css';

// Selo "Toda a cidade": marca, nas páginas de um bairro ou de uma subprefeitura, os avisos,
// alertas e votações que valem para a cidade inteira (e por isso também para o lugar).
// Pílula branca com borda e ícone azul: discreta e diferente dos selos de situação e de tipo.
export default function SeloCidadeToda() {
  return (
    <span className={classes.selo}>
      <Icone nome="location_city" tamanho={16} />
      Toda a cidade
    </span>
  );
}
