import BotaoBusca from './servicos/BotaoBusca';
import BarraAcessibilidade from './topo/BarraAcessibilidade';
import Logo from './Logo';
import GrupoMenu from './topo/GrupoMenu';
import MenuConta from './topo/MenuConta';
import { useSessao } from '../contexto/useSessao';
import SinoNotificacoes from './notificacoes/SinoNotificacoes';
import { MENU_PRINCIPAL } from '../dados/navegacao';
import classes from './Topo.module.css';

// Topo de todas as páginas: barra de acessibilidade, logo (leva ao Início do app, /inicio),
// menu principal (Serviços · Minha cidade ▾ · Meu bairro ▾ · Global Solution ▾),
// busca, sino de Notificações com a caixa que abre embaixo dele (só para quem entrou)
// e menu da conta.
// TODO: versão do celular (hoje o menu some abaixo de 992 px)
export default function Topo() {
  const { logado } = useSessao();

  return (
    <header>
      <BarraAcessibilidade />

      <div className={classes.topo}>
        <div className={classes.miolo}>
          <Logo />

          <nav className={classes.menu} aria-label="Menu principal">
            <ul className={classes.lista}>
              {MENU_PRINCIPAL.map((item) => (
                <GrupoMenu key={item.id} item={item} />
              ))}
            </ul>
          </nav>

          <div className={classes.acoes}>
            <BotaoBusca />
            {logado && <SinoNotificacoes />}
            <MenuConta />
          </div>
        </div>
      </div>
    </header>
  );
}
