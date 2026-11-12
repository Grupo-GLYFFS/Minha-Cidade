import { Group, SimpleGrid, Stack } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AlternarExemplos from '../AlternarExemplos';
import AmostraSobDemanda from '../AmostraSobDemanda';
import CartaoPedido from '../../CartaoPedido';
import IndicadorPrioridade from '../../pedidos/IndicadorPrioridade';
import NumeroApoios from '../../pedidos/NumeroApoios';
import CartaoPrioridade from '../../pedidos/CartaoPrioridade';
import SobrePedido from '../../pedidos/SobrePedido';
import LinhaDoTempoPedido from '../../pedidos/LinhaDoTempoPedido';
import CabecalhoDetalhe from '../../pedidos/CabecalhoDetalhe';
import { PEDIDOS } from '../../../dados/pedidos';
import { pedidosPorNivel, umDeCada } from '../../../logica/vitrine';

// Pedidos de exemplo: um em execução, um aprovado, um avaliado e um recusado
const [EM_EXECUCAO, APROVADO, AVALIADO, RECUSADO] = umDeCada(PEDIDOS, 'status', [
  'em-execucao',
  'aprovada',
  'avaliada',
  'recusada',
]);

// Cartão de pedido nos dois jeitos, prioridade, apoios e as partes da página do pedido.
export default function AppPedidos() {
  return (
    <Subsecao id="app-pedidos" titulo="Pedidos">
      <Vitrine
        nome="CartaoPedido"
        arquivo="src/componentes/CartaoPedido.jsx"
        props="pedido · nivelTitulo={4} · resumo (Início e Meus pedidos)"
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <CartaoPedido pedido={EM_EXECUCAO} nivelTitulo={4} />
          <CartaoPedido pedido={RECUSADO} nivelTitulo={4} />
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="CartaoPedido comApoio"
        arquivo="src/componentes/CartaoPedido.jsx + pedidos/RodapeCartaoPedido.jsx"
        props='comApoio · layout="grade" | "lista" (com BotaoApoiar simulado)'
      >
        <ContextoSimulado>
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <CartaoPedido pedido={APROVADO} nivelTitulo={4} comApoio />
              <ContextoSimulado motivoApoio="encerrado">
                <CartaoPedido pedido={AVALIADO} nivelTitulo={4} comApoio />
              </ContextoSimulado>
            </SimpleGrid>
            <CartaoPedido pedido={APROVADO} nivelTitulo={4} comApoio layout="lista" />
          </Stack>
        </ContextoSimulado>
      </Vitrine>

      <Vitrine
        nome="IndicadorPrioridade + NumeroApoios"
        arquivo="src/componentes/pedidos/"
        props="IndicadorPrioridade pedido fz · NumeroApoios apoios grande"
      >
        <Group gap="xl" align="flex-end">
          <Stack gap="sm">
            {pedidosPorNivel(PEDIDOS).map(({ nivel, pedido }) => (
              <IndicadorPrioridade key={nivel.id} pedido={pedido} />
            ))}
          </Stack>
          <NumeroApoios apoios={23} />
          <NumeroApoios apoios={23} grande />
        </Group>
      </Vitrine>

      <Vitrine
        nome="CartaoPrioridade"
        arquivo="src/componentes/pedidos/CartaoPrioridade.jsx"
        props="pedido"
      >
        <CartaoPrioridade pedido={EM_EXECUCAO} />
      </Vitrine>

      <Vitrine nome="SobrePedido" arquivo="src/componentes/pedidos/SobrePedido.jsx" props="pedido">
        <SobrePedido pedido={EM_EXECUCAO} />
      </Vitrine>

      <Vitrine
        nome="LinhaDoTempoPedido"
        arquivo="src/componentes/pedidos/LinhaDoTempoPedido.jsx"
        props="pedido (em execução / avaliado / recusado)"
      >
        <AlternarExemplos
          rotulo="Estado do pedido"
          opcoes={[
            {
              valor: 'execucao',
              rotulo: 'Em execução',
              conteudo: <LinhaDoTempoPedido pedido={EM_EXECUCAO} />,
            },
            {
              valor: 'avaliado',
              rotulo: 'Avaliado',
              conteudo: <LinhaDoTempoPedido pedido={AVALIADO} />,
            },
            {
              valor: 'recusado',
              rotulo: 'Recusado',
              conteudo: <LinhaDoTempoPedido pedido={RECUSADO} />,
            },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="CabecalhoDetalhe"
        arquivo="src/componentes/pedidos/CabecalhoDetalhe.jsx"
        props="pedido (topo da página do pedido)"
      >
        <AmostraSobDemanda aviso="Tem o título h1 da página do pedido, por isso só aparece quando você pede.">
          <CabecalhoDetalhe pedido={EM_EXECUCAO} />
        </AmostraSobDemanda>
      </Vitrine>
    </Subsecao>
  );
}
