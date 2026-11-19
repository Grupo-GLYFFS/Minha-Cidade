import { Link } from 'react-router-dom';
import Logo from './Logo';
import { LINKS_RODAPE } from '../dados/navegacao';
import { useSessao } from '../contexto/useSessao';
import classes from './Rodape.module.css';

// Rodapé de todas as páginas (desenho RP10): à esquerda, o logo (leva ao Início);
// à direita, três grupos de links (Páginas · Global Solution · Ajuda).
// Embaixo de tudo, a linha do © centralizada. No celular: logo, grupos e a linha do ©.
// Para quem entrou, "Entrar ou criar conta" vira "Meu perfil".
export default function Rodape() {
  const { logado } = useSessao();

  return (
    <footer className={classes.rodape}>
      <div className={classes.miolo}>
        <div className={classes.marca}>
          <Logo />
        </div>

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
      </div>

      <div className={classes.base}>
        <p className={classes.creditos}>© 2026 Minha Prefeitura</p>
      </div>
    </footer>
  );
}
