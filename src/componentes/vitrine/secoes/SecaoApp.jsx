import SecaoVitrine from '../SecaoVitrine';
import AppLayout from './AppLayout';
import AppNavegacao from './AppNavegacao';
import AppInicio from './AppInicio';
import AppPedidos from './AppPedidos';
import AppPedidosApoio from './AppPedidosApoio';
import AppFormularios from './AppFormularios';
import AppConta from './AppConta';
import AppServicos from './AppServicos';
import AppPerfil from './AppPerfil';
import AppAlertasAjuda from './AppAlertasAjuda';
import AppCidadeAberta from './AppCidadeAberta';
import AppOrcamento from './AppOrcamento';
import AppMeuBairro from './AppMeuBairro';
import AppForaDaVitrine from './AppForaDaVitrine';

// Seção "Componentes do app": cada componente de src/componentes/ com dados de exemplo,
// agrupado como as pastas. Os estados que dependem da conta usam o ContextoSimulado,
// então apoiar, votar ou entrar aqui não muda nada no app.
export default function SecaoApp() {
  return (
    <SecaoVitrine
      id="app"
      titulo="Componentes do app"
      descricao="Os componentes de src/componentes/ com dados de exemplo de src/dados/. Apoiar, votar, entrar e enviar aqui são simulados: nada é salvo."
    >
      <AppLayout />
      <AppNavegacao />
      <AppInicio />
      <AppPedidos />
      <AppPedidosApoio />
      <AppFormularios />
      <AppConta />
      <AppServicos />
      <AppPerfil />
      <AppAlertasAjuda />
      <AppCidadeAberta />
      <AppOrcamento />
      <AppMeuBairro />
      <AppForaDaVitrine />
    </SecaoVitrine>
  );
}
