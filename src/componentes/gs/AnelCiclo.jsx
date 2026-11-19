import { useId } from 'react';
import classes from './AnelCiclo.module.css';

// Centro e raio do anel no desenho de 400 × 400
const CENTRO = 200;
const RAIO = 140;
const RAIO_NO = 32;

// Ponto do anel num ângulo (em graus, 0 = em cima, sentido horário).
// Recebe o ângulo; devolve { x, y } arredondados a uma casa.
function pontoNoAnel(angulo) {
  const radianos = ((angulo - 90) * Math.PI) / 180;
  return {
    x: Math.round((CENTRO + RAIO * Math.cos(radianos)) * 10) / 10,
    y: Math.round((CENTRO + RAIO * Math.sin(radianos)) * 10) / 10,
  };
}

// Anel do ciclo do pedido: trilha azul-clara, um nó azul com o número grande para cada etapa
// e arcos com seta entre os nós; no centro, "Pedido de melhoria".
// Recebe a quantidade de etapas. É decorativo: a lista ao lado traz as mesmas etapas em texto.
export default function AnelCiclo({ etapas }) {
  const idSeta = useId();
  const passo = 360 / etapas;
  // O arco sai 15° depois de um nó e chega 15° antes do próximo (o nó tem raio 32)
  const folga = 15;

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={classes.anel}
    >
      <defs>
        <marker
          id={idSeta}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0L10 5L0 10z" className={classes.ponta} />
        </marker>
      </defs>
      <circle cx={CENTRO} cy={CENTRO} r={RAIO} strokeWidth="28" className={classes.trilha} />
      <circle cx={CENTRO} cy={CENTRO} r="104" className={classes.miolo} />

      {Array.from({ length: etapas }, (_, indice) => {
        const inicio = pontoNoAnel(indice * passo + folga);
        const fim = pontoNoAnel((indice + 1) * passo - folga);
        return (
          <path
            key={`arco-${indice}`}
            d={`M${inicio.x} ${inicio.y} A${RAIO} ${RAIO} 0 0 1 ${fim.x} ${fim.y}`}
            strokeWidth="4"
            markerEnd={`url(#${idSeta})`}
            className={classes.arco}
          />
        );
      })}

      {Array.from({ length: etapas }, (_, indice) => {
        const no = pontoNoAnel(indice * passo);
        return (
          <g key={`no-${indice}`}>
            <circle cx={no.x} cy={no.y} r={RAIO_NO} className={classes.no} />
            <text x={no.x} y={no.y + 8} textAnchor="middle" className={classes.numero}>
              {indice + 1}
            </text>
          </g>
        );
      })}

      <text x={CENTRO} y="192" textAnchor="middle" className={classes.centro}>
        Pedido de
      </text>
      <text x={CENTRO} y="220" textAnchor="middle" className={classes.centro}>
        melhoria
      </text>
    </svg>
  );
}
