import Botao from '../Botao';
import Icone from '../Icone';
import IconeServico from '../servicos/IconeServico';
import { formatarNumero, formatarValorCurto } from '../../logica/formatos';
import classes from './CardsInicio.module.css';

// Card de uma votação aberta no Início. Faixa de cima: "Faltam N dias · termina quarta, 18 nov"
// (e "Você votou Sim" se a pessoa já votou). Corpo: ícone, "tipo · lugar", título e resumo.
// Pé: votos e quanto custa (ou quanto move), o toggle Seguir/Seguindo e "Avaliar e votar"
// (ou "Ver o seu voto"). O visitante vê "Seguir" levando para Entrar.
// Recebe a votação de votacoesDoInicio(), o total de votos, o voto da pessoa ("sim", "nao"
// ou undefined), se ela segue, aoSeguir() e se ela está logada.
export default function CardVotacaoInicio({ votacao, totalVotos, voto, segue, aoSeguir, logado }) {
  const idTitulo = `votacao-${votacao.id}`;
  const rotuloValor = votacao.tipo === 'Mudança de verba' ? 'Move' : 'Custa';

  return (
    <article className={classes.card} aria-labelledby={idTitulo}>
      <p className={`${classes.faixa} ${classes.faixaVotacao}`}>
        <Icone nome="hourglass_bottom" tamanho={20} className={classes.icone} />
        <strong>{votacao.faltam}</strong>
        <span>· {votacao.termina}</span>
        {voto && (
          <span className={classes.votou}>
            <Icone nome="check" tamanho={18} />
            Você votou {voto === 'sim' ? 'Sim' : 'Não'}
          </span>
        )}
      </p>

      <div className={classes.corpo}>
        <IconeServico nome={votacao.icone} />
        <div className={classes.texto}>
          <p className={classes.meta}>
            {votacao.tipo} · {votacao.lugar}
          </p>
          <h3 className={classes.titulo} id={idTitulo}>
            {votacao.titulo}
          </h3>
          <p className={classes.descricao}>{votacao.resumo}</p>
        </div>
      </div>

      <div className={`${classes.pe} ${classes.peVotacao}`}>
        <dl className={classes.numeros}>
          <div>
            <dt>Votos</dt>
            <dd>{formatarNumero(totalVotos)}</dd>
          </div>
          <div>
            <dt>{rotuloValor}</dt>
            <dd>{formatarValorCurto(votacao.valor)}</dd>
          </div>
        </dl>
        <div className={classes.botoes}>
          {logado ? (
            <Botao
              variante="secundario"
              compacto
              icone="add"
              pressionado={segue}
              onClick={aoSeguir}
              aria-label={`Seguir a votação ${votacao.titulo}`}
            >
              {segue ? 'Seguindo' : 'Seguir'}
            </Botao>
          ) : (
            <Botao variante="secundario" compacto icone="add" para="/entrar">
              Seguir<span className={classes.oculto}> a votação {votacao.titulo} (entre na conta)</span>
            </Botao>
          )}
          {voto ? (
            <Botao
              variante="secundario"
              compacto
              icone="arrow_forward"
              iconeDireita
              para={votacao.caminho}
            >
              Ver o seu voto<span className={classes.oculto}> em {votacao.titulo}</span>
            </Botao>
          ) : (
            <Botao
              variante="principal"
              compacto
              icone="arrow_forward"
              iconeDireita
              para={votacao.caminho}
            >
              Avaliar e votar<span className={classes.oculto}> {votacao.titulo}</span>
            </Botao>
          )}
        </div>
      </div>
    </article>
  );
}
