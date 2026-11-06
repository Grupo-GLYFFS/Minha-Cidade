import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mantine/core';
import CabecalhoDesktop from './CabecalhoDesktop';
import BarraAbas from './BarraAbas';
import Rodape from './Rodape';
import { useAlertas } from '../contexto/useAlertas';
import classes from './LayoutApp.module.css';

// Moldura que se repete em todas as telas.
// No computador: cabeçalho em cima e rodapé embaixo. No celular: só a barra de abas.
// A página atual aparece no lugar do <Outlet />.
// O sino e a aba Alertas mostram quantos alertas a pessoa ainda não leu (visitante: nenhum).
export default function LayoutApp() {
  const { naoLidos } = useAlertas();

  return (
    <div className={classes.app}>
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Box visibleFrom="md">
        <CabecalhoDesktop alertasNovos={naoLidos} />
      </Box>

      <main id="conteudo" className={classes.conteudo}>
        <Container size={1200} px={{ base: 'md', md: 'xl' }} py={{ base: 'md', md: 'xl' }}>
          <Outlet />
        </Container>
      </main>

      <Box visibleFrom="md">
        <Rodape />
      </Box>

      <Box hiddenFrom="md">
        <BarraAbas alertasNovos={naoLidos} />
      </Box>
    </div>
  );
}
