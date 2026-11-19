import Pagina from '../componentes/Pagina';
import Icone from '../componentes/Icone';
import CabecalhoGs from '../componentes/gs/CabecalhoGs';
import CardIndicador from '../componentes/gs/CardIndicador';
import CardColunas from '../componentes/gs/CardColunas';
import BannerFimGs from '../componentes/gs/BannerFimGs';
import { usePedidos } from '../contexto/usePedidos';
import { montarIndicadores } from '../logica/impacto';
import { PROJETOS } from '../dados/projetos';
import { OBRAS } from '../dados/obras';
import { SERVICOS } from '../dados/servicos';
import { O_QUE_MUDA } from '../dados/oQueMuda';
import classes from './GlobalSolution.module.css';
import classesImpacto from './Impacto.module.css';

// Impacto (/impacto), 3ª página da Global Solution: o aviso de que os números são da simulação,
// os 6 indicadores calculados dos dados de exemplo do app, "O que muda" e o banner para Equipe.
export default function Impacto() {
  const { pedidos } = usePedidos();
  const indicadores = montarIndicadores({
    pedidos,
    projetos: PROJETOS,
    obras: OBRAS,
    servicos: SERVICOS,
  });

  return (
    <Pagina
      cabecalho={
        <CabecalhoGs
          atual="impacto"
          subtitulo="O que a demonstração mostra e o que o app muda para quem mora numa cidade pequena."
        />
      }
    >
      <div className={classes.pilha}>
        <p className={classesImpacto.aviso}>
          <Icone nome="science" tamanho={22} />
          Os números desta página são da simulação do app, com dados de exemplo de São Paulo. Não
          são resultados reais.
        </p>
        <ul className={classesImpacto.indicadores} aria-label="Indicadores da simulação">
          {indicadores.map((indicador) => (
            <CardIndicador key={indicador.id} indicador={indicador} />
          ))}
        </ul>
        <CardColunas titulo="O que muda" itens={O_QUE_MUDA} />
        <BannerFimGs atual="impacto" />
      </div>
    </Pagina>
  );
}
