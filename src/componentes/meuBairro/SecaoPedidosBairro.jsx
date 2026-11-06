import { Link } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import CartaoPedido from '../CartaoPedido';
import Icone from '../Icone';
import SecaoCabecalho from '../SecaoCabecalho';
import { pluralizar } from '../../logica/formatos';
import { pedidosPrioritariosDoBairro, resumirPedidosDoBairro } from '../../logica/pedidos';
import classes from './SecoesMeuBairro.module.css';

// Seção "Pedidos no bairro" de Meu Bairro: quantos pedidos estão em andamento,
// os 3 mais prioritários, o link para ver todos (já filtrados pelo bairro) e o botão de abrir pedido.
// Recebe a lista de todos os pedidos e o nome do bairro.
export default function SecaoPedidosBairro({ pedidos, bairro }) {
  const { abertos } = resumirPedidosDoBairro(pedidos, bairro);
  const principais = pedidosPrioritariosDoBairro(pedidos, bairro, 3);
  const caminhoTodos = `/pedidos?bairro=${encodeURIComponent(bairro)}`;

  return (
    <section aria-labelledby="pedidos-bairro-titulo">
      <SecaoCabecalho
        id="pedidos-bairro-titulo"
        titulo="Pedidos no bairro"
        caminho={abertos > 0 ? caminhoTodos : undefined}
        rotuloLink="Ver todos os pedidos do bairro"
        rotuloLinkCurto="Ver todos"
      />
      <Text fz={14} c="var(--cor-texto-suave)" mb="sm">
        {abertos > 0
          ? `${pluralizar(abertos, 'pedido em andamento', 'pedidos em andamento')}. Os mais prioritários:`
          : 'Nenhum pedido em andamento neste bairro. Viu um problema na rua? Avise a prefeitura.'}
      </Text>

      {principais.length > 0 && (
        <ul className={classes.grade} data-colunas="3">
          {principais.map((pedido) => (
            <li key={pedido.id}>
              <CartaoPedido pedido={pedido} />
            </li>
          ))}
        </ul>
      )}

      <Button
        component={Link}
        to="/pedidos/novo"
        h={48}
        mt="md"
        leftSection={<Icone nome="add" tamanho={20} />}
      >
        Abrir pedido
      </Button>
    </section>
  );
}
