import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import TituloGrupo from '../componentes/TituloGrupo';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import DiasAgendados from '../componentes/servicos/DiasAgendados';
import CardSolicitacao from '../componentes/servicos/CardSolicitacao';
import { useCarregamento } from '../componentes/servicos/useCarregamento';
import { useResumoConta } from '../componentes/servicos/useResumoConta';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useAvisoTemporario } from '../contexto/useAvisoTemporario';
import { SERVICOS } from '../dados/servicos';
import { agruparSolicitacoes } from '../logica/solicitacoes';
import classes from './MinhasSolicitacoes.module.css';

// Minhas solicitações (/servicos/minhas-solicitacoes, só com conta): os serviços pedidos
// em grupos (Agendadas, Solicitadas, Concluídas e, se houver, Canceladas).
// As agendadas ficam por dia; o próximo agendamento tem os botões Como chegar, Remarcar,
// Cancelar e Ver agendamento. Tem os estados vazio, carregando e erro.
export default function MinhasSolicitacoes() {
  const { solicitacoes } = useSolicitacoes();
  const { carregando, erro, tentarDeNovo } = useCarregamento();
  const resumo = useResumoConta();
  const mostrarAviso = useAvisoTemporario();
  const grupos = agruparSolicitacoes(solicitacoes);

  // Conteúdo conforme o estado da lista
  let conteudo;
  if (carregando) {
    conteudo = <EstadoCarregando texto="Carregando suas solicitações…" />;
  } else if (erro) {
    conteudo = (
      <EstadoErro
        titulo="Não conseguimos carregar suas solicitações agora"
        texto="Pode ser a sua conexão ou o sistema da prefeitura. Seus agendamentos continuam marcados."
        aoTentarDeNovo={tentarDeNovo}
      />
    );
  } else if (grupos.length === 0) {
    conteudo = (
      <EstadoVazio
        icone="event_available"
        titulo="Você ainda não tem solicitações"
        texto="Os serviços que você pedir aparecem aqui, com a data e o andamento."
      >
        <Botao variante="principal" icone="grid_view" para="/servicos">
          Ver serviços
        </Botao>
      </EstadoVazio>
    );
  } else {
    conteudo = grupos.map(({ grupo, itens }) => (
      <section key={grupo.id} className={classes.grupo} aria-labelledby={`grupo-${grupo.id}`}>
        <TituloGrupo
          titulo={grupo.titulo}
          contagem={itens.length}
          cor={grupo.cor}
          id={`grupo-${grupo.id}`}
        />
        {grupo.id === 'agendadas' ? (
          <DiasAgendados agendadas={itens} aoAvisar={mostrarAviso} />
        ) : (
          <ul className={classes.lista}>
            {itens.map((item) => (
              <li key={item.id}>
                <CardSolicitacao solicitacao={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    ));
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Minhas solicitações"
          icone="event_available"
          acoes={
            <Botao variante="principal" icone="add" para="/servicos">
              Solicitar serviço
            </Botao>
          }
        />
      }
    >
      <div className={classes.grupos}>{conteudo}</div>

      <ParaOndeIr
        destinos={[
          {
            icone: 'grid_view',
            titulo: 'Serviços',
            meta: `${SERVICOS.length} serviços da prefeitura`,
            para: '/servicos',
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
