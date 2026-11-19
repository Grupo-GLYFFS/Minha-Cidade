import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EnderecoInexistente from '../componentes/ajuda/EnderecoInexistente';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { estaAberto } from '../logica/pedidos';
import { SERVICOS } from '../dados/servicos';

// Página "Página não encontrada" (rota *): cabeçalho só com o título, o aviso com os dois
// caminhos (Buscar no app e Ir para o início) e o "Para onde ir" com as páginas principais.
// "Meus pedidos" só aparece para quem entrou na conta.
export default function NaoEncontrada() {
  const { pedidos } = usePedidos();
  const { usuario } = useSessao();
  const bairro = usuario?.bairro ?? 'Vila Mariana';
  const abertosNoBairro = pedidos.filter((p) => p.bairro === bairro && estaAberto(p)).length;

  const destinos = [
    {
      icone: 'apps',
      titulo: 'Serviços',
      meta: `${SERVICOS.length} serviços da prefeitura`,
      para: '/servicos',
    },
    {
      icone: 'location_city',
      titulo: 'Cidade de São Paulo',
      meta: '32 subprefeituras',
      para: '/minha-cidade',
    },
    {
      icone: 'home_pin',
      titulo: `${bairro}, seu bairro`,
      meta: `${abertosNoBairro} pedidos abertos`,
      para: '/meu-bairro',
    },
  ];
  if (usuario) {
    const feitos = pedidos.filter((p) => p.autorId === usuario.id).length;
    destinos.push({
      icone: 'assignment',
      titulo: 'Meus pedidos',
      meta: `${feitos} feitos por você`,
      para: '/perfil/pedidos',
    });
  }

  return (
    <Pagina cabecalho={<CabecalhoPagina tipo="conta" titulo="Página não encontrada" />}>
      <EnderecoInexistente />
      <ParaOndeIr destinos={destinos} />
    </Pagina>
  );
}
