import { Link } from 'react-router-dom';
import { Anchor, Group, Text, Title, VisuallyHidden } from '@mantine/core';
import Cartao from './Cartao';
import EtiquetaStatus from './EtiquetaStatus';
import Icone from './Icone';
import TextoResponsivo from './TextoResponsivo';
import RodapeCartaoPedido from './pedidos/RodapeCartaoPedido';
import { buscarCategoria, textoUltimaMudanca } from '../logica/pedidos';
import { pluralizar } from '../logica/formatos';
import classes from './CartaoPedido.module.css';

// Cartão de um pedido. Tem dois jeitos:
// - resumo (padrão, usado no Início): status, protocolo, título, endereço, última mudança e apoios;
// - comApoio (lista de pedidos): status, categoria, título, bairro e rua, apoios, prioridade
//   e o botão "Apoiar". O cartão inteiro leva ao pedido, mas o botão continua separado.
// Recebe o pedido, o nível do título (3 por padrão), "comApoio" e o layout ("grade" ou "lista").
export default function CartaoPedido({
  pedido,
  nivelTitulo = 3,
  comApoio = false,
  layout = 'grade',
}) {
  const categoria = buscarCategoria(pedido.categoria);
  const endereco = `${pedido.rua}, ${pedido.numero}`;
  const caminho = `/pedidos/${pedido.id}`;

  if (comApoio) {
    return (
      <Cartao component="article" className={classes.clicavel} data-layout={layout}>
        <div className={classes.principal}>
          <Group justify="space-between" gap="sm" mb="sm">
            <EtiquetaStatus status={pedido.status} />
            {categoria && (
              <Group gap={4} wrap="nowrap" c="var(--cor-texto-suave)">
                <Icone nome={categoria.icone} tamanho={18} />
                <Text component="span" fz={13} fw={500} c="inherit">
                  {categoria.rotulo}
                </Text>
              </Group>
            )}
          </Group>

          {/* O link do título se estica sobre o cartão todo (ver .linkEsticado no CSS) */}
          <Title order={nivelTitulo} fz={{ base: 16, md: 17 }} fw={700} lh={1.3}>
            <Link to={caminho} className={classes.linkEsticado}>
              {pedido.titulo}
            </Link>
          </Title>

          <Group gap={4} wrap="nowrap" mt={4} c="var(--cor-texto-suave)" align="flex-start">
            <Icone nome="location_on" tamanho={18} />
            <Text fz={{ base: 13, md: 14 }} c="inherit">
              {pedido.bairro} · {endereco}
            </Text>
          </Group>
        </div>

        <RodapeCartaoPedido pedido={pedido} layout={layout} />
      </Cartao>
    );
  }

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
        <Anchor component={Link} to={caminho} fz={14} fw={600} c="var(--cor-link)">
          Acompanhar
          <VisuallyHidden> o pedido {pedido.titulo}</VisuallyHidden>
        </Anchor>
      </Group>
    </Cartao>
  );
}
