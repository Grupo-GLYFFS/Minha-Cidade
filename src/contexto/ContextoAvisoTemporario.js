import { createContext } from 'react';

// Caixa compartilhada com o aviso temporário do rodapé da tela ("Pedido enviado", "Você votou").
// Quem fornece é o AvisoTemporarioProvider; quem usa chama o hook useAvisoTemporario().
export const ContextoAvisoTemporario = createContext(null);
