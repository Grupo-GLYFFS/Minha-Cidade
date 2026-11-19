import { VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import classes from './LinhaEtapas.module.css';

// Texto escondido que diz ao leitor de tela o estado de cada etapa
const ESTADO_ESCRITO = {
  feita: 'Etapa concluída. ',
  atual: 'Etapa atual. ',
  futura: 'Próxima etapa. ',
};

// Linha do tempo vertical (etapas da obra, "Depois da votação").
// Bolinha azul com check nas etapas feitas, anel azul na atual e anel cinza nas próximas;
// a linha entre elas é cheia até a etapa atual e tracejada depois.
// Recebe:
// - etapas: [{ id, rotulo, estado ("feita" | "atual" | "futura"), data, texto, icone, extra }]
//   (icone troca o ponto da etapa atual, ex.: "pause"; extra é um elemento a mais embaixo);
// - rotulo: nome da lista para o leitor de tela (ex.: "Etapas da obra");
// - marcarAtual: mostra a pílula "Etapa atual" ao lado do nome (padrão true).
export default function LinhaEtapas({ etapas, rotulo, marcarAtual = true }) {
  return (
    <ol className={classes.lista} aria-label={rotulo}>
      {etapas.map((etapa) => (
        <li
          key={etapa.id}
          className={classes.etapa}
          data-estado={etapa.estado}
          aria-current={etapa.estado === 'atual' ? 'step' : undefined}
        >
          <span className={classes.marca} aria-hidden="true">
            {etapa.estado === 'feita' && <Icone nome="check" tamanho={18} />}
            {etapa.estado === 'atual' &&
              (etapa.icone ? (
                <Icone nome={etapa.icone} tamanho={18} />
              ) : (
                <span className={classes.ponto} />
              ))}
          </span>
          <div className={classes.texto}>
            <span className={classes.rotulo}>
              <VisuallyHidden>{ESTADO_ESCRITO[etapa.estado]}</VisuallyHidden>
              {etapa.rotulo}
              {marcarAtual && etapa.estado === 'atual' && (
                <span className={classes.agora} aria-hidden="true">
                  Etapa atual
                </span>
              )}
            </span>
            {etapa.data && <span className={classes.data}>{etapa.data}</span>}
            {etapa.texto && <span className={classes.descricao}>{etapa.texto}</span>}
            {etapa.extra}
          </div>
        </li>
      ))}
    </ol>
  );
}
