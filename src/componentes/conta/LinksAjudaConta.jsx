import { Link } from 'react-router-dom';
import { Anchor } from '@mantine/core';
import classes from './LinksAjudaConta.module.css';

// Links que abrem sem conta, para o visitante achar no celular (onde não há rodapé)
const LINKS = [
  { rotulo: 'Acessibilidade', caminho: '/perfil/acessibilidade' },
  { rotulo: 'Perguntas frequentes', caminho: '/ajuda/perguntas' },
  { rotulo: 'Telefones úteis', caminho: '/ajuda/telefones' },
  { rotulo: 'Privacidade', caminho: '/privacidade' },
];

// Linha de links no pé da tela "Entrar": acessibilidade e ajuda, que não precisam de conta.
export default function LinksAjudaConta() {
  return (
    <nav aria-label="Ajuda e acessibilidade" className={classes.nav}>
      <ul className={classes.lista}>
        {LINKS.map((link) => (
          <li key={link.caminho}>
            <Anchor
              component={Link}
              to={link.caminho}
              fz="sm"
              fw={600}
              c="var(--cor-link)"
              className={classes.link}
            >
              {link.rotulo}
            </Anchor>
          </li>
        ))}
      </ul>
    </nav>
  );
}
