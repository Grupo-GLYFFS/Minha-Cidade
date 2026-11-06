import { Button, Group, Stack, Text } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import EstadoVazio from '../componentes/EstadoVazio';
import GrupoAlertas from '../componentes/alertas/GrupoAlertas';
import Icone from '../componentes/Icone';
import { useAlertas } from '../contexto/useAlertas';
import { pluralizar } from '../logica/formatos';

// Alertas: avisos da Defesa Civil, mudanças nos pedidos, solicitações recebidas e votações abertas.
// Mostra primeiro os novos (ainda não lidos) e depois os anteriores.
// Abrir um alerta marca como lido e leva à página dele.
export default function Alertas() {
  const { alertas, naoLidos, marcarComoLido, marcarTodosComoLidos } = useAlertas();
  const novos = alertas.filter((alerta) => !alerta.lido);
  const anteriores = alertas.filter((alerta) => alerta.lido);

  return (
    <Stack gap="lg" maw={720}>
      <CabecalhoPagina titulo="Alertas" />

      {alertas.length === 0 ? (
        <EstadoVazio texto="Nenhum alerta por enquanto." />
      ) : (
        <>
          <Group justify="space-between" gap="sm" mih={44}>
            {/* Anuncia quando a quantidade de novos muda (ex.: depois de marcar todos) */}
            <Text fw={600} role="status">
              {naoLidos > 0 ? pluralizar(naoLidos, 'novo', 'novos') : 'Você leu todos os alertas.'}
            </Text>
            {naoLidos > 0 && (
              <Button
                variant="subtle"
                h={44}
                px="sm"
                onClick={marcarTodosComoLidos}
                leftSection={<Icone nome="done_all" tamanho={20} />}
              >
                Marcar todos como lidos
              </Button>
            )}
          </Group>

          {novos.length > 0 && (
            <GrupoAlertas id="novos" titulo="Novos" alertas={novos} aoAbrir={marcarComoLido} />
          )}
          {anteriores.length > 0 && (
            <GrupoAlertas
              id="anteriores"
              titulo="Anteriores"
              alertas={anteriores}
              aoAbrir={marcarComoLido}
            />
          )}
        </>
      )}
    </Stack>
  );
}
