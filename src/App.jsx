import { Route, Routes } from 'react-router-dom';
import LayoutApp from './componentes/LayoutApp';
import RotaProtegida from './componentes/RotaProtegida';
import Inicio from './paginas/Inicio';
import Busca from './paginas/Busca';
import Servicos from './paginas/Servicos';
import Cidade from './paginas/Cidade';
import Pedidos from './paginas/Pedidos';
import NovoPedido from './paginas/NovoPedido';
import DetalhePedido from './paginas/DetalhePedido';
import CidadeAberta from './paginas/CidadeAberta';
import MeuBairro from './paginas/MeuBairro';
import Alertas from './paginas/Alertas';
import Perfil from './paginas/Perfil';
import ComoFunciona from './paginas/ComoFunciona';
import Impacto from './paginas/Impacto';
import Equipe from './paginas/Equipe';
import Entrar from './paginas/Entrar';
import CriarConta from './paginas/CriarConta';
import NaoEncontrada from './paginas/NaoEncontrada';

// Lista de páginas do app. Todas usam o mesmo layout (cabeçalho/abas e rodapé).
// As que ficam dentro de <RotaProtegida> precisam de conta: o visitante vai para "Entrar".
export default function App() {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/cidade" element={<Cidade />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidos/:id" element={<DetalhePedido />} />
        <Route path="/cidade-aberta" element={<CidadeAberta />} />
        <Route path="/meu-bairro" element={<MeuBairro />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/impacto" element={<Impacto />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route element={<RotaProtegida />}>
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
