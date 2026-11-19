import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import ResumoPago from '../componentes/orcamento/ResumoPago';
import ContaSubprefeitura from '../componentes/orcamento/ContaSubprefeitura';
import SubprefeiturasExtrato from '../componentes/orcamento/SubprefeiturasExtrato';
import VotacaoOrcamento from '../componentes/orcamento/VotacaoOrcamento';
import { OBRAS } from '../dados/obras';
import { PROJETOS } from '../dados/projetos';
import { contaDaSubprefeitura } from '../logica/orcamento';
import { projetosEmVotacao } from '../logica/votacao';
import { destinoObras, destinoVotacoes } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import classes from './Orcamento.module.css';

// Página Orçamento do bairro (/meu-bairro/orcamento): o orçamento da subprefeitura que cuida
// do bairro da pessoa. Sem busca, sem filtro e sem mês a mês (não há dado mensal por
// subprefeitura): a conta em extrato, a comparação com as outras subprefeituras (a dela em
// destaque) e as votações de orçamento abertas.
export default function OrcamentoBairro() {
  const recorte = useRecorte('bairro');
  const { subprefeitura } = recorte;
  const conta = contaDaSubprefeitura(subprefeitura, OBRAS);

  // Votações abertas de mudança de verba da subprefeitura
  const votacoes = projetosEmVotacao(PROJETOS).filter(
    (projeto) =>
      projeto.tipo === 'Mudança de verba' &&
      projeto.escopo === 'subprefeitura' &&
      projeto.subprefeitura === subprefeitura.nome,
  );

  // "Cuida de Moema, Saúde e Vila Mariana"
  const bairros = [...subprefeitura.bairros].sort((a, b) => a.localeCompare(b));
  const cuidaDe =
    bairros.length > 1
      ? `${bairros.slice(0, -1).join(', ')} e ${bairros[bairros.length - 1]}`
      : bairros[0];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo={`Orçamento da Subprefeitura ${subprefeitura.nome}`}
          subtitulo={`Cuida de ${cuidaDe} · 2026`}
          icone="payments"
          trilha={[...recorte.trilha, { rotulo: 'Orçamento' }]}
        >
          <ResumoPago pago={conta.pago} previsto={conta.previsto} />
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        <ContaSubprefeitura subprefeitura={subprefeitura} conta={conta} />
        <SubprefeiturasExtrato
          titulo="Comparação com as outras subprefeituras"
          destacar={subprefeitura.id}
        />
        <VotacaoOrcamento subprefeitura={subprefeitura} votacoes={votacoes} />
      </div>
      <ParaOndeIr destinos={[destinoVotacoes(recorte), destinoObras(recorte)]} />
    </Pagina>
  );
}
