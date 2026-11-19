import { VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import { REGRAS_SENHA } from '../../logica/senha';
import classes from './RequisitosSenha.module.css';

// Lista "A senha precisa ter", que marca cada regra cumprida enquanto a pessoa digita.
// Recebe a senha digitada e o id da lista (para o campo apontar para ela).
export default function RequisitosSenha({ senha = '', id }) {
  return (
    <ul className={classes.lista} id={id} aria-label="A senha precisa ter">
      {REGRAS_SENHA.map((regra) => {
        const cumpre = regra.cumpre(senha);
        return (
          <li key={regra.id} className={cumpre ? classes.feito : undefined}>
            <Icone
              nome={cumpre ? 'check_circle' : 'radio_button_unchecked'}
              tamanho={20}
              preenchido={cumpre}
            />
            {regra.texto}
            <VisuallyHidden>{cumpre ? ', feito' : ', falta'}</VisuallyHidden>
          </li>
        );
      })}
    </ul>
  );
}
