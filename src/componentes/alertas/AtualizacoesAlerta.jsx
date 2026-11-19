import Icone from '../Icone';
import classes from './Alertas.module.css';

// Linhas das atualizações de um alerta (dentro de um SecaoCard), da mais nova para a mais antiga:
// ícone do alerta, órgão · quando e o texto. Recebe { atualizacoes, orgao, icone }.
export default function AtualizacoesAlerta({ atualizacoes, orgao, icone }) {
  return (
    <ol className={classes.linhas}>
      {atualizacoes.map((atualizacao) => (
        <li key={atualizacao.quando} className={classes.linha}>
          <Icone nome={icone} tamanho={20} />
          <div className={classes.linhaTexto}>
            <p className={classes.linhaQuem}>
              <b>{orgao}</b>
              <span className={classes.ponto} aria-hidden="true">
                ·
              </span>
              <time>{atualizacao.quando}</time>
            </p>
            <p className={classes.linhaFrase}>{atualizacao.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
