import { SimpleGrid } from '@mantine/core';
import CartaoCategoria from './CartaoCategoria';
import { CATEGORIAS_SERVICOS } from '../../dados/categoriasServicos';
import { servicosDaCategoria } from '../../logica/servicos';
import classes from './GradeCategorias.module.css';

// Grade com todos os assuntos do catálogo: 1 ou 2 colunas no celular, 3 ou 4 no computador.
export default function GradeCategorias() {
  return (
    <SimpleGrid
      component="ul"
      cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
      spacing={{ base: 'sm', md: 'md' }}
      className={classes.lista}
    >
      {CATEGORIAS_SERVICOS.map((categoria) => (
        <li key={categoria.id}>
          <CartaoCategoria
            categoria={categoria}
            quantidade={servicosDaCategoria(categoria.id).length}
          />
        </li>
      ))}
    </SimpleGrid>
  );
}
