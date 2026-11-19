import { usePedidos } from '../../contexto/usePedidos';
import { useSessao } from '../../contexto/useSessao';
import { OBRAS } from '../../dados/obras';
import { BAIRRO_PADRAO } from '../../logica/bairros';
import { contarAbertos, pedidosDoBairro } from '../../logica/gruposPedidos';
import { obraEmAndamento } from '../../logica/obras';
import { pluralizar } from '../../logica/formatos';

// Monta os cards do "Para onde ir" das páginas de pedidos, com os números de agora.
// Devolve { bairro, cidade, meus, obras, nomeBairro }: cada um no formato { icone, titulo, meta, para }.
export function useDestinosPedidos() {
  const { pedidos } = usePedidos();
  const { usuario } = useSessao();
  const nomeBairro = usuario?.bairro || BAIRRO_PADRAO;
  const abertosBairro = contarAbertos(pedidosDoBairro(pedidos, nomeBairro));
  const feitos = usuario ? pedidos.filter((pedido) => pedido.autorId === usuario.id).length : 0;
  const obrasBairro = OBRAS.filter(
    (obra) => obra.bairro === nomeBairro && obraEmAndamento(obra),
  ).length;

  return {
    nomeBairro,
    bairro: {
      icone: 'assignment',
      titulo: 'Pedidos do bairro',
      meta: `${pluralizar(abertosBairro, 'aberto', 'abertos')} na ${nomeBairro}`,
      para: '/meu-bairro/pedidos',
    },
    cidade: {
      icone: 'location_city',
      titulo: 'Pedidos da cidade',
      meta: `${pluralizar(contarAbertos(pedidos), 'aberto', 'abertos')} em São Paulo`,
      para: '/minha-cidade/pedidos',
    },
    meus: {
      icone: 'person',
      titulo: 'Meus pedidos',
      meta: `${pluralizar(feitos, 'feito', 'feitos')} por você`,
      para: '/perfil/pedidos',
    },
    obras: {
      icone: 'construction',
      titulo: 'Obras do bairro',
      meta: `${obrasBairro} em andamento`,
      para: '/meu-bairro/obras',
    },
  };
}
