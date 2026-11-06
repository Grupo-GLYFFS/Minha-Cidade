import { Paper } from '@mantine/core';
import classes from './Cartao.module.css';

// Caixa branca com borda, sombra leve e cantos de 20 px, usada em todo o app.
// Recebe o conteúdo (children) e qualquer prop do Paper do Mantine (ex.: component="article").
export default function Cartao({ children, className, ...props }) {
  const classesFinais = className ? `${classes.cartao} ${className}` : classes.cartao;

  return (
    <Paper radius="xl" p="md" className={classesFinais} {...props}>
      {children}
    </Paper>
  );
}
