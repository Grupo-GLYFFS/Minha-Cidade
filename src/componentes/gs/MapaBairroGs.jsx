import classes from './MapaBairroGs.module.css';

// Mapa ilustrado da Vila Mariana no celular "Meu bairro" da seção "A solução".
// Quarteirões, três ruas largas (uma em diagonal), uma praça, o contorno do bairro
// e três pinos: pedido (azul), alerta (âmbar) e obra (verde). Só ilustração.

// Quarteirões: [x, y, largura, altura]. A rua vertical larga passa em x 146–156
// e a horizontal em y 54–64; a praça ocupa o lugar de um quarteirão.
const QUARTEIROES = [
  [6, 6, 40, 22], [52, 6, 40, 22], [98, 6, 42, 22], [162, 6, 40, 22], [208, 6, 34, 22],
  [6, 34, 40, 16], [52, 34, 40, 16], [98, 34, 42, 16], [162, 34, 40, 16], [208, 34, 34, 16],
  [6, 68, 40, 24], [52, 68, 40, 24], [98, 68, 42, 24], [208, 68, 34, 24],
  [6, 98, 40, 24], [52, 98, 40, 24], [98, 98, 42, 24], [208, 98, 34, 24],
];

// Pino com a ponta em (0, 0)
const PINO = 'M0 0C-1.5-5-8-8.5-8-14.5a8 8 0 1 1 16 0C8-8.5 1.5-5 0 0Z';

const PINOS = [
  { x: 112, y: 52, classe: classes.pinoPedido },
  { x: 190, y: 40, classe: classes.pinoAlerta },
  { x: 72, y: 96, classe: classes.pinoObra },
];

export default function MapaBairroGs() {
  return (
    <svg className={classes.mapa} viewBox="0 0 248 128" aria-hidden="true">
      <defs>
        <filter id="gs-sombra-pino" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.28" />
        </filter>
        <clipPath id="gs-recorte-mapa">
          <rect width="248" height="128" rx="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#gs-recorte-mapa)">
        <rect className={classes.fundo} width="248" height="128" />
        {QUARTEIROES.map(([x, y, largura, altura]) => (
          <rect key={`${x}-${y}`} className={classes.quarteirao} x={x} y={y} width={largura} height={altura} rx="4" />
        ))}
        <rect className={classes.praca} x="162" y="68" width="40" height="54" rx="5" />
        <circle className={classes.arvore} cx="172" cy="80" r="4" />
        <circle className={classes.arvore} cx="190" cy="88" r="5" />
        <circle className={classes.arvore} cx="176" cy="106" r="4.5" />
        <path className={classes.caminho} d="M164 120 Q182 96 200 70" />
        <path className={classes.rua} d="M0 59H248" />
        <path className={classes.rua} d="M151 0V128" />
        <path className={classes.rua} d="M-6 128L118 -4" />
        <path
          className={classes.bairro}
          d="M44 18 L132 10 Q144 9 150 18 L198 52 Q206 60 200 72 L184 104 Q178 114 166 115 L70 120 Q56 121 48 110 L30 78 Q26 70 30 60 Z"
        />
      </g>
      {PINOS.map((pino) => (
        <g key={pino.x} transform={`translate(${pino.x} ${pino.y})`} filter="url(#gs-sombra-pino)">
          <path className={pino.classe} d={PINO} />
          <circle className={classes.miolo} cy="-14.5" r="3.2" />
        </g>
      ))}
    </svg>
  );
}
