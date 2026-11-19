import { Link, Navigate, useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import Icone from '../componentes/Icone';
import MetaCabecalho from '../componentes/MetaCabecalho';
import NaoEncontrado from '../componentes/NaoEncontrado';
import ParaOndeIr from '../componentes/ParaOndeIr';
import SeloSituacao from '../componentes/SeloSituacao';
import CompartilharTopo from '../componentes/celular/CompartilharTopo';
import BotaoCompartilhar from '../componentes/avisos/BotaoCompartilhar';
import CardAviso from '../componentes/avisos/CardAviso';
import SeloCidadeToda from '../componentes/SeloCidadeToda';
import { useRecorte } from '../contexto/useRecorte';
import { AVISOS } from '../dados/avisos';
import {
  avisoValendo,
  avisosDoLugar,
  avisosParecidos,
  juntarNomes,
  textoPrazo,
} from '../logica/avisos';
import classes from '../componentes/avisos/Avisos.module.css';

// Detalhe de um aviso (/minha-cidade/avisos/:id e /meu-bairro/avisos/:id, prancha 19, quadros
// 3 e 4): cabeçalho com a ilustração, quem publicou, validade, onde vale (só nos avisos de
// bairro) e Compartilhar; o texto; o card do serviço ou da obra; avisos parecidos e "Para onde ir".
// Recebe doBairro (true quando aberto por um lugar: /meu-bairro/avisos/:id, outro bairro ou
// subprefeitura; muda a trilha e os links e mostra "Toda a cidade" nos avisos da cidade toda).
// Aviso que não vale no lugar vai para /minha-cidade/avisos/:id.
export default function DetalheAviso({ doBairro = false }) {
  const { id } = useParams();
  const recorte = useRecorte('bairro');
  const aviso = AVISOS.find((item) => item.id === id);
  const base = doBairro ? `${recorte.base}/avisos` : '/minha-cidade/avisos';

  if (!aviso) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos este aviso"
          texto="Ele pode ter saído do ar depois de vencer, ou o link está incompleto."
          icone="campaign"
        >
          <Botao variante="principal" para={base}>
            Ver os avisos
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  // Aviso vencido continua no lugar se citava um dos bairros (ou valia para a cidade toda)
  const vale =
    aviso.bairros.length === 0 || aviso.bairros.some((nome) => recorte.bairros.includes(nome));
  if (doBairro && !vale) return <Navigate to={`/minha-cidade/avisos/${aviso.id}`} replace />;

  const caminho = `${base}/${aviso.id}`;
  const valendo = avisoValendo(aviso);
  const parecidos = avisosParecidos(aviso, AVISOS);
  const trilha = doBairro
    ? [...recorte.trilha, { rotulo: 'Avisos', para: base }, { rotulo: aviso.titulo }]
    : [
        { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
        { rotulo: 'Avisos', para: base },
        { rotulo: aviso.titulo },
      ];

  return (
    <Pagina
      acaoTopo={<CompartilharTopo titulo={aviso.titulo} rotulo="Compartilhar aviso" />}
      cabecalho={
        <CabecalhoPagina
          tipo="detalhe"
          titulo={aviso.titulo}
          trilha={trilha}
          midia={aviso.imagem ? <img src={aviso.imagem} alt="" /> : undefined}
          icone={aviso.orgao.icone}
          categoria={{ icone: aviso.orgao.icone, rotulo: aviso.orgao.nome }}
          acoes={<BotaoCompartilhar titulo={aviso.titulo} caminho={caminho} />}
        >
          <MetaCabecalho>
            {valendo ? (
              <SeloSituacao cor="verde">Valendo</SeloSituacao>
            ) : (
              <SeloSituacao cor="cinza">Encerrado</SeloSituacao>
            )}
            <span>
              <Icone nome="event" tamanho={18} />
              {valendo ? textoPrazo(aviso) : 'Prazo encerrado'}
            </span>
            {doBairro && aviso.bairros.length === 0 && <SeloCidadeToda />}
            {aviso.bairros.length > 0 && (
              <span>
                <Icone nome="location_on" tamanho={18} />
                {juntarNomes(aviso.bairros)}
              </span>
            )}
          </MetaCabecalho>
          <p className={classes.metaLinha}>{aviso.publicado}</p>
        </CabecalhoPagina>
      }
    >
      <p className={classes.corpoTexto}>{aviso.corpo}</p>

      {aviso.link && (
        <Link to={aviso.link.para} className={classes.link}>
          <span className={classes.linkIcone}>
            <Icone nome={aviso.link.icone} />
          </span>
          <span className={classes.linkTexto}>
            <span className={classes.linkTitulo}>{aviso.link.titulo}</span>
            <span className={classes.linkMeta}>{aviso.link.meta}</span>
          </span>
          <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
        </Link>
      )}

      {parecidos.length > 0 && (
        <section className={classes.secao} aria-labelledby="avisos-parecidos">
          <h2 className={classes.tituloSecao} id="avisos-parecidos">
            Avisos parecidos
          </h2>
          <ul className={classes.lista}>
            {parecidos.map((outro) => (
              <li key={outro.id}>
                <CardAviso aviso={outro} caminho={`${base}/${outro.id}`} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ParaOndeIr
        destinos={[
          {
            icone: 'campaign',
            titulo: 'Avisos da cidade de São Paulo',
            meta: `${avisosDoLugar(AVISOS).length} valendo`,
            para: '/minha-cidade/avisos',
          },
          {
            icone: 'home_pin',
            titulo: `Avisos ${recorte.sufixo}`,
            meta: `${avisosDoLugar(AVISOS, recorte.bairros).length} valendo`,
            para: `${recorte.base}/avisos`,
          },
        ]}
      />
    </Pagina>
  );
}
