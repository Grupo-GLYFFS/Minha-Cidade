import Popup from '../Popup';
import Botao from '../Botao';
import { formatarDataDetalhe, formatarHora } from '../../logica/datasExtenso';
import classes from './PopupsAgendamento.module.css';

// Primeira letra em maiúscula. Recebe "sábado, 14…"; devolve "Sábado, 14…".
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Popup "Cancelar": confirma o cancelamento, dizendo o que acontece com o horário.
// Recebe a solicitação, aberto, aoFechar() e aoCancelar().
export default function PopupCancelar({ solicitacao, aberto, aoFechar, aoCancelar }) {
  const { agendamento, local } = solicitacao;
  const nome = solicitacao.rotuloCurto ? `a ${solicitacao.rotuloCurto}` : 'o agendamento';
  const quando = `${capitalizar(formatarDataDetalhe(agendamento.data))}, ${formatarHora(agendamento.hora)}`;

  return (
    <Popup
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={`Cancelar ${nome}?`}
      botoes={
        <>
          <Botao variante="secundario" onClick={aoFechar}>
            Manter agendamento
          </Botao>
          <Botao variante="perigo" icone="event_busy" onClick={aoCancelar}>
            Cancelar agendamento
          </Botao>
        </>
      }
    >
      <p className={classes.destaque}>{local ? `${quando} · ${local.nome}` : quando}</p>
      <p className={classes.nota}>
        O horário fica livre para outra pessoa. Se precisar depois, faça uma nova solicitação.
      </p>
    </Popup>
  );
}
