import { useState } from 'react';
import { Chip, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import CartaoPedido from '../CartaoPedido';
import EstadoVazio from '../EstadoVazio';
import { SITUACOES_PEDIDO, filtrarPorSituacao } from '../../logica/pedidos';
import { pluralizar } from '../../logica/formatos';
import classes from './AbaPedidos.module.css';

// Textos quando o filtro não deixa nenhum pedido na lista
const VAZIO_POR_SITUACAO = {
  andamento: 'Você não tem pedidos em andamento.',
  encerrados: 'Nenhum pedido seu foi encerrado ainda.',
};

// Conteúdo da aba "Pedidos de melhoria": filtros (Todos, Em andamento, Encerrados)
// e os cartões dos pedidos da pessoa, cada um levando ao detalhe.
// Recebe os pedidos da pessoa já ordenados (em andamento primeiro, depois os mais recentes).
// Sem nenhum pedido, convida a abrir o primeiro.
export default function AbaPedidos({ pedidos }) {
  const [situacao, setSituacao] = useState('todos');

  if (pedidos.length === 0) {
    return (
      <EstadoVazio
        texto="Você ainda não abriu pedidos."
        rotuloBotao="Abrir pedido"
        caminho="/pedidos/novo"
        icone="add"
      />
    );
  }

  const filtrados = filtrarPorSituacao(pedidos, situacao);

  return (
    <Stack gap="md">
      <div role="radiogroup" aria-label="Mostrar pedidos" className={classes.filtros}>
        <Chip.Group value={situacao} onChange={setSituacao}>
          <Group gap="sm">
            {SITUACOES_PEDIDO.map((opcao) => (
              <Chip
                key={opcao.value}
                value={opcao.value}
                size="sm"
                radius="xl"
                classNames={{ label: classes.chip }}
              >
                {opcao.label}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </div>

      {/* Anuncia o total quando o filtro muda */}
      <Text fz={14} c="var(--cor-texto-suave)" role="status">
        {pluralizar(filtrados.length, 'pedido', 'pedidos')}
      </Text>

      {filtrados.length === 0 ? (
        <EstadoVazio texto={VAZIO_POR_SITUACAO[situacao]} />
      ) : (
        <SimpleGrid component="ul" cols={{ base: 1, md: 2 }} spacing="md" className={classes.lista}>
          {filtrados.map((pedido) => (
            <li key={pedido.id}>
              <CartaoPedido pedido={pedido} nivelTitulo={2} />
            </li>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
