import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import CartaoPedido from '../CartaoPedido';
import Icone from '../Icone';
import { usePedidos } from '../../contexto/usePedidos';
import classes from './AvisoDuplicado.module.css';

// Textos do aviso para cada situação de quem tenta abrir o pedido repetido
const TEXTOS = {
  podeApoiar: {
    titulo: 'Já existe um pedido igual aberto',
    texto:
      'Alguém já pediu o mesmo conserto nesta rua. Pedidos repetidos atrasam a análise. Apoiando, você aumenta a prioridade do pedido que já existe.',
  },
  proprio: {
    titulo: 'Você já abriu este pedido',
    texto:
      'Existe um pedido seu, ainda aberto, com a mesma categoria nesta rua. Acompanhe por ele: pedidos repetidos atrasam a análise.',
  },
  'ja-apoiou': {
    titulo: 'Já existe um pedido igual aberto',
    texto:
      'Você já apoiou este pedido, então ele já conta com a sua força. Pedidos repetidos atrasam a análise.',
  },
};

// Painel mostrado no lugar do envio quando já existe um pedido aberto igual
// (mesma categoria, bairro e rua). Oferece apoiar o pedido existente em vez de criar outro.
// Recebe o pedido existente e aoEditar(), para voltar ao formulário com os dados preenchidos.
export default function AvisoDuplicado({ existente, aoEditar }) {
  const { apoiar, explicarSemApoio } = usePedidos();
  const navigate = useNavigate();
  const tituloRef = useRef(null);
  const motivo = explicarSemApoio(existente);
  const textos = TEXTOS[motivo ?? 'podeApoiar'] ?? TEXTOS.podeApoiar;
  const caminho = `/pedidos/${existente.id}`;

  // Leva o foco ao título para o leitor de tela anunciar o aviso
  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  // Soma o apoio e abre o pedido existente, com o aviso de sucesso lá
  function apoiarExistente() {
    if (apoiar(existente.id)) navigate(caminho, { state: { aviso: 'apoiou' } });
  }

  return (
    <Cartao component="section" aria-labelledby="duplicado-titulo" className={classes.painel}>
      <Stack gap="md">
        <Group gap="sm" wrap="nowrap" align="flex-start">
          <span className={classes.icone}>
            <Icone nome="content_copy" tamanho={24} />
          </span>
          <div>
            <Title
              order={2}
              id="duplicado-titulo"
              ref={tituloRef}
              tabIndex={-1}
              fz={{ base: 20, md: 22 }}
              className={classes.titulo}
            >
              {textos.titulo}
            </Title>
            <Text mt={4} c="var(--cor-texto-suave)">
              {textos.texto}
            </Text>
          </div>
        </Group>

        <CartaoPedido pedido={existente} />

        <SimpleGrid cols={{ base: 1, md: motivo ? 2 : 3 }} spacing="sm">
          {motivo === null && (
            <Button
              size="md"
              onClick={apoiarExistente}
              leftSection={<Icone nome="thumb_up" tamanho={20} />}
            >
              Apoiar o pedido existente
            </Button>
          )}
          <Button
            component={Link}
            to={caminho}
            size="md"
            variant={motivo === null ? 'default' : 'filled'}
          >
            Ver o pedido
          </Button>
          <Button size="md" variant="subtle" onClick={aoEditar}>
            Voltar e editar
          </Button>
        </SimpleGrid>
      </Stack>
    </Cartao>
  );
}
