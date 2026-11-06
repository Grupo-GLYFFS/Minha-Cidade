import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './LinkOpcaoPerfil.module.css';

// Uma linha da lista do Perfil: ícone, rótulo, frase curta e seta. A linha inteira é o link.
// Recebe a opção { rotulo, descricao, icone, caminho }.
export default function LinkOpcaoPerfil({ opcao }) {
  return (
    <Link to={opcao.caminho} className={classes.link}>
      <span className={classes.icone}>
        <Icone nome={opcao.icone} tamanho={20} />
      </span>
      <span className={classes.textos}>
        <span className={classes.rotulo}>{opcao.rotulo}</span>
        <span className={classes.descricao}>{opcao.descricao}</span>
      </span>
      <Icone nome="chevron_right" tamanho={20} />
    </Link>
  );
}
