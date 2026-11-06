import { Button, Group, Text } from '@mantine/core';
import Icone from '../Icone';
import { usePedidos } from '../../contexto/usePedidos';
import { MOTIVOS_SEM_APOIO } from '../../logica/apoios';
import classes from './BotaoApoiar.module.css';

// Botão para apoiar um pedido ("eu também tenho esse problema").
// Depois do clique vira "Você apoiou". Em pedido da pessoa ou encerrado, mostra o motivo.
// Recebe o pedido, o texto do botão e "completo" (true na página do pedido: botão largo,
// motivo embaixo de um botão desativado; false no cartão: só o motivo, sem botão).
export default function BotaoApoiar({ pedido, texto = 'Apoiar', completo = false }) {
  const { apoiar, explicarSemApoio } = usePedidos();
  const motivo = explicarSemApoio(pedido);
  const tamanho = completo ? 'md' : 'sm';

  if (motivo === 'ja-apoiou') {
    return (
      <Button
        variant="light"
        size={tamanho}
        fullWidth={completo}
        className={classes.apoiado}
        leftSection={<Icone nome="check_circle" tamanho={20} preenchido />}
        aria-disabled="true"
      >
        {completo ? 'Você apoiou este pedido' : MOTIVOS_SEM_APOIO[motivo]}
      </Button>
    );
  }

  if (motivo) {
    const icone = motivo === 'proprio' ? 'person' : 'lock';
    const aviso = (
      <Group gap={4} wrap="nowrap" c="var(--cor-texto-suave)" id={`motivo-${pedido.id}`}>
        <Icone nome={icone} tamanho={18} />
        <Text component="span" fz={13} fw={600} c="inherit">
          {MOTIVOS_SEM_APOIO[motivo]}
        </Text>
      </Group>
    );
    if (!completo) return <div className={classes.acima}>{aviso}</div>;

    return (
      <div>
        <Button
          size={tamanho}
          fullWidth
          disabled
          leftSection={<Icone nome="thumb_up" tamanho={20} />}
          aria-describedby={`motivo-${pedido.id}`}
        >
          {texto}
        </Button>
        <Group justify="center" mt="sm">
          {aviso}
        </Group>
      </div>
    );
  }

  return (
    <Button
      size={tamanho}
      fullWidth={completo}
      variant={completo ? 'filled' : 'light'}
      className={classes.acima}
      leftSection={<Icone nome="thumb_up" tamanho={20} />}
      onClick={() => apoiar(pedido.id)}
    >
      {texto}
    </Button>
  );
}
