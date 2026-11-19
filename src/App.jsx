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
import ProjetosCidade from './paginas/ProjetosCidade';
import ProjetoCidade from './paginas/ProjetoCidade';
import ObrasCidade from './paginas/ObrasCidade';
import OrcamentoCidade from './paginas/OrcamentoCidade';
import OrcamentoBairro from './paginas/OrcamentoBairro';
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
import MinhaCidade from './paginas/MinhaCidade';
import Subprefeitura from './paginas/Subprefeitura';
import MeuBairro from './paginas/MeuBairro';
import Bairro from './paginas/Bairro';
import Alertas from './paginas/Alertas';
import DetalheAlerta from './paginas/DetalheAlerta';
import Avisos from './paginas/Avisos';
import DetalheAviso from './paginas/DetalheAviso';

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

      {/* Hubs, alertas e avisos (páginas novas) */}
      <Route path="/minha-cidade" element={<MinhaCidade />} />
      <Route path="/minha-cidade/subprefeituras/:id" element={<Subprefeitura />} />
      <Route path="/minha-cidade/bairros/:id" element={<Bairro />} />
      <Route path="/meu-bairro" element={<MeuBairro />} />
      <Route path="/minha-cidade/alertas" element={<Alertas />} />
      <Route path="/minha-cidade/alertas/:id" element={<DetalheAlerta />} />
      <Route path="/meu-bairro/alertas" element={<Alertas doBairro />} />
      <Route path="/meu-bairro/alertas/:id" element={<DetalheAlerta doBairro />} />
      <Route path="/minha-cidade/avisos" element={<Avisos />} />
      <Route path="/minha-cidade/avisos/:id" element={<DetalheAviso />} />
      <Route path="/meu-bairro/avisos" element={<Avisos doBairro />} />
      <Route path="/meu-bairro/avisos/:id" element={<DetalheAviso doBairro />} />

      <Route element={<LayoutAntigo />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/categoria/:idCategoria" element={<CategoriaServicos />} />
        <Route path="/servicos/:idServico" element={<Servico />} />
        <Route path="/minha-cidade/pedidos" element={<Pedidos />} />
        <Route path="/minha-cidade/obras" element={<ObrasCidade />} />
        <Route path="/minha-cidade/votacoes" element={<ProjetosCidade />} />
        <Route path="/minha-cidade/votacoes/:id" element={<ProjetoCidade />} />
        <Route path="/minha-cidade/orcamento" element={<OrcamentoCidade />} />
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
