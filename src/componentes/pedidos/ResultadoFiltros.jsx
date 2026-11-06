import { Button, Group, Text } from '@mantine/core';
import Icone from '../Icone';
import { pluralizar } from '../../logica/formatos';

// Linha com o total de pedidos encontrados e, se houver filtro em uso, o botão "Limpar filtros".
// O total é anunciado pelo leitor de tela sempre que muda (aria-live).
// Recebe o total, se há filtro ativo e a função aoLimpar().
export default function ResultadoFiltros({ total, temFiltro, aoLimpar }) {
  return (
    <Group justify="space-between" gap="sm" mih={36}>
      <Text role="status" aria-live="polite" fw={600} fz={{ base: 14, md: 15 }}>
        {pluralizar(total, 'pedido encontrado', 'pedidos encontrados')}
      </Text>
      {temFiltro && (
        <Button
          variant="subtle"
          size="sm"
          c="var(--cor-link)"
          leftSection={<Icone nome="close" tamanho={18} />}
          onClick={aoLimpar}
        >
          Limpar filtros
        </Button>
      )}
    </Group>
  );
}
