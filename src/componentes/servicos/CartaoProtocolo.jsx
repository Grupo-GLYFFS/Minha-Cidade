import { useState } from 'react';
import Botao from '../Botao';
import SeloSituacao from '../SeloSituacao';
import classes from './CartaoProtocolo.module.css';

// Cartão branco do cabeçalho da confirmação: número do protocolo, situação e "Copiar".
// Ao copiar, o botão vira "Copiado" por alguns segundos (e o leitor de tela ouve).
// Recebe o protocolo e a situação ({ rotulo, cor }).
export default function CartaoProtocolo({ protocolo, situacao }) {
  const [copiado, setCopiado] = useState(false);

  // Copia o número; sem permissão da área de transferência, o número continua na tela
  async function copiar() {
    try {
      await navigator.clipboard.writeText(protocolo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className={classes.cartao}>
      <div className={classes.numero}>
        <p className={classes.rotulo}>Número do protocolo</p>
        <p className={classes.protocolo}>{protocolo}</p>
      </div>
      <div className={classes.lado}>
        <SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>
        <Botao
          variante="secundario"
          compacto
          icone={copiado ? 'check' : 'content_copy'}
          onClick={copiar}
          aria-label={copiado ? 'Número do protocolo copiado' : 'Copiar o número do protocolo'}
        >
          {copiado ? 'Copiado' : 'Copiar'}
        </Botao>
        <span className={classes.oculto} role="status">
          {copiado ? 'Número do protocolo copiado.' : ''}
        </span>
      </div>
    </div>
  );
}
