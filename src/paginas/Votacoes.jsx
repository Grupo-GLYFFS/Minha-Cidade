import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Abas from '../componentes/Abas';
import Botao from '../componentes/Botao';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import GruposVotacoes from '../componentes/votacoes/GruposVotacoes';
import { PROJETOS } from '../dados/projetos';
import { votacoesDoRecorte } from '../logica/votacao';
import { destinoObras, destinoOrcamento } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import { useSeguidos } from '../contexto/useSeguidos';
import { useVotos } from '../contexto/useVotos';
import { useCarregamentoSimulado } from '../contexto/useCarregamentoSimulado';
import classes from './Votacoes.module.css';

// Prefixo dos ids das abas e do painel
const PREFIXO = 'votacoes';

// Página Votações (/minha-cidade/votacoes e /meu-bairro/votacoes): abas "Todas" e "Você votou",
// votações agrupadas em Abertas e Encerradas, com Seguir e "Avaliar e votar" em cada card.
// Recebe o escopo: "cidade" (as da cidade toda) ou "bairro" (as da subprefeitura do bairro e as
// da cidade que incluem o bairro).
export default function Votacoes({ escopo = 'cidade' }) {
  const recorte = useRecorte(escopo);
  const seguir = useSeguidos('votacoes');
  const { votosDaPessoa } = useVotos();
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const [aba, setAba] = useState('todas');

  const todas = votacoesDoRecorte(PROJETOS, recorte);
  const votou = todas.filter((projeto) => votosDaPessoa[projeto.id]);
  const visiveis = aba === 'todas' ? todas : votou;

  const abas = [
    { id: 'todas', rotulo: 'Todas', contagem: todas.length },
    { id: 'votou', rotulo: 'Você votou', contagem: votou.length },
  ];

  // Lista do bairro sem votação aberta: aviso no lugar do grupo Abertas
  const semAbertas =
    escopo === 'bairro' && aba === 'todas' ? (
      <EstadoVazio
        icone="how_to_vote"
        titulo={`Nenhuma votação aberta na ${recorte.bairro}`}
        texto="Quando a subprefeitura abrir uma votação, ela aparece aqui."
      >
        <Botao variante="secundario" para="/minha-cidade/votacoes">
          Ver as votações da cidade
        </Botao>
      </EstadoVazio>
    ) : undefined;

  // O que aparece no painel da aba, conforme o estado da lista
  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando as votações…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar as votações agora"
        texto="Pode ser a sua conexão ou o sistema da prefeitura. Os votos que você já deu continuam valendo."
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else if (visiveis.length === 0 && aba === 'votou') {
    conteudo = (
      <EstadoVazio
        icone="how_to_vote"
        titulo="Você ainda não votou"
        texto="Quando você votar, a votação aparece aqui com o seu voto."
      >
        <Botao variante="secundario" onClick={() => setAba('todas')}>
          Ver as votações abertas
        </Botao>
      </EstadoVazio>
    );
  } else if (visiveis.length === 0) {
    conteudo = semAbertas ?? (
      <EstadoVazio
        icone="how_to_vote"
        titulo="Nenhuma votação por enquanto"
        texto="Quando a prefeitura abrir uma votação, ela aparece aqui."
      />
    );
  } else {
    conteudo = (
      <GruposVotacoes
        projetos={visiveis}
        prefixo={`${PREFIXO}-${aba}`}
        recorte={recorte}
        seguir={seguir}
        semAbertas={semAbertas}
      />
    );
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo={`Votações ${recorte.sufixo}`}
          icone="how_to_vote"
          trilha={[...recorte.trilha, { rotulo: 'Votações' }]}
        />
      }
    >
      <div className={classes.abas}>
        <Abas abas={abas} ativa={aba} aoMudar={setAba} rotulo="Quais votações" prefixo={PREFIXO} />
      </div>
      <div
        id={`${PREFIXO}-painel-${aba}`}
        role="tabpanel"
        aria-labelledby={`${PREFIXO}-aba-${aba}`}
      >
        {conteudo}
      </div>
      <ParaOndeIr destinos={[destinoObras(recorte), destinoOrcamento(recorte)]} />
    </Pagina>
  );
}
