import { useRef } from 'react';
import Icone from '../Icone';
import { TAMANHO_CODIGO } from '../../logica/codigoEmail';
import classes from './CampoCodigo.module.css';

// Campo do código de 6 números, uma caixa por número.
// Digitar passa para a próxima caixa; apagar numa caixa vazia volta para a anterior;
// colar o código inteiro preenche todas.
// Recebe id (da primeira caixa, para o foco), valor (texto com até 6 números),
// aoMudar(novoValor), erro e ajuda (frase embaixo do rótulo).
export default function CampoCodigo({ id, valor, aoMudar, erro, ajuda }) {
  const caixas = useRef([]);
  const numeros = Array.from({ length: TAMANHO_CODIGO }, (_, i) => valor[i] ?? '');
  const idRotulo = `${id}-rotulo`;
  const idAjuda = `${id}-ajuda`;
  const idErro = `${id}-erro`;
  const descricao = [ajuda && idAjuda, erro && idErro].filter(Boolean).join(' ') || undefined;

  // Troca o número de uma caixa e devolve o código novo (sem buracos no meio)
  function trocar(posicao, numero) {
    const lista = [...numeros];
    lista[posicao] = numero;
    aoMudar(lista.join('').slice(0, TAMANHO_CODIGO));
  }

  // Leva o foco para uma caixa (se ela existir)
  function focar(posicao) {
    caixas.current[posicao]?.focus();
    caixas.current[posicao]?.select();
  }

  // Ao digitar: fica só o último número digitado e o foco anda para a próxima caixa
  function aoDigitar(evento, posicao) {
    const digitos = evento.target.value.replace(/\D/g, '');
    if (!digitos) return;
    trocar(posicao, digitos.slice(-1));
    focar(posicao + 1);
  }

  // Apagar e setas: anda entre as caixas
  function aoTeclar(evento, posicao) {
    if (evento.key === 'Backspace') {
      evento.preventDefault();
      if (numeros[posicao]) trocar(posicao, '');
      else if (posicao > 0) {
        trocar(posicao - 1, '');
        focar(posicao - 1);
      }
    } else if (evento.key === 'ArrowLeft') focar(posicao - 1);
    else if (evento.key === 'ArrowRight') focar(posicao + 1);
  }

  // Colar: espalha os números pelas caixas, a partir da primeira
  function aoColar(evento) {
    const digitos = evento.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, TAMANHO_CODIGO);
    if (!digitos) return;
    evento.preventDefault();
    aoMudar(digitos);
    focar(Math.min(digitos.length, TAMANHO_CODIGO - 1));
  }

  return (
    <div
      className={erro ? `${classes.campo} ${classes.comErro}` : classes.campo}
      role="group"
      aria-labelledby={idRotulo}
    >
      <span className={classes.rotulo} id={idRotulo}>
        Código
      </span>
      {ajuda && (
        <p className={classes.ajuda} id={idAjuda}>
          {ajuda}
        </p>
      )}
      <div className={classes.caixas}>
        {numeros.map((numero, posicao) => (
          <input
            // As caixas são fixas e nunca mudam de ordem
            key={posicao}
            ref={(elemento) => {
              caixas.current[posicao] = elemento;
            }}
            id={posicao === 0 ? id : undefined}
            className={classes.caixa}
            type="text"
            inputMode="numeric"
            autoComplete={posicao === 0 ? 'one-time-code' : 'off'}
            maxLength={2}
            value={numero}
            aria-label={`Número ${posicao + 1} de ${TAMANHO_CODIGO}`}
            aria-invalid={erro ? true : undefined}
            aria-describedby={descricao}
            onChange={(evento) => aoDigitar(evento, posicao)}
            onKeyDown={(evento) => aoTeclar(evento, posicao)}
            onPaste={aoColar}
            onFocus={(evento) => evento.target.select()}
          />
        ))}
      </div>
      {erro && (
        <p className={classes.erro} id={idErro}>
          <Icone nome="error" tamanho={20} preenchido />
          {erro}
        </p>
      )}
    </div>
  );
}
