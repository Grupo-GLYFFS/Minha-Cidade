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
import { useSessao } from '../contexto/useSessao';

// Pedidos da cidade de São Paulo (/minha-cidade/pedidos): todos os pedidos de zeladoria,
// agrupados por situação, 3 por grupo e o resto em "Mostrar mais".
export default function PedidosCidade() {
  const { pedidos } = usePedidos();
  const { usuario, logado } = useSessao();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const destinos = useDestinosPedidos();
  const meusPedidos = pedidos.filter((pedido) => pedido.autorId === usuario?.id).length;

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Pedidos da cidade de São Paulo"
          subtitulo="Buracos, lixo, iluminação e outros problemas de rua avisados por quem mora na cidade."
          icone="assignment"
          trilha={[{ rotulo: 'Cidade de São Paulo', para: '/minha-cidade' }, { rotulo: 'Pedidos' }]}
          acoes={
            <>
              <Botao variante="principal" icone="add" para="/pedidos/novo">
                Abrir pedido
              </Botao>
              {logado && (
                <Botao
                  variante="secundario"
                  icone="assignment"
                  contagem={meusPedidos}
                  para="/perfil/pedidos"
                >
                  Meus pedidos
                </Botao>
              )}
            </>
          }
        />
      }
    >
      <BotaoFlutuante para="/pedidos/novo" rotulo="Abrir pedido" />
      <ListaPedidos
        pedidos={pedidos}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        prefixo="cidade"
        vazio={
          <EstadoVazio
            titulo="Nenhum pedido na cidade"
            texto="Ninguém avisou um problema de rua ainda. Se você viu um, avise a prefeitura."
          >
            <Botao variante="principal" icone="add" para="/pedidos/novo">
              Abrir pedido
            </Botao>
          </EstadoVazio>
        }
      />
      <ParaOndeIr destinos={[destinos.bairro, destinos.meus]} />
    </Pagina>
  );
}
