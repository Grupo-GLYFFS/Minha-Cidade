import Botao from '../Botao';
import SeloSituacao from '../SeloSituacao';
import BotaoCompartilhar from '../avisos/BotaoCompartilhar';
import { buscarNivel } from '../../logica/alertas';
import classes from './Alertas.module.css';

// Barra presa no pé do detalhe do alerta: selo do nível (ou "Encerrado") com o fim,
// Compartilhar e, nos alertas ativos da Defesa Civil, "Ligar 199 · Defesa Civil".
// Recebe o alerta e o caminho do detalhe (para compartilhar).
export default function BarraAlerta({ alerta, caminho }) {
  const nivel = buscarNivel(alerta.nivel);
  const ligar = alerta.ativo && alerta.tipo === 'defesa-civil';

  return (
    <div className={classes.barra}>
      <p className={classes.barraInfo}>
        {alerta.ativo ? (
          <SeloSituacao cor={nivel.cor}>{nivel.rotulo}</SeloSituacao>
        ) : (
          <SeloSituacao cor="cinza">Encerrado</SeloSituacao>
        )}
        <span>{alerta.ativo ? alerta.fim : alerta.periodo}</span>
      </p>
      <div className={classes.barraAcoes}>
        {/* No celular, o compartilhar fica só com o ícone, ao lado do "Ligar 199" */}
        <span className={classes.soComputador}>
          <BotaoCompartilhar titulo={alerta.manchete} caminho={caminho} />
        </span>
        <span className={classes.soCelular}>
          <BotaoCompartilhar
            soIcone
            titulo={alerta.manchete}
            caminho={caminho}
            rotulo="Compartilhar alerta"
          />
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
  );
}
