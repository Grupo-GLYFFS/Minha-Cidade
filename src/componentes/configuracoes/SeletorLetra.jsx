import { TAMANHOS_LETRA } from '../../dados/tamanhosLetra';
import classes from './SeletorLetra.module.css';

// Escolha do tamanho da letra em botões lado a lado (Pequena, Padrão, Grande, Muito grande).
// Cada botão mostra um "A" do tamanho correspondente; o escolhido fica com aria-pressed.
// Recebe o tamanho atual (id), aoEscolher(id) e o id do rótulo visível do grupo.
export default function SeletorLetra({ atual, aoEscolher, idRotulo }) {
  return (
    <div className={classes.grupo} role="group" aria-labelledby={idRotulo}>
      {TAMANHOS_LETRA.map((tamanho) => (
        <button
          key={tamanho.id}
          type="button"
          className={classes.opcao}
          aria-pressed={tamanho.id === atual}
          onClick={() => aoEscolher(tamanho.id)}
        >
          <span className={`${classes.letra} ${classes[tamanho.id]}`} aria-hidden="true">
            A
          </span>
          {tamanho.rotulo.charAt(0).toUpperCase() + tamanho.rotulo.slice(1)}
        </button>
      ))}
    </div>
  );
}
