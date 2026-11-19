import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import EstadoVazio from '../componentes/EstadoVazio';
import ParaOndeIr from '../componentes/ParaOndeIr';
import TituloGrupo from '../componentes/TituloGrupo';
import CardAlerta from '../componentes/alertas/CardAlerta';
import ItemAlertaEncerrado from '../componentes/alertas/ItemAlertaEncerrado';
import { useCarregamento } from '../componentes/hub/useCarregamento';
import { useLugarDaPessoa } from '../componentes/hub/useLugarDaPessoa';
import { ALERTAS } from '../dados/alertas';
import { AVISOS } from '../dados/avisos';
import { alertasDoLugar, partesDaArea } from '../logica/alertas';
import { avisosDoLugar, juntarNomes } from '../logica/avisos';
import { doLugar, noLugar } from '../logica/lugares';
import { contar } from '../logica/resumoLugar';
import classes from '../componentes/alertas/Alertas.module.css';

// Selo de lugar no card da cidade: a casa quando o alerta pega o bairro da pessoa,
// o primeiro bairro quando é de outro lugar e nada quando vale para a cidade toda.
function seloDoLugar(alerta, nomeBairro) {
  if (alerta.bairros.includes(nomeBairro)) return { icone: 'home', texto: nomeBairro };
  if (alerta.bairros.length > 0) return { icone: 'location_on', texto: alerta.bairros[0] };
  return null;
}

// Alertas da cidade (/minha-cidade/alertas, prancha 17) ou do bairro da pessoa
// (/meu-bairro/alertas, prancha 18: os alertas que pegam o bairro, a subprefeitura ou a cidade toda).
// Ativos em cards completos, encerrados embaixo e "Para onde ir" no fim.
// Recebe doBairro (true na versão do bairro).
export default function Alertas({ doBairro = false }) {
  const { bairro, trilhaDoBairro } = useLugarDaPessoa();
  const { estado, tentarDeNovo } = useCarregamento();

  const doCidade = alertasDoLugar(ALERTAS);
  const daPessoa = alertasDoLugar(ALERTAS, [bairro.nome]);
  const { ativos: todosAtivos, encerrados } = doBairro ? daPessoa : doCidade;
  const ativos = estado === 'vazio' ? [] : todosAtivos;
  const lugarDaLista = doBairro ? bairro : null;

  const titulo = doBairro ? `Alertas ${doLugar(bairro)}` : 'Alertas da cidade de São Paulo';
  const trilha = doBairro
    ? [...trilhaDoBairro, { rotulo: 'Alertas' }]
    : [{ rotulo: 'Cidade de São Paulo', para: '/minha-cidade' }, { rotulo: 'Alertas' }];

  const destinos = doBairro
    ? [
        {
          icone: 'warning',
          titulo: 'Alertas da cidade de São Paulo',
          meta: `${contar(doCidade.ativos.length, 'ativo', 'ativos')} agora`,
          para: '/minha-cidade/alertas',
        },
        {
          icone: 'campaign',
          titulo: `Avisos ${doLugar(bairro)}`,
          meta: `${avisosDoLugar(AVISOS, [bairro.nome]).length} valendo`,
          para: '/meu-bairro/avisos',
        },
      ]
    : [
        {
          icone: 'home_pin',
          titulo: `Alertas ${doLugar(bairro)}`,
          meta: `${contar(daPessoa.ativos.length, 'ativo', 'ativos')} agora`,
          para: '/meu-bairro/alertas',
        },
        {
          icone: 'campaign',
          titulo: 'Avisos da cidade de São Paulo',
          meta: `${avisosDoLugar(AVISOS).length} valendo`,
          para: '/minha-cidade/avisos',
        },
      ];

  // Conteúdo conforme o estado do carregamento
  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando os alertas…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar os alertas agora"
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else {
    conteudo = (
      <>
        <section aria-labelledby="alertas-ativos">
          <TituloGrupo titulo="Ativos" contagem={ativos.length} cor="ambar" id="alertas-ativos" />
          {ativos.length === 0 ? (
            <EstadoVazio
              icone="check_circle"
              titulo={doBairro ? `Nenhum alerta ${noLugar(bairro)} agora` : 'Nenhum alerta agora'}
              texto={
                doBairro
                  ? 'Quando houver um alerta no bairro, ele aparece aqui e no topo do app.'
                  : 'Quando houver um alerta, ele aparece aqui e no topo do app.'
              }
            >
              {doBairro && (
                <Botao variante="secundario" para="/minha-cidade/alertas">
                  Ver os alertas da cidade
                </Botao>
              )}
            </EstadoVazio>
          ) : (
            <ul className={classes.cards}>
              {ativos.map((alerta) => (
                <li key={alerta.id}>
                  <CardAlerta
                    alerta={alerta}
                    caminho={`/minha-cidade/alertas/${alerta.id}`}
                    local={doBairro ? null : seloDoLugar(alerta, bairro.nome)}
                    area={partesDaArea(alerta, lugarDaLista)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        {encerrados.length > 0 && (
          <section aria-labelledby="alertas-encerrados">
            <div className={classes.espaco} />
            <TituloGrupo
              titulo="Encerrados"
              contagem={encerrados.length}
              cor="cinza"
              id="alertas-encerrados"
            />
            <ul className={classes.cards}>
              {encerrados.map((alerta) => (
                <li key={alerta.id}>
                  <ItemAlertaEncerrado
                    alerta={alerta}
                    caminho={`/minha-cidade/alertas/${alerta.id}`}
                    onde={
                      alerta.bairros.length > 0
                        ? juntarNomes(alerta.bairros)
                        : partesDaArea(alerta, lugarDaLista).join(' · ')
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  }

  return (
    <Pagina
      cabecalho={<CabecalhoPagina tipo="lista" titulo={titulo} icone="warning" trilha={trilha} />}
    >
      {conteudo}
      <ParaOndeIr destinos={destinos} />
    </Pagina>
  );
}
