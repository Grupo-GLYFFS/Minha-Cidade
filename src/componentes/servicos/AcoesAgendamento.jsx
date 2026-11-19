import { useState } from 'react';
import Botao from '../Botao';
import PopupRemarcar from './PopupRemarcar';
import PopupCancelar from './PopupCancelar';
import { useSolicitacoes } from '../../contexto/useSolicitacoes';
import { agendamentoRemarcado, textoRemarcado } from '../../logica/solicitacoes';

// Botões "Remarcar" e "Cancelar" de um agendamento, com os popups de cada um.
// Depois de remarcar ou cancelar, avisa a página com a frase do que aconteceu.
// Recebe a solicitação agendada, compacto (44, dentro de cards), aoAvisar(texto, link) e
// linkDoAviso: o "Ver" do aviso (o detalhe da solicitação, quando as ações estão numa lista).
export default function AcoesAgendamento({ solicitacao, compacto = false, aoAvisar, linkDoAviso }) {
  const { remarcar, cancelar } = useSolicitacoes();
  const [aberto, setAberto] = useState(null);

  // Remarca, fecha o popup e conta para a página
  function confirmarRemarcar(data, hora) {
    remarcar(solicitacao.id, data, hora);
    setAberto(null);
    aoAvisar?.(
      textoRemarcado('Remarcado', agendamentoRemarcado(solicitacao, data, hora)),
      linkDoAviso,
    );
  }

  // Cancela, fecha o popup e conta para a página
  function confirmarCancelar() {
    cancelar(solicitacao.id);
    setAberto(null);
    aoAvisar?.(`Agendamento cancelado: ${solicitacao.nomeServico}.`, linkDoAviso);
  }

  return (
    <>
      <Botao
        variante="secundario"
        compacto={compacto}
        icone="event_repeat"
        onClick={() => setAberto('remarcar')}
        aria-haspopup="dialog"
      >
        Remarcar
      </Botao>
      <Botao
        variante="perigo"
        compacto={compacto}
        icone="event_busy"
        onClick={() => setAberto('cancelar')}
        aria-haspopup="dialog"
      >
        Cancelar
      </Botao>

      <PopupRemarcar
        solicitacao={solicitacao}
        aberto={aberto === 'remarcar'}
        aoFechar={() => setAberto(null)}
        aoRemarcar={confirmarRemarcar}
      />
      <PopupCancelar
        solicitacao={solicitacao}
        aberto={aberto === 'cancelar'}
        aoFechar={() => setAberto(null)}
        aoCancelar={confirmarCancelar}
      />
    </>
  );
}
