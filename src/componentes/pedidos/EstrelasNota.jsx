import Icone from '../Icone';
import classes from './SecaoAvaliacao.module.css';

const NOTAS = [1, 2, 3, 4, 5];

// Estrelas da nota de 1 a 5.
// Com aoEscolher: cinco radios (setas do teclado mudam a nota), cada estrela é o rótulo de um.
// Sem aoEscolher: só mostra a nota ("Nota 4 de 5" para o leitor de tela).
// Recebe nota (0 = nenhuma), nome (do grupo de radios) e aoEscolher(valor).
export default function EstrelasNota({ nota, nome, aoEscolher }) {
  if (!aoEscolher) {
    return (
      <p className={classes.estrelasLeitura}>
        <span className={classes.estrelas} aria-hidden="true">
          {NOTAS.map((valor) => (
            <Icone
              key={valor}
              nome="star"
              tamanho={28}
              preenchido={valor <= nota}
              className={valor <= nota ? classes.cheia : classes.vazia}
            />
          ))}
        </span>
        <span>
          Nota <b>{nota}</b> de 5
        </span>
      </p>
    );
  }

  return (
    <div className={classes.estrelas}>
      {NOTAS.map((valor) => (
        <label key={valor} className={classes.estrela} htmlFor={`${nome}-${valor}`}>
          <input
            type="radio"
            id={`${nome}-${valor}`}
            name={nome}
            value={valor}
            checked={nota === valor}
            onChange={() => aoEscolher(valor)}
            className={classes.radio}
          />
          <Icone
            nome="star"
            tamanho={32}
            preenchido={valor <= nota}
            className={valor <= nota ? classes.cheia : classes.vazia}
          />
          <span className={classes.oculto}>{valor === 1 ? '1 estrela' : `${valor} estrelas`}</span>
        </label>
      ))}
      {nota > 0 && (
        <span className={classes.notaEscolhida} aria-hidden="true">
          {nota} de 5
        </span>
      )}
    </div>
  );
}
