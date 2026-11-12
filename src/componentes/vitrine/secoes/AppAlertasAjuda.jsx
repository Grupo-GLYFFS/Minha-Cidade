import { Stack } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import GrupoAlertas from '../../alertas/GrupoAlertas';
import GrupoPerguntas from '../../ajuda/GrupoPerguntas';
import GrupoTelefones from '../../ajuda/GrupoTelefones';
import RecursosApp from '../../acessibilidade/RecursosApp';
import SecaoTamanhoLetra from '../../acessibilidade/SecaoTamanhoLetra';
import SecaoTelaMovimento from '../../acessibilidade/SecaoTelaMovimento';
import ListaDados from '../../privacidade/ListaDados';
import { USUARIO } from '../../../dados/usuario';
import { PEDIDOS } from '../../../dados/pedidos';
import { PROJETOS } from '../../../dados/projetos';
import { SERVICOS } from '../../../dados/servicos';
import { ALERTAS } from '../../../dados/alertas';
import { GRUPOS_PERGUNTAS } from '../../../dados/perguntas';
import { GRUPOS_TELEFONES } from '../../../dados/telefones';
import { DADOS_GUARDADOS } from '../../../dados/privacidade';
import { montarAlertas } from '../../../logica/alertas';
import { solicitacoesDeExemplo, umDeCada } from '../../../logica/vitrine';

// Alertas da Maria montados na hora (nada é salvo): um de cada tipo.
// Os dois primeiros ficam como lidos, para mostrar os dois jeitos do item.
const ALERTAS_EXEMPLO = umDeCada(
  montarAlertas({
    usuario: USUARIO,
    pedidos: PEDIDOS,
    solicitacoes: solicitacoesDeExemplo(SERVICOS, USUARIO.id),
    projetos: PROJETOS,
    alertasCidade: ALERTAS,
  }),
  'tipo',
  ['defesa-civil', 'pedido', 'servico', 'votacao'],
);
const NOVOS = ALERTAS_EXEMPLO.slice(0, 2);
const LIDOS = ALERTAS_EXEMPLO.slice(2).map((alerta) => ({ ...alerta, lido: true }));

// Alertas, ajuda, acessibilidade e privacidade.
// As seções de acessibilidade mudam a preferência de verdade, como a barra no topo desta página.
export default function AppAlertasAjuda() {
  return (
    <Subsecao id="app-alertas" titulo="Alertas e ajuda">
      <Vitrine
        nome="GrupoAlertas + ItemAlerta"
        arquivo="src/componentes/alertas/"
        props="id · titulo · alertas · aoAbrir (novo: bolinha e negrito / lido; tipos defesa-civil, pedido, servico, votacao)"
      >
        <GrupoAlertas id="vitrine-novos" titulo="Novos" alertas={NOVOS} aoAbrir={() => {}} />
        <GrupoAlertas
          id="vitrine-anteriores"
          titulo="Anteriores"
          alertas={LIDOS}
          aoAbrir={() => {}}
        />
      </Vitrine>

      <Vitrine
        nome="GrupoPerguntas"
        arquivo="src/componentes/ajuda/GrupoPerguntas.jsx"
        props="grupo { id, titulo, perguntas }"
      >
        <GrupoPerguntas grupo={{ ...GRUPOS_PERGUNTAS[0], id: 'vitrine' }} />
      </Vitrine>

      <Vitrine
        nome="GrupoTelefones"
        arquivo="src/componentes/ajuda/GrupoTelefones.jsx"
        props="grupo { id, titulo, telefones }"
      >
        <GrupoTelefones grupo={{ ...GRUPOS_TELEFONES[0], id: 'vitrine' }} />
      </Vitrine>

      <Vitrine
        nome="RecursosApp"
        arquivo="src/componentes/acessibilidade/RecursosApp.jsx"
        props="sem props"
      >
        <RecursosApp />
      </Vitrine>

      <Vitrine
        nome="SecaoTamanhoLetra + SecaoTelaMovimento"
        arquivo="src/componentes/acessibilidade/"
        props="usam useAcessibilidade(): mudam o app inteiro, como a barra no topo"
      >
        <Stack gap="md">
          <SecaoTamanhoLetra />
          <SecaoTelaMovimento />
        </Stack>
      </Vitrine>

      <Vitrine
        nome="ListaDados"
        arquivo="src/componentes/privacidade/ListaDados.jsx"
        props="id · titulo · introducao · itens { icone, texto }"
      >
        <ListaDados
          id="vitrine-lista-dados"
          titulo="O que fica guardado"
          introducao="Só neste navegador."
          itens={DADOS_GUARDADOS}
        />
      </Vitrine>
    </Subsecao>
  );
}
