import { usePedidos } from '../../contexto/usePedidos';
import { useSessao } from '../../contexto/useSessao';
import { useBairroDaPessoa } from '../../contexto/useBairroDaPessoa';
import { OBRAS } from '../../dados/obras';
import { contarAbertos, pedidosDoBairro } from '../../logica/gruposPedidos';
import { contarObrasEmAndamento, montarRecorte } from '../../logica/recorte';
import { pluralizar } from '../../logica/formatos';
import { lugarPorNome, noLugar } from '../../logica/lugares';

// Monta os cards do "Para onde ir" das páginas de pedidos, com os números de agora.
// Devolve { bairro, cidade, meus, obras, nomeBairro }: cada um no formato { icone, titulo, meta, para }.
export function useDestinosPedidos() {
  const { pedidos } = usePedidos();
  const { usuario } = useSessao();
  const { nome: nomeBairro } = useBairroDaPessoa();
  const abertosBairro = contarAbertos(pedidosDoBairro(pedidos, nomeBairro));
  const feitos = usuario ? pedidos.filter((pedido) => pedido.autorId === usuario.id).length : 0;
  // Mesma regra do recorte do bairro de /meu-bairro/obras
  const obrasBairro = contarObrasEmAndamento(OBRAS, montarRecorte('bairro', nomeBairro));

  return {
    nomeBairro,
    bairro: {
      icone: 'assignment',
      titulo: 'Pedidos do bairro',
      meta: `${pluralizar(abertosBairro, 'aberto', 'abertos')} ${noLugar(lugarPorNome(nomeBairro))}`,
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
