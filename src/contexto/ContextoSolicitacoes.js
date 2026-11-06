import { createContext } from 'react';

// Caixa compartilhada com as solicitações de serviço da pessoa logada e a ação de enviar uma nova.
// Quem fornece os dados é o SolicitacoesProvider; quem usa chama o hook useSolicitacoes().
export const ContextoSolicitacoes = createContext(null);
