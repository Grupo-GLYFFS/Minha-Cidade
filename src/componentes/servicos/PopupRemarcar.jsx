import { useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import Chip from '../Chip';
import {
  formatarDataDetalhe,
  formatarDiaMesExtenso,
  formatarHora,
  horarioPorExtenso,
} from '../../logica/datasExtenso';
import { agendamentoRemarcado } from '../../logica/solicitacoes';
import classes from './PopupsAgendamento.module.css';
import folha from './FolhaAgendamento.module.css';

// Popup "Remarcar": mostra o horário marcado e os horários livres, dia por dia.
// O botão principal só confirma depois de escolher um horário; o horário escolhido aparece numa
// linha acima dos botões, no mesmo formato do aviso ("quinta, 26 de novembro, das 7h às 13h").
// No celular (folha), os horários ficam em 3 colunas, a data escolhida vai no botão principal
// ("Remarcar para 21 de novembro, 10h") e os botões empilham com o principal em cima.
// Recebe a solicitação, aberto, aoFechar() e aoRemarcar(data, hora).
export default function PopupRemarcar({ solicitacao, aberto, aoFechar, aoRemarcar }) {
  const [escolha, setEscolha] = useState(null);
  const { agendamento, local } = solicitacao;
  const livres = solicitacao.horariosLivres ?? [];
  // "a castração", "a consulta"… ou "o agendamento" quando não há nome curto
  const nome = solicitacao.rotuloCurto ? `a ${solicitacao.rotuloCurto}` : 'o agendamento';

  // Fecha e limpa a escolha, para o popup abrir do zero da próxima vez
  function fechar() {
    setEscolha(null);
    aoFechar();
  }

  function confirmar() {
    aoRemarcar(escolha.data, escolha.hora);
    setEscolha(null);
  }

  // Horário novo com a mesma duração do marcado (hora de fim, quando houver)
  const novo = escolha ? agendamentoRemarcado(solicitacao, escolha.data, escolha.hora) : null;

  return (
    <Popup
      aberto={aberto}
      aoFechar={fechar}
      titulo={`Remarcar ${nome}`}
      botoes={
        <div className={folha.botoes}>
          {novo && (
            <p className={`${classes.escolhida} ${folha.escolhida}`} aria-live="polite">
              Remarcar para {formatarDataDetalhe(novo.data)},{' '}
              {horarioPorExtenso(novo.hora, novo.horaFim)}
            </p>
          )}
          <Botao variante="secundario" onClick={fechar}>
            Voltar
          </Botao>
          <Botao variante="principal" desabilitado={!escolha} onClick={confirmar}>
            {escolha ? (
              <span>
                Remarcar
                <span className={folha.dataNoBotao}>
                  {' '}
                  para {formatarDiaMesExtenso(escolha.data)}, {formatarHora(escolha.hora)}
                </span>
              </span>
            ) : (
              'Escolha um horário'
            )}
          </Botao>
        </div>
      }
    >
      <p className={classes.destaque}>
        Marcada para {formatarDataDetalhe(agendamento.data)}, às {formatarHora(agendamento.hora)}
      </p>
      {local && <p className={classes.nota}>Horários livres em {local.nome}</p>}

      {livres.length === 0 ? (
        <p className={classes.nota}>Não há outros horários livres agora. Tente de novo amanhã.</p>
      ) : (
        livres.map((dia) => {
          const titulo = formatarDataDetalhe(dia.data);
          return (
            <div key={dia.data} className={classes.dia} role="group" aria-label={titulo}>
              <p className={classes.tituloDia}>{titulo}</p>
              <div className={`${classes.horas} ${folha.horas}`}>
                {dia.horas.map((hora) => (
                  <Chip
                    key={hora}
                    pressionado={escolha?.data === dia.data && escolha?.hora === hora}
                    onClick={() => setEscolha({ data: dia.data, hora })}
                  >
                    {formatarHora(hora)}
                  </Chip>
                ))}
              </div>
            </div>
          );
        })
      )}
    </Popup>
  );
}
