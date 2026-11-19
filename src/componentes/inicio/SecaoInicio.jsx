import { useId } from 'react';
import Botao from '../Botao';
import TituloGrupo from '../TituloGrupo';
import classes from './SecaoInicio.module.css';

// Seção do Início: título de grupo (bolinha, título, contagem e linha até a borda) com o botão
// de texto "Ver todos →" à direita, e os cards embaixo, 12 px um do outro.
// Recebe o titulo, a contagem, a cor da bolinha, o rotuloVer ("Ver todos" ou "Ver todas"),
// a rota do botão (para), se o conteúdo é uma lista de cards (lista) e os cards (children).
export default function SecaoInicio({
  titulo,
  contagem,
  cor = 'cinza',
  rotuloVer = 'Ver todos',
  para,
  lista = true,
  children,
}) {
  const idTitulo = useId();
  const Conteudo = lista ? 'ul' : 'div';

  return (
    <section className={classes.secao} aria-labelledby={idTitulo}>
      <div className={classes.cabecalho}>
        <TituloGrupo titulo={titulo} contagem={contagem} cor={cor} id={idTitulo} />
        {para && (
          <Botao variante="texto" compacto icone="arrow_forward" iconeDireita para={para}>
            {rotuloVer}
            <span className={classes.oculto}>: {titulo.toLowerCase()}</span>
          </Botao>
        )}
      </div>
      <Conteudo className={classes.pilha}>{children}</Conteudo>
    </section>
  );
}
