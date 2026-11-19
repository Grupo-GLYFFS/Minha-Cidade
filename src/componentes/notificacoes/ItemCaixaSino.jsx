import { VisuallyHidden } from '@mantine/core';
import { Link } from 'react-router-dom';
import Icone from '../Icone';
import MiniaturaNotificacao from './MiniaturaNotificacao';
import { dataHoraIso, horaNaCaixa } from '../../logica/notificacoes';
import classes from './ItemCaixaSino.module.css';

// Uma notificação na caixa do sino: miniatura de 56, "Não lida · hora", título e o motivo.
// Não lida tem fundo azul-claro. A linha inteira é clicável; abrir marca como lida e fecha a caixa.
// Recebe a notificação e aoAbrir(id).
export default function ItemCaixaSino({ notificacao, aoAbrir }) {
  const { id, titulo, tipo, para, lida } = notificacao;

  return (
    <li className={lida ? classes.item : `${classes.item} ${classes.nova}`}>
      <MiniaturaNotificacao notificacao={notificacao} pequena />
      <div className={classes.texto}>
        <p className={classes.linha1}>
          {!lida && (
            <>
              <Icone nome="fiber_manual_record" tamanho={18} preenchido className={classes.ponto} />
              <span className={classes.naoLida}>Não lida</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <time dateTime={dataHoraIso(notificacao)}>{horaNaCaixa(notificacao)}</time>
        </p>
        <p className={classes.titulo}>
          <Link to={para} className={classes.link} onClick={() => aoAbrir(id)}>
            {!lida && <VisuallyHidden>Não lida. </VisuallyHidden>}
            {titulo}
          </Link>
        </p>
        <p className={classes.tipo}>{tipo}</p>
      </div>
    </li>
  );
}
