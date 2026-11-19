import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import ParaOndeIr from '../componentes/ParaOndeIr';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import ListaTelefones from '../componentes/ajuda/ListaTelefones';
import { GRUPOS_TELEFONES } from '../dados/telefones';
import { GRUPOS_PERGUNTAS } from '../dados/perguntas';
import { ALERTAS } from '../dados/alertas';

// Quantas perguntas e quantos alertas ativos existem (metas do "Para onde ir")
const TOTAL_PERGUNTAS = GRUPOS_PERGUNTAS.reduce((soma, grupo) => soma + grupo.perguntas.length, 0);
const ALERTAS_ATIVOS = ALERTAS.filter((alerta) => alerta.ativo).length;

// Telefones úteis (/ajuda/telefones): um card por grupo, cada linha liga para o número.
export default function TelefonesUteis() {
  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Telefones úteis"
          subtitulo="Todas as ligações são gratuitas."
          icone="call"
        />
      }
    >
      <PilhaCards>
        {GRUPOS_TELEFONES.map((grupo) => (
          <SecaoCard key={grupo.id} titulo={grupo.titulo} lista>
            <ListaTelefones telefones={grupo.telefones} />
          </SecaoCard>
        ))}
      </PilhaCards>

      <ParaOndeIr
        destinos={[
          {
            icone: 'warning',
            titulo: 'Alertas da cidade de São Paulo',
            meta: `${ALERTAS_ATIVOS} ativos agora`,
            para: '/minha-cidade/alertas',
          },
          {
            icone: 'help',
            titulo: 'Perguntas frequentes',
            meta: `${TOTAL_PERGUNTAS} perguntas`,
            para: '/ajuda/perguntas-frequentes',
          },
        ]}
      />
    </Pagina>
  );
}
