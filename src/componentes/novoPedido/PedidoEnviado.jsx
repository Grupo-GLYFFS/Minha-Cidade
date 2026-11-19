import { useState } from 'react';
import Pagina from '../Pagina';
import CabecalhoPagina from '../CabecalhoPagina';
import SecaoCard from '../SecaoCard';
import LinhaDado from '../LinhaDado';
import SeloSituacao from '../SeloSituacao';
import Botao from '../Botao';
import GrupoBotoes from '../GrupoBotoes';
import Icone from '../Icone';
import AndamentoPedido from '../pedidos/AndamentoPedido';
import { buscarCategoria, buscarStatus } from '../../logica/pedidos';
import { PROXIMOS_PASSOS, etapasDoPedido } from '../../logica/linhaDoTempo';
import { formatarHora } from '../../logica/datasPedido';
import { enderecoDoPedido, nomeSubprefeitura } from '../../logica/localPedido';
import { GRAVIDADES } from '../../dados/gravidades';
import { pluralizar } from '../../logica/formatos';
import classes from './NovoPedido.module.css';

// Próximo passo mostrado no topo do Andamento, conforme a situação do pedido
const PROXIMO = {
  enviada: { nome: 'Análise', texto: PROXIMOS_PASSOS['em-analise'] },
  'em-analise': { nome: 'Aprovação', texto: PROXIMOS_PASSOS.aprovada },
};

// Página "Pedido enviado", depois do Abrir pedido. Cabeçalho de confirmação com o protocolo
// (e Copiar), o andamento com o próximo passo e o resumo do que foi enviado.
// Uns 5 segundos depois, a análise simulada passa o pedido para "Em análise" e um aviso aparece.
// Recebe o pedido (lido do contexto, então muda sozinho quando entra em análise).
export default function PedidoEnviado({ pedido }) {
  const [copiado, setCopiado] = useState(false);
  const status = buscarStatus(pedido.status);
  const categoria = buscarCategoria(pedido.categoria);
  const gravidade = GRAVIDADES.find((item) => Number(item.valor) === pedido.gravidade);
  const emAnalise = pedido.status === 'em-analise';
  const proximo = PROXIMO[pedido.status];

  // Etapas: a atual aparece como feita (com check); as próximas dizem o que vem
  const etapas = etapasDoPedido(pedido).map((etapa) => ({
    ...etapa,
    estado: etapa.estado === 'atual' ? 'feita' : etapa.estado,
    proximo: PROXIMOS_PASSOS[etapa.id],
  }));

  // Só o envio mostra a hora; as outras etapas mostram o que acontece nelas
  function textoData(etapa) {
    return etapa.id === 'enviada' ? `Hoje, ${formatarHora(pedido.criadoEm)}` : '';
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(pedido.protocolo);
      setCopiado(true);
    } catch {
      // Navegador bloqueou a área de transferência: o número continua visível na tela
    }
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina tipo="confirmacao" titulo="Pedido enviado" subtitulo={pedido.titulo}>
          <div className={classes.protocolo}>
            <div>
              <p className={classes.protocoloRotulo}>Número do protocolo</p>
              <p className={classes.protocoloNumero}>{pedido.protocolo}</p>
            </div>
            <div className={classes.protocoloLado}>
              {status && <SeloSituacao cor={status.cor}>{status.rotulo}</SeloSituacao>}
              <Botao
                variante="secundario"
                compacto
                icone={copiado ? 'check' : 'content_copy'}
                aria-label="Copiar o número do protocolo"
                onClick={copiar}
              >
                {copiado ? 'Copiado' : 'Copiar'}
              </Botao>
            </div>
          </div>
        </CabecalhoPagina>
      }
    >
      <div className={classes.enviado}>
        <div role="status" aria-live="polite">
          {emAnalise && (
            <div className={classes.analise}>
              <Icone nome="manage_search" tamanho={24} />
              <div>
                <p className={classes.analiseTitulo}>Seu pedido entrou em análise</p>
                <p className={classes.analiseTexto}>
                  A equipe da prefeitura está conferindo o local e o tipo de problema. Você recebe a
                  próxima novidade aqui no app.
                </p>
              </div>
            </div>
          )}
        </div>
        <SecaoCard titulo="Andamento">
          {proximo && (
            <div className={classes.proximo}>
              <span className={classes.proximoIcone} aria-hidden="true">
                <Icone nome="manage_search" tamanho={22} />
              </span>
              <div>
                <p className={classes.proximoRotulo}>Próximo passo</p>
                <p className={classes.proximoTexto}>
                  <b>{proximo.nome}:</b> {proximo.texto.charAt(0).toLowerCase()}
                  {proximo.texto.slice(1)}
                </p>
              </div>
            </div>
          )}
          <AndamentoPedido etapas={etapas} textoData={textoData} />
        </SecaoCard>
        <SecaoCard titulo="O que você enviou" lista>
          <LinhaDado icone="category" rotulo="Categoria" valor={categoria?.rotulo} />
          <LinhaDado icone="title" rotulo="Título" valor={pedido.titulo} />
          <LinhaDado
            icone="signal_cellular_alt"
            rotulo="Gravidade estimada"
            valor={`${gravidade?.rotulo} · ${pedido.gravidade} de 5`}
          />
          <LinhaDado
            icone="location_on"
            rotulo="Onde"
            valor={`${enderecoDoPedido(pedido)} · ${pedido.bairro}`}
          />
          {pedido.subprefeitura && (
            <LinhaDado
              icone="account_balance"
              rotulo="Subprefeitura"
              valor={nomeSubprefeitura(pedido.subprefeitura)}
            />
          )}
          <LinhaDado
            icone="photo_library"
            rotulo="Fotos"
            valor={
              pedido.fotos?.length ? pluralizar(pedido.fotos.length, 'foto', 'fotos') : 'Nenhuma'
            }
          />
        </SecaoCard>
        <GrupoBotoes>
          <Botao variante="secundario" para="/perfil/pedidos">
            Ver meus pedidos
          </Botao>
          <Botao
            variante="principal"
            icone="arrow_forward"
            iconeDireita
            para={`/minha-cidade/pedidos/${pedido.id}`}
          >
            Ver o pedido
          </Botao>
        </GrupoBotoes>
      </div>
    </Pagina>
  );
}
