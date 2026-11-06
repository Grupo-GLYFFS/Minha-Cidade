import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import BotaoApoiar from './BotaoApoiar';
import NumeroApoios from './NumeroApoios';

// Bloco de apoio da página do pedido: número grande de apoios e o botão "Apoiar este pedido".
// Recebe o pedido.
export default function BlocoApoio({ pedido }) {
  return (
    <Cartao component="section" aria-labelledby="apoio-titulo">
      <Title order={2} id="apoio-titulo" fz={18} fw={700}>
        Apoios
      </Title>
      <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
        Tem o mesmo problema? Apoiar mostra à prefeitura que mais gente precisa da solução e sobe a
        prioridade do pedido.
      </Text>

      <NumeroApoios key={pedido.id} apoios={pedido.apoios} grande />

      <BotaoApoiar pedido={pedido} texto="Apoiar este pedido" completo />
    </Cartao>
  );
}
