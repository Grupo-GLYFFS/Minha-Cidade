// Desenhos dos pedidos de exemplo que têm "foto" (no protótipo não há fotos de verdade).
// Aparecem na miniatura do card, no cabeçalho do detalhe e nas fotos de quem relatou.
// As cores ficam no desenho porque fazem parte da ilustração, não da interface.
const DESENHOS = {
  // Poste apagado numa rua escura
  poste: (
    <>
      <rect width="320" height="200" fill="#1D2B53" />
      <g fill="#2E3F73">
        <rect x="0" y="70" width="60" height="100" />
        <rect x="64" y="96" width="50" height="74" />
        <rect x="226" y="80" width="46" height="90" />
        <rect x="276" y="56" width="44" height="114" />
      </g>
      <g fill="#F5C04A" opacity="0.9">
        <rect x="12" y="84" width="8" height="10" />
        <rect x="36" y="104" width="8" height="10" />
        <rect x="290" y="70" width="8" height="10" />
        <rect x="238" y="118" width="8" height="10" />
      </g>
      <rect x="0" y="168" width="320" height="32" fill="#344054" />
      <rect x="0" y="164" width="320" height="6" fill="#475467" />
      <g>
        <circle cx="268" cy="104" r="26" fill="#F5C04A" opacity="0.18" />
        <rect x="266" y="104" width="3" height="62" fill="#667085" />
        <rect x="258" y="98" width="20" height="7" rx="3" fill="#F5C04A" />
      </g>
      <g>
        <rect x="150" y="44" width="7" height="122" rx="2" fill="#98A2B3" />
        <path d="M153 48h40" stroke="#98A2B3" strokeWidth="6" strokeLinecap="round" />
        <rect x="176" y="50" width="30" height="12" rx="5" fill="#475467" />
        <rect x="180" y="62" width="22" height="5" rx="2" fill="#667085" />
        <rect x="142" y="160" width="23" height="8" rx="2" fill="#667085" />
      </g>
      <path
        d="M216 74l12 12M228 74l-12 12"
        stroke="#FDA29B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),
  // Buraco no asfalto com um cone
  buraco: (
    <>
      <rect width="320" height="200" fill="#E4E7EC" />
      <rect x="0" y="0" width="320" height="46" fill="#D0D5DD" />
      <rect x="0" y="46" width="320" height="6" fill="#98A2B3" />
      <rect x="0" y="52" width="320" height="148" fill="#667085" />
      <g fill="#F5C04A">
        <rect x="0" y="122" width="40" height="5" rx="2" />
        <rect x="70" y="122" width="40" height="5" rx="2" />
        <rect x="250" y="122" width="40" height="5" rx="2" />
      </g>
      <ellipse cx="170" cy="150" rx="70" ry="26" fill="#475467" />
      <ellipse cx="170" cy="152" rx="56" ry="19" fill="#1D2939" />
      <path
        d="M100 146l-20-10M240 150l22-6M156 126l-6-16M196 128l10-14M120 168l-18 10"
        stroke="#98A2B3"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <g>
        <path d="M262 166l16-62 16 62z" fill="#F79009" />
        <rect x="254" y="164" width="48" height="8" rx="2" fill="#B54708" />
        <path d="M269 140h18l3 11h-24zM274 120h8l2 8h-12z" fill="#FFFFFF" />
      </g>
    </>
  ),
  // Árvore com galhos perto da fiação
  arvore: (
    <>
      <rect width="320" height="200" fill="#DCE6FF" />
      <path d="M0 54c80 10 240 10 320 0" stroke="#344054" strokeWidth="2.5" fill="none" />
      <path d="M0 66c80 10 240 10 320 0" stroke="#344054" strokeWidth="2.5" fill="none" />
      <rect x="270" y="30" width="8" height="140" fill="#98A2B3" />
      <rect x="0" y="160" width="320" height="40" fill="#D0D5DD" />
      <rect x="0" y="170" width="320" height="30" fill="#667085" />
      <rect x="120" y="96" width="16" height="70" rx="4" fill="#6B4F3A" />
      <circle cx="128" cy="92" r="34" fill="#2E8B57" />
      <circle cx="100" cy="104" r="22" fill="#3E9B6A" />
      <circle cx="156" cy="104" r="22" fill="#3E9B6A" />
      <g fill="#6B4F3A">
        <rect x="190" y="150" width="34" height="8" rx="4" />
        <rect x="200" y="142" width="28" height="8" rx="4" />
      </g>
    </>
  ),
  // Raiz de árvore levantando a calçada
  calcada: (
    <>
      <rect width="320" height="200" fill="#DCE6FF" />
      <rect x="0" y="40" width="320" height="96" fill="#F2F4F7" />
      <g fill="#B9C9F5">
        <rect x="20" y="56" width="40" height="32" rx="3" />
        <rect x="250" y="56" width="40" height="32" rx="3" />
      </g>
      <rect x="0" y="136" width="320" height="64" fill="#98A2B3" />
      <g fill="#D0D5DD" stroke="#98A2B3" strokeWidth="3">
        <rect x="0" y="140" width="70" height="22" />
        <path d="M74 140l66-14 4 22-66 14z" />
        <path d="M150 128l64 6-2 24-64-6z" />
        <rect x="220" y="140" width="100" height="22" />
      </g>
      <path
        d="M140 150c10-6 24-8 36-4M120 158c14 2 26-2 34-10"
        stroke="#6B4F3A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="132" y="70" width="14" height="74" rx="4" fill="#6B4F3A" />
      <circle cx="139" cy="54" r="38" fill="#2E8B57" />
      <circle cx="114" cy="66" r="22" fill="#3E9B6A" />
      <circle cx="166" cy="64" r="24" fill="#3E9B6A" />
      <rect x="0" y="162" width="320" height="38" fill="#667085" />
    </>
  ),
  // Boca de lobo: rua com a grade no meio-fio e água empoçada
  bocaDeLobo: (
    <>
      <rect width="320" height="200" fill="#DCE6FF" />
      <rect x="0" y="36" width="320" height="76" fill="#F2F4F7" />
      <g fill="#B9C9F5">
        <rect x="22" y="52" width="40" height="32" rx="3" />
        <rect x="258" y="52" width="40" height="32" rx="3" />
      </g>
      <rect x="0" y="112" width="320" height="20" fill="#D0D5DD" />
      <rect x="0" y="132" width="320" height="8" fill="#98A2B3" />
      <rect x="0" y="140" width="320" height="60" fill="#667085" />
      <rect x="104" y="116" width="112" height="24" rx="4" fill="#1D2939" />
      <path
        d="M122 120v16M140 120v16M160 120v16M180 120v16M198 120v16"
        stroke="#475467"
        strokeWidth="5"
      />
      <ellipse cx="160" cy="170" rx="128" ry="22" fill="#5B8DEF" />
      <path
        d="M64 168c18-6 36-6 54 0M184 174c18-6 36-6 54 0"
        stroke="#DCE6FF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="#6B4F3A">
        <path d="M138 150l14 4-7 6z" />
        <path d="M178 146l12 2-5 8z" />
      </g>
    </>
  ),
};

// Mostra o desenho de um pedido. Recebe o nome (poste, buraco, arvore, calcada, bocaDeLobo),
// um texto alternativo (sem ele, o desenho é decorativo) e embaixo (no cabeçalho largo,
// mostra a parte de baixo do desenho, onde está o problema).
// Devolve null se o nome não existir.
export default function IlustracaoPedido({ nome, alt, embaixo = false }) {
  const desenho = DESENHOS[nome];
  if (!desenho) return null;
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio={embaixo ? 'xMidYMax slice' : 'xMidYMid slice'}
      role={alt ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : 'true'}
      focusable="false"
    >
      {desenho}
    </svg>
  );
}
