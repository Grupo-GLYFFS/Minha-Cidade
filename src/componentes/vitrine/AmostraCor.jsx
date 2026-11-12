import { Box } from '@mantine/core';
import { formatarRazao, nivelContraste } from '../../logica/contraste';
import classes from './AmostraCor.module.css';

// Quadrado de uma cor com o nome, o valor em texto (a cor nunca é a única informação),
// o uso e, se for cor de texto, o contraste e o nível da WCAG.
// Recebe: cor (valor para pintar, ex.: "var(--cor-fundo)"), nome, valor (texto), uso (opcional)
// e contraste (opcional) { razao, sobre } — "sobre" diz contra qual fundo foi medido.
export default function AmostraCor({ cor, nome, valor, uso, contraste }) {
  const nivel = contraste ? nivelContraste(contraste.razao) : '';

  return (
    <div className={classes.amostra}>
      <Box bg={cor} className={classes.cor} aria-hidden="true" />
      <div className={classes.textos}>
        <code className={classes.nome}>{nome}</code>
        <span className={classes.valor}>{valor || 'sem valor'}</span>
        {uso && <span className={classes.uso}>{uso}</span>}
        {contraste && (
          <span className={classes.contraste}>
            Contraste {formatarRazao(contraste.razao)} {contraste.sobre} ·{' '}
            <strong className={classes.nivel} data-passa={nivel !== 'Não passa' || undefined}>
              {nivel}
            </strong>
          </span>
        )}
      </div>
    </div>
  );
}
