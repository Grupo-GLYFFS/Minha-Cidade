import Botao from '../Botao';
import PassosGs from './PassosGs';
import MapaBrasil from './MapaBrasil';
import NumeroGs from './NumeroGs';
import { AGENDAMENTO_ONLINE, AGENDAMENTO_ONLINE_GERAL } from '../../dados/pesquisaTic';
import classes from './HeroiGs.module.css';

// Porcentagens da pesquisa TIC Governo Eletrônico 2023 (cidades pequenas e grandes)
const PEQUENAS = AGENDAMENTO_ONLINE.find((item) => item.id === 'ate-10-mil').porcentagem;
const GRANDES = AGENDAMENTO_ONLINE.find((item) => item.id === 'mais-500-mil').porcentagem;

// Herói da Apresentação (/): passos, o problema (h1 + texto), os botões e o dado real
// com a fonte: 27% e 33% à esquerda, o mapa do Brasil em pontos no meio e 88% à direita.
export default function HeroiGs() {
  return (
    <section className={classes.heroi} aria-labelledby="gs-titulo">
      <div className={classes.miolo}>
        <div className={classes.passos}>
          <PassosGs atual="apresentacao" />
        </div>
        <h1 className={classes.titulo} id="gs-titulo">
          Na maior parte do Brasil, a prefeitura ainda atende por telefone e no balcão
        </h1>
        <p className={classes.texto}>
          Quase metade dos municípios tem até 10 mil habitantes. Neles, só {PEQUENAS}% das
          prefeituras com site deixam agendar um serviço pela internet. O Minha Prefeitura é um app
          que qualquer uma delas pode usar.
        </p>
        <div className={classes.acoes}>
          <Botao variante="secundario" para="/inicio">
            Entrar no app
          </Botao>
          <Botao variante="principal" icone="arrow_forward" iconeDireita para="/como-funciona">
            Como funciona
          </Botao>
        </div>

        <div className={classes.dados}>
          <div className={classes.esquerda}>
            <NumeroGs
              numero={PEQUENAS}
              cor="vermelho"
              texto="das prefeituras de cidades com até 10 mil habitantes deixam agendar online"
            />
            <NumeroGs numero={AGENDAMENTO_ONLINE_GERAL} texto="de todas as prefeituras com site" />
          </div>
          <div className={classes.centro}>
            <MapaBrasil />
          </div>
          <div className={classes.direita}>
            <NumeroGs
              numero={GRANDES}
              cor="azul"
              texto="das prefeituras de cidades com mais de 500 mil habitantes"
            />
            <p className={classes.fonte}>
              Agendamento:{' '}
              <a href="https://cetic.br/pt/pesquisa/governo-eletronico/">
                TIC Governo Eletrônico 2023, Cetic.br/NIC.br
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
