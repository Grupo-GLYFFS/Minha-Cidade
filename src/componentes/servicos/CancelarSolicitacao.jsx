import { useState } from 'react';
import Botao from '../Botao';
import PopupCancelar from './PopupCancelar';
import { useSolicitacoes } from '../../contexto/useSolicitacoes';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';

// Botão "Cancelar solicitação" de uma solicitação recém-enviada (situação "Solicitada")
// e o popup que confirma. Depois de cancelar, ela vai para o grupo Canceladas.
// Recebe a solicitação.
export default function CancelarSolicitacao({ solicitacao }) {
  const { cancelar } = useSolicitacoes();
  const mostrarAviso = useAvisoTemporario();
  const [aberto, setAberto] = useState(false);

  // Cancela, fecha o popup e confirma no rodapé
  function confirmar() {
    cancelar(solicitacao.id);
    setAberto(false);
    mostrarAviso('Solicitação cancelada.', '/servicos/minhas-solicitacoes');
  }

  return (
    <>
      <Botao
        variante="secundario"
        icone="cancel"
        onClick={() => setAberto(true)}
        aria-haspopup="dialog"
      >
        Cancelar solicitação
      </Botao>
      <PopupCancelar
        solicitacao={solicitacao}
        aberto={aberto}
        aoFechar={() => setAberto(false)}
        aoCancelar={confirmar}
      />
    </>
  );
}
