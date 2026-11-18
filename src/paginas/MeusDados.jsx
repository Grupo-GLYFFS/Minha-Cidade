import { Box, Stack } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import LinkVoltar from '../componentes/LinkVoltar';
import FormularioMeusDados from '../componentes/perfil/FormularioMeusDados';

// Meus dados: a pessoa confere e muda nome, celular e endereço da conta.
// O que muda aparece na hora no Início, no cabeçalho e no Perfil.
export default function MeusDados() {
  return (
    <Stack gap="lg" maw={720}>
      <Box>
        <LinkVoltar caminho="/perfil" rotulo="Perfil" />
        <CabecalhoAntigo
          titulo="Meus dados"
          descricao="Mantenha seu celular e endereço em dia: é por eles que a prefeitura fala com você."
        />
      </Box>
      <FormularioMeusDados />
    </Stack>
  );
}
