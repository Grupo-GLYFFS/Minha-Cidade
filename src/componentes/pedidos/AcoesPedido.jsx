import { useState } from 'react';
import Botao from '../Botao';
import { usePedidos } from '../../contexto/usePedidos';
import { useSessao } from '../../contexto/useSessao';
import { useAcaoPendente } from '../../contexto/useAcaoPendente';
import { motivoSemAcompanhar } from '../../logica/acompanhamento';
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

// Ações do cabeçalho do detalhe: Apoiar/Apoiado (com o número de apoios), Seguir/Seguindo
// e Compartilhar. Apoiar e Seguir ligam e desligam e ficam salvos no navegador.
// Ficam desativados (cinza, mesmo tamanho) no pedido da própria pessoa e nos encerrados.
// Sem conta, Apoiar e Seguir levam para "Entrar", voltam para o pedido e já apoiam ou seguem.
// Recebe o pedido.
export default function AcoesPedido({ pedido }) {
  const { apoiados, seguidos, alternarApoio, alternarSeguir } = usePedidos();
  const { usuario } = useSessao();
  const [aviso, setAviso] = useState('');

  const motivo = motivoSemAcompanhar(pedido, usuario?.id);
  const apoia = apoiados.includes(pedido.id);
  const segue = seguidos.includes(pedido.id);

  // Pedido pelo visitante: feito quando ele volta logado (só liga, nunca desliga)
  const apoiarDepois = useAcaoPendente(`apoiar:${pedido.id}`, () => {
    if (!motivo && !apoia) alternarApoio(pedido.id);
  });
  const seguirDepois = useAcaoPendente(`seguir-pedido:${pedido.id}`, () => {
    if (!motivo && !segue) alternarSeguir(pedido.id);
  });

  // Visitante vai para "Entrar" (e a ação fica guardada); quem tem conta liga ou desliga
  function aoClicar(acao, depois) {
    if (!usuario) depois();
    else acao(pedido.id);
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

  return (
    <>
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
