import Icone from '../Icone';
import classes from './BlocoExtrato.module.css';

// Um bloco do extrato: título pequeno azul com ícone (opcional), os nomes das duas colunas
// alinhados aos valores e as linhas (LinhaExtrato) embaixo.
// Recebe titulo, icone, colunas ([principal, segunda]), comLink (as linhas têm chevron no fim)
// e children (as linhas e o que mais vier, como o botão "Ver as 10 fontes").
export default function BlocoExtrato({ titulo, icone, colunas, comLink = false, children }) {
  return (
    <div className={classes.bloco}>
      {titulo && (
        <h3 className={classes.titulo}>
          {icone && <Icone nome={icone} tamanho={22} />}
          {titulo}
        </h3>
      )}
      {colunas && (
        <p className={comLink ? `${classes.colunas} ${classes.comLink}` : classes.colunas}>
          <span>{colunas[0]}</span>
          <span className={classes.segunda}>{colunas[1]}</span>
        </p>
      )}
      {children}
    </div>
  );
}
