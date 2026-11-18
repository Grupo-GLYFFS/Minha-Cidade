// Ilustração simples de mapa para os exemplos de cabeçalho da /componentes.
// Cores só por variável, para valer também no alto contraste.
export default function MapaExemplo() {
  return (
    <svg
      viewBox="0 0 640 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="640" height="320" fill="var(--cor-fundo)" />
      <g stroke="var(--cor-superficie)" strokeWidth="10" fill="none" strokeLinecap="round">
        <path d="M-20 260L660 40" />
        <path d="M200 -20L460 340" />
        <path d="M-20 120L660 180" />
      </g>
      <path
        d="M196 70L452 52L486 214L360 268L214 246L176 150z"
        fill="var(--cor-faixa)"
        stroke="var(--cor-azul)"
        strokeWidth="3"
        strokeDasharray="10 7"
      />
      <circle cx="320" cy="150" r="14" fill="var(--cor-azul)" />
    </svg>
  );
}
