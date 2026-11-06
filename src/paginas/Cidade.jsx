import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, SegmentedControl, Stack, Text } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Cartao from '../componentes/Cartao';
import Icone from '../componentes/Icone';
import BotaoAbrirPedido from '../componentes/pedidos/BotaoAbrirPedido';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';

const SECOES = [
  { value: 'pedidos', label: 'Pedidos' },
  { value: 'cidade-aberta', label: 'Cidade Aberta' },
];

// Cidade (aba Cidade no celular): junta os pedidos de melhoria e a Cidade Aberta.
// Um seletor no topo troca entre as duas partes.
export default function Cidade() {
  const [secao, setSecao] = useState('pedidos');

  return (
    <Stack gap="lg">
      <CabecalhoPagina titulo="Cidade" />

      <SegmentedControl
        aria-label="Escolha o que ver"
        data={SECOES}
        value={secao}
        onChange={setSecao}
        fullWidth
        size="md"
        radius="md"
      />

      {secao === 'pedidos' ? (
        <Stack gap="md">
          <Text c="var(--cor-texto-suave)">
            Veja o que os moradores pediram, apoie os pedidos e abra o seu.
          </Text>
          <div>
            <BotaoAbrirPedido />
          </div>
          <ListaPedidos />
        </Stack>
      ) : (
        <Cartao>
          <Text>Votações, orçamento e obras da cidade, com dados abertos da prefeitura.</Text>
          <Button
            component={Link}
            to="/cidade-aberta"
            variant="light"
            mt="md"
            rightSection={<Icone nome="arrow_forward" tamanho={20} />}
          >
            Ir para a Cidade Aberta
          </Button>
        </Cartao>
      )}
    </Stack>
  );
}
