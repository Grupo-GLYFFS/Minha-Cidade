import { createContext } from 'react';

// Caixa compartilhada com as preferências de acessibilidade (letra, contraste e animações).
// Quem fornece os dados é o AcessibilidadeProvider; quem usa chama o hook useAcessibilidade().
export const ContextoAcessibilidade = createContext(null);
