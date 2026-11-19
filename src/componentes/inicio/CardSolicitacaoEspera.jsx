import CardAndamento from './CardAndamento';
import { buscarServico } from '../../logica/servicos';
import { buscarStatusSolicitacao } from '../../logica/solicitacoes';
import { etapasDaSolicitacao, textosDaSolicitacao } from '../../logica/inicio';
import classes from './CardsInicio.module.css';

// Card de uma solicitação que espera a prefeitura, com a barra das 3 etapas e o prazo em destaque.
// Recebe a solicitação (de useSolicitacoes).
export default function CardSolicitacaoEspera({ solicitacao }) {
  const status = buscarStatusSolicitacao(solicitacao.status);
  const textos = textosDaSolicitacao(solicitacao);

  return (
    <CardAndamento
      caminho={`/servicos/minhas-solicitacoes/${solicitacao.id}`}
      icone={buscarServico(solicitacao.idServico)?.icone ?? 'event'}
      categoria="Solicitação"
      selo={{ cor: status.cor, rotulo: status.rotulo }}
      titulo={solicitacao.nomeServico}
      etapas={etapasDaSolicitacao(solicitacao)}
    >
      {textos.quando}
      {textos.prazo && (
        <>
          {' · '}
          <strong className={classes.prazo}>{textos.prazo}</strong>
        </>
      )}
    </CardAndamento>
  );
}
