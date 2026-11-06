import { Text } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import LinkVoltar from '../componentes/LinkVoltar';
import TotalOrcamento from '../componentes/orcamento/TotalOrcamento';
import DeCadaCem from '../componentes/orcamento/DeCadaCem';
import MinimosConstituicao from '../componentes/orcamento/MinimosConstituicao';
import ComoLerOrcamento from '../componentes/orcamento/ComoLerOrcamento';
import PrevistoGasto from '../componentes/orcamento/PrevistoGasto';
import { AREAS_ORCAMENTO } from '../dados/orcamento';
import { MINIMOS_CONSTITUCIONAIS } from '../dados/minimosConstitucionais';
import {
  conferirMinimos,
  montarDeCadaCem,
  ordenarPorPrevisto,
  totalOrcamento,
} from '../logica/orcamento';
import classes from './OrcamentoCidade.module.css';

// Contas feitas uma vez só: os dados de exemplo não mudam enquanto o app está aberto
const DE_CADA_CEM = montarDeCadaCem(AREAS_ORCAMENTO);
const TOTAL = totalOrcamento(AREAS_ORCAMENTO);
const MINIMOS = conferirMinimos(MINIMOS_CONSTITUCIONAIS, AREAS_ORCAMENTO);
const AREAS_POR_VALOR = ordenarPorPrevisto(AREAS_ORCAMENTO);

// Orçamento da Cidade: o total de 2026, "De cada R$ 100 gastos pela prefeitura...",
// os mínimos que a Constituição exige, como ler os números e o previsto × gasto de cada área.
export default function OrcamentoCidade() {
  return (
    <div className={classes.pagina}>
      <div>
        <LinkVoltar caminho="/cidade-aberta" rotulo="Cidade Aberta" />
        <CabecalhoPagina
          titulo="Orçamento da Cidade"
          descricao="Para onde vai o dinheiro que a prefeitura recebe e quanto já foi gasto em 2026."
        />
      </div>

      <TotalOrcamento total={TOTAL} />

      <div className={classes.grade}>
        <DeCadaCem linhas={DE_CADA_CEM} />
        <div className={classes.lateral}>
          <MinimosConstituicao minimos={MINIMOS} />
          <ComoLerOrcamento />
        </div>
      </div>

      <PrevistoGasto areas={AREAS_POR_VALOR} />

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: os valores seguem a ordem de grandeza do orçamento de São Paulo, mas não
        são os números oficiais.
      </Text>
    </div>
  );
}
