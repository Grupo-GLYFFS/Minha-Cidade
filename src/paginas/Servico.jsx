import { useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import ParaOndeIr from '../componentes/ParaOndeIr';
import Botao from '../componentes/Botao';
import NaoEncontrado from '../componentes/NaoEncontrado';
import FatosServico from '../componentes/servicos/FatosServico';
import PassosNumerados from '../componentes/servicos/PassosNumerados';
import FimServico from '../componentes/servicos/FimServico';
import CardServico from '../componentes/servicos/CardServico';
import { useResumoConta } from '../componentes/servicos/useResumoConta';
import {
  acaoDoServico,
  buscarCategoriaServico,
  buscarServico,
  caminhoCategoria,
  servicosDaCategoria,
  servicosRelacionados,
  textoQuantidadeServicos,
} from '../logica/servicos';
import classes from './Servico.module.css';

// Ficha de um serviço (/servicos/:idServico): cabeçalho com o botão principal,
// fatos (prazo, custo, onde ir), seções em card, faixa do fim, relacionados e "Para onde ir".
// Serviço só de informação não tem botão; o que leva a outra tela do app tem o botão dela.
export default function Servico() {
  const { idServico } = useParams();
  const resumo = useResumoConta();
  const servico = buscarServico(idServico);

  if (!servico) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos este serviço"
          texto="O link pode estar incompleto ou o serviço mudou de nome."
          icone="search_off"
        >
          <Botao variante="principal" icone="arrow_forward" iconeDireita para="/servicos">
            Ver todos os serviços
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  const categoria = buscarCategoriaServico(servico.categoria);
  const acao = acaoDoServico(servico);
  const { info } = servico;
  const relacionados = servicosRelacionados(servico);
  const passos = info.comoFazer ?? [];
  const documentos = info.documentos ?? [];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="detalhe"
          titulo={servico.nome}
          subtitulo={servico.resumo}
          icone={servico.icone}
          categoria={{ icone: categoria.icone, rotulo: categoria.nome }}
          trilha={[
            { rotulo: 'Serviços', para: '/servicos' },
            { rotulo: categoria.nome, para: caminhoCategoria(categoria) },
            { rotulo: servico.nome },
          ]}
          acoes={
            acao && (
              <Botao variante="principal" icone="arrow_forward" iconeDireita para={acao.para}>
                {acao.rotulo}
              </Botao>
            )
          }
        />
      }
    >
      <div className={classes.pilha}>
        <FatosServico info={info} />

        {info.oQueE && (
          <SecaoCard titulo="O que é">
            <p className={classes.texto}>{info.oQueE}</p>
          </SecaoCard>
        )}
        {info.quemPode && (
          <SecaoCard titulo="Quem pode usar">
            <p className={classes.texto}>{info.quemPode}</p>
          </SecaoCard>
        )}
        {documentos.length > 0 && (
          <SecaoCard
            titulo="Documentos"
            acao={
              <span className={classes.conta}>
                {documentos.length === 1 ? '1 documento' : `${documentos.length} documentos`}
              </span>
            }
          >
            <ul className={classes.documentos}>
              {documentos.map((documento) => (
                <li key={documento}>{documento}</li>
              ))}
            </ul>
          </SecaoCard>
        )}
        {passos.length > 0 && (
          <SecaoCard
            titulo="Como fazer"
            acao={
              <span className={classes.conta}>
                {passos.length === 1 ? '1 passo' : `${passos.length} passos`}
              </span>
            }
          >
            <PassosNumerados passos={passos} />
          </SecaoCard>
        )}

        <FimServico servico={servico} acao={acao} />
      </div>

      {relacionados.length > 0 && (
        <section className={classes.relacionados} aria-labelledby="relacionados-titulo">
          <h2 className={classes.tituloSecao} id="relacionados-titulo">
            Serviços relacionados
          </h2>
          <ul className={classes.cards}>
            {relacionados.map((item) => (
              <li key={item.id}>
                <CardServico servico={item} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ParaOndeIr
        destinos={[
          {
            icone: categoria.icone,
            titulo: categoria.nome,
            meta: textoQuantidadeServicos(servicosDaCategoria(categoria.id).length),
            para: caminhoCategoria(categoria),
          },
          {
            icone: 'event_available',
            titulo: 'Minhas solicitações',
            meta: resumo.solicitacoes,
            para: '/servicos/minhas-solicitacoes',
          },
        ]}
      />
    </Pagina>
  );
}
