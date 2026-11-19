import Icone from '../Icone';
import { formatarDiaLongo } from '../../logica/datasPedido';
import classes from './AndamentoPedido.module.css';

// Linha do tempo do pedido: Enviado → Em análise → Aprovado → Em execução → Concluído
// (→ Avaliado), ou parada em Recusado com o motivo.
// Cada etapa feita mostra a data; a atual mostra "Desde …" e o selo "Etapa atual".
// Recebe as etapas de etapasDoPedido() (logica/linhaDoTempo.js) e, se quiser,
// textoData(etapa) para trocar o texto da data (ex.: "Hoje, 9h40" no Pedido enviado).
export default function AndamentoPedido({ etapas, textoData }) {
  return (
    <ol className={classes.linha} aria-label="Andamento do pedido">
      {etapas.map((etapa) => {
        const atual = etapa.estado === 'atual';
        let data = etapa.data && formatarDiaLongo(etapa.data);
        if (atual && data) data = `Desde ${data}`;
        if (textoData) data = textoData(etapa) ?? data;

        return (
          <li
            key={etapa.id}
            className={`${classes.etapa} ${classes[etapa.estado]}`}
            aria-current={atual || etapa.estado === 'recusada' ? 'step' : undefined}
          >
            <span className={classes.marca} aria-hidden="true">
              {etapa.estado === 'feita' && <Icone nome="check" tamanho={18} />}
              {etapa.estado === 'recusada' && <Icone nome="close" tamanho={18} />}
            </span>
            <div className={classes.texto}>
              <span className={classes.rotulo}>
                {etapa.estado === 'feita' && (
                  <span className={classes.oculto}>Etapa concluída. </span>
                )}
                {etapa.estado === 'futura' && (
                  <span className={classes.oculto}>Próxima etapa. </span>
                )}
                {etapa.rotulo}
                {atual && <span className={classes.agora}>Etapa atual</span>}
              </span>
              {data && <span className={classes.data}>{data}</span>}
              {etapa.estado !== 'futura' && etapa.explicacao && (
                <span className={classes.explicacao}>{etapa.explicacao}</span>
              )}
              {etapa.estado === 'futura' && etapa.proximo && (
                <span className={classes.explicacao}>{etapa.proximo}</span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
