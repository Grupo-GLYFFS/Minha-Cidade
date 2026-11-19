import { useSessao } from '../../contexto/useSessao';
import { usePedidos } from '../../contexto/usePedidos';
import { BAIRRO_PADRAO, bairroPorNome, buscarSubprefeitura } from '../../logica/lugares';
import { contar } from '../../logica/resumoLugar';

// Junta o que os hubs precisam saber da pessoa: o bairro dela (ou o da conta de demonstração,
// para o visitante), a subprefeitura desse bairro, os pedidos do app e o card "Meus pedidos"
// do "Para onde ir" e o começo da trilha das subpáginas de /meu-bairro.
// Devolve { bairro, subprefeitura, pedidos, destinoMeusPedidos, trilhaDoBairro }.
export function useLugarDaPessoa() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const bairro = bairroPorNome(usuario?.bairro ?? BAIRRO_PADRAO) ?? bairroPorNome(BAIRRO_PADRAO);
  const subprefeitura = buscarSubprefeitura(bairro.subprefeitura);

  const meus = usuario ? pedidos.filter((pedido) => pedido.autorId === usuario.id).length : 0;
  const destinoMeusPedidos = {
    icone: 'person',
    titulo: 'Meus pedidos',
    meta: usuario ? contar(meus, 'feito por você', 'feitos por você') : 'Entre para ver os seus',
    para: '/perfil/pedidos',
  };

  // Cidade de São Paulo › Subprefeitura … › bairro (as subpáginas põem o último nível)
  const trilhaDoBairro = [
    { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
    {
      rotulo: `Subprefeitura ${subprefeitura.nome}`,
      para: `/minha-cidade/subprefeituras/${subprefeitura.id}`,
    },
    { rotulo: bairro.nome, para: '/meu-bairro' },
  ];

  return { bairro, subprefeitura, pedidos, destinoMeusPedidos, trilhaDoBairro };
}
