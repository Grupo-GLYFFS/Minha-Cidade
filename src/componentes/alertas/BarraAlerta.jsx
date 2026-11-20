import Botao from '../Botao';
import SeloSituacao from '../SeloSituacao';
import BotaoCompartilhar from '../avisos/BotaoCompartilhar';
import { buscarNivel, temLigar199 } from '../../logica/alertas';
import classes from './Alertas.module.css';

// Barra no fim do detalhe do alerta: selo do nível (ou "Encerrado") com o fim,
// Compartilhar e, nos alertas ativos da Defesa Civil, "Ligar 199 · Defesa Civil".
// No computador fica estática no fluxo normal da página; no celular fica só o "Ligar 199",
// fixo acima da barra de abas (o compartilhar vai para a barra "‹ Voltar"); sem ele, a barra some.
// O espaço dela no fim da página fica no DetalheAlerta.
// Recebe o alerta e o caminho do detalhe (para compartilhar).
export default function BarraAlerta({ alerta, caminho }) {
  const nivel = buscarNivel(alerta.nivel);
  const ligar = temLigar199(alerta);

  return (
    <>
      <div
        className={ligar ? classes.barra : `${classes.barra} ${classes.barraSemLigar}`}
        {...(ligar ? { 'data-pe-preso': '' } : {})}
      >
        <p className={classes.barraInfo}>
          {alerta.ativo ? (
            <SeloSituacao cor={nivel.cor}>{nivel.rotulo}</SeloSituacao>
          ) : (
            <SeloSituacao cor="cinza">Encerrado</SeloSituacao>
          )}
          <span>{alerta.ativo ? alerta.fim : alerta.periodo}</span>
        </p>
        <div className={classes.barraAcoes}>
          <span className={classes.soComputador}>
            <BotaoCompartilhar titulo={alerta.manchete} caminho={caminho} />
          </span>
          {ligar && (
            <Botao
              variante="principal"
              icone="call"
              href="tel:199"
              aria-label="Ligar para a Defesa Civil, 199"
            >
              Ligar 199 · Defesa Civil
            </Botao>
          )}
        </div>
      </div>
    </>
  );
}
