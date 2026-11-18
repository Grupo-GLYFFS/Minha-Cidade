import { useId } from 'react';
import classes from './SecaoCard.module.css';

// Seção de conteúdo em card (fichas, detalhes, perfil, configurações): título h2 numa faixa
// própria, linha de borda a borda e o corpo embaixo. Sem abrir e fechar.
// Recebe:
// - titulo (h2 de 24/700);
// - contagem: número numa pílula ao lado do título (opcional);
// - acao: um botão à direita na mesma faixa (ex.: <Botao variante="texto" compacto …>Ver todos</Botao>);
// - lista: o corpo vira uma lista de LinhaDado, sem respiro em volta (as linhas trazem o seu);
// - children: o corpo.
export default function SecaoCard({ titulo, contagem, acao, lista = false, children }) {
  const idTitulo = useId();
  const classesCab = [classes.cab];
  if (acao) classesCab.push(classes.cabComAcao);

  return (
    <section className={classes.secao} aria-labelledby={idTitulo}>
      <div className={classesCab.join(' ')}>
        <h2 className={classes.titulo} id={idTitulo}>
          {titulo}
          {contagem !== undefined && <span className={classes.contagem}>{contagem}</span>}
        </h2>
        {acao}
      </div>
      <div className={lista ? classes.corpoLista : classes.corpo}>{children}</div>
    </section>
  );
}
