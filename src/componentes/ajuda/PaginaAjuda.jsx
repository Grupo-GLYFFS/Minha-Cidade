import { Box, Stack } from '@mantine/core';
import CabecalhoPagina from '../CabecalhoPagina';
import LinkVoltar from '../LinkVoltar';
import { useSessao } from '../../contexto/useSessao';

// Moldura das páginas de ajuda (acessibilidade, telefones, perguntas e privacidade):
// link de voltar, título, descrição e o conteúdo, com até 720 px de largura.
// Quem está logado volta para o Perfil (de onde essas páginas abrem no celular);
// o visitante volta para o Início.
// Recebe o título, a descrição e o conteúdo (children).
export default function PaginaAjuda({ titulo, descricao, children }) {
  const { logado } = useSessao();

  return (
    <Stack gap="lg" maw={720}>
      <Box>
        <LinkVoltar caminho={logado ? '/perfil' : '/'} rotulo={logado ? 'Perfil' : 'Início'} />
        <CabecalhoPagina titulo={titulo} descricao={descricao} />
      </Box>
      {children}
    </Stack>
  );
}
