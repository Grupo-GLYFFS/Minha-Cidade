import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './estilos/global.css';
import { tema } from './tema';
import AcessibilidadeProvider from './contexto/AcessibilidadeProvider';
import SessaoProvider from './contexto/SessaoProvider';
import PedidosProvider from './contexto/PedidosProvider';
import SolicitacoesProvider from './contexto/SolicitacoesProvider';
import AlertasProvider from './contexto/AlertasProvider';
import App from './App';

// Ponto de partida do app: aplica as preferências de acessibilidade (valem até para o visitante)
// e o tema do Mantine, compartilha a sessão (quem está logado), os pedidos, as solicitações
// de serviço e os alertas, liga as rotas e mostra o App.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AcessibilidadeProvider>
      <MantineProvider theme={tema}>
        <SessaoProvider>
          <PedidosProvider>
            <SolicitacoesProvider>
              <AlertasProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </AlertasProvider>
            </SolicitacoesProvider>
          </PedidosProvider>
        </SessaoProvider>
      </MantineProvider>
    </AcessibilidadeProvider>
  </StrictMode>,
);
