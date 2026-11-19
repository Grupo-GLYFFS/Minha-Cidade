import { useState } from 'react';
import Abas from '../Abas';
import Botao from '../Botao';
import Icone from '../Icone';
import ItemCaixaSino from './ItemCaixaSino';
import { usePainelAberto } from '../topo/usePainelAberto';
import { useNotificacoes } from '../../contexto/useNotificacoes';
import classes from './SinoNotificacoes.module.css';

// Sino do topo com a caixa de notificações (28, quadro 5, opção A, 440 px).
// O botão mostra o contador de não lidas e abre a caixa presa embaixo dele: cabeçalho com
// "Marcar todas como lidas" e o atalho para Configurações, abas Não lidas | Todas, a lista
// (rola por dentro) e "Ver todas", que leva à página Notificações.
// Fecha ao clicar fora, com Esc (o foco volta ao sino) e ao abrir uma notificação.
export default function SinoNotificacoes() {
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas } = useNotificacoes();
  const { aberto, fechar, alternar, refContorno, aoTeclar } = usePainelAberto();
  const [aba, setAba] = useState('nao-lidas');

  const lista = aba === 'nao-lidas' ? notificacoes.filter((item) => !item.lida) : notificacoes;
  const rotuloSino = naoLidas > 0 ? `Notificações, ${naoLidas} não lidas` : 'Notificações';

  // Abre uma notificação: marca como lida e fecha a caixa. Recebe o id.
  function abrir(id) {
    marcarComoLida(id);
    fechar();
  }

  return (
    <div className={classes.contorno} ref={refContorno} onKeyDown={aoTeclar}>
      <Botao
        variante="icone"
        icone="notifications"
        aria-label={rotuloSino}
        aria-expanded={aberto}
        aria-controls="caixa-notificacoes"
        aria-haspopup="dialog"
        className={aberto ? classes.sinoAberto : undefined}
        onClick={alternar}
      >
        {naoLidas > 0 && (
          <span className={classes.badge} aria-hidden="true">
            {naoLidas}
          </span>
        )}
      </Botao>

      <div
        className={classes.caixa}
        id="caixa-notificacoes"
        role="dialog"
        aria-label="Notificações"
        hidden={!aberto}
      >
        <div className={classes.cab}>
          <h2 className={classes.titulo}>Notificações</h2>
          <Botao
            variante="texto"
            compacto
            icone="done_all"
            desabilitado={naoLidas === 0}
            onClick={marcarTodasComoLidas}
          >
            Marcar todas como lidas
          </Botao>
          <Botao
            variante="icone-acao"
            icone="settings"
            para="/configuracoes"
            aria-label="Configurar notificações"
            onClick={fechar}
          />
        </div>

        <div className={classes.abas}>
          <Abas
            abas={[
              { id: 'nao-lidas', rotulo: 'Não lidas', contagem: naoLidas },
              { id: 'todas', rotulo: 'Todas', contagem: notificacoes.length },
            ]}
            ativa={aba}
            aoMudar={setAba}
            rotulo="Quais notificações"
            prefixo="sino"
          />
        </div>

        <div
          className={classes.rola}
          id={`sino-painel-${aba}`}
          role="tabpanel"
          aria-labelledby={`sino-aba-${aba}`}
        >
          {lista.length > 0 ? (
            <ul className={classes.lista}>
              {lista.map((item) => (
                <ItemCaixaSino key={item.id} notificacao={item} aoAbrir={abrir} />
              ))}
            </ul>
          ) : (
            <div className={classes.vazio}>
              <span className={classes.vazioIcone} aria-hidden="true">
                <Icone nome="notifications" tamanho={32} />
              </span>
              {notificacoes.length > 0 ? (
                <>
                  <p className={classes.vazioTitulo}>Nenhuma notificação não lida</p>
                  <p className={classes.vazioTexto}>
                    As {notificacoes.length} anteriores continuam em Todas.
                  </p>
                </>
              ) : (
                <p className={classes.vazioTitulo}>Você ainda não tem notificações</p>
              )}
            </div>
          )}
        </div>

        <div className={classes.pe}>
          <Botao
            variante="secundario"
            largo
            icone="arrow_forward"
            iconeDireita
            para="/notificacoes"
            onClick={fechar}
          >
            Ver todas
          </Botao>
        </div>
      </div>
    </div>
  );
}
