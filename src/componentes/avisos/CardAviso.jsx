import { Link } from 'react-router-dom';
import Icone from '../Icone';
import BotaoCompartilhar from './BotaoCompartilhar';
import QuemPublicou from './QuemPublicou';
import { dataCurta, juntarNomes } from '../../logica/avisos';
import classes from './Avisos.module.css';

// Card de um aviso na lista: quem publicou e o assunto, título (link que cobre o card), resumo,
// ilustração (se houver) e, embaixo, onde vale (só na lista do bairro), até quando e Compartilhar.
// Recebe o aviso, o caminho do detalhe e mostrarOnde.
export default function CardAviso({ aviso, caminho, mostrarOnde = false }) {
  return (
    <article className={classes.card}>
      <div className={classes.corpo}>
        <QuemPublicou aviso={aviso} />
        <h2 className={classes.titulo}>
          <Link to={caminho}>{aviso.titulo}</Link>
        </h2>
        <p className={classes.resumo}>{aviso.resumo}</p>
        {aviso.imagem && <img className={classes.imagem} src={aviso.imagem} alt="" />}
      </div>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
      <div className={classes.rodape}>
        <p className={classes.onde}>
          {mostrarOnde && aviso.bairros.length > 0 && (
            <>
              <Icone nome="location_on" tamanho={18} />
              {juntarNomes(aviso.bairros)}
              <span aria-hidden="true">·</span>
            </>
          )}
          Até {dataCurta(aviso.validoAte)}
        </p>
        <BotaoCompartilhar compacto titulo={aviso.titulo} caminho={caminho} />
      </div>
    </article>
  );
}
