import { useEffect, useRef } from 'react';
import Icone from '../Icone';
import classes from './AvisoErroConta.module.css';

// Caixa de erro sem lista de campos, no padrão do resumo de erros
// (ex.: "E-mail, CPF ou senha não conferem." no Entrar).
// Recebe o título e as linhas de texto (uma frase por linha). Ao aparecer, recebe o foco.
export default function AvisoErroConta({ titulo, linhas = [] }) {
  const caixa = useRef(null);

  // Leva o foco para o aviso quando ele aparece ou muda, para o leitor de tela anunciar
  useEffect(() => {
    caixa.current?.focus();
  }, [titulo]);

  return (
    <div className={classes.aviso} role="alert" tabIndex={-1} ref={caixa}>
      <Icone nome="error" preenchido />
      <div className={classes.texto}>
        <p className={classes.titulo}>{titulo}</p>
        {linhas.length > 0 && (
          <p className={classes.linhas}>
            {linhas.map((linha) => (
              <span key={linha}>{linha}</span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
