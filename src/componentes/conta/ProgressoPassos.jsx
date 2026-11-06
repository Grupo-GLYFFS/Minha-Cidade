import { Box, Progress, Stepper, Text } from '@mantine/core';
import { PASSOS_CONTA } from '../../logica/esquemaCriarConta';

// Mostra em que passo do cadastro a pessoa está.
// Computador: Stepper do Mantine com os 3 passos (os já feitos podem ser clicados para voltar).
// Celular: versão compacta "Passo 1 de 3 · Você" com uma barra de progresso.
// Recebe o passo atual (0, 1 ou 2) e aoVoltarPara(passo), chamada ao clicar num passo já feito.
export default function ProgressoPassos({ passo, aoVoltarPara }) {
  const total = PASSOS_CONTA.length;

  return (
    <>
      <Box visibleFrom="md">
        <Stepper
          active={passo}
          onStepClick={(indice) => indice < passo && aoVoltarPara(indice)}
          allowNextStepsSelect={false}
          size="sm"
          aria-label="Passos do cadastro"
        >
          {PASSOS_CONTA.map((item) => (
            <Stepper.Step key={item.titulo} label={item.titulo} description={item.descricao} />
          ))}
        </Stepper>
      </Box>

      {/* No celular o título do passo (lido pelo leitor de tela) já diz "Passo X de 3" */}
      <Box hiddenFrom="md" aria-hidden="true">
        <Text fz="sm" fw={700} c="var(--mantine-color-azul-8)">
          Passo {passo + 1} de {total} · {PASSOS_CONTA[passo].titulo}
        </Text>
        <Progress value={((passo + 1) / total) * 100} size={8} radius="xl" mt="sm" />
      </Box>
    </>
  );
}
