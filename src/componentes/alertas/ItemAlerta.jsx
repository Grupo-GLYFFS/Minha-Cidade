import { Link } from 'react-router-dom';
import { VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import { tempoRelativo } from '../../logica/datas';
import classes from './ItemAlerta.module.css';

// Um alerta da lista: ícone num quadrado colorido (cor do tipo), título, texto e quando chegou.
// Alerta novo tem bolinha azul e título em negrito; o leitor de tela ouve "Novo:" antes do título,
// para a cor não ser a única pista. A linha inteira é um link: abrir marca como lido.
// Recebe o alerta e aoAbrir(id).
export default function ItemAlerta({ alerta, aoAbrir }) {
  return (
    <Link
      to={alerta.link}
      onClick={() => aoAbrir(alerta.id)}
      className={classes.link}
      data-tipo={alerta.tipo}
      data-importante={alerta.importante || undefined}
      data-novo={!alerta.lido || undefined}
    >
      <span className={classes.icone}>
        <Icone nome={alerta.icone} tamanho={20} preenchido={alerta.importante} />
      </span>

      <span className={classes.textos}>
        <span className={classes.titulo}>
          {!alerta.lido && <VisuallyHidden>Novo: </VisuallyHidden>}
          {alerta.importante && <VisuallyHidden>Importante: </VisuallyHidden>}
          {alerta.titulo}
        </span>
        <span className={classes.texto}>{alerta.texto}</span>
        <span className={classes.data}>{tempoRelativo(alerta.data)}</span>
      </span>

      {!alerta.lido && <span className={classes.bolinha} aria-hidden="true" />}
    </Link>
  );
}
