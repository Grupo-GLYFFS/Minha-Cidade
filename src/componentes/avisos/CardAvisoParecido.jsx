import { Link } from 'react-router-dom';
import Icone from '../Icone';
import BotaoCompartilhar from './BotaoCompartilhar';
import { dataCurta, juntarNomes } from '../../logica/avisos';
import classes from './Avisos.module.css';

// Card de um aviso parecido, no fim do detalhe: miniatura (ilustração ou ícone do assunto),
// "<órgão> publicou um aviso · <bairros>", título, resumo e, embaixo, assunto, até quando
// e Compartilhar. Recebe o aviso e o caminho do detalhe dele.
export default function CardAvisoParecido({ aviso, caminho }) {
  return (
    <article className={`${classes.card} ${classes.parecido}`}>
      <div className={classes.corpo}>
        <span className={classes.miniatura}>
          {aviso.imagem ? (
            <img src={aviso.imagem} alt="" />
          ) : (
            <Icone nome={aviso.assunto.icone} tamanho={32} />
          )}
        </span>
        <div className={classes.parecidoTexto}>
          <p className={classes.publicou}>
            <strong>{aviso.orgao.nome}</strong> publicou um <b>aviso</b>
            {aviso.bairros.length > 0 && ` · ${juntarNomes(aviso.bairros)}`}
          </p>
          <h3 className={classes.titulo}>
            <Link to={caminho}>{aviso.titulo}</Link>
          </h3>
          <p className={classes.resumo}>{aviso.resumo}</p>
        </div>
      </div>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
      <div className={classes.rodape}>
        <p className={classes.onde}>
          <span className={classes.assunto}>
            <Icone nome={aviso.assunto.icone} tamanho={18} />
            {aviso.assunto.rotulo}
          </span>
          <Icone nome="event" tamanho={18} />
          <strong>Até {dataCurta(aviso.validoAte)}</strong>
        </p>
        <BotaoCompartilhar compacto titulo={aviso.titulo} caminho={caminho} />
      </div>
    </article>
  );
}
