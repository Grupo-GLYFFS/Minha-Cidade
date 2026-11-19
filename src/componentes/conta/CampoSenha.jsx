import { useState } from 'react';
import CampoTexto from '../CampoTexto';
import Icone from '../Icone';
import RequisitosSenha from './RequisitosSenha';
import classes from './CampoSenha.module.css';

// Campo de senha com o botão de olho para mostrar ou esconder o que foi digitado.
// Recebe:
// - id, rotulo e erro (como o CampoTexto);
// - acao: link na mesma linha do rótulo, à direita (ex.: "Esqueci minha senha");
// - senhaDigitada: quando vem, mostra embaixo a lista "A senha precisa ter" (no cadastro);
// - o resto das props vai para o campo (ex.: {...register('senha')}, autoComplete).
export default function CampoSenha({ id, rotulo = 'Senha', erro, acao, senhaDigitada, ...props }) {
  const [visivel, setVisivel] = useState(false);
  const idRequisitos = `${id}-requisitos`;
  const comRequisitos = senhaDigitada !== undefined;

  return (
    <div className={classes.campo}>
      <CampoTexto
        id={id}
        rotulo={rotulo}
        erro={erro}
        type={visivel ? 'text' : 'password'}
        aria-describedby={comRequisitos ? idRequisitos : undefined}
        rightSectionWidth={44}
        rightSectionPointerEvents="all"
        rightSection={
          <button
            type="button"
            className={classes.olho}
            onClick={() => setVisivel((atual) => !atual)}
            aria-label={visivel ? 'Esconder a senha' : 'Mostrar a senha'}
            aria-pressed={visivel}
            aria-controls={id}
          >
            <Icone nome={visivel ? 'visibility_off' : 'visibility'} />
          </button>
        }
        {...props}
      />
      {acao && <div className={classes.acao}>{acao}</div>}
      {comRequisitos && <RequisitosSenha senha={senhaDigitada} id={idRequisitos} />}
    </div>
  );
}
