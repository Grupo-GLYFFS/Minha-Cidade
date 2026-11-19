import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import SecaoTamanhoLetra from '../componentes/acessibilidade/SecaoTamanhoLetra';
import SecaoTelaMovimento from '../componentes/acessibilidade/SecaoTelaMovimento';
import RecursosApp from '../componentes/acessibilidade/RecursosApp';
import VoltarAoPadrao from '../componentes/acessibilidade/VoltarAoPadrao';
import { GRUPOS_PERGUNTAS } from '../dados/perguntas';
import { GRUPOS_TELEFONES } from '../dados/telefones';

// Quantas perguntas e quantos telefones existem (metas do "Para onde ir")
const TOTAL_PERGUNTAS = GRUPOS_PERGUNTAS.reduce((soma, grupo) => soma + grupo.perguntas.length, 0);
const TOTAL_TELEFONES = GRUPOS_TELEFONES.reduce((soma, grupo) => soma + grupo.telefones.length, 0);

// Acessibilidade (/ajuda/acessibilidade): tamanho da letra, alto contraste e reduzir animações,
// mais os recursos do app. Aberta para todos (o visitante também).
// As escolhas valem na hora e ficam salvas neste aparelho; "Voltar ao padrão" fica no cabeçalho.
export default function Acessibilidade() {
  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Acessibilidade"
          subtitulo="Deixe o app do jeito que fica melhor para você. As mudanças valem na hora e ficam salvas neste aparelho."
          icone="accessibility_new"
          acoes={<VoltarAoPadrao />}
        />
      }
    >
      <PilhaCards>
        <SecaoTamanhoLetra />
        <SecaoTelaMovimento />
        <RecursosApp />
      </PilhaCards>

      <ParaOndeIr
        destinos={[
          {
            icone: 'help',
            titulo: 'Perguntas frequentes',
            meta: `${TOTAL_PERGUNTAS} perguntas`,
            para: '/ajuda/perguntas-frequentes',
          },
          {
            icone: 'call',
            titulo: 'Telefones úteis',
            meta: `${TOTAL_TELEFONES} números, ligação grátis`,
            para: '/ajuda/telefones',
          },
        ]}
      />
    </Pagina>
  );
}
