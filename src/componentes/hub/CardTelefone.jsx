import Icone from '../Icone';
import classes from './Hub.module.css';

// Card do telefone do hub (o 156 na cidade, o da subprefeitura na subprefeitura).
// O card inteiro liga para o número. Recebe { numero, link, titulo, texto }.
export default function CardTelefone({ numero, link, titulo, texto }) {
  const classeNumero = [classes.telefoneNumero];
  if (numero.length > 4) classeNumero.push(classes.telefoneNumeroLongo);

  return (
    <a href={link} className={classes.telefone} aria-label={`Ligar para ${titulo}, ${numero}`}>
      <span className={classeNumero.join(' ')}>{numero}</span>
      <span className={classes.telefoneTexto}>
        {titulo}
        {texto && <span className={classes.telefoneDetalhe}>{texto}</span>}
      </span>
      <span className={classes.telefoneIcone}>
        <Icone nome="call" tamanho={20} />
      </span>
    </a>
  );
}
