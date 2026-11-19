import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import EstadoVazio from '../componentes/EstadoVazio';
import ParaOndeIr from '../componentes/ParaOndeIr';
import CardAviso from '../componentes/avisos/CardAviso';
import { useCarregamento } from '../componentes/hub/useCarregamento';
import SeloCidadeToda from '../componentes/SeloCidadeToda';
import { useLugarDaPessoa } from '../componentes/hub/useLugarDaPessoa';
import { useRecorte } from '../contexto/useRecorte';
import { ALERTAS } from '../dados/alertas';
import { AVISOS } from '../dados/avisos';
import { alertasDoLugar } from '../logica/alertas';
import { avisosDoLugar } from '../logica/avisos';
import { doLugar, noLugar } from '../logica/lugares';
import { contar } from '../logica/resumoLugar';
import classes from '../componentes/avisos/Avisos.module.css';

// Quantos avisos aparecem antes do "Mostrar mais" (o bairro mostra menos, a lista é dele)
const POR_PAGINA_CIDADE = 6;
const POR_PAGINA_BAIRRO = 3;

// Avisos da cidade (/minha-cidade/avisos: só os da cidade toda) ou de um lugar, prancha 19: o
// bairro da pessoa (/meu-bairro/avisos), outro bairro ou uma subprefeitura (rotas
// /minha-cidade/bairros/:idBairro/avisos e /minha-cidade/subprefeituras/:idSub/avisos). No lugar
// entram os avisos que citam um dos bairros e os da cidade toda (com o selo "Toda a cidade").
// Lista de cards com a ilustração (mais novos primeiro), "Mostrar mais" no fim e "Para onde ir".
// Recebe doBairro (true na versão do lugar; o lugar vem da rota, por useRecorte).
export default function Avisos({ doBairro = false }) {
  const { bairro } = useLugarDaPessoa();
  const recorte = useRecorte('bairro');
  const { estado, tentarDeNovo } = useCarregamento();
  const porPagina = doBairro ? POR_PAGINA_BAIRRO : POR_PAGINA_CIDADE;
  const [quantos, setQuantos] = useState(porPagina);

  const daCidade = avisosDoLugar(AVISOS);
  const doBairroDaPessoa = avisosDoLugar(AVISOS, [bairro.nome]);
  const doRecorte = avisosDoLugar(AVISOS, recorte.bairros);
  const avisos = estado === 'vazio' ? [] : doBairro ? doRecorte : daCidade;
  const visiveis = avisos.slice(0, quantos);
  const faltam = avisos.length - visiveis.length;
  const base = doBairro ? `${recorte.base}/avisos` : '/minha-cidade/avisos';

  const titulo = doBairro ? `Avisos ${recorte.sufixo}` : 'Avisos da cidade de São Paulo';
  const trilha = doBairro
    ? [...recorte.trilha, { rotulo: 'Avisos' }]
    : [{ rotulo: 'Cidade de São Paulo', para: '/minha-cidade' }, { rotulo: 'Avisos' }];

  const alertasCidade = alertasDoLugar(ALERTAS).ativos.length;
  const alertasBairro = alertasDoLugar(ALERTAS, recorte.bairros).ativos.length;
  const destinos = doBairro
    ? [
        {
          icone: 'campaign',
          titulo: 'Avisos da cidade de São Paulo',
          meta: `${daCidade.length} valendo`,
          para: '/minha-cidade/avisos',
        },
        {
          icone: 'warning',
          titulo: `Alertas ${recorte.sufixo}`,
          meta: `${contar(alertasBairro, 'ativo', 'ativos')} agora`,
          para: `${recorte.base}/alertas`,
        },
      ]
    : [
        {
          icone: 'home_pin',
          titulo: `Avisos ${doLugar(bairro)}`,
          meta: `${doBairroDaPessoa.length} valendo`,
          para: '/meu-bairro/avisos',
        },
        {
          icone: 'warning',
          titulo: 'Alertas da cidade de São Paulo',
          meta: `${contar(alertasCidade, 'ativo', 'ativos')} agora`,
          para: '/minha-cidade/alertas',
        },
      ];

  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando os avisos…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro titulo="Não conseguimos carregar os avisos agora" aoTentarDeNovo={tentarDeNovo} />
    );
  } else if (avisos.length === 0) {
    conteudo = (
      <EstadoVazio
        icone="campaign"
        titulo={
          doBairro ? `Nenhum aviso ${noLugar(recorte.lugar)} agora` : 'Nenhum aviso valendo agora'
        }
        texto="Quando a prefeitura publicar um aviso, ele aparece aqui."
      >
        {doBairro && (
          <Botao variante="secundario" para="/minha-cidade/avisos">
            Ver os avisos da cidade
          </Botao>
        )}
      </EstadoVazio>
    );
  } else {
    conteudo = (
      <>
        <ul className={classes.lista}>
          {visiveis.map((aviso) => (
            <li key={aviso.id}>
              <CardAviso
                aviso={aviso}
                caminho={`${base}/${aviso.id}`}
                nivelTitulo={2}
                selo={doBairro && aviso.bairros.length === 0 ? <SeloCidadeToda /> : undefined}
              />
            </li>
          ))}
        </ul>
        {faltam > 0 && (
          <div className={classes.mais}>
            <Botao
              variante="secundario"
              largo
              icone="expand_more"
              iconeDireita
              onClick={() => setQuantos((atual) => atual + porPagina)}
            >
              {`Mostrar mais ${contar(faltam, 'aviso', 'avisos')}`}
            </Botao>
          </div>
        )}
      </>
    );
  }

  return (
    <Pagina
      cabecalho={<CabecalhoPagina tipo="lista" titulo={titulo} icone="campaign" trilha={trilha} />}
    >
      {conteudo}
      <ParaOndeIr destinos={destinos} />
    </Pagina>
  );
}
