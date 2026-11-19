import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup';
import Botao from '../Botao';
import Icone from '../Icone';
import CampoBusca from './CampoBusca';
import CorpoBusca from './CorpoBusca';
import { useSessao } from '../../contexto/useSessao';
import { usePedidos } from '../../contexto/usePedidos';
import { useSolicitacoes } from '../../contexto/useSolicitacoes';
import { SERVICOS } from '../../dados/servicos';
import { buscarNoApp } from '../../logica/buscaGeral';
import { useResumoConta } from './useResumoConta';
import classes from './PopupBusca.module.css';

// Popup de busca do topo, em 3 estados (vazio, com resultados e sem resultado; ver CorpoBusca).
// "Buscar" (ou Enter) leva à página de Serviços com o texto. Escolher um item fecha o popup.
// Recebe aberto e aoFechar().
export default function PopupBusca({ aberto, aoFechar }) {
  const [texto, setTexto] = useState('');
  const navegar = useNavigate();
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const resumo = useResumoConta();

  const buscando = texto.trim().length > 0;
  const achados = buscando
    ? buscarNoApp(texto, { servicos: SERVICOS, pedidos, solicitacoes, usuario })
    : null;

  // Fecha e limpa, para abrir do zero da próxima vez
  function fechar() {
    setTexto('');
    aoFechar();
  }

  // Enter ou "Buscar": abre a página de Serviços com o texto
  function enviar() {
    if (!buscando) return;
    navegar(`/servicos?q=${encodeURIComponent(texto.trim())}`);
    fechar();
  }

  // Seta para baixo no campo leva ao primeiro resultado (depois, Tab percorre a lista)
  function teclar(evento) {
    if (evento.key !== 'ArrowDown') return;
    const primeiro = document.querySelector(`.${classes.item}`);
    if (primeiro) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  return (
    <Popup
      aberto={aberto}
      aoFechar={fechar}
      titulo="Buscar"
      largura={720}
      botoes={
        buscando && (
          <div className={classes.fim}>
            <span className={classes.fimIcone} aria-hidden="true">
              <Icone nome="add_comment" />
            </span>
            <p className={classes.fimTexto}>Quer abrir um pedido?</p>
            <Botao variante="principal" icone="add" para="/pedidos/novo" onClick={fechar}>
              Abrir pedido
            </Botao>
          </div>
        )
      }
    >
      <div className={classes.campo}>
        <CampoBusca
          id="busca-topo"
          rotulo="Buscar serviços e pedidos"
          placeholder="Serviço, pedido ou protocolo"
          valor={texto}
          aoMudar={setTexto}
          aoEnviar={enviar}
          aoTeclar={teclar}
          data-autofocus
        />
      </div>
      <p className={classes.oculto} role="status">
        {buscando && (achados.total === 0 ? 'Nenhum resultado.' : `${achados.total} resultados.`)}
      </p>
      <div className={classes.corpo}>
        <CorpoBusca
          texto={texto}
          achados={achados}
          metaPedidos={resumo.pedidos}
          fechar={fechar}
          setTexto={setTexto}
        />
      </div>
    </Popup>
  );
}
