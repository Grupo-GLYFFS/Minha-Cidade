import { Link } from 'react-router-dom';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import IconeServico from './IconeServico';
import { partesMarcadas } from '../../logica/buscaGeral';
import classes from './PopupBusca.module.css';

// Uma linha de resultado do popup de busca: ícone, título (com a palavra buscada marcada),
// a linha de apoio, o selo de situação (pedidos) e o chevron. A linha inteira é o link.
// Recebe o icone, o titulo, a meta, o selo ({ cor, rotulo }, opcional), o caminho (para),
// a busca (para marcar) e aoEscolher() (fecha o popup).
export default function ItemBusca({ icone, titulo, meta, selo, para, busca = '', aoEscolher }) {
  return (
    <Link to={para} className={classes.item} onClick={aoEscolher}>
      <IconeServico nome={icone} tamanho={40} />
      <span className={classes.itemTexto}>
        <strong
          className={
            busca ? `${classes.itemTitulo} ${classes.itemTituloBusca}` : classes.itemTitulo
          }
        >
          {partesMarcadas(titulo, busca).map((parte, indice) =>
            parte.marcado ? (
              <mark key={indice} className={classes.marca}>
                {parte.texto}
              </mark>
            ) : (
              parte.texto
            ),
          )}
        </strong>
        {meta && <small className={classes.itemMeta}>{meta}</small>}
      </span>
      {selo && (
        <span className={classes.selo}>
          <SeloSituacao cor={selo.cor}>{selo.rotulo}</SeloSituacao>
        </span>
      )}
      <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />
    </Link>
  );
}
