import {
  Alert,
  Avatar,
  Button,
  Drawer,
  Group,
  Loader,
  Modal,
  Progress,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Icone from '../../Icone';

// Avisos usados nas telas: cor, ícone e um título que já diz o que aconteceu
const AVISOS = [
  {
    cor: 'azul',
    icone: 'info',
    titulo: 'Informação',
    texto: 'Você recebe a próxima novidade aqui no app.',
  },
  {
    cor: 'green',
    icone: 'check_circle',
    titulo: 'Voto registrado. Obrigado por participar!',
    texto: 'O resultado abaixo já conta o seu voto.',
  },
  {
    cor: 'yellow',
    icone: 'warning',
    titulo: 'Atenção',
    texto: 'Avisos da Defesa Civil usam a faixa AvisoAlerta (veja em Componentes do app).',
  },
  {
    cor: 'red',
    icone: 'error',
    titulo: 'E-mail ou senha incorretos. Confira e tente de novo.',
    texto: null,
  },
];

// Avisos (Alert), barras de progresso, carregando, avatar e as janelas (Modal e Drawer).
export default function BaseAvisos() {
  const [janela, { open: abrirJanela, close: fecharJanela }] = useDisclosure(false);
  const [gaveta, { open: abrirGaveta, close: fecharGaveta }] = useDisclosure(false);

  return (
    <Subsecao id="base-avisos" titulo="Avisos e janelas">
      <Vitrine
        nome="Alert"
        arquivo="@mantine/core"
        props='variant="light" radius="md" icon · título diz o que aconteceu'
        fundo="branco"
      >
        <Stack gap="sm">
          {AVISOS.map((aviso) => (
            <Alert
              key={aviso.cor}
              color={aviso.cor}
              variant="light"
              radius="md"
              title={aviso.titulo}
              icon={<Icone nome={aviso.icone} tamanho={20} preenchido />}
            >
              {aviso.texto}
            </Alert>
          ))}
        </Stack>
      </Vitrine>

      <Vitrine
        nome="Progress"
        arquivo="@mantine/core"
        props='size 8 | 10 | 12 · radius="xl" · aria-hidden (o número está escrito ao lado)'
        fundo="branco"
      >
        <Stack gap="md">
          {[
            { tamanho: 8, valor: 33 },
            { tamanho: 10, valor: 68 },
            { tamanho: 12, valor: 90 },
          ].map((barra) => (
            <div key={barra.tamanho}>
              <Text fz={13} mb={4}>
                {barra.valor}% executado · size={barra.tamanho}
              </Text>
              <Progress value={barra.valor} size={barra.tamanho} radius="xl" aria-hidden="true" />
            </div>
          ))}
        </Stack>
      </Vitrine>

      <Vitrine
        nome="Loader + Avatar"
        arquivo="@mantine/core"
        props='Loader size="xs" (busca do CEP) · Avatar color="azul" com iniciais'
        fundo="branco"
      >
        <Group gap="lg">
          <Group gap="sm">
            <Loader size="xs" aria-hidden="true" />
            <Text fz={13}>Buscando o endereço do CEP…</Text>
          </Group>
          <Avatar color="azul" variant="filled" radius="md" size={64}>
            MS
          </Avatar>
          <Avatar color="azul" variant="filled" radius="sm" size={34}>
            MS
          </Avatar>
        </Group>
      </Vitrine>

      <Vitrine
        nome="Modal + Drawer"
        arquivo="@mantine/core"
        props='Modal centered radius="lg" · Drawer position="bottom" (filtros do celular)'
        fundo="branco"
      >
        <Group gap="sm">
          <Button variant="default" h={44} onClick={abrirJanela}>
            Abrir janela de confirmação
          </Button>
          <Button
            variant="default"
            h={44}
            onClick={abrirGaveta}
            leftSection={<Icone nome="tune" tamanho={20} />}
          >
            Abrir gaveta de filtros
          </Button>
        </Group>
        <Modal
          opened={janela}
          onClose={fecharJanela}
          title="Apagar seus dados?"
          centered
          radius="lg"
          closeButtonProps={{ 'aria-label': 'Fechar sem apagar' }}
        >
          <Text>Exemplo de janela. Os botões só fecham: nada é apagado.</Text>
          <Group justify="flex-end" gap="sm" mt="lg">
            <Button variant="default" h={48} onClick={fecharJanela}>
              Cancelar
            </Button>
            <Button color="var(--cor-erro)" h={48} onClick={fecharJanela}>
              Sim, apagar tudo
            </Button>
          </Group>
        </Modal>
        <Drawer
          opened={gaveta}
          onClose={fecharGaveta}
          position="bottom"
          title="Filtrar e ordenar"
          closeButtonProps={{ 'aria-label': 'Fechar filtros' }}
        >
          <Text>Exemplo de gaveta que sobe de baixo, como os filtros de pedidos no celular.</Text>
          <Button size="md" fullWidth mt="lg" onClick={fecharGaveta}>
            Ver 12 pedidos
          </Button>
        </Drawer>
      </Vitrine>
    </Subsecao>
  );
}
