import { Link } from 'react-router-dom';
import Icone from './Icone';
import classes from './FaixaAlerta.module.css';

// Faixa amarela logo abaixo do topo com o alerta da Defesa Civil.
// Recebe o título em negrito ("Alerta da Defesa Civil"), o texto, o caminho do link
// e o texto do link ("Ver orientações").
// Usa role="status" para o leitor de tela anunciar sem interromper a pessoa.
export default function FaixaAlerta({ titulo, texto, para, rotuloLink = 'Ver orientações' }) {
  return (
    <div className={classes.faixa} role="status">
      <div className={classes.miolo}>
        <Icone nome="warning" preenchido />
        <p className={classes.texto}>
          <strong>{titulo}:</strong> {texto}
        </p>
        {para && (
          <Link to={para} className={classes.link}>
            {rotuloLink}
          </Link>
        )}
      </div>
    </div>
  );
}
