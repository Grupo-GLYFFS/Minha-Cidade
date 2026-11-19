import Icone from '../Icone';
import classes from './Hub.module.css';

// Card de um serviço perto (UBS, escola, CRAS, feira, coleta): ícone, nome e duas linhas.
// Recebe { icone, nome, linhas }. Vai dentro de um <li> da GradeHub.
export default function CardServico({ icone, nome, linhas }) {
  return (
    <div className={classes.servico}>
      <span className={classes.iconeCaixa}>
        <Icone nome={icone} tamanho={20} />
      </span>
      <span className={classes.servicoTexto}>
        <strong className={classes.servicoNome}>{nome}</strong>
        {linhas.map((linha) => (
          <span key={linha} className={classes.servicoLinha}>
            {linha}
          </span>
        ))}
      </span>
    </div>
  );
}
