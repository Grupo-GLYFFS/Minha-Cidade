import Botao from '../Botao';
import PassosGs from './PassosGs';
import MapaBrasil from './MapaBrasil';
import NumeroGs from './NumeroGs';
import { FONTE_TIC, NUMEROS_TIC } from '../../dados/pesquisaTic';
import classes from './HeroiGs.module.css';

// Cards de cada lado do mapa (votação e fórum à esquerda, app à direita)
const ESQUERDA = NUMEROS_TIC.filter((numero) => numero.lado === 'esquerda');
const DIREITA = NUMEROS_TIC.filter((numero) => numero.lado === 'direita');

// Mostra os cards de uma lista de números da pesquisa TIC Governo 2025.
function cards(numeros) {
  return numeros.map((numero) => (
    <NumeroGs
      key={numero.id}
      icone={numero.icone}
      numero={numero.porcentagem}
      texto={numero.texto}
    />
  ));
}

// Herói da Apresentação (/): passos, o que o app faz (h1 + texto), os botões e o dado real
// com a fonte: o que as prefeituras oferecem pela internet (votar e fórum à esquerda,
// app à direita) em volta do mapa do Brasil em pontos com as cidades pequenas.
export default function HeroiGs() {
  return (
    <section className={classes.heroi} aria-labelledby="gs-titulo">
      <div className={classes.miolo}>
        <div className={classes.passos}>
          <PassosGs atual="apresentacao" />
        </div>
        <h1 className={classes.titulo} id="gs-titulo">
          Vote, peça e acompanhe a sua cidade
        </h1>
        <p className={classes.texto}>
          Pedidos de melhoria, obras e votações do bairro, num app que qualquer prefeitura pode
          usar.
        </p>
        <div className={classes.acoes}>
          <Botao variante="secundario" para="/inicio">
            Abrir o app
          </Botao>
          <Botao variante="principal" icone="arrow_forward" iconeDireita para="/como-funciona">
            Como funciona
          </Botao>
        </div>

        <h2 className={classes.legenda}>O que as prefeituras oferecem pela internet</h2>
        <div className={classes.dados}>
          <div className={classes.esquerda}>{cards(ESQUERDA)}</div>
          <div className={classes.centro}>
            <MapaBrasil />
          </div>
          <div className={classes.direita}>
            {cards(DIREITA)}
            <p className={classes.fonte}>
              Prefeituras, em 2025. Fonte: <a href={FONTE_TIC.link}>{FONTE_TIC.texto}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
