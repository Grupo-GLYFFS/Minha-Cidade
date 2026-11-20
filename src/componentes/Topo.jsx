import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BotaoBusca from './servicos/BotaoBusca';
import BarraAcessibilidade from './topo/BarraAcessibilidade';
import Logo from './Logo';
import GrupoMenu from './topo/GrupoMenu';
import MenuConta from './topo/MenuConta';
import { useSessao } from '../contexto/useSessao';
import SinoNotificacoes from './notificacoes/SinoNotificacoes';
import { MENU_PRINCIPAL } from '../dados/navegacao';
import classes from './Topo.module.css';

// Quanto precisa rolar antes de esconder ou mostrar a barra de navegação
const LIMIAR_ROLAGEM = 8;
// Perto do topo da página, a barra de navegação fica sempre visível
const ZONA_TOPO = 120;

// Topo de todas as páginas: barra de acessibilidade, logo (leva ao Início do app, /inicio),
// menu principal (Serviços · Minha cidade ▾ · Meu bairro ▾ · Global Solution ▾),
// busca, sino de Notificações com a caixa que abre embaixo dele (só para quem entrou)
// e menu da conta.
// No computador (≥ 1024 px), a barra de acessibilidade fica sempre presa no topo e a barra
// de navegação some ao rolar para baixo e volta ao rolar para cima.
export default function Topo() {
  const { logado } = useSessao();
  const { pathname } = useLocation();
  const [escondido, setEscondido] = useState(false);
  const [caminho, setCaminho] = useState(pathname);
  const refNav = useRef(null);
  const ultimoY = useRef(0);

  // Ao mudar de página, volta a mostrar a barra de navegação
  if (caminho !== pathname) {
    setCaminho(pathname);
    setEscondido(false);
  }

  useEffect(() => {
    ultimoY.current = window.scrollY;

    function aoRolar() {
      const y = window.scrollY;
      if (y <= ZONA_TOPO) {
        setEscondido(false);
        ultimoY.current = y;
        return;
      }
      const delta = y - ultimoY.current;
      if (Math.abs(delta) < LIMIAR_ROLAGEM) return;

      if (delta > 0) {
        // Não esconde enquanto um menu suspenso ou a caixa do sino estiver aberto
        const temPainelAberto = Boolean(refNav.current?.querySelector('[aria-expanded="true"]'));
        if (!temPainelAberto) setEscondido(true);
      } else {
        setEscondido(false);
      }
      ultimoY.current = y;
    }

    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, [pathname]);

  const classeTopo = escondido ? `${classes.topo} ${classes.escondido}` : classes.topo;

  return (
    <header className={classes.cabecalho}>
      <div className={classes.acessibilidade}>
        <BarraAcessibilidade />
      </div>

      <div ref={refNav} className={classeTopo} onFocus={() => setEscondido(false)}>
        <div className={classes.miolo}>
          <Logo className={classes.logo} />

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
