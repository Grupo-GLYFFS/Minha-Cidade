import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Stack, Title, VisuallyHidden } from '@mantine/core';
import CardPedido from '../CardPedido';
import BarraFiltros from './BarraFiltros';
import FiltrosCelular from './FiltrosCelular';
import ResultadoFiltros from './ResultadoFiltros';
import SemResultados from './SemResultados';
import { usePedidos } from '../../contexto/usePedidos';
import { lerDado, salvarDado } from '../../armazenamento';
import {
  atualizarFiltro,
  escreverFiltros,
  filtrarPedidos,
  lerFiltros,
  limparFiltros,
  opcoesDeBairro,
  ordenarPedidos,
  temFiltroAtivo,
} from '../../logica/filtrosPedidos';
import classes from './ListaPedidos.module.css';

const CHAVE_VISAO = 'visao-pedidos';

// Lista de pedidos com busca, filtros, ordem e troca entre grade e lista.
// Os filtros ficam no endereço da página (?regiao=Centro...), então voltar ou recarregar
// mantém a mesma lista. Usada nas páginas Pedidos e Cidade.
export default function ListaPedidos() {
  const { pedidos } = usePedidos();
  const [parametros, setParametros] = useSearchParams();
  const [visao, setVisao] = useState(() =>
    // Qualquer valor salvo diferente de "lista" volta para a grade
    lerDado(CHAVE_VISAO, 'grade') === 'lista' ? 'lista' : 'grade',
  );

  const filtros = lerFiltros(parametros);
  const resultado = ordenarPedidos(filtrarPedidos(pedidos, filtros), filtros.ordem);
  const opcoesBairro = opcoesDeBairro(pedidos, filtros.regiao);

  // Grava os filtros no endereço. Enquanto a pessoa digita, troca o endereço atual
  // em vez de criar um passo novo no "voltar" para cada letra.
  function gravarFiltros(novos, substituir = false) {
    setParametros(escreverFiltros(parametros, novos), { replace: substituir });
  }

  function mudarFiltro(nome, valor) {
    gravarFiltros(atualizarFiltro(filtros, nome, valor), nome === 'busca');
  }

  function limpar() {
    gravarFiltros(limparFiltros(filtros));
  }

  // A visão escolhida fica salva para a próxima visita
  function mudarVisao(novaVisao) {
    setVisao(novaVisao);
    salvarDado(CHAVE_VISAO, novaVisao);
  }

  return (
    <Stack gap="md">
      <Box visibleFrom="md">
        <BarraFiltros
          filtros={filtros}
          aoMudar={mudarFiltro}
          opcoesBairro={opcoesBairro}
          visao={visao}
          aoMudarVisao={mudarVisao}
        />
      </Box>
      <Box hiddenFrom="md">
        <FiltrosCelular
          filtros={filtros}
          aoMudar={mudarFiltro}
          opcoesBairro={opcoesBairro}
          total={resultado.length}
          aoLimpar={limpar}
        />
      </Box>

      <ResultadoFiltros
        total={resultado.length}
        temFiltro={temFiltroAtivo(filtros)}
        aoLimpar={limpar}
      />

      <section aria-labelledby="lista-pedidos-titulo">
        <VisuallyHidden>
          <Title order={2} id="lista-pedidos-titulo">
            Lista de pedidos
          </Title>
        </VisuallyHidden>

        {resultado.length > 0 ? (
          <ul className={classes.lista} data-visao={visao}>
            {resultado.map((pedido) => (
              <li key={pedido.id}>
                <CardPedido pedido={pedido} />
              </li>
            ))}
          </ul>
        ) : (
          <SemResultados aoLimpar={limpar} />
        )}
      </section>
    </Stack>
  );
}
