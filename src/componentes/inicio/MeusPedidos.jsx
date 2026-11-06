import { Link } from 'react-router-dom';
import { Anchor, Button, Stack, Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import CartaoPedido from '../CartaoPedido';
import SecaoCabecalho from '../SecaoCabecalho';

// Lista dos pedidos em andamento da pessoa.
// Recebe os pedidos já filtrados e "nuncaAbriu" (true se a pessoa ainda não abriu nenhum pedido).
// Sem pedidos em andamento, convida a abrir um; conta nova ganha o botão "Abrir meu primeiro pedido".
export default function MeusPedidos({ pedidos, nuncaAbriu = false }) {
  return (
    <section aria-labelledby="pedidos-titulo">
      <SecaoCabecalho
        id="pedidos-titulo"
        titulo="Meus pedidos em andamento"
        tituloCurto="Meus pedidos"
        caminho={nuncaAbriu ? undefined : '/perfil/pedidos'}
        rotuloLink="Ver todos"
      />

      {nuncaAbriu && (
        <Cartao>
          <Text c="var(--cor-texto-suave)">Você ainda não abriu pedidos.</Text>
          <Button
            component={Link}
            to="/pedidos/novo"
            h={48}
            mt="md"
            leftSection={<Icone nome="add" tamanho={20} />}
          >
            Abrir meu primeiro pedido
          </Button>
        </Cartao>
      )}

      {!nuncaAbriu && pedidos.length > 0 && (
        <Stack gap="sm">
          {pedidos.map((pedido) => (
            <CartaoPedido key={pedido.id} pedido={pedido} />
          ))}
        </Stack>
      )}

      {!nuncaAbriu && pedidos.length === 0 && (
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
