import Pagina from '../componentes/Pagina';
import CabecalhoGs from '../componentes/gs/CabecalhoGs';
import CicloPedido from '../componentes/gs/CicloPedido';
import CardColunas from '../componentes/gs/CardColunas';
import BannerFimGs from '../componentes/gs/BannerFimGs';
import { usePedidos } from '../contexto/usePedidos';
import { somarApoios } from '../logica/impacto';
import { PARA_PREFEITURA } from '../dados/paraPrefeitura';
import classes from './GlobalSolution.module.css';

// Como funciona (/como-funciona), 2ª página da Global Solution: o ciclo do pedido de melhoria
// (anel + lista das 5 etapas), o que o app faz pela prefeitura e o banner para Impacto.
export default function ComoFunciona() {
  const { pedidos } = usePedidos();

  return (
    <Pagina
      cabecalho={
        <CabecalhoGs
          atual="como-funciona"
          subtitulo="O pedido de melhoria é um ciclo entre quem mora e a prefeitura."
        />
      }
    >
      <div className={classes.pilha}>
        <CicloPedido apoios={somarApoios(pedidos)} />
        <CardColunas titulo="Para a prefeitura" itens={PARA_PREFEITURA} />
        <BannerFimGs atual="como-funciona" />
      </div>
    </Pagina>
  );
}
