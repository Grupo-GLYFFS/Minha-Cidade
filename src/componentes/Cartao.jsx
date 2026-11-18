import { Link } from 'react-router-dom';
import { Box } from '@mantine/core';
import Icone from './Icone';
import classes from './Cartao.module.css';

// Card do app: fundo branco, borda #D0D5DD, raio 20, sem sombra (regras 3 e 17).
// Recebe:
// - children: o corpo do card;
// - para: rota; o card inteiro vira o link (use um título <h3> dentro);
// - seta: mostra arrow_forward no canto (card que leva a outra página);
// - topo e rodape: faixas de cima e de baixo, separadas do corpo por linha de borda a borda;
// - className e qualquer prop do Box do Mantine (ex.: component="article").
export default function Cartao({
  children,
  para,
  seta = false,
  topo,
  rodape,
  className,
  ...props
}) {
  const comFaixas = Boolean(topo || rodape);
  const lista = [classes.cartao];
  if (para) lista.push(classes.link);
  if (seta) lista.push(classes.comSeta);
  if (comFaixas) lista.push(classes.comFaixas);
  if (className) lista.push(className);

  const extra = para ? { component: Link, to: para } : {};

  return (
    <Box className={lista.join(' ')} {...extra} {...props}>
      {comFaixas ? (
        <>
          {topo && <div className={classes.faixa}>{topo}</div>}
          <div className={classes.corpo}>{children}</div>
          {rodape && <div className={classes.faixa}>{rodape}</div>}
        </>
      ) : (
        children
      )}
      {seta && <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />}
    </Box>
  );
}
