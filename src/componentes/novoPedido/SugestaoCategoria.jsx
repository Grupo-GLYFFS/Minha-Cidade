import Icone from '../Icone';
import Botao from '../Botao';
import { CATEGORIAS_PEDIDO } from '../../dados/categoriasPedido';
import { buscarCategoria } from '../../logica/pedidos';
import classes from './NovoPedido.module.css';

// Menos que isso de texto ainda não dá para sugerir a categoria
const TEXTO_MINIMO = 10;

// Categoria sugerida pelo app a partir da descrição, com "Trocar categoria" para escolher outra.
// Se o app não achar a categoria, a lista já vem aberta para a pessoa escolher.
// Recebe o id da categoria atual, a descrição, o erro, aoEscolher(id), aberta e aoAbrir(aberta).
export default function SugestaoCategoria({
  categoria,
  descricao,
  erro,
  aoEscolher,
  aberta,
  aoAbrir,
}) {
  const atual = buscarCategoria(categoria);
  if (!atual && descricao.trim().length < TEXTO_MINIMO && !erro) return null;
  const listaVisivel = aberta || !atual;

  return (
    <div className={classes.sugestao}>
      {atual && (
        <div className={classes.sugestaoLinha} role="status">
          <span className={classes.iconeCategoria} aria-hidden="true">
            <Icone nome={atual.icone} tamanho={22} />
          </span>
          <div className={classes.sugestaoTexto}>
            <p className={classes.sugestaoRotulo}>Categoria sugerida</p>
            <p className={classes.sugestaoValor}>{atual.rotulo}</p>
          </div>
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
          <div className={classes.categorias}>
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
                  <Icone nome={item.icone} tamanho={22} />
                </span>
                {item.rotulo}
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
