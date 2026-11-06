import { useState } from 'react';
import { Text } from '@mantine/core';
import { formatarNumero, pluralizar } from '../../logica/formatos';
import classes from './NumeroApoios.module.css';

// Mostra quantos apoios o pedido tem e dá um pulinho no número quando ele muda.
// Recebe a quantidade e "grande" (true na página do pedido: número enorme com a palavra embaixo).
export default function NumeroApoios({ apoios, grande = false }) {
  // Guarda o valor de quando apareceu na tela: a animação só roda se o número mudar depois
  const [inicial] = useState(apoios);
  const classeAnimacao = apoios !== inicial ? classes.pulo : undefined;

  if (grande) {
    return (
      <div className={classes.grande}>
        {/* A chave muda junto com o número, então a animação roda a cada apoio novo */}
        <Text key={apoios} component="span" className={classeAnimacao} fz={48} fw={800} lh={1}>
          {formatarNumero(apoios)}
        </Text>
        <Text component="span" fz={15} fw={600} c="var(--cor-texto-suave)">
          {apoios === 1 ? 'apoio' : 'apoios'}
        </Text>
      </div>
    );
  }

  return (
    <Text key={apoios} component="span" fz={14} fw={700} className={classeAnimacao}>
      {pluralizar(apoios, 'apoio', 'apoios')}
    </Text>
  );
}
