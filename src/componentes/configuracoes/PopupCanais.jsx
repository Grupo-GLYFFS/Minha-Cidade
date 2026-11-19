import { useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import Interruptor from './Interruptor';
import LinhaAjuste from './LinhaAjuste';
import ListaAjustes from './ListaAjustes';
import { CANAIS_AVISO } from '../../dados/avisosConta';
import classes from './PopupCanais.module.css';

// Popup "por onde avisar" de um tipo de notificação (31, quadro 2): um interruptor por canal
// (No app, E-mail, SMS). As mudanças só valem ao tocar em Salvar.
// Recebe aberto, titulo, os canais ligados agora, o e-mail e o celular da pessoa (detalhe
// de cada canal), aoSalvar(canais) e aoFechar().
// Monte com key diferente a cada abertura, para começar sempre dos canais salvos.
export default function PopupCanais({
  aberto,
  titulo,
  canais,
  email,
  celular,
  aoSalvar,
  aoFechar,
}) {
  const [rascunho, setRascunho] = useState(canais);
  const detalhes = { email, sms: celular };

  // Liga ou desliga um canal no rascunho. Recebe o id do canal e o novo valor.
  function mudar(idCanal, ligado) {
    setRascunho((atual) =>
      ligado
        ? CANAIS_AVISO.map((c) => c.id).filter((id) => id === idCanal || atual.includes(id))
        : atual.filter((id) => id !== idCanal),
    );
  }

  return (
    <Popup
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={titulo}
      largura={600}
      botoes={
        <>
          <Botao variante="secundario" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao variante="principal" onClick={() => aoSalvar(rascunho)}>
            Salvar
          </Botao>
        </>
      }
    >
      <h3 className={classes.subtitulo}>Por onde avisar</h3>
      <ListaAjustes noPopup>
        {CANAIS_AVISO.map((canal) => (
          <LinhaAjuste
            key={canal.id}
            icone={canal.icone}
            rotulo={canal.rotulo}
            detalhe={canal.detalhe ?? detalhes[canal.id]}
            controle={(idRotulo) => (
              <Interruptor
                ligado={rascunho.includes(canal.id)}
                aoMudar={(ligado) => mudar(canal.id, ligado)}
                idRotulo={idRotulo}
              />
            )}
          />
        ))}
      </ListaAjustes>
    </Popup>
  );
}
