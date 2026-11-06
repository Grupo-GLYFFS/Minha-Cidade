import { useState } from 'react';
import { Box, Button, Text } from '@mantine/core';
import PaginaAjuda from '../componentes/ajuda/PaginaAjuda';
import SecaoTamanhoLetra from '../componentes/acessibilidade/SecaoTamanhoLetra';
import SecaoTelaMovimento from '../componentes/acessibilidade/SecaoTelaMovimento';
import RecursosApp from '../componentes/acessibilidade/RecursosApp';
import Icone from '../componentes/Icone';
import { useAcessibilidade } from '../contexto/useAcessibilidade';

// Acessibilidade: tamanho da letra, alto contraste e reduzir animações, mais os recursos do app.
// Aberta para todos (o visitante também). As escolhas valem na hora e ficam salvas neste aparelho.
export default function Acessibilidade() {
  const { voltarAoPadrao } = useAcessibilidade();
  const [voltou, setVoltou] = useState(false);

  // Volta tudo ao padrão e mostra a confirmação embaixo do botão
  function restaurar() {
    voltarAoPadrao();
    setVoltou(true);
  }

  return (
    <PaginaAjuda
      titulo="Acessibilidade"
      descricao="Deixe o app do jeito que fica melhor para você. As mudanças valem na hora e ficam salvas neste aparelho."
    >
      <SecaoTamanhoLetra />
      <SecaoTelaMovimento />

      <Box>
        <Button
          variant="default"
          h={48}
          onClick={restaurar}
          leftSection={<Icone nome="restart_alt" tamanho={20} />}
        >
          Voltar ao padrão
        </Button>
        <Text role="status" fz="sm" c="var(--cor-texto-suave)" mt="sm">
          {voltou ? 'Pronto: letra, contraste e animações voltaram ao padrão.' : ''}
        </Text>
      </Box>

      <RecursosApp />
    </PaginaAjuda>
  );
}
