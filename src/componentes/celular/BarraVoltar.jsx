import { Link, useNavigate } from 'react-router-dom';
import Icone from '../Icone';
import classes from './BarraVoltar.module.css';

// Barra "‹ Voltar" do topo das páginas internas no celular (some no computador).
// Grade de 3 colunas (1fr auto 1fr): o link à esquerda, o título no centro exato da tela
// e a ação da página à direita. Fica presa no alto ao rolar.
// Recebe:
// - voltar: { rotulo, para } (link "‹ rotulo"); sem ele, "‹ Voltar" volta uma página no histórico;
// - aoVoltar: função chamada no lugar do link (ex.: "‹ Mais" abre a folha Mais), com o rotulo de voltar;
// - titulo: nome curto da página no meio (opcional; uma linha com reticências);
// - acao: botão da direita (compartilhar só com ícone, "Cancelar"…), opcional.
export default function BarraVoltar({ voltar, aoVoltar, titulo, acao }) {
  const navigate = useNavigate();
  const rotulo = voltar?.rotulo ?? 'Voltar';
  const classeBarra = titulo ? classes.barra : `${classes.barra} ${classes.semTitulo}`;

  const conteudoLink = (
    <>
      <Icone nome="chevron_left" tamanho={24} className={classes.seta} />
      <span className={classes.rotulo}>{rotulo}</span>
    </>
  );

  // Sem destino: volta uma página (ou vai ao Início, se a página foi aberta direto)
  function voltarNoHistorico() {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/inicio');
  }

  let link;
  if (aoVoltar) {
    link = (
      <button type="button" className={classes.voltar} onClick={aoVoltar}>
        {conteudoLink}
      </button>
    );
  } else if (voltar?.para) {
    link = (
      <Link to={voltar.para} className={classes.voltar}>
        {conteudoLink}
      </Link>
    );
  } else {
    link = (
      <button type="button" className={classes.voltar} onClick={voltarNoHistorico}>
        {conteudoLink}
      </button>
    );
  }

  return (
    <div className={classeBarra}>
      {link}
      {titulo && (
        <p className={classes.titulo} aria-hidden="true">
          {titulo}
        </p>
      )}
      <div className={classes.direita}>{acao}</div>
    </div>
  );
}
