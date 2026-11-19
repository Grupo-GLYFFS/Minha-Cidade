import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

// Logo do app, igual no topo e no rodapé: ícone de 40 e "Minha" / "Prefeitura"
// em duas linhas, na mesma altura do ícone. Leva ao Início do app (/inicio).
// Recebe className para ajustar o espaço em volta (ex.: margem embaixo no rodapé).
export default function Logo({ className }) {
  return (
    <Link
      to="/inicio"
      className={className ? `${classes.logo} ${className}` : classes.logo}
      aria-label="Minha Prefeitura, ir para o início"
    >
      <img className={classes.icone} src="/img/logo-icone.png" alt="" width="40" height="40" />
      <span className={classes.nome} aria-hidden="true">
        <span>Minha</span>
        <span>Prefeitura</span>
      </span>
    </Link>
  );
}
