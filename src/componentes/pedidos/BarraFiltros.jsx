import { SimpleGrid } from '@mantine/core';
import Cartao from '../Cartao';
import CampoBusca from './CampoBusca';
import CampoOrdem from './CampoOrdem';
import CamposFiltro from './CamposFiltro';
import SeletorVisao from './SeletorVisao';
import classes from './BarraFiltros.module.css';

// Barra de filtros do computador: busca, ordem e visão em cima; região, bairro,
// categoria e status embaixo. Tudo muda a lista na hora, sem botão de aplicar.
// Recebe os filtros, as funções aoMudar(nome, valor), as opções de bairro,
// a visão atual e a função aoMudarVisao(visao).
export default function BarraFiltros({ filtros, aoMudar, opcoesBairro, visao, aoMudarVisao }) {
  return (
    <Cartao
      component="form"
      role="search"
      aria-label="Filtrar pedidos"
      onSubmit={(evento) => evento.preventDefault()}
    >
      <div className={classes.linha}>
        <div className={classes.busca}>
          <CampoBusca valor={filtros.busca} aoMudar={(texto) => aoMudar('busca', texto)} />
        </div>
        <div className={classes.ordem}>
          <CampoOrdem valor={filtros.ordem} aoMudar={(ordem) => aoMudar('ordem', ordem)} />
        </div>
        <SeletorVisao valor={visao} aoMudar={aoMudarVisao} />
      </div>

      <SimpleGrid cols={4} spacing="md" mt="md">
        <CamposFiltro filtros={filtros} aoMudar={aoMudar} opcoesBairro={opcoesBairro} />
      </SimpleGrid>
    </Cartao>
  );
}
