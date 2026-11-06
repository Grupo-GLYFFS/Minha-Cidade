import { createContext } from 'react';

// Caixa compartilhada com os alertas da pessoa logada e as ações de marcar como lido.
// Quem fornece os dados é o AlertasProvider; quem usa chama o hook useAlertas().
export const ContextoAlertas = createContext(null);
