import Icone from '../Icone';
import { NIVEIS_ALERTA } from '../../dados/niveisAlerta';
import classes from './Alertas.module.css';

// Os 3 níveis de alerta em degraus (Atenção, Alerta, Emergência), com o do alerta destacado.
// O nível atual leva aria-current, e o texto diz o nível (a cor não é a única informação).
// Recebe o id do nível atual.
export default function NiveisAlerta({ atual }) {
  return (
    <ol className={classes.niveis} aria-label="Níveis de alerta">
      {NIVEIS_ALERTA.map((nivel) => {
        const ativo = nivel.id === atual;
        const lista = [classes.nivel];
        if (ativo) lista.push(classes.nivelAtivo, classes[nivel.cor]);
        return (
          <li key={nivel.id} className={lista.join(' ')} aria-current={ativo ? 'step' : undefined}>
            <Icone nome={nivel.icone} tamanho={20} preenchido={ativo} />
            {nivel.rotulo}
          </li>
        );
      })}
    </ol>
  );
}
