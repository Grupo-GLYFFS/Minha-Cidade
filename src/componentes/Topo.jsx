import { Link } from 'react-router-dom';
import Botao from './Botao';
import BarraAcessibilidade from './topo/BarraAcessibilidade';
import GrupoMenu from './topo/GrupoMenu';
import MenuConta from './topo/MenuConta';
import { useSessao } from '../contexto/useSessao';
import { useAlertas } from '../contexto/useAlertas';
import { MENU_PRINCIPAL } from '../dados/navegacao';
import classes from './Topo.module.css';

// Topo de todas as páginas: barra de acessibilidade, logo (leva ao Início do app, /inicio),
// menu principal (Global Solution ▾ · Serviços · Minha cidade ▾ · Meu bairro ▾),
// busca, sino de Notificações (só para quem entrou) e menu da conta.
// TODO: versão do celular (hoje o menu some abaixo de 992 px)
export default function Topo() {
  const { logado } = useSessao();
  const { naoLidos } = useAlertas();
  const rotuloSino = naoLidos > 0 ? `Notificações, ${naoLidos} novas` : 'Notificações';

  return (
    <header>
      <BarraAcessibilidade />

      <div className={classes.topo}>
        <div className={classes.miolo}>
          <Link
            to="/inicio"
            className={classes.logo}
            aria-label="Minha Prefeitura, ir para o início"
          >
            <img
              className={classes.logoIcone}
              src="/img/logo-icone.png"
              alt=""
              width="44"
              height="44"
            />
            <span className={classes.logoNome} aria-hidden="true">
              Minha Prefeitura
            </span>
          </Link>

          <nav className={classes.menu} aria-label="Menu principal">
            <ul className={classes.lista}>
              {MENU_PRINCIPAL.map((item) => (
                <GrupoMenu key={item.id} item={item} />
              ))}
            </ul>
          </nav>

          <div className={classes.acoes}>
            <Botao variante="icone" icone="search" para="/busca" aria-label="Buscar" />
            {logado && (
              <Botao
                variante="icone"
                icone="notifications"
                para="/notificacoes"
                aria-label={rotuloSino}
              >
                {naoLidos > 0 && (
                  <span className={classes.badge} aria-hidden="true">
                    {naoLidos}
                  </span>
                )}
              </Botao>
            )}
            <MenuConta />
          </div>
        </div>
      </div>
    </header>
  );
}
