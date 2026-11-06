import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import Icone from '../Icone';
import classes from './BotaoAbrirPedido.module.css';

// Botão principal que leva ao formulário de novo pedido.
// No celular ocupa a linha inteira; no computador fica do tamanho do texto.
export default function BotaoAbrirPedido() {
  return (
    <Button
      component={Link}
      to="/pedidos/novo"
      size="md"
      className={classes.botao}
      leftSection={<Icone nome="add" tamanho={20} />}
    >
      Abrir pedido
    </Button>
  );
}
