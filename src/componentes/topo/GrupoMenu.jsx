import { Link, useLocation } from 'react-router-dom';
import Icone from '../Icone';
import { usePainelAberto } from './usePainelAberto';
import { caminhoDoMenu, estadoItemMenu } from '../../dados/navegacao';
import classes from './GrupoMenu.module.css';
import painel from './PainelMenu.module.css';

// Um item do menu principal do topo.
// Sem painel (Serviços): só o link. Com painel (Global Solution, Minha cidade, Meu bairro):
// o nome leva à página e a seta abre o painel, que também abre ao passar o mouse.
// Aberto pelo mouse, fecha quando ele sai; o clique na seta deixa aberto (ou fecha, se já
// estava aberto por clique).
// O item da página atual fica marcado com aria-current ("page" na página, "true" nas subpáginas).
// Recebe o item de MENU_PRINCIPAL (dados/navegacao.js).
export default function GrupoMenu({ item }) {
  const { pathname, search } = useLocation();
  const { aberto, abrirPassagem, fecharPassagem, fechar, alternar, refContorno, aoTeclar } =
    usePainelAberto();
  const atual = estadoItemMenu(item, caminhoDoMenu(pathname, search));

  if (!item.painel) {
    return (
      <li className={classes.item}>
        <Link to={item.caminho} className={classes.link} aria-current={atual}>
          {item.rotulo}
        </Link>
      </li>
    );
  }

  const idPainel = `menu-${item.id}`;
  const classesGrupo = [classes.grupo];
  if (atual || aberto) classesGrupo.push(classes.grupoAtivo);

  return (
    <li
      className={classes.item}
      ref={refContorno}
      onMouseEnter={abrirPassagem}
      onMouseLeave={fecharPassagem}
      onKeyDown={aoTeclar}
    >
      <span className={classesGrupo.join(' ')}>
        <Link to={item.caminho} className={classes.link} aria-current={atual}>
          {item.rotulo}
        </Link>
        <button
          type="button"
          className={classes.seta}
          aria-label={item.rotuloSeta}
          aria-expanded={aberto}
          aria-controls={idPainel}
          onClick={alternar}
        >
          <Icone nome="expand_more" tamanho={20} className={classes.setaIcone} />
        </button>
      </span>

      <div className={painel.painel} id={idPainel} hidden={!aberto}>
        <ul className={painel.lista}>
          {item.painel.map((opcao) => (
            <li key={opcao.caminho}>
              <Link
                to={opcao.caminho}
                className={painel.item}
                aria-current={pathname === opcao.caminho ? 'page' : undefined}
                onClick={fechar}
              >
                <Icone nome={opcao.icone} tamanho={20} className={painel.itemIcone} />
                {opcao.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
