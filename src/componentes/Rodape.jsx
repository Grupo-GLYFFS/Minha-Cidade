import { Link } from 'react-router-dom';
import Logo from './Logo';
import { LINKS_RODAPE } from '../dados/navegacao';
import classes from './Rodape.module.css';

// Rodapé de todas as páginas: logo (leva ao Início), seis grupos de links
// (Serviços · Minha cidade · Meu bairro · Sua conta · Ajuda · Global Solution)
// e a linha de créditos embaixo.
export default function Rodape() {
  return (
    <footer className={classes.rodape}>
      <div className={classes.miolo}>
        <Logo className={classes.logo} />

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
          <p className={classes.creditos}>
            © 2026 Minha Prefeitura. Protótipo feito para a Global Solution da FIAP.
          </p>
        </div>
      </div>
    </footer>
  );
}
