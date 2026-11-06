import { createContext } from 'react';

// Caixa compartilhada com os votos nos grandes projetos e a ação de votar.
// Quem fornece os dados é o VotosProvider; quem usa chama o hook useVotos().
export const ContextoVotos = createContext(null);
