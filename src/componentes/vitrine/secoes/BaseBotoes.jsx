import { ActionIcon, Button, Group, Indicator, Stack } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Icone from '../../Icone';

// Variantes de botão usadas nas telas, com um exemplo de uso de cada
const VARIANTES = [
  { variante: 'filled', texto: 'Enviar pedido', icone: 'send' },
  { variante: 'light', texto: 'Editar meus dados', icone: 'edit' },
  { variante: 'default', texto: 'Voltar para pedidos' },
  { variante: 'subtle', texto: 'Limpar filtros', icone: 'close' },
];

// Botões (variantes, tamanhos, estados) e botões só com ícone (ActionIcon).
export default function BaseBotoes() {
  return (
    <Subsecao id="base-botoes" titulo="Botões">
      <Vitrine
        nome="Button variant"
        arquivo="@mantine/core"
        props="filled (principal) · light · default · subtle · outline (só para apagar)"
        fundo="branco"
      >
        <Group gap="sm">
          {VARIANTES.map((item) => (
            <Button
              key={item.variante}
              variant={item.variante}
              h={44}
              leftSection={item.icone && <Icone nome={item.icone} tamanho={20} />}
            >
              {item.texto}
            </Button>
          ))}
          <Button
            variant="outline"
            color="var(--cor-erro)"
            h={44}
            leftSection={<Icone nome="delete" tamanho={20} />}
          >
            Apagar meus dados deste navegador
          </Button>
        </Group>
      </Vitrine>

      <Vitrine
        nome="Button size / h"
        arquivo="@mantine/core"
        props='size="sm" (cartões) · h={44} · size="md" e h={48} (ação principal) · fullWidth'
        fundo="branco"
      >
        <Stack gap="sm" align="flex-start">
          <Group gap="sm" align="center">
            <Button size="sm" variant="light" leftSection={<Icone nome="thumb_up" tamanho={20} />}>
              Apoiar
            </Button>
            <Button h={44}>Entrar</Button>
            <Button size="md">Continuar</Button>
            <Button h={48} leftSection={<Icone nome="add" tamanho={20} />}>
              Abrir pedido
            </Button>
          </Group>
          <Button size="md" fullWidth leftSection={<Icone nome="how_to_vote" tamanho={20} />}>
            Confirmar voto
          </Button>
        </Stack>
      </Vitrine>

      <Vitrine
        nome="Button disabled / loading"
        arquivo="@mantine/core"
        props="disabled · loading · aria-disabled (continua com foco)"
        fundo="branco"
      >
        <Group gap="sm">
          <Button h={48} disabled leftSection={<Icone nome="check" tamanho={20} />}>
            Salvar alterações
          </Button>
          <Button size="md" loading loaderProps={{ 'aria-label': 'Enviando a solicitação' }}>
            Enviar solicitação
          </Button>
          <Button
            variant="light"
            size="sm"
            aria-disabled="true"
            leftSection={<Icone nome="check_circle" tamanho={20} preenchido />}
          >
            Você apoiou
          </Button>
        </Group>
      </Vitrine>

      <Vitrine
        nome="ActionIcon + Indicator"
        arquivo="@mantine/core"
        props='variant="default" size={44} radius="md" aria-label'
        fundo="branco"
      >
        <Group gap="sm">
          <Indicator label={3} size={18} color="red">
            <ActionIcon variant="default" size={44} aria-label="Alertas, 3 novos">
              <Icone nome="notifications" />
            </ActionIcon>
          </Indicator>
          <ActionIcon variant="default" size={44} radius="md" aria-label="Tirar R$ 50 mil">
            <Icone nome="remove" tamanho={20} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size={44}
            radius="md"
            aria-label="Pôr mais R$ 50 mil"
            disabled
          >
            <Icone nome="add" tamanho={20} />
          </ActionIcon>
        </Group>
      </Vitrine>
    </Subsecao>
  );
}
