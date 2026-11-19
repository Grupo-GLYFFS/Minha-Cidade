import Icone from '../Icone';
import classes from './Avisos.module.css';

// Linha de quem publicou um aviso: quadradinho com o ícone do órgão, o nome, "·" e o assunto
// numa pílula com ícone. Recebe o aviso.
export default function QuemPublicou({ aviso }) {
  return (
    <p className={classes.quem}>
      <span className={`${classes.org} ${classes[aviso.orgao.tom]}`}>
        <Icone nome={aviso.orgao.icone} tamanho={18} />
      </span>
      {aviso.orgao.nome}
      <span className={classes.ponto} aria-hidden="true">
        ·
      </span>
      <span className={classes.assunto}>
        <Icone nome={aviso.assunto.icone} tamanho={18} />
        {aviso.assunto.rotulo}
      </span>
    </p>
  );
}
