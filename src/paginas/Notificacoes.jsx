import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Abas from '../componentes/Abas';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoErro from '../componentes/EstadoErro';
import EstadoCarregando from '../componentes/EstadoCarregando';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ListaPorDia from '../componentes/notificacoes/ListaPorDia';
import { useNotificacoes } from '../contexto/useNotificacoes';
import { usePedidos } from '../contexto/usePedidos';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useSessao } from '../contexto/useSessao';
import classes from './Notificacoes.module.css';

// Tempo da carga de mentira, para o estado "carregando" aparecer (o app não tem servidor)
const TEMPO_CARGA_MS = 400;

// Notificações (/notificacoes): abas Não lidas | Todas, notificações agrupadas por dia,
// "Marcar todas como lidas" e o atalho para Configurações no cabeçalho.
// Estados: carregando (na entrada), vazio (nada não lido) e erro
// (para demonstrar, abra /notificacoes?simular=erro).
export default function Notificacoes() {
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas } = useNotificacoes();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const { usuario } = useSessao();
  const [parametros] = useSearchParams();
  const [aba, setAba] = useState('nao-lidas');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(parametros.get('simular') === 'erro');

  // Simula a carga das notificações
  useEffect(() => {
    if (!carregando) return undefined;
    const espera = setTimeout(() => setCarregando(false), TEMPO_CARGA_MS);
    return () => clearTimeout(espera);
  }, [carregando]);

  // "Tentar de novo": some com o erro e carrega outra vez
  function tentarDeNovo() {
    setErro(false);
    setCarregando(true);
  }

  const lista = aba === 'nao-lidas' ? notificacoes.filter((item) => !item.lida) : notificacoes;
  const pronto = !carregando && !erro;
  const feitos = pedidos.filter((pedido) => pedido.autorId === usuario.id).length;

  let conteudo;
  if (erro) {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar as notificações agora"
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else if (carregando) {
    conteudo = <EstadoCarregando texto="Carregando as notificações…" />;
  } else if (lista.length === 0) {
    conteudo =
      aba === 'nao-lidas' && notificacoes.length > 0 ? (
        <EstadoVazio
          icone="notifications"
          titulo="Nenhuma notificação não lida"
          texto={`As ${notificacoes.length} anteriores continuam na aba Todas.`}
        >
          <Botao variante="secundario" onClick={() => setAba('todas')}>
            Ver todas
          </Botao>
        </EstadoVazio>
      ) : (
        <EstadoVazio icone="notifications" titulo="Você ainda não tem notificações" />
      );
  } else {
    conteudo = <ListaPorDia notificacoes={lista} prefixo={aba} aoAbrir={marcarComoLida} />;
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Notificações"
          icone="notifications"
          acoes={
            <>
              <Botao
                variante="secundario"
                icone="done_all"
                desabilitado={!pronto || naoLidas === 0}
                onClick={marcarTodasComoLidas}
              >
                Marcar todas como lidas
              </Botao>
              <Botao
                variante="icone-acao"
                icone="settings"
                para="/configuracoes"
                aria-label="Configurar notificações"
              />
            </>
          }
        />
      }
    >
      <div className={classes.abas}>
        <Abas
          abas={[
            { id: 'nao-lidas', rotulo: 'Não lidas', contagem: pronto ? naoLidas : undefined },
            { id: 'todas', rotulo: 'Todas', contagem: pronto ? notificacoes.length : undefined },
          ]}
          ativa={aba}
          aoMudar={setAba}
          rotulo="Quais notificações"
          prefixo="notificacoes"
        />
      </div>

      <div
        id={`notificacoes-painel-${aba}`}
        role="tabpanel"
        aria-labelledby={`notificacoes-aba-${aba}`}
        aria-busy={carregando || undefined}
      >
        {conteudo}
      </div>

      <ParaOndeIr
        destinos={[
          {
            icone: 'event_available',
            titulo: 'Minhas solicitações',
            meta:
              solicitacoes.length > 0
                ? `${solicitacoes.length} feitas por você`
                : 'Nenhuma feita ainda',
            para: '/servicos/minhas-solicitacoes',
          },
          {
            icone: 'assignment',
            titulo: 'Meus pedidos',
            meta: `${feitos} feitos por você`,
            para: '/perfil/pedidos',
          },
        ]}
      />
    </Pagina>
  );
}
