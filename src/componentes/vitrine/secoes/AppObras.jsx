import { useState } from 'react';
import { Group, SimpleGrid } from '@mantine/core';
import Vitrine from '../Vitrine';
import CartaoObra from '../../cidadeAberta/CartaoObra';
import EtiquetaSituacaoObra from '../../cidadeAberta/EtiquetaSituacaoObra';
import FiltrosObras from '../../cidadeAberta/FiltrosObras';
import ResumoObras from '../../cidadeAberta/ResumoObras';
import { OBRAS } from '../../../dados/obras';
import { SITUACOES_OBRA } from '../../../dados/situacaoObra';
import { TODAS_SITUACOES } from '../../../logica/obras';
import { umDeCada } from '../../../logica/vitrine';

// Uma obra de cada situação (no prazo, atrasada, parada, concluída)
const OBRAS_EXEMPLO = umDeCada(
  OBRAS,
  'situacao',
  SITUACOES_OBRA.map((situacao) => situacao.id),
);

// Obras da Cidade: etiqueta de situação, cartão de cada situação, resumo e filtros.
export default function AppObras() {
  const [filtros, setFiltros] = useState({ regiao: '', situacao: TODAS_SITUACOES });

  return (
    <>
      <Vitrine
        nome="EtiquetaSituacaoObra"
        arquivo="src/componentes/cidadeAberta/EtiquetaSituacaoObra.jsx"
        props="situacao (ícone + texto + cor)"
        fundo="branco"
      >
        <Group gap="sm">
          {SITUACOES_OBRA.map((situacao) => (
            <EtiquetaSituacaoObra key={situacao.id} situacao={situacao.id} />
          ))}
        </Group>
      </Vitrine>

      <Vitrine
        nome="CartaoObra"
        arquivo="src/componentes/cidadeAberta/CartaoObra.jsx"
        props="obra · nivelTitulo={4} (uma de cada situação; atrasada e parada mostram o motivo)"
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {OBRAS_EXEMPLO.map((obra) => (
            <CartaoObra key={obra.id} obra={obra} nivelTitulo={4} />
          ))}
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="ResumoObras"
        arquivo="src/componentes/cidadeAberta/ResumoObras.jsx"
        props="obras"
      >
        <ResumoObras obras={OBRAS} />
      </Vitrine>

      <Vitrine
        nome="FiltrosObras"
        arquivo="src/componentes/cidadeAberta/FiltrosObras.jsx"
        props="filtros { regiao, situacao } · aoMudar (estado só desta caixa)"
      >
        <FiltrosObras
          filtros={filtros}
          aoMudar={(nome, valor) => setFiltros((atual) => ({ ...atual, [nome]: valor }))}
        />
      </Vitrine>
    </>
  );
}
