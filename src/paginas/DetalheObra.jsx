import { Navigate, useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import MetaCabecalho from '../componentes/MetaCabecalho';
import SeloSituacao from '../componentes/SeloSituacao';
import SecaoCard from '../componentes/SecaoCard';
import ParaOndeIr from '../componentes/ParaOndeIr';
import NaoEncontrado from '../componentes/NaoEncontrado';
import Botao from '../componentes/Botao';
import OrigemObra from '../componentes/obras/OrigemObra';
import BotaoSeguir from '../componentes/obras/BotaoSeguir';
import CompartilharTopo from '../componentes/celular/CompartilharTopo';
import BotaoCompartilhar from '../componentes/obras/BotaoCompartilhar';
import BarraSeguirPe from '../componentes/obras/BarraSeguirPe';
import ResumoObra from '../componentes/obras/ResumoObra';
import FichaObra from '../componentes/obras/FichaObra';
import LinhaEtapas from '../componentes/obras/LinhaEtapas';
import AtualizacoesObra from '../componentes/obras/AtualizacoesObra';
import { OBRAS } from '../dados/obras';
import { buscarObra, buscarSituacaoObra, dataAtualizacao, etapasDaObra } from '../logica/obras';
import { dataDetalhe, dataLista, quandoMudouDetalhe } from '../logica/datasTexto';
import { destinoObras, destinoOrcamento, destinoVotacoes } from '../logica/destinos';
import { obrasDoRecorte } from '../logica/recorte';
import { useRecorte } from '../contexto/useRecorte';
import { useSeguidos } from '../contexto/useSeguidos';
import classes from './DetalheObra.module.css';

// Detalhe da obra (/minha-cidade/obras/:id e /meu-bairro/obras/:id): cabeçalho com a ilustração,
// situação, origem, Seguir e Compartilhar; card de andamento e valores; ficha; etapas;
// atualizações da prefeitura e "Para onde ir".
// Recebe o escopo ("cidade" ou "bairro"), que muda só a trilha e o "Para onde ir".
// Obra de outro bairro aberta em /meu-bairro vai para /minha-cidade/obras/:id.
export default function DetalheObra({ escopo = 'cidade' }) {
  const { id } = useParams();
  const recorte = useRecorte(escopo);
  const { segue, alternar, logado } = useSeguidos('obras');
  const obra = buscarObra(OBRAS, id);

  if (!obra) {
    return (
      <Pagina>
        <NaoEncontrado
          icone="construction"
          titulo="Não encontramos esta obra"
          texto="O link pode estar incompleto ou a obra saiu da lista."
        >
          <Botao variante="principal" para={`${recorte.base}/obras`}>
            Ver as obras
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  if (escopo === 'bairro' && obrasDoRecorte([obra], recorte).length === 0) {
    return <Navigate to={`/minha-cidade/obras/${obra.id}`} replace />;
  }

  const situacao = buscarSituacaoObra(obra.situacao);
  const concluida = obra.situacao === 'concluida';
  // Seguir: no cabeçalho no computador e na barra do pé no celular
  const seguir = (
    <BotaoSeguir
      chave={`obra:${obra.id}`}
      seguindo={segue(obra.id)}
      aoAlternar={() => alternar(obra.id)}
      logado={logado}
      nome={`a obra ${obra.titulo}`}
    />
  );

  return (
    <Pagina
      acaoTopo={<CompartilharTopo titulo={obra.titulo} rotulo="Compartilhar obra" />}
      cabecalho={
        <CabecalhoPagina
          tipo="detalhe"
          titulo={obra.titulo}
          trilha={[
            ...recorte.trilha,
            { rotulo: 'Obras', para: `${recorte.base}/obras` },
            { rotulo: obra.titulo },
          ]}
          midia={obra.imagem ? <img src={obra.imagem} alt="" /> : undefined}
          icone={obra.icone}
          categoria={{ icone: obra.icone, rotulo: obra.tipo }}
          acoes={
            <>
              {!concluida && <span className={classes.soComputador}>{seguir}</span>}
              <BotaoCompartilhar oque="obra" titulo={obra.titulo} />
            </>
          }
        >
          <MetaCabecalho>
            <SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>
            <OrigemObra obra={obra} />
          </MetaCabecalho>
          <MetaCabecalho>
            <span className={classes.linhaMeta}>
              {obra.bairro} · Subprefeitura {obra.subprefeitura} · atualizada{' '}
              {quandoMudouDetalhe(dataAtualizacao(obra))}
            </span>
          </MetaCabecalho>
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        <ResumoObra obra={obra} />
        <FichaObra obra={obra} />
        <SecaoCard titulo="Etapas">
          <LinhaEtapas
            etapas={etapasDaObra(obra, { dataDetalhe, dataLista })}
            rotulo="Etapas da obra"
          />
        </SecaoCard>
        <AtualizacoesObra obra={obra} />
      </div>
      <ParaOndeIr
        destinos={[destinoObras(recorte), destinoVotacoes(recorte), destinoOrcamento(recorte)]}
      />
      {!concluida && <BarraSeguirPe>{seguir}</BarraSeguirPe>}
    </Pagina>
  );
}
