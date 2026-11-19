import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

// Logo do app, igual no topo, no rodapé e nas páginas de conta: ícone de 40 e "Minha" / "Prefeitura"
// em duas linhas, na mesma altura do ícone. Leva ao Início do app (/inicio).
// Recebe className para ajustar o espaço em volta e sobreAzul para fundo azul (painel de conta).
export default function Logo({ className, sobreAzul = false }) {
  const lista = [classes.logo, sobreAzul && classes.sobreAzul, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Link to="/inicio" className={lista} aria-label="Minha Prefeitura, ir para o início">
      <img className={classes.icone} src="img/logo-icone.png" alt="" width="40" height="40" />
      <span className={classes.nome} aria-hidden="true">
        <span>Minha</span>
        <span>Prefeitura</span>
      </span>
    </Link>
  );
}
