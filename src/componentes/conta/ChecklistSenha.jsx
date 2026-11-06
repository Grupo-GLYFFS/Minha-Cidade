import { Text, VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import { REGRAS_SENHA } from '../../logica/senha';
import classes from './ChecklistSenha.module.css';

// Lista "A senha precisa ter" que vai marcando cada regra enquanto a pessoa digita.
// A marca não depende só da cor: o ícone muda e o leitor de tela ouve "feito" ou "falta".
// Recebe a senha digitada.
export default function ChecklistSenha({ senha }) {
  return (
    <div className={classes.caixa}>
      <Text fz="xs" fw={600} c="var(--cor-texto-suave)">
        A senha precisa ter:
      </Text>
      <ul className={classes.lista}>
        {REGRAS_SENHA.map((regra) => {
          const feita = regra.cumpre(senha);
          return (
            <li key={regra.id} className={classes.item} data-feita={feita || undefined}>
              <Icone
                nome={feita ? 'check_circle' : 'radio_button_unchecked'}
                tamanho={18}
                preenchido={feita}
              />
              <span>
                {regra.texto}
                <VisuallyHidden>{feita ? ': feito' : ': falta'}</VisuallyHidden>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
