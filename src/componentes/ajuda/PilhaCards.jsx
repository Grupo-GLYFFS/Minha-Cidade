import classes from './PilhaCards.module.css';

// Coluna de cards de seção, um embaixo do outro com 16 entre eles
// (páginas de ajuda, Meu perfil e Configurações). Recebe os cards (children).
export default function PilhaCards({ children }) {
  return <div className={classes.pilha}>{children}</div>;
}
