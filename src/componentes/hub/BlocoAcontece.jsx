import EstadoErro from '../EstadoErro';
import CardAcontece from './CardAcontece';
import EsqueletoCards from './EsqueletoCards';
import GradeHub from './GradeHub';
import SecaoHub from './SecaoHub';

// Seção "O que acontece …" de um hub, com os 6 cards e os estados de carregando e de erro.
// Recebe:
// - titulo (ex.: "O que acontece na cidade");
// - cards: [{ id, icone, nome, meta, para, alerta }] (de cardsAcontece);
// - estado ("carregando" | "erro" | "pronto") e aoTentarDeNovo, de useCarregamento;
// - textoErro: título do erro (ex.: "Não conseguimos carregar os números da cidade agora.");
// - restoDaPagina: o que continua na página quando dá erro (vai no texto do erro).
export default function BlocoAcontece({
  titulo,
  cards,
  estado,
  aoTentarDeNovo,
  textoErro,
  restoDaPagina,
}) {
  return (
    <SecaoHub titulo={titulo}>
      {(idTitulo) => {
        if (estado === 'carregando') {
          return (
            <EsqueletoCards
              texto={`Carregando ${titulo.charAt(0).toLowerCase()}${titulo.slice(1)}…`}
            />
          );
        }
        if (estado === 'erro') {
          return (
            <EstadoErro
              titulo={textoErro}
              texto={`Pode ser a sua conexão ou o sistema da prefeitura. ${restoDaPagina}`}
              aoTentarDeNovo={aoTentarDeNovo}
            />
          );
        }
        return (
          <GradeHub dupla idTitulo={idTitulo}>
            {cards.map((card) => (
              <li key={card.id}>
                <CardAcontece {...card} />
              </li>
            ))}
          </GradeHub>
        );
      }}
    </SecaoHub>
  );
}
