import { Link } from 'react-router-dom';
import { Anchor, Group, Text, Title, VisuallyHidden } from '@mantine/core';
import Cartao from './Cartao';
import EtiquetaStatus from './EtiquetaStatus';
import Icone from './Icone';
import TextoResponsivo from './TextoResponsivo';
import { buscarCategoria, textoUltimaMudanca } from '../logica/pedidos';
import { pluralizar } from '../logica/formatos';
import classes from './CartaoPedido.module.css';

// Cartão compacto de um pedido: status, protocolo, título, endereço, última mudança e apoios.
// Recebe o pedido e o nível do título (3 por padrão, dentro de uma seção com h2).
export default function CartaoPedido({ pedido, nivelTitulo = 3 }) {
  const categoria = buscarCategoria(pedido.categoria);
  const endereco = `${pedido.rua}, ${pedido.numero}`;

  return (
    <Cartao component="article">
      <Group justify="space-between" gap="sm" wrap="nowrap" mb="sm">
        <EtiquetaStatus status={pedido.status} />
        <Text fz={{ base: 12, md: 13 }} c="var(--cor-texto-suave)">
          Protocolo {pedido.protocolo}
        </Text>
      </Group>

      <Title order={nivelTitulo} fz={{ base: 16, md: 17 }} fw={700} lh={1.3}>
        {pedido.titulo}
      </Title>

      <Group gap={4} wrap="nowrap" mt={4} c="var(--cor-texto-suave)">
        <Icone nome="location_on" tamanho={18} />
        <Text fz={{ base: 13, md: 14 }} c="inherit">
          {/* No celular só cabe o endereço; no computador aparece também a categoria */}
          <TextoResponsivo
            curto={endereco}
            longo={categoria ? `${endereco} · ${categoria.rotulo}` : endereco}
          />
        </Text>
      </Group>

      <Group justify="space-between" gap="sm" mt="sm" pt="sm" className={classes.rodape}>
        <Text fz={13} c="var(--cor-texto-suave)">
          {textoUltimaMudanca(pedido)} · {pluralizar(pedido.apoios, 'apoio', 'apoios')}
        </Text>
        <Anchor component={Link} to={`/pedidos/${pedido.id}`} fz={14} fw={600} c="var(--cor-link)">
          Acompanhar
          <VisuallyHidden> o pedido {pedido.titulo}</VisuallyHidden>
        </Anchor>
      </Group>
    </Cartao>
  );
}
