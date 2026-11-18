import { Link } from 'react-router-dom';
import { Anchor, Group, Text, Title } from '@mantine/core';
import EtiquetaStatus from '../EtiquetaStatus';
import Icone from '../Icone';
import { buscarCategoria, textoUltimaMudanca } from '../../logica/pedidos';
import { formatarDataExtenso } from '../../logica/datas';

// Topo da página de um pedido: link de voltar, status, protocolo, título,
// categoria com o órgão responsável e as datas. Recebe o pedido.
export default function CabecalhoDetalhe({ pedido }) {
  const categoria = buscarCategoria(pedido.categoria);

  return (
    <header>
      <Anchor
        component={Link}
        to="/minha-cidade/pedidos"
        fw={600}
        fz={14}
        c="var(--cor-link)"
        display="inline-flex"
        mih={44}
      >
        <Group gap={4} wrap="nowrap">
          <Icone nome="arrow_back" tamanho={20} />
          Voltar para pedidos
        </Group>
      </Anchor>

      <Group gap="sm" mt="sm">
        <EtiquetaStatus status={pedido.status} />
        <Text fz={13} c="var(--cor-texto-suave)">
          Protocolo {pedido.protocolo}
        </Text>
      </Group>

      <Title order={1} fz={{ base: 26, md: 32 }} lh={1.15} lts="-0.02em" mt="sm">
        {pedido.titulo}
      </Title>

      {categoria && (
        <Group gap={4} wrap="nowrap" mt="sm" c="var(--cor-texto-suave)">
          <Icone nome={categoria.icone} tamanho={20} />
          <Text fz={{ base: 14, md: 15 }} c="inherit">
            {categoria.rotulo} · Responsável: <strong>{categoria.orgao}</strong>
          </Text>
        </Group>
      )}

      <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
        Enviado em {formatarDataExtenso(pedido.criadoEm)} · {textoUltimaMudanca(pedido)}
      </Text>
    </header>
  );
}
