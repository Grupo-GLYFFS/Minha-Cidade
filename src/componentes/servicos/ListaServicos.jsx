import { SimpleGrid } from '@mantine/core';
import ItemServico from './ItemServico';
import classes from './ListaServicos.module.css';

// Lista de serviços em cartões: 1 coluna no celular e até 2 no computador.
// Recebe os serviços e, se quiser, o número de colunas no computador (1 ou 2).
export default function ListaServicos({ servicos, colunas = 2 }) {
  return (
    <SimpleGrid
      component="ul"
      cols={{ base: 1, md: colunas }}
      spacing={{ base: 'sm', md: 'md' }}
      className={classes.lista}
    >
      {servicos.map((servico) => (
        <li key={servico.id}>
          <ItemServico servico={servico} />
        </li>
      ))}
    </SimpleGrid>
  );
}
