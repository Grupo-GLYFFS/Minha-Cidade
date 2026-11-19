import { Fragment, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RotaProtegida from './componentes/RotaProtegida';
import { useConferirAcaoPendente } from './contexto/useConferirAcaoPendente';
import Inicio from './paginas/Inicio';
import Busca from './paginas/Busca';
import Servicos from './paginas/Servicos';
import Servico from './paginas/Servico';
import SolicitarServico from './paginas/SolicitarServico';
import PedidosCidade from './paginas/PedidosCidade';
import PedidosBairro from './paginas/PedidosBairro';
import RedirecionarPedido from './paginas/RedirecionarPedido';
import MinhasSolicitacoes from './paginas/MinhasSolicitacoes';
import DetalheSolicitacao from './paginas/DetalheSolicitacao';
import NovoPedido from './paginas/NovoPedido';
import DetalhePedido from './paginas/DetalhePedido';
import Votacoes from './paginas/Votacoes';
import Votacao from './paginas/Votacao';
import MeusVotos from './paginas/MeusVotos';
import OQueVoceSegue from './paginas/OQueVoceSegue';
import Obras from './paginas/Obras';
import DetalheObra from './paginas/DetalheObra';
import OrcamentoCidade from './paginas/OrcamentoCidade';
import OrcamentoBairro from './paginas/OrcamentoBairro';
import Perfil from './paginas/Perfil';
import MeusPedidos from './paginas/MeusPedidos';
import Entrar from './paginas/Entrar';
import CriarConta from './paginas/CriarConta';
import EsqueciSenha from './paginas/EsqueciSenha';
import NovaSenha from './paginas/NovaSenha';
import TelefonesUteis from './paginas/TelefonesUteis';
import PerguntasFrequentes from './paginas/PerguntasFrequentes';
import Privacidade from './paginas/Privacidade';
import NaoEncontrada from './paginas/NaoEncontrada';
import Notificacoes from './paginas/Notificacoes';
import Configuracoes from './paginas/Configuracoes';
import MinhaCidade from './paginas/MinhaCidade';
import Subprefeitura from './paginas/Subprefeitura';
import MeuBairro from './paginas/MeuBairro';
import Bairro from './paginas/Bairro';
import EscolherBairro from './paginas/EscolherBairro';
import RotaBairro from './componentes/hub/RotaBairro';
import RotaLugar from './componentes/hub/RotaLugar';
import Alertas from './paginas/Alertas';
import DetalheAlerta from './paginas/DetalheAlerta';
import Avisos from './paginas/Avisos';
import DetalheAviso from './paginas/DetalheAviso';
import Apresentacao from './paginas/Apresentacao';
import ComoFunciona from './paginas/ComoFunciona';
import Impacto from './paginas/Impacto';
import Equipe from './paginas/Equipe';

// Início das rotas de outro bairro e de uma subprefeitura (as subpáginas vêm depois)
const LUGARES = ['/minha-cidade/bairros/:idBairro', '/minha-cidade/subprefeituras/:idSub'];

// Página de desenvolvimento: só é baixada quando alguém abre /componentes
const Componentes = lazy(() => import('./paginas/Componentes'));

// Rotas do app, no mapa de 18/11 (ver .claude/visao-do-projeto.md).
// - Cada página usa <Pagina> por conta própria (topo, cabeçalho, coluna de 880 e rodapé).
// - As que ficam dentro de <RotaProtegida> precisam de conta: o visitante vai para "Entrar".
// - A ação pedida sem conta (Apoiar, Seguir) é esquecida se a pessoa vai para outra página.
export default function App() {
  useConferirAcaoPendente();
  return (
    <Routes>
      {/* Global Solution: a Apresentação abre o app; depois Como funciona, Impacto e Equipe */}
      <Route path="/" element={<Apresentacao />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/impacto" element={<Impacto />} />
      <Route path="/equipe" element={<Equipe />} />

      {/* Início: resumo da cidade e da conta */}
      <Route path="/inicio" element={<Inicio />} />

      {/* Conta: moldura própria, sem topo e sem rodapé */}
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/entrar/esqueci" element={<EsqueciSenha />} />
      <Route path="/entrar/nova-senha" element={<NovaSenha />} />
      <Route path="/criar-conta" element={<CriarConta />} />

      {/* Serviços: catálogo, ficha, formulário e Minhas solicitações (as 3 últimas pedem conta) */}
      <Route path="/busca" element={<Busca />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/servicos/categoria/:idCategoria" element={<Servicos />} />
      <Route path="/servicos/:idServico" element={<Servico />} />
      <Route element={<RotaProtegida />}>
        <Route path="/servicos/:idServico/solicitar" element={<SolicitarServico />} />
        <Route path="/servicos/minhas-solicitacoes" element={<MinhasSolicitacoes />} />
        <Route path="/servicos/minhas-solicitacoes/:id" element={<DetalheSolicitacao />} />
      </Route>

      {/* Hubs, alertas e avisos (páginas novas) */}
      <Route path="/minha-cidade" element={<MinhaCidade />} />
      <Route path="/minha-cidade/subprefeituras/:id" element={<Subprefeitura />} />
      <Route path="/minha-cidade/bairros/:id" element={<Bairro />} />
      <Route path="/minha-cidade/alertas" element={<Alertas />} />
      <Route path="/minha-cidade/alertas/:id" element={<DetalheAlerta />} />
      <Route path="/minha-cidade/avisos" element={<Avisos />} />
      <Route path="/minha-cidade/avisos/:id" element={<DetalheAviso />} />

      {/* Meu bairro: sem conta e sem bairro escolhido, todas abrem a Escolher bairro */}
      <Route path="/meu-bairro/escolher" element={<EscolherBairro />} />
      <Route element={<RotaBairro />}>
        <Route path="/meu-bairro" element={<MeuBairro />} />
        <Route path="/meu-bairro/alertas" element={<Alertas doBairro />} />
        <Route path="/meu-bairro/alertas/:id" element={<DetalheAlerta doBairro />} />
        <Route path="/meu-bairro/avisos" element={<Avisos doBairro />} />
        <Route path="/meu-bairro/avisos/:id" element={<DetalheAviso doBairro />} />
        <Route path="/meu-bairro/obras" element={<Obras escopo="bairro" />} />
        <Route path="/meu-bairro/obras/:id" element={<DetalheObra escopo="bairro" />} />
        <Route path="/meu-bairro/votacoes" element={<Votacoes escopo="bairro" />} />
        <Route path="/meu-bairro/votacoes/:id" element={<Votacao escopo="bairro" />} />
        <Route path="/meu-bairro/orcamento" element={<OrcamentoBairro />} />
        <Route path="/meu-bairro/pedidos" element={<PedidosBairro />} />
        <Route path="/meu-bairro/pedidos/:id" element={<DetalhePedido escopo="bairro" />} />
      </Route>

      {/* Outro bairro e subprefeitura: as mesmas páginas do Meu bairro, com o recorte do lugar */}
      <Route element={<RotaLugar />}>
        {LUGARES.map((lugar) => (
          <Fragment key={lugar}>
            <Route path={`${lugar}/alertas`} element={<Alertas doBairro />} />
            <Route path={`${lugar}/alertas/:id`} element={<DetalheAlerta doBairro />} />
            <Route path={`${lugar}/avisos`} element={<Avisos doBairro />} />
            <Route path={`${lugar}/avisos/:id`} element={<DetalheAviso doBairro />} />
            <Route path={`${lugar}/obras`} element={<Obras escopo="bairro" />} />
            <Route path={`${lugar}/obras/:id`} element={<DetalheObra escopo="bairro" />} />
            <Route path={`${lugar}/votacoes`} element={<Votacoes escopo="bairro" />} />
            <Route path={`${lugar}/votacoes/:id`} element={<Votacao escopo="bairro" />} />
            <Route path={`${lugar}/orcamento`} element={<OrcamentoBairro />} />
            <Route path={`${lugar}/pedidos`} element={<PedidosBairro />} />
            <Route path={`${lugar}/pedidos/:id`} element={<DetalhePedido escopo="bairro" />} />
          </Fragment>
        ))}
      </Route>

      {/* Obras, votações e orçamento da cidade e do bairro */}
      <Route path="/minha-cidade/obras" element={<Obras escopo="cidade" />} />
      <Route path="/minha-cidade/obras/:id" element={<DetalheObra escopo="cidade" />} />
      <Route path="/minha-cidade/votacoes" element={<Votacoes escopo="cidade" />} />
      <Route path="/minha-cidade/votacoes/:id" element={<Votacao escopo="cidade" />} />
      <Route path="/minha-cidade/orcamento" element={<OrcamentoCidade />} />
      <Route element={<RotaProtegida />}>
        <Route path="/perfil/votos" element={<MeusVotos />} />
        <Route path="/perfil/seguindo" element={<OQueVoceSegue />} />
      </Route>

      {/* Pedidos (zeladoria) */}
      <Route path="/minha-cidade/pedidos" element={<PedidosCidade />} />
      <Route path="/minha-cidade/pedidos/:id" element={<DetalhePedido />} />
      <Route path="/pedidos/:id" element={<RedirecionarPedido />} />
      <Route element={<RotaProtegida />}>
        <Route path="/pedidos/novo" element={<NovoPedido />} />
        <Route path="/perfil/pedidos" element={<MeusPedidos />} />
      </Route>

      {/* Conta (precisam de conta); o antigo "Meus dados" virou parte do Meu perfil */}
      <Route element={<RotaProtegida />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="/perfil/dados" element={<Navigate to="/perfil" replace />} />

      {/* Ajuda */}
      <Route path="/ajuda/telefones" element={<TelefonesUteis />} />
      <Route path="/ajuda/perguntas-frequentes" element={<PerguntasFrequentes />} />
      <Route path="/ajuda/privacidade" element={<Privacidade />} />

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
