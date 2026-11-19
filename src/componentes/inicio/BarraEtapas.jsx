import Icone from '../Icone';
import classes from './BarraEtapas.module.css';

// Barra de etapas na horizontal (pedidos e solicitações do Início): colunas iguais, bolinha de 28
// e o nome embaixo. Feita = azul com check; atual = anel com miolo (azul, âmbar ou cinza);
// futura = só a borda. A linha entre as bolinhas é azul até a atual e cinza depois.
// Recebe as etapas [{ id, rotulo, estado ("feita" | "atual" | "futura"), cor }].
export default function BarraEtapas({ etapas }) {
  const posicao = etapas.findIndex((etapa) => etapa.estado === 'atual');
  const atual = etapas[posicao];
  const resumo = atual
    ? `Etapa ${posicao + 1} de ${etapas.length}: ${atual.rotulo}`
    : `Todas as ${etapas.length} etapas concluídas`;

  return (
    <div className={classes.zona}>
      {/* A grade tem uma coluna por etapa (3 nas solicitações, 5 ou 6 nos pedidos) */}
      <ol
        className={`${classes.etapas} ${classes[`colunas${etapas.length}`] ?? ''}`}
        aria-label={resumo}
      >
        {etapas.map((etapa) => (
          <li
            key={etapa.id}
            className={`${classes.etapa} ${classes[etapa.estado]} ${etapa.estado === 'atual' ? classes[etapa.cor ?? 'azul'] : ''}`}
            aria-current={etapa.estado === 'atual' ? 'step' : undefined}
          >
            <span className={classes.bola} aria-hidden="true">
              {etapa.estado === 'feita' && <Icone nome="check" tamanho={18} />}
            </span>
            <span className={classes.nome}>{etapa.rotulo}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
