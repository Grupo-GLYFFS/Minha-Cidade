import SecaoCard from '../SecaoCard';
import classes from './CartaoExtrato.module.css';

// Card no formato de extrato (conta da cidade, mês a mês, subprefeituras, folha), feito com o
// SecaoCard: faixa com o título h2 e um botão opcional à direita; no corpo, uma linha de
// explicação e os blocos, separados por linha tracejada (cada filho direto é um bloco).
// Recebe titulo, subtitulo, acao (ex.: o botão Baixar) e children (os blocos).
export default function CartaoExtrato({ titulo, subtitulo, acao, children }) {
  return (
    <SecaoCard titulo={titulo} acao={acao} semRespiro>
      {subtitulo && <p className={classes.subtitulo}>{subtitulo}</p>}
      <div className={classes.blocos}>{children}</div>
    </SecaoCard>
  );
}
