import { Group, Text } from '@mantine/core';
import Icone from '../Icone';
import { nivelPrioridade } from '../../logica/prioridade';

// Mostra a faixa de prioridade do pedido: ícone de barras + texto ("Prioridade alta").
// O número de barras e o texto dizem o nível; a cor só reforça.
// Recebe o pedido e o tamanho do texto (opcional).
export default function IndicadorPrioridade({ pedido, fz = 13 }) {
  const nivel = nivelPrioridade(pedido);

  return (
    <Group gap={4} wrap="nowrap" c={nivel.cor}>
      <Icone nome={nivel.icone} tamanho={18} />
      <Text component="span" fz={fz} fw={600} c="inherit">
        {nivel.rotulo}
      </Text>
    </Group>
  );
}
