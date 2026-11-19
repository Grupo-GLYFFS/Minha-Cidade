import Popup from '../Popup';
import Botao from '../Botao';
import classes from './PopupDesligarAlertas.module.css';

// Confirmação antes de desligar os alertas de emergência (31, quadro 3).
// "Manter ligados" só fecha; "Desligar alertas" desliga.
// Recebe aberto, o bairro da pessoa, aoConfirmar() e aoFechar().
export default function PopupDesligarAlertas({ aberto, bairro, aoConfirmar, aoFechar }) {
  return (
    <Popup
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Desligar os alertas de emergência?"
      largura={520}
      botoes={
        <>
          <Botao variante="secundario" onClick={aoFechar}>
            Manter ligados
          </Botao>
          <Botao variante="perigo" icone="notifications_off" onClick={aoConfirmar}>
            Desligar alertas
          </Botao>
        </>
      }
    >
      <p className={classes.texto}>
        Você não vai receber alertas da Defesa Civil, como chuva forte, calor e falta de água na{' '}
        {bairro}.
      </p>
    </Popup>
  );
}
