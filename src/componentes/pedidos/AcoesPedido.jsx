import { useState } from 'react';
import Botao from '../Botao';
import { usePedidos } from '../../contexto/usePedidos';
import { useSessao } from '../../contexto/useSessao';
import { useAcaoPendente } from '../../contexto/useAcaoPendente';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';
import { motivoSemAcompanhar } from '../../logica/acompanhamento';
import BarraPe from './BarraPe';
import classes from './DetalhePedido.module.css';

// Por que Apoiar e Seguir ficam desativados (vai no aria-label, depois do nome do botão)
const MOTIVOS = {
  proprio: {
    apoiar: 'Você não pode apoiar o seu próprio pedido',
    seguir: 'Você já recebe as atualizações do seu pedido',
  },
  encerrado: {
    apoiar: 'O pedido está encerrado',
    seguir: 'O pedido está encerrado',
  },
};

// Aviso de quem pediu Apoiar ou Seguir sem conta e, ao entrar, viu que o pedido é dela
const AVISO_PROPRIO = 'Este pedido é seu. Você já acompanha ele.';

// Ações do cabeçalho do detalhe: Apoiar/Apoiado (com o número de apoios), Seguir/Seguindo
// e Compartilhar. Apoiar e Seguir ligam e desligam e ficam salvos no navegador.
// Ficam desativados (cinza, mesmo tamanho) no pedido da própria pessoa e nos encerrados.
// Sem conta, Apoiar e Seguir levam para "Entrar", voltam para o pedido e já apoiam ou seguem.
// Recebe o pedido e, se quiser, pe: true desenha só Seguir | Apoiar na barra do pé do celular.
export default function AcoesPedido({ pedido, pe = false }) {
  const { apoiados, seguidos, alternarApoio, alternarSeguir } = usePedidos();
  const { usuario } = useSessao();
  const mostrarAviso = useAvisoTemporario();
  const [aviso, setAviso] = useState('');

  const motivo = motivoSemAcompanhar(pedido, usuario?.id);
  const apoia = apoiados.includes(pedido.id);
  const segue = seguidos.includes(pedido.id);

  // Pedido pelo visitante: feito quando ele volta logado (só liga, nunca desliga)
  // No pedido da própria pessoa não há o que fazer: o aviso explica
  const apoiarDepois = useAcaoPendente(`apoiar:${pedido.id}`, () => {
    if (motivo === 'proprio') mostrarAviso(AVISO_PROPRIO);
    else if (!motivo && !apoia && alternarApoio(pedido.id))
      mostrarAviso('Você apoiou este pedido.');
  });
  const seguirDepois = useAcaoPendente(`seguir-pedido:${pedido.id}`, () => {
    if (motivo === 'proprio') mostrarAviso(AVISO_PROPRIO);
    else if (!motivo && !segue && alternarSeguir(pedido.id)) {
      mostrarAviso('Você está seguindo este pedido.', '/perfil/seguindo');
    }
  });

  // Visitante vai para "Entrar" (e a ação fica guardada); quem tem conta liga ou desliga
  // e vê a confirmação no rodapé da tela
  function aoClicar(acao, depois) {
    if (!usuario) {
      depois();
      return;
    }
    if (!acao(pedido.id)) return;
    if (acao === alternarApoio) {
      mostrarAviso(apoia ? 'Você tirou o seu apoio.' : 'Você apoiou este pedido.');
    } else if (segue) {
      mostrarAviso('Você deixou de seguir este pedido.');
    } else {
      mostrarAviso('Você está seguindo este pedido.', '/perfil/seguindo');
    }
  }

  // Compartilha pela folha do aparelho ou copia o link do pedido
  async function compartilhar() {
    const link = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: pedido.titulo, url: link });
        return;
      }
      await navigator.clipboard.writeText(link);
      setAviso('Link do pedido copiado.');
    } catch {
      // A pessoa fechou a folha de compartilhar ou o navegador bloqueou: nada a fazer
    }
  }

  const botaoApoiar = (
    <Botao
      variante="secundario"
      icone="volunteer_activism"
      pressionado={motivo ? undefined : apoia}
      contagem={pedido.apoios}
      desabilitado={Boolean(motivo)}
      aria-label={motivo ? `Apoiar. ${MOTIVOS[motivo].apoiar}` : undefined}
      onClick={() => aoClicar(alternarApoio, apoiarDepois)}
    >
      {apoia ? 'Apoiado' : 'Apoiar'}
    </Botao>
  );
  const botaoSeguir = (
    <Botao
      variante="secundario"
      icone="add"
      pressionado={motivo ? undefined : segue}
      desabilitado={Boolean(motivo)}
      aria-label={motivo ? `Seguir. ${MOTIVOS[motivo].seguir}` : undefined}
      onClick={() => aoClicar(alternarSeguir, seguirDepois)}
    >
      {segue ? 'Seguindo' : 'Seguir'}
    </Botao>
  );

  // Barra do pé no celular: Seguir | Apoiar, metade cada um
  if (pe) {
    return (
      <BarraPe>
        {botaoSeguir}
        {botaoApoiar}
      </BarraPe>
    );
  }

  return (
    <>
      {/* No celular, Apoiar e Seguir saem do cabeçalho e vão para a barra do pé */}
      <span className={classes.acoesCabecalho}>
        {botaoApoiar}
        {botaoSeguir}
      </span>
      <Botao
        variante="icone-acao"
        icone="share"
        aria-label="Compartilhar pedido"
        onClick={compartilhar}
      />
      <p className={classes.avisoAcao} role="status">
        {aviso}
      </p>
    </>
  );
}
