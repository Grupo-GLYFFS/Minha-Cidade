import { createContext } from 'react';

// Caixa compartilhada com a pessoa logada e as ações de entrar, criar conta e sair.
// Quem fornece os dados é o SessaoProvider; quem usa chama o hook useSessao().
export const ContextoSessao = createContext(null);
