import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';
import BotaoFlutuante from '../componentes/pedidos/BotaoFlutuante';
import { useCarregamentoSimulado } from '../componentes/pedidos/useCarregamentoSimulado';
import { useDestinosPedidos } from '../componentes/pedidos/useDestinosPedidos';
import { usePedidos } from '../contexto/usePedidos';
import { useRecorte } from '../contexto/useRecorte';
import { pedidosDoLugar } from '../logica/gruposPedidos';
import { origemDoRecorte } from '../logica/recorte';
import { noLugar } from '../logica/lugares';

// Pedidos de um lugar, agrupados por situação:
// - /meu-bairro/pedidos: o bairro de quem usa o app (sem conta, o escolhido na Escolher bairro);
// - /minha-cidade/bairros/:idBairro/pedidos: outro bairro;
// - /minha-cidade/subprefeituras/:idSub/pedidos: os bairros da subprefeitura.
// O lugar vem do recorte da rota (useRecorte); os cards abrem o detalhe dentro do mesmo lugar.
export default function PedidosBairro() {
  const { pedidos } = usePedidos();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const destinos = useDestinosPedidos();
  const recorte = useRecorte('bairro');
  const { lugar } = recorte;
  const doLugar = pedidosDoLugar(pedidos, recorte.bairros);
  const doMeuBairro = recorte.base === '/meu-bairro';
  // O Abrir pedido leva o lugar (?de=) para usar a trilha dele
  const novoPedido = `/pedidos/novo?de=${origemDoRecorte(recorte)}`;

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo={`Pedidos ${recorte.sufixo}`}
          subtitulo={`Buracos, lixo, iluminação e outros problemas de rua avisados por quem mora ${noLugar(lugar)}.`}
          icone="assignment"
          trilha={[...recorte.trilha, { rotulo: 'Pedidos' }]}
          acoes={
            <Botao variante="principal" icone="add" para={novoPedido}>
              Abrir pedido
            </Botao>
          }
        />
      }
    >
      <BotaoFlutuante para={novoPedido} rotulo="Abrir pedido" />
      <ListaPedidos
        pedidos={doLugar}
        base={`${recorte.base}/pedidos`}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        prefixo="bairro"
        vazio={
          <EstadoVazio
            titulo={`Nenhum pedido ${noLugar(lugar)}`}
            texto="Ninguém avisou um problema de rua aqui ainda. Se você viu um, avise a prefeitura."
          >
            <Botao variante="secundario" para="/minha-cidade/pedidos">
              Ver os pedidos da cidade
            </Botao>
            <Botao variante="principal" icone="add" para={novoPedido}>
              Abrir pedido
            </Botao>
          </EstadoVazio>
        }
      />
      <ParaOndeIr
        destinos={
          doMeuBairro ? [destinos.cidade, destinos.meus] : [destinos.bairro, destinos.cidade]
        }
      />
    </Pagina>
  );
}
