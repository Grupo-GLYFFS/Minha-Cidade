import { useSessao } from '../../contexto/useSessao';
import { usePedidos } from '../../contexto/usePedidos';
import { useBairroDaPessoa } from '../../contexto/useBairroDaPessoa';
import { BAIRRO_PADRAO, bairroPorNome, buscarSubprefeitura } from '../../logica/lugares';
import { contar, resumirLugar } from '../../logica/resumoLugar';

// Junta o que os hubs precisam saber da pessoa: o bairro dela (o da conta; sem conta, o
// escolhido na Escolher bairro ou a Vila Mariana), a subprefeitura desse bairro, os pedidos
// do app, os cards "Meus pedidos" e "Meu bairro" do "Para onde ir" e o começo da trilha
// das subpáginas de /meu-bairro.
// Devolve { bairro, subprefeitura, pedidos, temConta, definido, destinoMeusPedidos,
// destinoMeuBairro, trilhaDoBairro }.
export function useLugarDaPessoa() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { nome, temConta, definido } = useBairroDaPessoa();
  const bairro = bairroPorNome(nome) ?? bairroPorNome(BAIRRO_PADRAO);
  const subprefeitura = buscarSubprefeitura(bairro.subprefeitura);

  const meus = usuario ? pedidos.filter((pedido) => pedido.autorId === usuario.id).length : 0;
  const destinoMeusPedidos = {
    icone: 'person',
    titulo: 'Meus pedidos',
    meta: usuario ? contar(meus, 'feito por você', 'feitos por você') : 'Entre para ver os seus',
    para: '/perfil/pedidos',
  };

  // Card do bairro da pessoa: "seu bairro" só com conta; sem bairro escolhido, convida a escolher
  const abertos = contar(
    resumirLugar(pedidos, [bairro.nome]).pedidos,
    'pedido aberto',
    'pedidos abertos',
  );
  let destinoMeuBairro = {
    icone: 'home_pin',
    titulo: 'Meu bairro',
    meta: 'Escolha um bairro',
    para: '/meu-bairro',
  };
  if (definido) {
    destinoMeuBairro = {
      icone: 'home_pin',
      titulo: temConta ? `${bairro.nome}, seu bairro` : bairro.nome,
      meta: abertos,
      para: '/meu-bairro',
    };
  }

  // Cidade de São Paulo › Subprefeitura … › bairro (as subpáginas põem o último nível)
  const trilhaDoBairro = [
    { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
    {
      rotulo: `Subprefeitura ${subprefeitura.nome}`,
      para: `/minha-cidade/subprefeituras/${subprefeitura.id}`,
    },
    { rotulo: bairro.nome, para: '/meu-bairro' },
  ];

  return {
    bairro,
    subprefeitura,
    pedidos,
    temConta,
    definido,
    destinoMeusPedidos,
    destinoMeuBairro,
    trilhaDoBairro,
  };
}
