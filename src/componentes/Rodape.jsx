import { Link } from 'react-router-dom';
import Logo from './Logo';
import { LINKS_RODAPE } from '../dados/navegacao';
import classes from './Rodape.module.css';

// Rodapé de todas as páginas: seis grupos de links
// (Serviços · Minha cidade · Meu bairro · Sua conta · Ajuda · Global Solution)
// e a linha final com o logo (leva ao Início) e o ©.
export default function Rodape() {
  return (
    <footer className={classes.rodape}>
      <div className={classes.miolo}>
        <div className={classes.grade}>
          {LINKS_RODAPE.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo}>
              <h2 className={classes.titulo}>{grupo.titulo}</h2>
              <ul className={classes.lista}>
                {grupo.links.map((link) => (
                  <li key={link.caminho}>
                    <Link to={link.caminho} className={classes.link}>
                      {link.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={classes.base}>
          <Logo />
          <p className={classes.creditos}>© 2026 Minha Prefeitura</p>
        </div>
      </div>
    </footer>
  );
}
