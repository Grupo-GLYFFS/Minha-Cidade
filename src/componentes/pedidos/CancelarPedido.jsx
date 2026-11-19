import { useState } from 'react';
import Botao from '../Botao';
import Popup from '../Popup';
import { usePedidos } from '../../contexto/usePedidos';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';
import classes from '../servicos/PopupsAgendamento.module.css';
import classesFolha from './CancelarPedido.module.css';

// Botão "Cancelar pedido" do detalhe (pedido da própria pessoa, Enviado ou Em análise)
// e o popup que confirma, com "Manter pedido" e "Cancelar pedido".
// Depois de cancelar, o pedido fica "Cancelado" e sai das contagens de abertos.
// Recebe o pedido.
export default function CancelarPedido({ pedido }) {
  const { cancelarPedido } = usePedidos();
  const mostrarAviso = useAvisoTemporario();
  const [aberto, setAberto] = useState(false);

  // Cancela, fecha o popup e confirma no rodapé
  function confirmar() {
    setAberto(false);
    if (cancelarPedido(pedido.id)) mostrarAviso('Pedido cancelado.', '/perfil/pedidos');
  }

  return (
    <>
      <Botao
        variante="secundario"
        icone="cancel"
        onClick={() => setAberto(true)}
        aria-haspopup="dialog"
      >
        Cancelar pedido
      </Botao>
      <Popup
        aberto={aberto}
        aoFechar={() => setAberto(false)}
        titulo="Cancelar o pedido?"
        botoes={
          <div className={classesFolha.botoesFolha}>
            <Botao variante="secundario" onClick={() => setAberto(false)}>
              Manter pedido
            </Botao>
            <Botao variante="perigo" icone="cancel" onClick={confirmar}>
              Cancelar pedido
            </Botao>
          </div>
        }
      >
        <p className={classes.destaque}>
          {pedido.titulo} · Protocolo {pedido.protocolo}
        </p>
        <p className={classes.nota}>
          A prefeitura para de analisar o pedido. Se o problema continuar, abra um pedido novo.
        </p>
      </Popup>
    </>
  );
}
