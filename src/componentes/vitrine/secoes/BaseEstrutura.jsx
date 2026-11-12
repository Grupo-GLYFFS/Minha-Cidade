import { Accordion, Button, Menu, Stepper, Tabs, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Icone from '../../Icone';
import { GRUPOS_PERGUNTAS } from '../../../dados/perguntas';

const PERGUNTAS = GRUPOS_PERGUNTAS[0].perguntas.slice(0, 2);

// Abas, sanfona, menu suspenso e passos (Stepper), como aparecem nas telas.
export default function BaseEstrutura() {
  return (
    <Subsecao id="base-estrutura" titulo="Abas, sanfona e menu">
      <Vitrine
        nome="Tabs"
        arquivo="@mantine/core"
        props="Tabs.List grow (Meus pedidos, Grandes projetos)"
        fundo="branco"
      >
        <Tabs defaultValue="pedidos">
          <Tabs.List grow>
            <Tabs.Tab value="pedidos">Pedidos de melhoria</Tabs.Tab>
            <Tabs.Tab value="servicos">Serviços solicitados</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="pedidos" pt="md">
            <Text fz={14}>Conteúdo da aba “Pedidos de melhoria”.</Text>
          </Tabs.Panel>
          <Tabs.Panel value="servicos" pt="md">
            <Text fz={14}>Conteúdo da aba “Serviços solicitados”.</Text>
          </Tabs.Panel>
        </Tabs>
      </Vitrine>

      <Vitrine
        nome="Accordion"
        arquivo="@mantine/core"
        props='variant="separated" radius="lg" multiple · order={3} (pergunta é título h3)'
        fundo="tela"
      >
        <Accordion
          order={4}
          variant="separated"
          radius="lg"
          multiple
          chevron={<Icone nome="expand_more" tamanho={24} />}
        >
          {PERGUNTAS.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Control>{item.pergunta}</Accordion.Control>
              <Accordion.Panel>
                <Text c="var(--cor-texto-suave)" lh={1.55}>
                  {item.resposta}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Vitrine>

      <Vitrine
        nome="Menu"
        arquivo="@mantine/core"
        props='position="bottom-end" width={220} radius="md" (menu da conta)'
        fundo="branco"
      >
        <Menu position="bottom-start" width={220} radius="md" shadow="md">
          <Menu.Target>
            <Button
              variant="default"
              h={44}
              rightSection={<Icone nome="expand_more" tamanho={20} />}
            >
              Abrir o menu
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Maria Souza</Menu.Label>
            <Menu.Item leftSection={<Icone nome="person" tamanho={20} />}>Meu perfil</Menu.Item>
            <Menu.Item leftSection={<Icone nome="list_alt" tamanho={20} />}>Meus pedidos</Menu.Item>
            <Menu.Divider />
            <Menu.Item leftSection={<Icone nome="logout" tamanho={20} />}>
              Sair (exemplo, não sai)
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Vitrine>

      <Vitrine
        nome="Stepper"
        arquivo="@mantine/core"
        props='size="sm" active={1} (cadastro no computador)'
        fundo="branco"
      >
        <Stepper active={1} size="sm" allowNextStepsSelect={false} aria-label="Passos do exemplo">
          <Stepper.Step label="Você" description="Seus dados" />
          <Stepper.Step label="Endereço" description="Onde você mora" />
          <Stepper.Step label="Comprovante" description="Comprovante de residência" />
        </Stepper>
      </Vitrine>
    </Subsecao>
  );
}
