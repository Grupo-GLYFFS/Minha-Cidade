import { Box, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import AmostraCor from '../AmostraCor';
import IndicadorPrioridade from '../../pedidos/IndicadorPrioridade';
import { PEDIDOS } from '../../../dados/pedidos';
import { OPCOES_VOTO } from '../../../dados/opcoesVoto';
import { ODS_ATENDIDOS } from '../../../dados/ods';
import { pedidosPorNivel } from '../../../logica/vitrine';
import { lerVariavelCss, resolverCor } from '../../../logica/variaveisCss';
import { formatarRazao, nivelContraste, razaoContraste } from '../../../logica/contraste';
import classes from './CoresIndicadores.module.css';

// Cores de prioridade (texto sobre branco), das barras de voto e dos quadrados dos ODS
// (número branco por cima), cada uma com valor e contraste escritos.
export default function CoresIndicadores() {
  const branco = lerVariavelCss('--cor-superficie') || '#fff';

  return (
    <Subsecao id="cores-indicadores" titulo="Prioridade, voto e ODS">
      <Vitrine
        nome="NIVEIS_PRIORIDADE"
        arquivo="src/logica/prioridade.js"
        props="IndicadorPrioridade pedido (ícone de barras + texto)"
      >
        <Stack gap="sm">
          {pedidosPorNivel(PEDIDOS).map(({ nivel, pedido }) => {
            const razao = razaoContraste(nivel.cor, branco);
            return (
              <Group key={nivel.id} gap="md" wrap="wrap">
                <IndicadorPrioridade pedido={pedido} fz={15} />
                <Text fz={12} c="var(--cor-texto-suave)" ff="monospace">
                  {nivel.cor} · {formatarRazao(razao)} {nivelContraste(razao)} sobre o branco
                </Text>
              </Group>
            );
          })}
        </Stack>
      </Vitrine>

      <Vitrine
        nome="OPCOES_VOTO"
        arquivo="src/dados/opcoesVoto.js"
        props="cor das barras do resultado (elemento gráfico: pede 3:1)"
      >
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
          {OPCOES_VOTO.map((opcao) => {
            const valor = resolverCor(opcao.cor);
            return (
              <AmostraCor
                key={opcao.valor}
                cor={opcao.cor}
                nome={opcao.rotulo}
                valor={`${opcao.cor} = ${valor}`}
                contraste={{ razao: razaoContraste(valor, branco), sobre: 'sobre o branco' }}
              />
            );
          })}
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="ODS_ATENDIDOS"
        arquivo="src/dados/ods.js"
        props="cor do ODS escurecida para o número branco"
      >
        <Stack gap="sm">
          {ODS_ATENDIDOS.map((ods) => {
            const razao = razaoContraste('#ffffff', ods.cor);
            return (
              <Group key={ods.numero} gap="sm" wrap="nowrap" align="flex-start">
                <Box bg={ods.cor} className={classes.ods}>
                  {ods.numero}
                </Box>
                <div>
                  <Text fz={14} fw={600}>
                    {ods.nome}
                  </Text>
                  <Text fz={12} c="var(--cor-texto-suave)" ff="monospace">
                    {ods.cor} · branco por cima {formatarRazao(razao)} {nivelContraste(razao)}
                  </Text>
                </div>
              </Group>
            );
          })}
        </Stack>
      </Vitrine>
    </Subsecao>
  );
}
