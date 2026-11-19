import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutAntigo from './componentes/LayoutAntigo';
import PaginaEmConstrucao from './componentes/PaginaEmConstrucao';
import RotaProtegida from './componentes/RotaProtegida';
import { PAGINAS_EM_CONSTRUCAO } from './dados/paginasEmConstrucao';
import Inicio from './paginas/Inicio';
import Busca from './paginas/Busca';
import Servicos from './paginas/Servicos';
import CategoriaServicos from './paginas/CategoriaServicos';
import Servico from './paginas/Servico';
import SolicitarServico from './paginas/SolicitarServico';
import Pedidos from './paginas/Pedidos';
import NovoPedido from './paginas/NovoPedido';
import DetalhePedido from './paginas/DetalhePedido';
import CidadeAberta from './paginas/CidadeAberta';
import ProjetosCidade from './paginas/ProjetosCidade';
import ProjetoCidade from './paginas/ProjetoCidade';
import Obras from './paginas/Obras';
import DetalheObra from './paginas/DetalheObra';
import OrcamentoCidade from './paginas/OrcamentoCidade';
import OrcamentoBairro from './paginas/OrcamentoBairro';
import MeuBairro from './paginas/MeuBairro';
import Alertas from './paginas/Alertas';
import Perfil from './paginas/Perfil';
import MeusPedidos from './paginas/MeusPedidos';
import MeusDados from './paginas/MeusDados';
import Entrar from './paginas/Entrar';
import CriarConta from './paginas/CriarConta';
import Acessibilidade from './paginas/Acessibilidade';
import TelefonesUteis from './paginas/TelefonesUteis';
import PerguntasFrequentes from './paginas/PerguntasFrequentes';
import Privacidade from './paginas/Privacidade';
import NaoEncontrada from './paginas/NaoEncontrada';

// Página de desenvolvimento: só é baixada quando alguém abre /componentes
const Componentes = lazy(() => import('./paginas/Componentes'));

// Rotas do app, no mapa de 18/11 (ver .claude/visao-do-projeto.md).
// - Páginas novas usam <Pagina> por conta própria (topo, cabeçalho, coluna de 880 e rodapé).
// - Telas antigas ficam dentro de <LayoutAntigo>, que põe o topo e o rodapé em volta delas.
//   TODO: cada tela refeita sai do LayoutAntigo e passa a usar <Pagina>.
// - Rotas sem tela ainda abrem a PaginaEmConstrucao (lista em dados/paginasEmConstrucao.js).
// - As que ficam dentro de <RotaProtegida> precisam de conta: o visitante vai para "Entrar".
export default function App() {
  return (
    <Routes>
      {PAGINAS_EM_CONSTRUCAO.map((pagina) => (
        <Route
          key={pagina.caminho}
          path={pagina.caminho}
          element={
            <PaginaEmConstrucao
              titulo={pagina.titulo}
              icone={pagina.icone}
              trilha={pagina.trilha}
            />
          }
        />
      ))}

      {/* Obras, votações e orçamento da cidade e do bairro */}
      <Route path="/minha-cidade/obras" element={<Obras escopo="cidade" />} />
      <Route path="/minha-cidade/obras/:id" element={<DetalheObra escopo="cidade" />} />
      <Route path="/meu-bairro/obras" element={<Obras escopo="bairro" />} />
      <Route path="/meu-bairro/obras/:id" element={<DetalheObra escopo="bairro" />} />

      <Route element={<LayoutAntigo />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/categoria/:idCategoria" element={<CategoriaServicos />} />
        <Route path="/servicos/:idServico" element={<Servico />} />
        <Route path="/minha-cidade" element={<CidadeAberta />} />
        <Route path="/minha-cidade/pedidos" element={<Pedidos />} />
        <Route path="/minha-cidade/votacoes" element={<ProjetosCidade />} />
        <Route path="/minha-cidade/votacoes/:id" element={<ProjetoCidade />} />
        <Route path="/minha-cidade/orcamento" element={<OrcamentoCidade />} />
        <Route path="/meu-bairro" element={<MeuBairro />} />
        <Route path="/meu-bairro/orcamento" element={<OrcamentoBairro />} />
        <Route path="/pedidos/:id" element={<DetalhePedido />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/ajuda/acessibilidade" element={<Acessibilidade />} />
        <Route path="/ajuda/telefones" element={<TelefonesUteis />} />
        <Route path="/ajuda/perguntas-frequentes" element={<PerguntasFrequentes />} />
        <Route path="/ajuda/privacidade" element={<Privacidade />} />
        <Route element={<RotaProtegida />}>
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/servicos/:idServico/solicitar" element={<SolicitarServico />} />
          <Route path="/minha-cidade/alertas" element={<Alertas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/pedidos" element={<MeusPedidos />} />
          <Route path="/perfil/dados" element={<MeusDados />} />
        </Route>
      </Route>

      {/* A Ouvidoria já é um serviço do catálogo: o link antigo leva para a ficha dela */}
      <Route path="/ajuda/ouvidoria" element={<Navigate to="/servicos/ouvidoria" replace />} />

      {/* Página de desenvolvimento: os componentes da base ao vivo (fora do menu) */}
      <Route
        path="/componentes"
        element={
          <Suspense fallback={null}>
            <Componentes />
          </Suspense>
        }
      />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
