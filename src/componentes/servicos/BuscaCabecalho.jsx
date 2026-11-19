import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Botao from '../Botao';
import Chip from '../Chip';
import CampoBusca from './CampoBusca';
import CorpoBusca from './CorpoBusca';
import PopupBusca from './PopupBusca';
import { moverComSetas } from './setasBusca';
import { useResumoConta } from './useResumoConta';
import { useSessao } from '../../contexto/useSessao';
import { usePedidos } from '../../contexto/usePedidos';
import { useSolicitacoes } from '../../contexto/useSolicitacoes';
import { SERVICOS } from '../../dados/servicos';
import { buscarNoApp } from '../../logica/buscaGeral';
import { buscarServicos } from '../../logica/buscaServicos';
import { caminhoCardServico, servicosMaisUsados } from '../../logica/servicos';
import { CONSULTA_CELULAR } from '../../logica/navegacaoCelular';
import classes from './BuscaCabecalho.module.css';
import classesBusca from './PopupBusca.module.css';

// Atalhos "Mais usados", na ordem do catálogo
const MAIS_USADOS = servicosMaisUsados();

// Parte de baixo do cabeçalho de Serviços: a busca grande e os atalhos "Mais usados".
// - Computador: ao digitar, os resultados aparecem num painel logo abaixo do campo, com a lista
//   do popup de busca (CorpoBusca). Setas andam pela lista, Enter abre o item; Esc ou um clique
//   fora fecham o painel (clicar no campo ou a seta para baixo o abrem de novo). Enter no campo (ou "Buscar") fecha o painel e leva à lista completa.
// - Celular: tocar no campo (ou em "Buscar") abre a busca em tela cheia (PopupBusca).
// Os atalhos "Mais usados" somem enquanto há texto.
// Recebe o texto da busca (valor), aoMudar(texto) e aoEnviar().
export default function BuscaCabecalho({ valor, aoMudar, aoEnviar }) {
  const celular = useMediaQuery(CONSULTA_CELULAR);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [painelAberto, setPainelAberto] = useState(false);
  const area = useRef(null);
  const lista = useRef(null);
  const entrada = useRef(null);
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const resumo = useResumoConta();

  const buscando = valor.trim().length > 0;
  const mostrarPainel = !celular && painelAberto && buscando;
  const achados = mostrarPainel
    ? buscarNoApp(valor, { servicos: SERVICOS, pedidos, solicitacoes, usuario })
    : null;
  // O painel mostra só os primeiros serviços; a lista completa fica na página
  const totalServicos = mostrarPainel ? buscarServicos(valor, SERVICOS).length : 0;

  // Clique fora do campo e do painel fecha o painel
  useEffect(() => {
    if (!mostrarPainel) return undefined;
    function cliqueFora(evento) {
      if (area.current && !area.current.contains(evento.target)) setPainelAberto(false);
    }
    document.addEventListener('pointerdown', cliqueFora);
    return () => document.removeEventListener('pointerdown', cliqueFora);
  }, [mostrarPainel]);

  // Celular: Enter, espaço ou toque no campo abrem a busca em tela cheia
  function teclarCelular(evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      setBuscaAberta(true);
    }
  }

  // Computador: cada letra atualiza o painel
  function mudar(texto) {
    aoMudar(texto);
    setPainelAberto(texto.trim().length > 0);
  }

  // Enter ou "Buscar": fecha o painel e leva à lista completa
  function enviar() {
    setPainelAberto(false);
    aoEnviar();
  }

  // Esc fecha o painel e devolve o foco ao campo; setas andam pela lista
  function teclar(evento) {
    if (evento.key === 'Escape' && mostrarPainel) {
      evento.preventDefault();
      setPainelAberto(false);
      entrada.current?.focus();
      return;
    }
    // Com o painel fechado, a seta para baixo no campo o abre de novo
    if (!mostrarPainel && evento.key === 'ArrowDown' && buscando) {
      evento.preventDefault();
      setPainelAberto(true);
      return;
    }
    if (mostrarPainel) moverComSetas(evento, lista.current, entrada.current);
  }

  const propsCampo = celular
    ? {
        readOnly: true,
        'aria-haspopup': 'dialog',
        onClick: () => setBuscaAberta(true),
        aoTeclar: teclarCelular,
        aoEnviar: () => setBuscaAberta(true),
      }
    : {
        aoMudar: mudar,
        aoEnviar: enviar,
        onClick: () => setPainelAberto(buscando),
        'aria-expanded': mostrarPainel,
        'aria-controls': 'painel-busca-servicos',
      };

  return (
    <div className={classes.bloco}>
      {/* O Esc e as setas dentro do painel sobem até aqui */}
      <div className={classes.area} ref={area} onKeyDown={celular ? undefined : teclar}>
        <CampoBusca
          ref={entrada}
          id="busca-servicos"
          rotulo="Buscar serviços e informações"
          placeholder="O que você precisa? Ex.: IPTU, vacina, poda de árvore"
          valor={valor}
          aoMudar={aoMudar}
          aoEnviar={aoEnviar}
          grande
          {...propsCampo}
        />
        {mostrarPainel && (
          <div className={classesBusca.painel} id="painel-busca-servicos" data-painel-busca>
            <p className={classesBusca.oculto} role="status">
              {achados.total === 0 ? 'Nenhum resultado.' : `${achados.total} resultados.`}
            </p>
            <div className={classesBusca.corpo} ref={lista}>
              <CorpoBusca
                texto={valor}
                achados={achados}
                metaPedidos={resumo.pedidos}
                fechar={() => setPainelAberto(false)}
                setTexto={mudar}
              />
            </div>
            {totalServicos > achados.servicos.length && (
              <div className={classesBusca.painelFim}>
                <p className={classesBusca.painelFimTexto}>
                  {totalServicos} serviços encontrados
                </p>
                <Botao variante="texto" icone="arrow_downward" iconeDireita onClick={enviar}>
                  Ver todos
                </Botao>
              </div>
            )}
          </div>
        )}
      </div>
      {celular && <PopupBusca aberto={buscaAberta} aoFechar={() => setBuscaAberta(false)} />}
      {!buscando && (
        <>
          <p className={classes.rotulo} id="mais-usados">
            Mais usados
          </p>
          <ul className={classes.atalhos} aria-labelledby="mais-usados">
            {MAIS_USADOS.map((servico) => (
              <li key={servico.id}>
                <Chip para={caminhoCardServico(servico)} icone={servico.icone}>
                  {servico.nomeCurto ?? servico.nome}
                </Chip>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
