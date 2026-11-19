import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';
import { useCarregamentoSimulado } from '../componentes/pedidos/useCarregamentoSimulado';
import { useDestinosPedidos } from '../componentes/pedidos/useDestinosPedidos';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { useOQueSegue } from '../contexto/useOQueSegue';
import { contar } from '../logica/resumoLugar';

// Meus pedidos (/perfil/pedidos), página da conta: só os pedidos que a pessoa abriu,
// agrupados por situação. Os pedidos que ela segue ficam em O que você segue
// (/perfil/seguindo?aba=pedidos), que aparece no "Para onde ir".
export default function MeusPedidos() {
  const { pedidos } = usePedidos();
  const { usuario } = useSessao();
  const { seguidos } = useOQueSegue();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const destinos = useDestinosPedidos();

  const meus = pedidos.filter((pedido) => pedido.autorId === usuario?.id);

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Meus pedidos"
          subtitulo="Os pedidos que você abriu."
          icone="assignment"
        />
      }
    >
      <ListaPedidos
        pedidos={meus}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        prefixo="meus"
        vazio={
          <EstadoVazio
            titulo="Você ainda não abriu nenhum pedido"
            texto="Quando você avisar um problema na rua, ele aparece aqui com o protocolo e o andamento."
          >
            <Botao variante="principal" icone="add" para="/pedidos/novo">
              Abrir pedido
            </Botao>
          </EstadoVazio>
        }
      />
      <ParaOndeIr
        destinos={[
          {
            icone: 'bookmark',
            titulo: 'O que você segue',
            meta: contar(seguidos.pedidos.length, 'pedido seguido', 'pedidos seguidos'),
            para: '/perfil/seguindo?aba=pedidos',
          },
          destinos.bairro,
          destinos.cidade,
        ]}
      />
    </Pagina>
  );
}
