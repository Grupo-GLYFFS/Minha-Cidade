import { Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './DoisLados.module.css';

// "Os dois lados": prós e contras do projeto, com o mesmo destaque, para a pessoa decidir.
// Recebe o projeto (listas pros e contras).
export default function DoisLados({ projeto }) {
  const lados = [
    { id: 'pros', titulo: 'Prós', icone: 'thumb_up', itens: projeto.pros },
    { id: 'contras', titulo: 'Contras', icone: 'thumb_down', itens: projeto.contras },
  ];

  return (
    <section aria-labelledby="dois-lados-titulo">
      <Title order={2} id="dois-lados-titulo" fz={{ base: 18, md: 20 }} fw={700}>
        Os dois lados
      </Title>
      <Text fz={14} c="var(--cor-texto-suave)" mt={4} mb="sm">
        O que pode melhorar e o que pode piorar com o projeto, segundo os estudos da prefeitura.
      </Text>

      <div className={classes.lados}>
        {lados.map((lado) => (
          <Cartao key={lado.id} component="section" aria-labelledby={`${lado.id}-titulo`}>
            <Group gap={8} wrap="nowrap" mb="sm">
              <Icone nome={lado.icone} tamanho={24} />
              <Title order={3} id={`${lado.id}-titulo`} fz={{ base: 16, md: 17 }} fw={700}>
                {lado.titulo}
              </Title>
            </Group>
            <ul className={classes.lista}>
              {lado.itens.map((item) => (
                <li key={item} className={classes.item}>
                  <span className={classes.icone}>
                    <Icone nome={lado.icone} tamanho={18} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Cartao>
        ))}
      </div>
    </section>
  );
}
