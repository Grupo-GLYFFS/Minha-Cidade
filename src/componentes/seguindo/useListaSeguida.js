import { useState } from 'react';

// Junta os ids que a pessoa segue agora com os que ela seguia quando abriu a página.
// Assim, quem desliga o Seguindo não vê o card sumir na hora (e pode ligar de novo).
// Recebe a lista de ids seguidos agora; devolve a lista sem repetidos.
export function useListaSeguida(seguidos) {
  const [aoAbrir] = useState(seguidos);
  return [...new Set([...aoAbrir, ...seguidos])];
}
