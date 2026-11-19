import { useId } from 'react';
import classes from './CartaoExtrato.module.css';

// Card no formato de extrato (conta da cidade, mês a mês, subprefeituras, folha):
// faixa de cima com o título h2, uma linha de explicação e um botão opcional à direita;
// embaixo, os blocos do corpo, separados por linha tracejada (cada filho direto é um bloco).
// Recebe titulo, subtitulo, acao (ex.: o botão Baixar) e children (os blocos).
export default function CartaoExtrato({ titulo, subtitulo, acao, children }) {
  const idTitulo = useId();
  return (
    <article className={classes.cartao} aria-labelledby={idTitulo}>
      <div className={classes.cab}>
        <div>
          <h2 className={classes.titulo} id={idTitulo}>
            {titulo}
          </h2>
          {subtitulo && <p className={classes.subtitulo}>{subtitulo}</p>}
        </div>
        {acao}
      </div>
      <div className={classes.corpo}>{children}</div>
    </article>
  );
}
