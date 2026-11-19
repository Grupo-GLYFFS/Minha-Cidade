import Icone from '../Icone';
import { buscarStatusSolicitacao } from '../../logica/solicitacoes';
import { formatarMomento } from '../../logica/datasExtenso';
import classes from './LinhaDoTempoSolicitacao.module.css';

// Situações que encerram a solicitação (não há próxima etapa depois delas)
const FINAIS = ['concluida', 'cancelada'];

// Andamento da solicitação: as etapas já feitas (check azul), a etapa atual (anel com ponto,
// "Etapa atual") e a próxima (anel cinza, "Concluída"). Cada etapa mostra o dia e o que houve.
// Recebe a solicitação.
export default function LinhaDoTempoSolicitacao({ solicitacao }) {
  const { historico } = solicitacao;
  const encerrada = FINAIS.includes(solicitacao.status);
  const ultima = historico.length - 1;

  return (
    <ol className={classes.linha} aria-label="Andamento da solicitação">
      {historico.map((etapa, indice) => {
        // A última etapa é a atual enquanto a solicitação não termina
        const atual = indice === ultima && !encerrada;
        return (
          <li key={`${etapa.status}-${etapa.em}`} className={classes.etapa}>
            <span
              className={`${classes.marca} ${atual ? classes.atual : classes.feita}`}
              aria-hidden="true"
            >
              {!atual && <Icone nome="check" tamanho={18} />}
            </span>
            <div className={classes.texto}>
              <span className={classes.rotulo}>
                {etapa.rotulo ?? buscarStatusSolicitacao(etapa.status).rotulo}
                {atual && <span className={classes.agora}>Etapa atual</span>}
              </span>
              <span className={classes.data}>{formatarMomento(etapa.em)}</span>
              {etapa.textos.map((texto) => (
                <span key={texto} className={classes.detalhe}>
                  {texto}
                </span>
              ))}
            </div>
          </li>
        );
      })}
      {!encerrada && (
        <li className={classes.etapa}>
          <span className={`${classes.marca} ${classes.futura}`} aria-hidden="true" />
          <div className={classes.texto}>
            <span className={classes.rotuloFuturo}>
              <span className={classes.oculto}>Próxima etapa. </span>
              Concluída
            </span>
          </div>
        </li>
      )}
    </ol>
  );
}
