import { Group, SimpleGrid, Stack, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Cartao from '../../Cartao';
import SecaoCabecalho from '../../SecaoCabecalho';
import LinkVoltar from '../../LinkVoltar';
import EstadoVazio from '../../EstadoVazio';
import TextoResponsivo from '../../TextoResponsivo';
import Etiqueta from '../../Etiqueta';
import EtiquetaStatus from '../../EtiquetaStatus';
import AvisoAlerta from '../../AvisoAlerta';
import { STATUS_PEDIDO } from '../../../dados/statusPedido';
import { STATUS_PROJETO } from '../../../dados/statusProjeto';
import { ALERTAS } from '../../../dados/alertas';

// Peças de layout usadas em quase todas as telas.
export default function AppLayout() {
  const projetoAberto = STATUS_PROJETO[0];

  return (
    <Subsecao id="app-layout" titulo="Layout">
      <Vitrine
        nome="CabecalhoPagina"
        arquivo="src/componentes/CabecalhoPagina.jsx"
        props="titulo · descricao (h1 de cada página)"
      >
        <Text fz={14}>
          O título “Componentes” no topo desta página é o próprio CabecalhoPagina. Ele não é
          repetido aqui porque cada página tem um só h1.
        </Text>
      </Vitrine>

      <Vitrine
        nome="SecaoCabecalho"
        arquivo="src/componentes/SecaoCabecalho.jsx"
        props="id · titulo · tituloCurto · caminho · rotuloLink · rotuloLinkCurto (h2)"
      >
        <SecaoCabecalho
          id="vitrine-secao-cabecalho"
          titulo="Meus pedidos em andamento"
          tituloCurto="Meus pedidos"
          caminho="/perfil/pedidos"
          rotuloLink="Ver todos"
        />
      </Vitrine>

      <Vitrine nome="LinkVoltar" arquivo="src/componentes/LinkVoltar.jsx" props="caminho · rotulo">
        <LinkVoltar caminho="/servicos" rotulo="Todos os serviços" />
      </Vitrine>

      <Vitrine
        nome="Cartao"
        arquivo="src/componentes/Cartao.jsx"
        props='children · props do Paper (radius="xl" p="md")'
      >
        <Cartao>
          <Text fw={700}>Caixa branca com borda, sombra leve e cantos de 20 px</Text>
          <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
            Padding de 16 px nos quatro lados.
          </Text>
        </Cartao>
      </Vitrine>

      <Vitrine
        nome="EstadoVazio"
        arquivo="src/componentes/EstadoVazio.jsx"
        props="texto · rotuloBotao · caminho · icone (sem botão / com botão)"
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <EstadoVazio texto="Nenhum pedido seu foi encerrado ainda." />
          <EstadoVazio
            texto="Você ainda não abriu pedidos."
            rotuloBotao="Abrir pedido"
            caminho="/pedidos/novo"
            icone="add"
          />
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="TextoResponsivo"
        arquivo="src/componentes/TextoResponsivo.jsx"
        props="curto (celular) · longo (computador)"
      >
        <Text fw={600}>
          <TextoResponsivo curto="Ver todos" longo="Ver todos os serviços" />
        </Text>
        <Text fz={13} c="var(--cor-texto-suave)">
          Diminua a janela para ver o texto curto.
        </Text>
      </Vitrine>

      <Vitrine
        nome="Etiqueta + EtiquetaStatus"
        arquivo="src/componentes/Etiqueta.jsx · EtiquetaStatus.jsx"
        props="Etiqueta texto corFundo corTexto · EtiquetaStatus status (cada status de pedido)"
      >
        <Stack gap="sm">
          <Etiqueta
            texto={projetoAberto.rotulo}
            corFundo={projetoAberto.corFundo}
            corTexto={projetoAberto.corTexto}
          />
          <Group gap="sm">
            {STATUS_PEDIDO.map((status) => (
              <EtiquetaStatus key={status.id} status={status.id} />
            ))}
          </Group>
        </Stack>
      </Vitrine>

      <Vitrine
        nome="AvisoAlerta"
        arquivo="src/componentes/AvisoAlerta.jsx"
        props='alerta · caminho (role="status")'
      >
        <AvisoAlerta alerta={ALERTAS[0]} />
      </Vitrine>
    </Subsecao>
  );
}
