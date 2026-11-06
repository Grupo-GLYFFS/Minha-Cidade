import { Title } from '@mantine/core';
import classes from './FichaServico.module.css';

// Uma parte da ficha do serviço, com título (ex.: "Quem pode usar") e o conteúdo embaixo.
// Recebe o id do título (para o aria-labelledby), o título e o conteúdo (children).
export default function SecaoFicha({ id, titulo, children }) {
  return (
    <section aria-labelledby={id} className={classes.secao}>
      <Title order={2} id={id} fz={18} fw={700} lh={1.3} mb="sm">
        {titulo}
      </Title>
      {children}
    </section>
  );
}
