import TituloGrupo from '../TituloGrupo';
import CartaoVotacaoLista from './CartaoVotacaoLista';
import { useVotos } from '../../contexto/useVotos';
import { lugarDaVotacao, separarVotacoes } from '../../logica/votacao';
import classes from './GruposVotacoes.module.css';

// Lista de votações em dois grupos: Abertas (azul) e Encerradas (cinza).
// Recebe:
// - projetos: as votações da lista;
// - prefixo: base dos ids dos títulos;
// - recorte (opcional): o recorte da página, para escrever "Cidade toda · inclui a …";
// - seguir: { segue(id), alternar(id), logado } do useSeguidos("votacoes");
// - semAbertas (opcional): o que mostrar no lugar do grupo Abertas quando ele está vazio
//   (sem ele, o grupo vazio some).
export default function GruposVotacoes({ projetos, prefixo, recorte, seguir, semAbertas }) {
  const { votoDe, resultado } = useVotos();
  const { abertas, encerradas } = separarVotacoes(projetos);

  // Monta a lista de cards de um grupo
  function listar(lista, idTitulo) {
    return (
      <ul className={classes.lista} aria-labelledby={idTitulo}>
        {lista.map((projeto) => (
          <li key={projeto.id}>
            <CartaoVotacaoLista
              projeto={projeto}
              resultado={resultado(projeto)}
              voto={votoDe(projeto.id)}
              lugar={lugarDaVotacao(projeto, recorte)}
              seguindo={seguir.segue(projeto.id)}
              aoAlternarSeguir={() => seguir.alternar(projeto.id)}
              logado={seguir.logado}
            />
          </li>
        ))}
      </ul>
    );
  }

  const idAbertas = `${prefixo}-abertas`;
  const idEncerradas = `${prefixo}-encerradas`;

  return (
    <div className={classes.grupos}>
      {(abertas.length > 0 || semAbertas) && (
        <section aria-labelledby={idAbertas}>
          <TituloGrupo titulo="Abertas" contagem={abertas.length} cor="azul" id={idAbertas} />
          {abertas.length > 0 ? listar(abertas, idAbertas) : semAbertas}
        </section>
      )}
      {encerradas.length > 0 && (
        <section aria-labelledby={idEncerradas}>
          <TituloGrupo
            titulo="Encerradas"
            contagem={encerradas.length}
            cor="cinza"
            id={idEncerradas}
          />
          {listar(encerradas, idEncerradas)}
        </section>
      )}
    </div>
  );
}
