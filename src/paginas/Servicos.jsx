import { useParams, useSearchParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import BuscaCabecalho from '../componentes/servicos/BuscaCabecalho';
import CatalogoServicos from '../componentes/servicos/CatalogoServicos';
import ResultadosServicos from '../componentes/servicos/ResultadosServicos';
import { useResumoConta } from '../componentes/servicos/useResumoConta';
import { SERVICOS } from '../dados/servicos';
import { buscarCategoriaServico } from '../logica/servicos';
import classes from './Servicos.module.css';

// Serviços (/servicos): busca grande e atalhos no cabeçalho, catálogo com os assuntos
// em chips e "Para onde ir". O texto da busca fica no endereço (?q=iptu) e troca o
// catálogo pelos resultados. ?categoria=saude (ou o endereço antigo /servicos/categoria/saude)
// abre o catálogo já no assunto.
export default function Servicos() {
  const [parametros, setParametros] = useSearchParams();
  const { idCategoria } = useParams();
  const resumo = useResumoConta();
  const texto = parametros.get('q') ?? '';
  const pedida = parametros.get('categoria') ?? idCategoria;
  const categoria = buscarCategoriaServico(pedida)?.id;

  // Guarda o texto no endereço sem criar histórico a cada letra
  function mudarTexto(novo) {
    const proximos = new URLSearchParams(parametros);
    if (novo) proximos.set('q', novo);
    else proximos.delete('q');
    setParametros(proximos, { replace: true });
  }

  // Enter ou "Buscar": leva a pessoa até os resultados
  function enviar() {
    document.getElementById('servicos-titulo')?.scrollIntoView({ behavior: 'smooth' });
  }

  const buscando = texto.trim().length > 0;

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Serviços"
          subtitulo={`${SERVICOS.length} serviços da prefeitura`}
        >
          <BuscaCabecalho valor={texto} aoMudar={mudarTexto} aoEnviar={enviar} />
        </CabecalhoPagina>
      }
    >
      <div id="servicos-titulo" className={classes.ancora}>
        {buscando ? (
          <ResultadosServicos texto={texto} aoLimpar={() => mudarTexto('')} />
        ) : (
          <section aria-labelledby="todos-titulo">
            <h2 className={classes.titulo} id="todos-titulo">
              Todos os serviços
            </h2>
            {/* A chave faz o catálogo abrir de novo no assunto quando o endereço muda */}
            <CatalogoServicos key={categoria ?? 'todos'} categoriaInicial={categoria} />
          </section>
        )}
      </div>

      <ParaOndeIr
        destinos={[
          {
            icone: 'event_available',
            titulo: 'Minhas solicitações',
            meta: resumo.solicitacoes,
            para: '/servicos/minhas-solicitacoes',
          },
          {
            icone: 'assignment',
            titulo: 'Meus pedidos',
            meta: resumo.pedidos,
            para: '/perfil/pedidos',
          },
        ]}
      />
    </Pagina>
  );
}
