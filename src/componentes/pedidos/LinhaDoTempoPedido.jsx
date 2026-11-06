import { Text, Timeline, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { etapasDoPedido, posicaoEtapaAtiva } from '../../logica/linhaDoTempo';
import { formatarDataExtenso } from '../../logica/datas';
import classes from './LinhaDoTempoPedido.module.css';

// Texto e ícone de cada estado. O texto aparece na tela, então a cor nunca é a única pista.
const ESTADOS = {
  feita: { texto: 'Etapa concluída', icone: 'check' },
  atual: { texto: 'Etapa atual', icone: 'more_horiz' },
  futura: { texto: 'Próxima etapa', icone: null },
  recusada: { texto: 'Pedido recusado', icone: 'close' },
};

// Linha do tempo do pedido: Enviada → Em análise → Aprovada → Em execução → Concluída
// (→ Avaliada). Mostra o que já aconteceu, onde o pedido está e o que vem depois.
// Se foi recusado, mostra as etapas até a análise e o motivo da recusa. Recebe o pedido.
export default function LinhaDoTempoPedido({ pedido }) {
  const etapas = etapasDoPedido(pedido);

  return (
    <Cartao component="section" aria-labelledby="andamento-titulo">
      <Title order={2} id="andamento-titulo" fz={18} fw={700} mb="lg">
        Andamento
      </Title>

      <Timeline
        active={posicaoEtapaAtiva(etapas)}
        bulletSize={28}
        lineWidth={2}
        role="list"
        classNames={{ itemTitle: classes.tituloEtapa }}
      >
        {etapas.map((etapa) => {
          const estado = ESTADOS[etapa.estado];
          return (
            <Timeline.Item
              key={etapa.id}
              role="listitem"
              data-estado={etapa.estado}
              className={classes.etapa}
              color={etapa.estado === 'recusada' ? 'red.8' : undefined}
              bullet={estado.icone && <Icone nome={estado.icone} tamanho={18} />}
              lineVariant={etapa.estado === 'futura' ? 'dashed' : 'solid'}
              title={etapa.rotulo}
            >
              <Text fz={13} fw={600} className={classes.estado}>
                {estado.texto}
                {etapa.data && ` · ${formatarDataExtenso(etapa.data)}`}
              </Text>
              <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
                {etapa.explicacao}
              </Text>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Cartao>
  );
}
