import { useMediaQuery } from '@mantine/hooks';
import Icone from '../Icone';
import Botao from '../Botao';
import Popup from '../Popup';
import { CONSULTA_CELULAR } from '../../logica/navegacaoCelular';
import { CATEGORIAS_PEDIDO } from '../../dados/categoriasPedido';
import { buscarCategoria } from '../../logica/pedidos';
import classes from './NovoPedido.module.css';

// Menos que isso de texto ainda não dá para sugerir a categoria
const TEXTO_MINIMO = 10;

// Categoria sugerida pelo app a partir da descrição, com "Trocar categoria" para escolher outra.
// Se o app não achar a categoria, a lista já vem aberta para a pessoa escolher.
// No celular, "Trocar" abre a lista numa folha que sobe de baixo, em grade de 2 colunas.
// Recebe o id da categoria atual, a descrição, o erro, aoEscolher(id), aberta e aoAbrir(aberta).
export default function SugestaoCategoria({
  categoria,
  descricao,
  erro,
  aoEscolher,
  aberta,
  aoAbrir,
}) {
  const celular = useMediaQuery(CONSULTA_CELULAR);
  const atual = buscarCategoria(categoria);
  if (!atual && descricao.trim().length < TEXTO_MINIMO && !erro) return null;
  // No celular, com uma categoria já sugerida, a lista vai para a folha
  const naFolha = celular && Boolean(atual);
  const listaVisivel = !naFolha && (aberta || !atual);

  // As categorias, em botões de opção (na folha, em grade de 2 colunas)
  function opcoes(folha) {
    return (
      <div
        className={folha ? `${classes.categorias} ${classes.categoriasFolha}` : classes.categorias}
      >
        {CATEGORIAS_PEDIDO.map((item, indice) => (
          <label key={item.id} className={classes.categoria}>
            <input
              type="radio"
              name="categoria"
              id={indice === 0 ? 'categoria' : undefined}
              value={item.id}
              checked={categoria === item.id}
              onChange={() => aoEscolher(item.id)}
            />
            <span className={classes.iconeCategoria} aria-hidden="true">
              <Icone nome={item.icone} />
            </span>
            {item.rotulo}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className={classes.sugestao}>
      {atual && (
        <div className={classes.sugestaoLinha} role="status">
          <span className={classes.iconeCategoria} aria-hidden="true">
            <Icone nome={atual.icone} />
          </span>
          <div className={classes.sugestaoTexto}>
            <p className={classes.sugestaoRotulo}>Categoria sugerida</p>
            <p className={classes.sugestaoValor}>{atual.rotulo}</p>
          </div>
          {naFolha ? (
            <Botao
              variante="secundario"
              compacto
              aria-haspopup="dialog"
              onClick={() => aoAbrir(true)}
            >
              Trocar<span className={classes.oculto}> a categoria</span>
            </Botao>
          ) : (
            <Botao
              variante="secundario"
              compacto
              icone={aberta ? 'expand_less' : 'expand_more'}
              iconeDireita
              aria-expanded={aberta}
              aria-controls="lista-categorias"
              onClick={() => aoAbrir(!aberta)}
            >
              {aberta ? 'Fechar a lista' : 'Trocar categoria'}
            </Botao>
          )}
        </div>
      )}
      {listaVisivel && (
        <fieldset className={classes.lista} id="lista-categorias">
          <legend className={classes.listaTitulo}>Escolha a categoria</legend>
          {erro && (
            <p className={classes.erroCampo}>
              <Icone nome="error" tamanho={20} />
              {erro}
            </p>
          )}
          {opcoes(false)}
        </fieldset>
      )}
      {naFolha && (
        <Popup aberto={aberta} aoFechar={() => aoAbrir(false)} titulo="Trocar categoria" semPadding>
          <fieldset className={classes.listaFolha}>
            <legend className={classes.oculto}>Escolha a categoria</legend>
            {opcoes(true)}
          </fieldset>
        </Popup>
      )}
    </div>
  );
}
