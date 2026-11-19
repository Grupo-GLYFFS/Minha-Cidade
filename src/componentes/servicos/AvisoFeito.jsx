import Botao from '../Botao';
import Icone from '../Icone';
import classes from './AvisoFeito.module.css';

// Faixa verde que confirma uma ação na própria página (ex.: "Remarcado para…"),
// no lugar do alert(). O leitor de tela ouve o texto assim que ele aparece.
// Recebe o texto (sem texto, nada aparece) e aoFechar().
export default function AvisoFeito({ texto, aoFechar }) {
  return (
    <div className={classes.lugar} role="status">
      {texto && (
        <div className={classes.aviso}>
          <Icone nome="check_circle" className={classes.icone} />
          <p className={classes.texto}>{texto}</p>
          <Botao variante="fechar" aria-label="Fechar aviso" onClick={aoFechar} />
        </div>
      )}
    </div>
  );
}
