import { Link, useLocation } from 'react-router-dom';
import Icone from './Icone';
import { ABAS_CELULAR, estaAtivo } from '../dados/navegacao';
import classes from './BarraAbas.module.css';

// Barra de abas presa embaixo da tela do celular.
// Recebe quantos alertas novos existem, para mostrar o contador na aba Alertas.
export default function BarraAbas({ alertasNovos = 0 }) {
  const { pathname } = useLocation();

  return (
    <nav className={classes.barra} aria-label="Menu principal">
      <ul className={classes.lista}>
        {ABAS_CELULAR.map((aba) => {
          const ativa = estaAtivo(aba, pathname);
          const ehAlertas = aba.caminho === '/alertas';

          // Na aba Alertas, o leitor de tela também ouve quantos alertas são novos
          const rotuloAcessivel =
            ehAlertas && alertasNovos > 0 ? `Alertas, ${alertasNovos} novos` : undefined;

          return (
            <li key={aba.caminho}>
              <Link
                to={aba.caminho}
                className={classes.aba}
                aria-current={ativa ? 'page' : undefined}
                aria-label={rotuloAcessivel}
              >
                <Icone nome={aba.icone} preenchido={ativa} />
                {ehAlertas && alertasNovos > 0 && (
                  <span className={classes.contador} aria-hidden="true">
                    {alertasNovos}
                  </span>
                )}
                {aba.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
