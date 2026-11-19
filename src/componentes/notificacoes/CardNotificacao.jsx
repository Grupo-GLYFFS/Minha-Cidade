import { VisuallyHidden } from '@mantine/core';
import { Link } from 'react-router-dom';
import Botao from '../Botao';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import MiniaturaNotificacao from './MiniaturaNotificacao';
import { dataHoraIso } from '../../logica/notificacoes';
import classes from './CardNotificacao.module.css';

// Card de uma notificação na página Notificações (28): miniatura, "Não lida · hora", título,
// o que mudou e o motivo; embaixo, o selo da situação e o botão que abre a página.
// O card inteiro é clicável (o link do título cobre o card); abrir marca como lida.
// O botão repete o link para quem usa o mouse, então fica fora do teclado e do leitor de tela.
// Recebe a notificação e aoAbrir(id).
export default function CardNotificacao({ notificacao, aoAbrir }) {
  const { id, hora, titulo, texto, tipo, situacao, acao, para, lida } = notificacao;

  return (
    <li className={classes.card}>
      <div className={classes.topo}>
        <MiniaturaNotificacao notificacao={notificacao} />
        <div className={classes.texto}>
          <p className={classes.linha1}>
            {!lida && (
              <>
                <Icone
                  nome="fiber_manual_record"
                  tamanho={18}
                  preenchido
                  className={classes.ponto}
                />
                <span className={classes.naoLida}>Não lida</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <time dateTime={dataHoraIso(notificacao)}>{hora}</time>
          </p>
          <h3 className={classes.titulo}>
            <Link to={para} className={classes.link} onClick={() => aoAbrir(id)}>
              {!lida && <VisuallyHidden>Não lida. </VisuallyHidden>}
              {titulo}
            </Link>
          </h3>
          <p className={classes.descricao}>{texto}</p>
          <p className={classes.tipo}>{tipo}</p>
        </div>
      </div>
      <div className={classes.pe}>
        <SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>
        <Botao
          variante={acao.principal ? 'principal' : 'secundario'}
          compacto
          para={para}
          tabIndex={-1}
          aria-hidden="true"
          className={classes.botao}
          onClick={() => aoAbrir(id)}
        >
          {acao.rotulo}
        </Botao>
      </div>
    </li>
  );
}
