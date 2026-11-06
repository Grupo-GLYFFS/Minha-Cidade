import { Group, Text } from '@mantine/core';
import Icone from '../Icone';
import { nivelPrioridade } from '../../logica/prioridade';
import { escurecerCor } from '../../logica/cores';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';

// Mostra a faixa de prioridade do pedido: ícone de barras + texto ("Prioridade alta").
// O número de barras e o texto dizem o nível; a cor só reforça.
// Recebe o pedido e o tamanho do texto (opcional). No alto contraste, a cor fica mais escura.
export default function IndicadorPrioridade({ pedido, fz = 13 }) {
  const nivel = nivelPrioridade(pedido);
  const { altoContraste } = useAcessibilidade();
  const cor = altoContraste ? escurecerCor(nivel.cor) : nivel.cor;

  return (
    <Group gap={4} wrap="nowrap" c={cor}>
      <Icone nome={nivel.icone} tamanho={18} />
      <Text component="span" fz={fz} fw={600} c="inherit">
        {nivel.rotulo}
      </Text>
    </Group>
  );
}
