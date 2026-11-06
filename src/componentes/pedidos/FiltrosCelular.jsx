import { Button, Drawer, Group, Stack, VisuallyHidden } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Icone from '../Icone';
import CampoBusca from './CampoBusca';
import CampoOrdem from './CampoOrdem';
import CamposFiltro from './CamposFiltro';
import { contarFiltrosAtivos } from '../../logica/filtrosPedidos';
import { pluralizar } from '../../logica/formatos';
import classes from './FiltrosCelular.module.css';

// Filtros do celular: a busca fica à vista e o resto abre em uma gaveta que sobe de baixo.
// O botão "Filtros" mostra quantos filtros estão em uso. A lista muda enquanto a pessoa escolhe,
// e o botão "Ver N pedidos" fecha a gaveta.
// Recebe os filtros, aoMudar(nome, valor), as opções de bairro, o total de resultados e aoLimpar().
export default function FiltrosCelular({ filtros, aoMudar, opcoesBairro, total, aoLimpar }) {
  const [aberta, { open: abrir, close: fechar }] = useDisclosure(false);
  const ativos = contarFiltrosAtivos(filtros);

  return (
    <Stack gap="sm">
      <form
        role="search"
        aria-label="Buscar pedidos"
        onSubmit={(evento) => evento.preventDefault()}
      >
        <CampoBusca valor={filtros.busca} aoMudar={(texto) => aoMudar('busca', texto)} />
      </form>

      <Button
        variant="default"
        size="md"
        fullWidth
        onClick={abrir}
        leftSection={<Icone nome="tune" tamanho={20} />}
        rightSection={
          ativos > 0 && (
            <span className={classes.contador} aria-hidden="true">
              {ativos}
            </span>
          )
        }
      >
        Filtros e ordem
        {ativos > 0 && (
          <VisuallyHidden>, {pluralizar(ativos, 'filtro ativo', 'filtros ativos')}</VisuallyHidden>
        )}
      </Button>

      <Drawer
        opened={aberta}
        onClose={fechar}
        position="bottom"
        title="Filtrar e ordenar"
        closeButtonProps={{ 'aria-label': 'Fechar filtros' }}
        classNames={{ content: classes.gaveta, title: classes.titulo }}
      >
        <Stack gap="md">
          <CamposFiltro filtros={filtros} aoMudar={aoMudar} opcoesBairro={opcoesBairro} />
          <CampoOrdem valor={filtros.ordem} aoMudar={(ordem) => aoMudar('ordem', ordem)} />
          <Group grow gap="sm" mt="sm">
            <Button variant="default" size="md" onClick={aoLimpar} disabled={ativos === 0}>
              Limpar
            </Button>
            <Button size="md" onClick={fechar}>
              {total > 0 ? `Ver ${pluralizar(total, 'pedido', 'pedidos')}` : 'Ver resultado'}
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </Stack>
  );
}
