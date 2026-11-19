import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';
import { useCarregamentoSimulado } from '../componentes/pedidos/useCarregamentoSimulado';
import { useDestinosPedidos } from '../componentes/pedidos/useDestinosPedidos';
import { usePedidos } from '../contexto/usePedidos';
import { pedidosDoBairro } from '../logica/gruposPedidos';
import { idSubprefeitura, nomeSubprefeitura, subprefeituraDoBairro } from '../logica/localPedido';

// Pedidos do bairro de quem usa o app (/meu-bairro/pedidos), agrupados por situação.
// Sem conta, mostra a Vila Mariana.
export default function PedidosBairro() {
  const { pedidos } = usePedidos();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const destinos = useDestinosPedidos();
  const bairro = destinos.nomeBairro;
  const subprefeitura = subprefeituraDoBairro(bairro);
  const doBairro = pedidosDoBairro(pedidos, bairro);

  // Trilha: Cidade › Subprefeitura (quando o app conhece) › Bairro › Pedidos
  const trilha = [
    { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
    ...(subprefeitura
      ? [
          {
            rotulo: nomeSubprefeitura(subprefeitura),
            para: `/minha-cidade/subprefeituras/${idSubprefeitura(subprefeitura)}`,
          },
        ]
      : []),
    { rotulo: bairro, para: '/meu-bairro' },
    { rotulo: 'Pedidos' },
  ];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo={`Pedidos da ${bairro}`}
          subtitulo={`Buracos, lixo, iluminação e outros problemas de rua avisados por quem mora na ${bairro}.`}
          icone="assignment"
          trilha={trilha}
          acoes={
            <Botao variante="principal" icone="add" para="/pedidos/novo">
              Abrir pedido
            </Botao>
          }
        />
      }
    >
      <ListaPedidos
        pedidos={doBairro}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        prefixo="bairro"
        vazio={
          <EstadoVazio
            titulo={`Nenhum pedido na ${bairro}`}
            texto="Ninguém avisou um problema de rua no bairro ainda. Se você viu um, avise a prefeitura."
          >
            <Botao variante="secundario" para="/minha-cidade/pedidos">
              Ver os pedidos da cidade
            </Botao>
            <Botao variante="principal" icone="add" para="/pedidos/novo">
              Abrir pedido
            </Botao>
          </EstadoVazio>
        }
      />
      <ParaOndeIr destinos={[destinos.cidade, destinos.meus]} />
    </Pagina>
  );
}
