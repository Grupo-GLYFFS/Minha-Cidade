import { Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import IndicadorPrioridade from './IndicadorPrioridade';
import { calcularNotaProblema, calcularPrioridade } from '../../logica/prioridade';
import { pluralizar } from '../../logica/formatos';
import classes from './CartaoPrioridade.module.css';

// Explica a prioridade do pedido em linguagem simples:
// as três notas (de 1 a 5), a conta e quantos pontos vieram dos apoios. Recebe o pedido.
export default function CartaoPrioridade({ pedido }) {
  const notas = [
    { rotulo: 'Gravidade', valor: pedido.gravidade, ajuda: 'quanto atrapalha' },
    { rotulo: 'Urgência', valor: pedido.urgencia, ajuda: 'quanto pode esperar' },
    { rotulo: 'Tendência', valor: pedido.tendencia, ajuda: 'se vai piorar' },
  ];

  return (
    <Cartao component="section" aria-labelledby="prioridade-titulo">
      <Title order={2} id="prioridade-titulo" fz={18} fw={700}>
        Prioridade
      </Title>
      <Group justify="space-between" mt="sm" gap="sm">
        <IndicadorPrioridade pedido={pedido} fz={15} />
        <Text fz={14} fw={700}>
          {pluralizar(calcularPrioridade(pedido), 'ponto', 'pontos')}
        </Text>
      </Group>

      <ul className={classes.notas}>
        {notas.map((nota) => (
          <li key={nota.rotulo} className={classes.nota}>
            <Text component="span" fz={22} fw={800} lh={1}>
              {nota.valor}
              <Text component="span" fz={13} fw={600} c="var(--cor-texto-suave)">
                /5
              </Text>
            </Text>
            <Text component="span" fz={13} fw={600}>
              {nota.rotulo}
            </Text>
            <Text component="span" fz={12} c="var(--cor-texto-suave)">
              {nota.ajuda}
            </Text>
          </li>
        ))}
      </ul>

      <Text fz={14} c="var(--cor-texto-suave)" mt="sm" lh={1.5}>
        A prefeitura dá uma nota de 1 a 5 para a gravidade, a urgência e a tendência do problema e
        multiplica as três ({pedido.gravidade} × {pedido.urgencia} × {pedido.tendencia} ={' '}
        {calcularNotaProblema(pedido)}). Depois soma 1 ponto por apoio (
        {pluralizar(pedido.apoios, 'apoio', 'apoios')}). Quanto mais pontos, antes o pedido é
        atendido.
      </Text>
    </Cartao>
  );
}
