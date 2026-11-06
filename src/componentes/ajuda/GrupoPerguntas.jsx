import { Accordion, Text, Title } from '@mantine/core';
import Icone from '../Icone';
import classes from './GrupoPerguntas.module.css';

// Um grupo das Perguntas frequentes (ex.: "Pedidos"): título e as perguntas que abrem e fecham.
// Cada pergunta é um botão (abre com Enter ou espaço) dentro de um título de nível 3.
// Recebe o grupo { id, titulo, perguntas }.
export default function GrupoPerguntas({ grupo }) {
  const idTitulo = `perguntas-${grupo.id}`;

  return (
    <section aria-labelledby={idTitulo}>
      <Title order={2} id={idTitulo} fz={{ base: 18, md: 20 }} fw={700} mb="sm">
        {grupo.titulo}
      </Title>
      <Accordion
        order={3}
        variant="separated"
        radius="lg"
        multiple
        chevron={<Icone nome="expand_more" tamanho={24} />}
        classNames={{ item: classes.item, control: classes.controle }}
      >
        {grupo.perguntas.map((item) => (
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
    </section>
  );
}
