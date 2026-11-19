import { Link } from 'react-router-dom';
import Logo from './Logo';
import { LINKS_RODAPE } from '../dados/navegacao';
import { useSessao } from '../contexto/useSessao';
import classes from './Rodape.module.css';

// Rodapé de todas as páginas: três grupos de links (Páginas · Global Solution · Ajuda)
// e a linha final com o logo (leva ao Início) e o ©.
// Para quem entrou, "Entrar ou criar conta" vira "Meu perfil".
export default function Rodape() {
  const { logado } = useSessao();

  return (
    <footer className={classes.rodape}>
      <div className={classes.miolo}>
        <div className={classes.grade}>
          {LINKS_RODAPE.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo}>
              <h2 className={classes.titulo}>{grupo.titulo}</h2>
              <ul className={classes.lista}>
                {grupo.links.map((item) => {
                  // Usa a versão "seLogado" do link quando a pessoa entrou
                  const link = logado && item.seLogado ? item.seLogado : item;
                  return (
                    <li key={link.caminho}>
                      <Link to={link.caminho} className={classes.link}>
                        {link.rotulo}
                      </Link>
                    </li>
                  );
                })}
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
