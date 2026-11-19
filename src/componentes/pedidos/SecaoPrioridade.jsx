import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import { NIVEIS_PRIORIDADE, calcularPrioridade, nivelPrioridade } from '../../logica/prioridade';
import { estaAberto } from '../../logica/pedidos';
import { pluralizar } from '../../logica/formatos';
import classes from './DetalhePedido.module.css';

// Nome curto de cada faixa nos degraus (o rótulo completo é "Prioridade média")
const NOMES = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };

// Seção "Prioridade" do detalhe: três degraus (Baixa, Média, Alta) com a faixa atual marcada,
// os pontos (gravidade × urgência × tendência + apoios) e o número de apoios.
// Prioridade não usa cor de status: só o ícone de barras (regra 7).
// Recebe o pedido.
export default function SecaoPrioridade({ pedido }) {
  const atual = nivelPrioridade(pedido);
  // Os degraus vão da faixa mais baixa para a mais alta
  const degraus = [...NIVEIS_PRIORIDADE].reverse();

  return (
    <SecaoCard titulo="Prioridade">
      <ol className={classes.degraus} aria-label="Faixas de prioridade">
        {degraus.map((nivel) => {
          const ehAtual = nivel.id === atual.id;
          return (
            <li
              key={nivel.id}
              className={ehAtual ? `${classes.degrau} ${classes.degrauAtual}` : classes.degrau}
              aria-current={ehAtual ? 'true' : undefined}
            >
              <Icone nome={nivel.icone} tamanho={20} />
              {NOMES[nivel.id]}
              {ehAtual && <span className={classes.oculto}> (prioridade deste pedido)</span>}
            </li>
          );
        })}
      </ol>
      <p className={classes.pontos}>
        <b>{pluralizar(calcularPrioridade(pedido), 'ponto', 'pontos')}</b>
        <span aria-hidden="true">·</span>
        <b>{pluralizar(pedido.apoios, 'apoio', 'apoios')}</b>
        {estaAberto(pedido) && (
          <>
            <span aria-hidden="true">·</span>
            Apoiar sobe a prioridade do pedido.
          </>
        )}
      </p>
    </SecaoCard>
  );
}
