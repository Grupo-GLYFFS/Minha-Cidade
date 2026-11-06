import { Link } from 'react-router-dom';
import { Anchor, Stack, Text } from '@mantine/core';
import Cartao from '../Cartao';
import CartaoPedido from '../CartaoPedido';
import SecaoCabecalho from '../SecaoCabecalho';

// Lista dos pedidos em andamento da pessoa.
// Recebe os pedidos já filtrados; se não houver nenhum, convida a abrir um pedido.
export default function MeusPedidos({ pedidos }) {
  return (
    <section aria-labelledby="pedidos-titulo">
      <SecaoCabecalho
        id="pedidos-titulo"
        titulo="Meus pedidos em andamento"
        tituloCurto="Meus pedidos"
        caminho="/perfil/pedidos"
        rotuloLink="Ver todos"
      />

      {pedidos.length > 0 ? (
        <Stack gap="sm">
          {pedidos.map((pedido) => (
            <CartaoPedido key={pedido.id} pedido={pedido} />
          ))}
        </Stack>
      ) : (
        <Cartao>
          <Text c="var(--cor-texto-suave)">
            Você não tem pedidos em andamento.{' '}
            <Anchor component={Link} to="/pedidos/novo" fw={600} c="var(--cor-link)">
              Abrir um pedido
            </Anchor>
          </Text>
        </Cartao>
      )}
    </section>
  );
}
