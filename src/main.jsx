import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './estilos/global.css';
import { tema } from './tema';
import PedidosProvider from './contexto/PedidosProvider';
import App from './App';

// Ponto de partida do app: aplica o tema do Mantine, compartilha os pedidos,
// liga as rotas e mostra o App.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={tema}>
      <PedidosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PedidosProvider>
    </MantineProvider>
  </StrictMode>,
);
