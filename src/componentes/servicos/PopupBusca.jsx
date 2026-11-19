import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
import { CONSULTA_CELULAR } from '../../logica/navegacaoCelular';
import { useResumoConta } from './useResumoConta';
import useFecharComEsc from '../useFecharComEsc';
import classes from './PopupBusca.module.css';

// Popup de busca do topo, em 3 estados (vazio, com resultados e sem resultado; ver CorpoBusca).
// "Buscar" (ou Enter) leva à página de Serviços com o texto. Escolher um item fecha o popup.
// No celular, vira tela cheia branca até em cima da barra de abas: "Buscar" + X e o campo
// ficam presos no alto e só o conteúdo rola.
// Recebe aberto e aoFechar().
export default function PopupBusca({ aberto, aoFechar }) {
  const [texto, setTexto] = useState('');
  const navegar = useNavigate();
  const celular = useMediaQuery(CONSULTA_CELULAR);
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const resumo = useResumoConta();
  // Esc da tela cheia do celular (no computador, o Popup cuida dele)
  const tela = useRef(null);
  useFecharComEsc(aberto && celular, () => fechar(), tela);

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

  const fim = buscando && (
    <div className={classes.fim}>
      <span className={classes.fimIcone} aria-hidden="true">
        <Icone nome="add_comment" />
      </span>
      <p className={classes.fimTexto}>Quer abrir um pedido?</p>
      <Botao variante="principal" icone="add" para="/pedidos/novo" onClick={fechar}>
        Abrir pedido
      </Botao>
    </div>
  );

  const campo = (
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
  );

  const conteudo = (
    <>
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
    </>
  );

  // Celular: tela cheia (a barra de abas continua embaixo)
  if (celular) {
    return (
      <Modal.Root
        opened={aberto}
        onClose={fechar}
        fullScreen
        closeOnEscape={false}
        returnFocus={false}
        transitionProps={{ transition: 'fade', duration: 150 }}
        classNames={{ inner: classes.telaFundo }}
      >
        <Modal.Content ref={tela} className={classes.tela}>
          <Modal.Header className={classes.telaCab}>
            <Modal.Title className={classes.telaTitulo}>Buscar</Modal.Title>
            <Botao variante="fechar" aria-label="Fechar" onClick={fechar} />
          </Modal.Header>
          <div className={classes.telaCampo}>{campo}</div>
          <Modal.Body className={classes.telaCorpo}>
            {conteudo}
            {fim && <div className={classes.telaFim}>{fim}</div>}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    );
  }

  return (
    <Popup aberto={aberto} aoFechar={fechar} titulo="Buscar" largura={720} botoes={fim}>
      {campo}
      {conteudo}
    </Popup>
  );
}
