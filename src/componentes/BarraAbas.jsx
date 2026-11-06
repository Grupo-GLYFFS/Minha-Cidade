import { Link, useLocation } from 'react-router-dom';
import Icone from './Icone';
import { ABAS_CELULAR, ABA_ENTRAR, estaAtivo } from '../dados/navegacao';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { caminhoComVoltar } from '../logica/sessao';
import { pluralizar } from '../logica/formatos';
import classes from './BarraAbas.module.css';

// Barra de abas presa embaixo da tela do celular.
// Recebe quantos alertas novos existem, para mostrar o contador na aba Alertas.
// Para o visitante: a aba Perfil vira "Entrar" e a aba Alertas leva a "Entrar" (sem contador).
export default function BarraAbas({ alertasNovos = 0 }) {
  const { pathname } = useLocation();
  const { logado } = useSessao();
  const { entrar } = useCaminhoConta();
  const novos = logado ? alertasNovos : 0;

  // Troca as abas que precisam de conta quando a pessoa ainda não entrou
  const abas = ABAS_CELULAR.map((aba) => {
    if (logado) return aba;
    if (aba.caminho === '/perfil') return { ...ABA_ENTRAR, caminho: entrar };
    if (aba.caminho === '/alertas')
      return { ...aba, caminho: caminhoComVoltar('/entrar', '/alertas') };
    return aba;
  });

  return (
    <nav className={classes.barra} aria-label="Menu principal">
      <ul className={classes.lista}>
        {abas.map((aba) => {
          const ativa = estaAtivo(aba, pathname);
          const ehAlertas = aba.rotulo === 'Alertas';

          // Na aba Alertas, o leitor de tela também ouve quantos alertas são novos
          const rotuloAcessivel =
            ehAlertas && novos > 0 ? `Alertas, ${pluralizar(novos, 'novo', 'novos')}` : undefined;

          return (
            <li key={aba.rotulo}>
              <Link
                to={aba.caminho}
                className={classes.aba}
                aria-current={ativa ? 'page' : undefined}
                aria-label={rotuloAcessivel}
              >
                <Icone nome={aba.icone} preenchido={ativa} />
                {ehAlertas && novos > 0 && (
                  <span className={classes.contador} aria-hidden="true">
                    {novos}
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
