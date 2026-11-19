import { useSearchParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Abas from '../componentes/Abas';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';
import { useCarregamentoSimulado } from '../componentes/pedidos/useCarregamentoSimulado';
import { useDestinosPedidos } from '../componentes/pedidos/useDestinosPedidos';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { pedidosSeguidosDaPessoa } from '../logica/acompanhamento';
import classes from './MeusPedidos.module.css';

// Meus pedidos (/perfil/pedidos), página da conta: abas "Meus pedidos" (os que a pessoa abriu)
// e "Pedidos seguidos" (de outras pessoas, que ela apoia ou segue), agrupados por situação.
// A aba escolhida fica no endereço (?aba=seguidos), para o link e o voltar funcionarem.
export default function MeusPedidos() {
  const { pedidos, apoiados, seguidos } = usePedidos();
  const { usuario } = useSessao();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const destinos = useDestinosPedidos();
  const [parametros, setParametros] = useSearchParams();
  const aba = parametros.get('aba') === 'seguidos' ? 'seguidos' : 'meus';

  const meus = pedidos.filter((pedido) => pedido.autorId === usuario?.id);
  const acompanhados = pedidosSeguidosDaPessoa(pedidos, apoiados, seguidos, usuario?.id);

  // Troca a aba sem criar uma página nova no histórico
  function mudarAba(id) {
    setParametros(id === 'seguidos' ? { aba: 'seguidos' } : {}, { replace: true });
  }

  const vazioMeus = (
    <EstadoVazio
      titulo="Você ainda não abriu nenhum pedido"
      texto="Quando você avisar um problema na rua, ele aparece aqui com o protocolo e o andamento."
    >
      <Botao variante="principal" icone="add" para="/pedidos/novo">
        Abrir pedido
      </Botao>
    </EstadoVazio>
  );
  const vazioSeguidos = (
    <EstadoVazio
      titulo="Você ainda não segue nenhum pedido"
      texto="Apoie ou siga um pedido de outra pessoa para acompanhar o andamento dele aqui."
    >
      <Botao variante="secundario" para="/meu-bairro/pedidos">
        Ver os pedidos do bairro
      </Botao>
    </EstadoVazio>
  );

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Meus pedidos"
          subtitulo="Os pedidos que você abriu e os que você acompanha."
          icone="assignment"
        />
      }
    >
      <div className={classes.abas}>
        <Abas
          abas={[
            { id: 'meus', rotulo: 'Meus pedidos', contagem: meus.length },
            { id: 'seguidos', rotulo: 'Pedidos seguidos', contagem: acompanhados.length },
          ]}
          ativa={aba}
          aoMudar={mudarAba}
          rotulo="Quais pedidos"
          prefixo="meus"
        />
      </div>
      <div role="tabpanel" id={`meus-painel-${aba}`} aria-labelledby={`meus-aba-${aba}`}>
        <ListaPedidos
          key={aba}
          pedidos={aba === 'meus' ? meus : acompanhados}
          estado={estado}
          aoTentarDeNovo={tentarDeNovo}
          prefixo={aba}
          vazio={aba === 'meus' ? vazioMeus : vazioSeguidos}
        />
      </div>
      <ParaOndeIr destinos={[destinos.bairro, destinos.cidade]} />
    </Pagina>
  );
}
