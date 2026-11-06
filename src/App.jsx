import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutApp from './componentes/LayoutApp';
import RotaProtegida from './componentes/RotaProtegida';
import Inicio from './paginas/Inicio';
import Busca from './paginas/Busca';
import Servicos from './paginas/Servicos';
import CategoriaServicos from './paginas/CategoriaServicos';
import Servico from './paginas/Servico';
import SolicitarServico from './paginas/SolicitarServico';
import Cidade from './paginas/Cidade';
import Pedidos from './paginas/Pedidos';
import NovoPedido from './paginas/NovoPedido';
import DetalhePedido from './paginas/DetalhePedido';
import CidadeAberta from './paginas/CidadeAberta';
import ProjetosCidade from './paginas/ProjetosCidade';
import ProjetoCidade from './paginas/ProjetoCidade';
import ObrasCidade from './paginas/ObrasCidade';
import OrcamentoCidade from './paginas/OrcamentoCidade';
import OrcamentoBairro from './paginas/OrcamentoBairro';
import MeuBairro from './paginas/MeuBairro';
import Alertas from './paginas/Alertas';
import Perfil from './paginas/Perfil';
import MeusPedidos from './paginas/MeusPedidos';
import MeusDados from './paginas/MeusDados';
import ComoFunciona from './paginas/ComoFunciona';
import Impacto from './paginas/Impacto';
import Equipe from './paginas/Equipe';
import Entrar from './paginas/Entrar';
import CriarConta from './paginas/CriarConta';
import Acessibilidade from './paginas/Acessibilidade';
import TelefonesUteis from './paginas/TelefonesUteis';
import PerguntasFrequentes from './paginas/PerguntasFrequentes';
import Privacidade from './paginas/Privacidade';
import NaoEncontrada from './paginas/NaoEncontrada';

// Lista de páginas do app. Todas usam o mesmo layout (cabeçalho/abas e rodapé).
// As que ficam dentro de <RotaProtegida> precisam de conta: o visitante vai para "Entrar".
// Acessibilidade e as páginas de ajuda ficam de fora: valem também para o visitante.
export default function App() {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/categoria/:idCategoria" element={<CategoriaServicos />} />
        <Route path="/servicos/:idServico" element={<Servico />} />
        <Route path="/cidade" element={<Cidade />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidos/:id" element={<DetalhePedido />} />
        <Route path="/cidade-aberta" element={<CidadeAberta />} />
        <Route path="/cidade-aberta/projetos" element={<ProjetosCidade />} />
        <Route path="/cidade-aberta/projetos/:id" element={<ProjetoCidade />} />
        <Route path="/cidade-aberta/obras" element={<ObrasCidade />} />
        <Route path="/cidade-aberta/orcamento" element={<OrcamentoCidade />} />
        <Route path="/cidade-aberta/orcamento-do-bairro" element={<OrcamentoBairro />} />
        <Route path="/meu-bairro" element={<MeuBairro />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/impacto" element={<Impacto />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/perfil/acessibilidade" element={<Acessibilidade />} />
        <Route path="/ajuda/telefones" element={<TelefonesUteis />} />
        <Route path="/ajuda/perguntas" element={<PerguntasFrequentes />} />
        {/* A Ouvidoria já é um serviço do catálogo: o link do rodapé leva para a ficha dela */}
        <Route path="/ajuda/ouvidoria" element={<Navigate to="/servicos/ouvidoria" replace />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route element={<RotaProtegida />}>
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/servicos/:idServico/solicitar" element={<SolicitarServico />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/pedidos" element={<MeusPedidos />} />
          <Route path="/perfil/dados" element={<MeusDados />} />
        </Route>
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
