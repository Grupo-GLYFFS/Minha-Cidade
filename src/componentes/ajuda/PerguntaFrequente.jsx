import { useId } from 'react';
import Icone from '../Icone';
import classes from './PerguntaFrequente.module.css';

// Uma pergunta que abre e fecha dentro do card do grupo (página Perguntas frequentes).
// A pergunta é um botão dentro de um h3, com aria-expanded e aria-controls apontando a resposta.
// Recebe pergunta e resposta (textos), aberta (true/false) e aoAlternar() (abre ou fecha).
export default function PerguntaFrequente({ pergunta, resposta, aberta, aoAlternar }) {
  const idResposta = useId();

  return (
    <div className={classes.item}>
      <h3 className={classes.titulo}>
        <button
          type="button"
          className={classes.pergunta}
          aria-expanded={aberta}
          aria-controls={idResposta}
          onClick={aoAlternar}
        >
          <span className={classes.texto}>{pergunta}</span>
          <Icone nome={aberta ? 'expand_less' : 'expand_more'} tamanho={24} />
        </button>
      </h3>
      <div id={idResposta} className={classes.resposta} hidden={!aberta}>
        <p>{resposta}</p>
      </div>
    </div>
  );
}
