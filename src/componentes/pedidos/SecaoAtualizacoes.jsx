import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import { ATUALIZACOES_PEDIDO } from '../../dados/atualizacoesPedido';
import { formatarDiaLongo } from '../../logica/datasPedido';
import { nomeSubprefeitura } from '../../logica/localPedido';
import classes from './DetalhePedido.module.css';

// Seção "Atualizações da prefeitura": mensagens datadas da subprefeitura responsável,
// da mais nova para a mais antiga. Sem mensagens, avisa que a notificação chega quando houver.
// Recebe o pedido.
export default function SecaoAtualizacoes({ pedido }) {
  const atualizacoes = ATUALIZACOES_PEDIDO.filter((item) => item.idPedido === pedido.id).sort(
    (a, b) => b.data.localeCompare(a.data),
  );
  const autor = nomeSubprefeitura(pedido.subprefeitura) || 'Prefeitura de São Paulo';

  return (
    <SecaoCard titulo="Atualizações da prefeitura">
      {atualizacoes.length === 0 ? (
        <p className={classes.semAtualizacao}>
          <Icone nome="notifications" tamanho={20} />
          Ainda não há atualizações. Você recebe uma notificação quando houver.
        </p>
      ) : (
        <ol className={classes.atualizacoes}>
          {atualizacoes.map((item) => (
            <li key={`${item.data}-${item.texto}`} className={classes.atualizacao}>
              <span className={classes.atualizacaoIcone} aria-hidden="true">
                <Icone nome="account_balance" tamanho={20} />
              </span>
              <div>
                <p className={classes.atualizacaoMeta}>
                  <span className={classes.autor}>{autor}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={item.data}>{formatarDiaLongo(item.data)}</time>
                </p>
                <p className={classes.atualizacaoTexto}>{item.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </SecaoCard>
  );
}
