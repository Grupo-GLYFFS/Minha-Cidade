import { PONTOS_MAPA_BRASIL, PONTO_SAO_PAULO } from '../../dados/mapaBrasil';
import { FONTE_IBGE } from '../../dados/pesquisaTic';
import classes from './MapaBrasil.module.css';

// Parte dos pontos que conta como município de até 10 mil habitantes (ex.: "44,8")
const PONTOS_PEQUENOS = PONTOS_MAPA_BRASIL.filter(([, , ateDezMil]) => ateDezMil).length;
const PORCENTAGEM = ((PONTOS_PEQUENOS / PONTOS_MAPA_BRASIL.length) * 100).toLocaleString('pt-BR', {
  maximumFractionDigits: 1,
});

// Mapa do Brasil em pontos da Apresentação: cada ponto é cerca de 10 municípios, em azul os de
// até 10 mil habitantes. O desenho é decorativo: o leitor de tela lê o texto alternativo,
// que traz a informação. Embaixo, a legenda numa linha e a fonte (IBGE, Censo 2022).
export default function MapaBrasil() {
  const textoAlternativo = `Mapa do Brasil em pontos: ${PORCENTAGEM}% dos municípios têm até 10 mil habitantes. São Paulo, cidade da demonstração, está marcada.`;

  return (
    <figure className={classes.mapa}>
      <div className={classes.area}>
        <svg
          viewBox="0 0 442 435"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={textoAlternativo}
          className={classes.desenho}
        >
          {PONTOS_MAPA_BRASIL.map(([x, y, ateDezMil]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="3.6"
              className={ateDezMil ? classes.pontoPequeno : classes.ponto}
            />
          ))}
          <circle
            cx={PONTO_SAO_PAULO.x}
            cy={PONTO_SAO_PAULO.y}
            r="9"
            strokeWidth="2.5"
            className={classes.marcaFora}
          />
          <circle
            cx={PONTO_SAO_PAULO.x}
            cy={PONTO_SAO_PAULO.y}
            r="3.5"
            className={classes.marcaDentro}
          />
        </svg>
        <span className={classes.saoPaulo} aria-hidden="true">
          São Paulo
        </span>
      </div>
      <p className={classes.legenda} aria-hidden="true">
        <i className={classes.corPequeno} />
        Quase metade dos 5.570 municípios do Brasil tem até 10 mil habitantes (em azul)
      </p>
      <figcaption className={classes.fonte}>
        Cada ponto representa cerca de 10 municípios; a posição é ilustrativa. Fonte:{' '}
        <a href={FONTE_IBGE.link}>{FONTE_IBGE.texto}</a>
      </figcaption>
    </figure>
  );
}
