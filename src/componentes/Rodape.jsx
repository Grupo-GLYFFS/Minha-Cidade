import { Link } from 'react-router-dom';
import { LINKS_RODAPE } from '../dados/navegacao';
import classes from './Rodape.module.css';

// Rodapé de todas as páginas: três colunas de links e a linha de baixo com o nome do app.
// TODO: trocar pelo rodapé novo quando o usuário escolher o modelo (largura e conteúdo a decidir)
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
        <p className={classes.base}>© 2026 Minha Prefeitura</p>
      </div>
    </footer>
  );
}
