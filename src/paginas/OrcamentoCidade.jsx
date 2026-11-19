import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ResumoPago from '../componentes/orcamento/ResumoPago';
import ContaCidade from '../componentes/orcamento/ContaCidade';
import MesAMes from '../componentes/orcamento/MesAMes';
import SubprefeiturasExtrato from '../componentes/orcamento/SubprefeiturasExtrato';
import FolhaPagamento from '../componentes/orcamento/FolhaPagamento';
import { AREAS_ORCAMENTO } from '../dados/orcamento';
import { totalOrcamento } from '../logica/orcamento';
import { destinoObras, destinoVotacoes } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import classes from './Orcamento.module.css';

// Página Orçamento da cidade (/minha-cidade/orcamento): no cabeçalho, quanto já foi pago do
// previsto para 2026; no conteúdo, a conta da cidade em formato de extrato, o mês a mês,
// as subprefeituras e a folha de pagamento.
export default function OrcamentoCidade() {
  const recorte = useRecorte('cidade');
  const total = totalOrcamento(AREAS_ORCAMENTO);

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Orçamento da cidade de São Paulo"
          icone="payments"
          trilha={[...recorte.trilha, { rotulo: 'Orçamento' }]}
        >
          <ResumoPago
            pago={total.gasto}
            previsto={total.previsto}
            rotuloPrevisto="Previsto para 2026"
          />
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        <ContaCidade />
        <MesAMes />
        <SubprefeiturasExtrato />
        <FolhaPagamento />
      </div>
      <ParaOndeIr destinos={[destinoVotacoes(recorte), destinoObras(recorte)]} />
    </Pagina>
  );
}
