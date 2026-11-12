import { useState } from 'react';
import { SimpleGrid, Stack, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AlternarExemplos from '../AlternarExemplos';
import BotaoApoiar from '../../pedidos/BotaoApoiar';
import BlocoApoio from '../../pedidos/BlocoApoio';
import BotaoAbrirPedido from '../../pedidos/BotaoAbrirPedido';
import ResultadoFiltros from '../../pedidos/ResultadoFiltros';
import SemResultados from '../../pedidos/SemResultados';
import BarraFiltros from '../../pedidos/BarraFiltros';
import FiltrosCelular from '../../pedidos/FiltrosCelular';
import { PEDIDOS } from '../../../dados/pedidos';
import { estaAberto } from '../../../logica/pedidos';
import { FILTROS_VAZIOS, atualizarFiltro, opcoesDeBairro } from '../../../logica/filtrosPedidos';

const ABERTOS = PEDIDOS.filter(estaAberto);
const ENCERRADO = PEDIDOS.find((pedido) => pedido.status === 'concluida');

// Os cinco estados do botão "Apoiar". Cada um usa um pedido diferente, porque o botão
// desativado liga o motivo pelo id do pedido (o id não pode se repetir na página).
const ESTADOS_APOIO = [
  { id: 'pode', rotulo: 'Pode apoiar', pedido: ABERTOS[2] },
  { id: 'ja', rotulo: 'Já apoiou', motivo: 'ja-apoiou', pedido: ABERTOS[3] },
  { id: 'proprio', rotulo: 'Pedido da pessoa', motivo: 'proprio', pedido: ABERTOS[0] },
  { id: 'encerrado', rotulo: 'Encerrado', motivo: 'encerrado', pedido: ENCERRADO },
  { id: 'visitante', rotulo: 'Visitante', logado: false, pedido: ABERTOS[4] },
];

// Os estados lado a lado, no tamanho da página do pedido (completo) ou do cartão
function GradeApoio({ completo }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
      {ESTADOS_APOIO.map((estado) => (
        <div key={estado.id}>
          <Text fz={12} fw={700} c="var(--cor-texto-suave)" mb={4}>
            {estado.rotulo}
          </Text>
          <ContextoSimulado logado={estado.logado ?? true} motivoApoio={estado.motivo ?? null}>
            <BotaoApoiar
              pedido={estado.pedido}
              texto={completo ? 'Apoiar este pedido' : 'Apoiar'}
              completo={completo}
            />
          </ContextoSimulado>
        </div>
      ))}
    </SimpleGrid>
  );
}

// Apoio (botão em cada estado e bloco da página do pedido), botão de abrir pedido e filtros.
export default function AppPedidosApoio() {
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS);
  const [visao, setVisao] = useState('grade');
  const mudar = (nome, valor) => setFiltros((atual) => atualizarFiltro(atual, nome, valor));

  return (
    <Subsecao
      titulo="Apoio e filtros"
      descricao="Clicar em “Apoiar” aqui só troca o botão para “Você apoiou”: o apoio é simulado."
    >
      <Vitrine
        nome="BotaoApoiar"
        arquivo="src/componentes/pedidos/BotaoApoiar.jsx"
        props="pedido · texto · completo (página do pedido) ou não (cartão)"
        fundo="branco"
      >
        <AlternarExemplos
          rotulo="Tamanho do botão Apoiar"
          opcoes={[
            { valor: 'completo', rotulo: 'Página do pedido', conteudo: <GradeApoio completo /> },
            { valor: 'cartao', rotulo: 'Cartão', conteudo: <GradeApoio completo={false} /> },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="BlocoApoio"
        arquivo="src/componentes/pedidos/BlocoApoio.jsx"
        props="pedido (NumeroApoios grande + BotaoApoiar completo)"
      >
        <ContextoSimulado>
          <BlocoApoio pedido={ABERTOS[5] ?? ABERTOS[1]} />
        </ContextoSimulado>
      </Vitrine>

      <Vitrine
        nome="BotaoAbrirPedido + ResultadoFiltros"
        arquivo="src/componentes/pedidos/"
        props="ResultadoFiltros total · temFiltro · aoLimpar"
      >
        <Stack gap="md">
          <BotaoAbrirPedido />
          <ResultadoFiltros total={12} temFiltro={false} aoLimpar={() => {}} />
          <ResultadoFiltros total={1} temFiltro aoLimpar={() => {}} />
        </Stack>
      </Vitrine>

      <Vitrine
        nome="SemResultados"
        arquivo="src/componentes/pedidos/SemResultados.jsx"
        props="aoLimpar"
      >
        <SemResultados aoLimpar={() => {}} />
      </Vitrine>

      <Vitrine
        nome="BarraFiltros (computador)"
        arquivo="src/componentes/pedidos/BarraFiltros.jsx + CampoBusca, CampoOrdem, CamposFiltro, SeletorVisao"
        props="filtros · aoMudar · opcoesBairro · visao · aoMudarVisao (estado só desta caixa)"
      >
        <BarraFiltros
          filtros={filtros}
          aoMudar={mudar}
          opcoesBairro={opcoesDeBairro(PEDIDOS, filtros.regiao)}
          visao={visao}
          aoMudarVisao={setVisao}
        />
      </Vitrine>

      <Vitrine
        nome="FiltrosCelular"
        arquivo="src/componentes/pedidos/FiltrosCelular.jsx"
        props="filtros · aoMudar · opcoesBairro · total · aoLimpar (gaveta que sobe de baixo)"
      >
        <FiltrosCelular
          filtros={filtros}
          aoMudar={mudar}
          opcoesBairro={opcoesDeBairro(PEDIDOS, filtros.regiao)}
          total={12}
          aoLimpar={() => setFiltros(FILTROS_VAZIOS)}
        />
      </Vitrine>
    </Subsecao>
  );
}
