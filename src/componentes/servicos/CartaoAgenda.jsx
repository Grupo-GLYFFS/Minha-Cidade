import {
  distanciaEmPalavras,
  formatarDataDetalhe,
  formatarDiaMes,
  formatarHora,
  naData,
  textoFaltam,
} from '../../logica/datasExtenso';
import classes from './CartaoAgenda.module.css';

// Primeira letra em maiúscula. Recebe "sábado, 14…"; devolve "Sábado, 14…".
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Monta as três partes do cartão conforme a situação da solicitação.
// Recebe a solicitação; devolve { grande, linha, nota }.
function partesDoCartao(solicitacao) {
  const { status, agendamento, local } = solicitacao;
  if (status === 'agendada') {
    const relativa = distanciaEmPalavras(agendamento.data);
    const dia = capitalizar(formatarDataDetalhe(agendamento.data));
    const fim = agendamento.horaFim ? `, até ${formatarHora(agendamento.horaFim)}` : '';
    return {
      grande: formatarHora(agendamento.hora),
      linha: `${dia}${fim}${relativa ? ` · ${relativa}` : ''}`,
      nota: local ? [local.nome, local.endereco].filter(Boolean).join(' · ') : undefined,
    };
  }
  if (status === 'concluida') {
    return {
      grande: formatarDiaMes(solicitacao.concluidaEm),
      linha: `Concluída ${naData(solicitacao.concluidaEm)}`,
    };
  }
  if (status === 'cancelada') {
    return {
      grande: formatarDiaMes(solicitacao.canceladaEm),
      linha: `Cancelada ${naData(solicitacao.canceladaEm)}`,
      // Só a que tinha horário marcado libera o horário
      nota: agendamento ? 'O horário ficou livre para outra pessoa.' : undefined,
    };
  }
  // Solicitada ou em análise: no lugar da hora, o prazo da prefeitura e quanto falta
  return {
    grande: formatarDiaMes(solicitacao.prazoData),
    linha: `${solicitacao.textoPrazo} ${formatarDataDetalhe(solicitacao.prazoData)} · ${textoFaltam(solicitacao.prazoData)}`,
    nota: solicitacao.avisoPrazo,
  };
}

// Cartão branco do cabeçalho do detalhe: a hora (ou a data) em destaque, o dia
// e o local (ou o prazo e o aviso, quando ainda não tem dia).
// Recebe a solicitação.
export default function CartaoAgenda({ solicitacao }) {
  const { grande, linha, nota } = partesDoCartao(solicitacao);

  return (
    <div className={classes.cartao}>
      <span className={classes.grande}>{grande}</span>
      <div className={classes.texto}>
        <p className={classes.linha}>{linha}</p>
        {nota && <p className={classes.nota}>{nota}</p>}
      </div>
    </div>
  );
}
