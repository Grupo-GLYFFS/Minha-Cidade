import { useState } from 'react';
import Botao from '../Botao';
import PopupBusca from './PopupBusca';

// Botão da lupa do topo: abre o popup de busca (serviços, pedidos e protocolos).
export default function BotaoBusca() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <Botao
        variante="icone"
        icone="search"
        aria-label="Buscar"
        aria-haspopup="dialog"
        aria-expanded={aberto}
        onClick={() => setAberto(true)}
      />
      <PopupBusca aberto={aberto} aoFechar={() => setAberto(false)} />
    </>
  );
}
