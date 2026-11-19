import classes from './MiniBarra.module.css';

// Classe de cada cor de segmento
const CLASSE_COR = {
  cinza: classes.cinza,
  ambar: classes.ambar,
  azul: classes.azul,
  verde: classes.verde,
  vermelho: classes.vermelho,
};

// Minibarra de 8 px dividida em segmentos proporcionais, com 2 px entre eles.
// Recebe os segmentos [{ quantidade, cor, rotulo, claro }]; os de quantidade 0 não aparecem.
// O desenho é escondido do leitor de tela, que lê a lista com os números em texto.
export default function MiniBarra({ segmentos }) {
  const visiveis = segmentos.filter((segmento) => segmento.quantidade > 0);
  const total = visiveis.reduce((soma, segmento) => soma + segmento.quantidade, 0);

  // Posição de cada segmento em % da largura (cada um começa onde o anterior acaba)
  const retangulos = visiveis.map((segmento, indice) => {
    const antes = visiveis
      .slice(0, indice)
      .reduce((soma, anterior) => soma + anterior.quantidade, 0);
    return {
      ...segmento,
      x: (antes / total) * 100,
      largura: (segmento.quantidade / total) * 100,
    };
  });

  return (
    <>
      <svg className={classes.barra} aria-hidden="true" focusable="false">
        {retangulos.map((segmento) => (
          <rect
            key={segmento.rotulo}
            x={`${segmento.x}%`}
            width={`${segmento.largura}%`}
            height="100%"
            className={`${classes.segmento} ${CLASSE_COR[segmento.cor]} ${segmento.claro ? classes.claro : ''}`}
          />
        ))}
      </svg>
      <ul className={classes.oculto}>
        {visiveis.map((segmento) => (
          <li key={segmento.rotulo}>
            {segmento.quantidade} {segmento.rotulo}
          </li>
        ))}
      </ul>
    </>
  );
}
