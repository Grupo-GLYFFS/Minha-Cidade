import Icone from '../Icone';
import classes from './MiniaturaNotificacao.module.css';

// Quadrado com o ícone da notificação: 96 na página e 56 na caixa do sino.
// Alerta da Defesa Civil fica amarelo; não lida fica branca com borda azul-clara.
// Recebe a notificação ({ icone, alerta, lida }) e "pequena" (versão de 56 da caixa).
export default function MiniaturaNotificacao({ notificacao, pequena = false }) {
  const lista = [classes.miniatura];
  if (pequena) lista.push(classes.pequena);
  if (notificacao.alerta) lista.push(classes.alerta);
  else if (!notificacao.lida) lista.push(classes.nova);

  return (
    <span className={lista.join(' ')} aria-hidden="true">
      <Icone nome={notificacao.icone} tamanho={pequena ? 28 : 32} />
    </span>
  );
}
