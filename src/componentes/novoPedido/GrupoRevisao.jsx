import Icone from '../Icone';
import Botao from '../Botao';
import classes from './NovoPedido.module.css';

// Um grupo da etapa Revisar (O problema, Onde fica, Fotos): faixa com o título h3 e "Alterar",
// e as linhas embaixo, com divisórias de borda a borda.
// Recebe o titulo, aoAlterar() (volta para a etapa do grupo) e as linhas
// [{ icone, rotulo, valor, acao, classeValor }] (acao = botão opcional no fim da linha;
// classeValor = classe extra do valor, ex.: 'm-2l-cel').
export default function GrupoRevisao({ titulo, aoAlterar, linhas }) {
  return (
    <section className={classes.grupoRevisao} aria-label={titulo}>
      <div className={classes.grupoRevisaoCab}>
        <h3 className={classes.grupoRevisaoTitulo}>{titulo}</h3>
        <Botao variante="texto" compacto onClick={aoAlterar}>
          Alterar<span className={classes.oculto}> {titulo.toLowerCase()}</span>
        </Botao>
      </div>
      <dl className={classes.linhasRevisao}>
        {linhas.map((linha) => (
          <div key={linha.rotulo} className={classes.linhaRevisao}>
            <dt className={classes.linhaRotulo}>
              <Icone nome={linha.icone} tamanho={20} />
              {linha.rotulo}
            </dt>
            <dd className={`${classes.linhaValor} ${linha.classeValor ?? ''}`}>{linha.valor}</dd>
            {linha.acao && <dd className={classes.linhaAcao}>{linha.acao}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}
