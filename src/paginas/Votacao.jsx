import { useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import MetaCabecalho from '../componentes/MetaCabecalho';
import SecaoCard from '../componentes/SecaoCard';
import ParaOndeIr from '../componentes/ParaOndeIr';
import NaoEncontrado from '../componentes/NaoEncontrado';
import Botao from '../componentes/Botao';
import Icone from '../componentes/Icone';
import BotaoSeguir from '../componentes/obras/BotaoSeguir';
import BotaoCompartilhar from '../componentes/obras/BotaoCompartilhar';
import SobreVotacao from '../componentes/votacoes/SobreVotacao';
import ComoFicaVerba from '../componentes/votacoes/ComoFicaVerba';
import DoisLadosVotacao from '../componentes/votacoes/DoisLadosVotacao';
import SeuVoto from '../componentes/votacoes/SeuVoto';
import BarrasResultado from '../componentes/votacoes/BarrasResultado';
import DepoisVotacao from '../componentes/votacoes/DepoisVotacao';
import { PROJETOS } from '../dados/projetos';
import { buscarOpcaoVoto, buscarProjeto, votacaoAberta } from '../logica/votacao';
import { dataDetalhe } from '../logica/datasTexto';
import { diasAte } from '../logica/datas';
import { formatarNumero, formatarValorCurto, pluralizar } from '../logica/formatos';
import { destinoOrcamento, destinoVotacoes } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import { useSeguidos } from '../contexto/useSeguidos';
import { useVotos } from '../contexto/useVotos';
import classes from './Votacao.module.css';

// Ícone da linha de categoria para cada tipo de votação
const ICONE_TIPO = {
  Obra: 'construction',
  Programa: 'event_repeat',
  'Mudança de verba': 'swap_horiz',
};

// Página da votação (/minha-cidade/votacoes/:id e /meu-bairro/votacoes/:id).
// Aberta: O que muda, Como fica a verba (só mudança de verba), Quem é afetado, Os dois lados
// e Seu voto (caixa do voto, só Sim e Não; depois de votar, "Você votou" e o parcial).
// Encerrada: Resultado e Depois da votação primeiro, sem Seguir.
// Recebe o escopo ("cidade" ou "bairro"), que muda a trilha e o "Para onde ir".
export default function Votacao({ escopo = 'cidade' }) {
  const { id } = useParams();
  const recorte = useRecorte(escopo);
  const { segue, alternar, logado } = useSeguidos('votacoes');
  const { votoDe, resultado } = useVotos();
  const projeto = buscarProjeto(PROJETOS, id);

  if (!projeto) {
    return (
      <Pagina>
        <NaoEncontrado
          icone="how_to_vote"
          titulo="Não encontramos esta votação"
          texto="O link pode estar incompleto ou a votação saiu da lista."
        >
          <Botao variante="principal" para={`${recorte.base}/votacoes`}>
            Ver as votações
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  const aberta = votacaoAberta(projeto);
  const atual = resultado(projeto);
  const voto = votoDe(projeto.id);
  const dias = diasAte(projeto.fimVotacao);

  // Linha de categoria: tipo, bairro (se houver) e subprefeitura
  const categoria = [projeto.tipo, projeto.bairro, `Subprefeitura ${projeto.subprefeitura}`]
    .filter(Boolean)
    .join(' · ');

  const prazo = aberta
    ? `Termina ${dataDetalhe(projeto.fimVotacao)} · ${dias === 0 ? 'termina hoje' : `faltam ${pluralizar(dias, 'dia', 'dias')}`}`
    : `Encerrada ${dataDetalhe(projeto.fimVotacao)}`;
  const ehVerba = projeto.tipo === 'Mudança de verba';

  const secoesDaProposta = (
    <>
      <SobreVotacao projeto={projeto} />
      {ehVerba && <ComoFicaVerba projeto={projeto} />}
      <SecaoCard titulo="Quem é afetado">
        <p className={classes.paragrafo}>{projeto.quemAfeta}</p>
      </SecaoCard>
      <DoisLadosVotacao pros={projeto.pros} contras={projeto.contras} />
    </>
  );

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="detalhe"
          titulo={projeto.titulo}
          icone={projeto.icone}
          categoria={{ icone: ICONE_TIPO[projeto.tipo], rotulo: categoria }}
          trilha={[
            ...recorte.trilha,
            { rotulo: 'Votações', para: `${recorte.base}/votacoes` },
            { rotulo: projeto.titulo },
          ]}
          acoes={
            <>
              {aberta && (
                <BotaoSeguir
                  seguindo={segue(projeto.id)}
                  aoAlternar={() => alternar(projeto.id)}
                  logado={logado}
                  nome={`a votação ${projeto.titulo}`}
                />
              )}
              <BotaoCompartilhar oque="votação" titulo={projeto.titulo} />
            </>
          }
        >
          <MetaCabecalho>
            <span>
              <Icone nome="event" tamanho={20} />
              {prazo}
            </span>
            <span>
              <Icone nome="payments" tamanho={20} />
              {ehVerba ? 'Move' : 'Custa'} <b>{formatarValorCurto(projeto.valor)}</b>
            </span>
            <span>
              <Icone nome="how_to_vote" tamanho={20} />
              {pluralizar(atual.total, 'voto', 'votos')}
            </span>
          </MetaCabecalho>
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        {aberta ? (
          <>
            {secoesDaProposta}
            <SeuVoto projeto={projeto} />
          </>
        ) : (
          <>
            <SecaoCard titulo="Resultado">
              <div className={classes.resultado}>
                {voto && (
                  <p className={classes.votou}>
                    <Icone nome="check_circle" tamanho={22} preenchido />
                    <span>
                      Você votou <b>{buscarOpcaoVoto(voto)?.rotulo}</b>.
                    </span>
                  </p>
                )}
                <BarrasResultado resultado={atual} voto={voto} final />
                <p className={classes.nota}>
                  Resultado final com {formatarNumero(atual.total)} votos.
                </p>
              </div>
            </SecaoCard>
            <DepoisVotacao projeto={projeto} resultado={atual} />
            {secoesDaProposta}
          </>
        )}
      </div>
      <ParaOndeIr destinos={[destinoVotacoes(recorte), destinoOrcamento(recorte)]} />
    </Pagina>
  );
}
