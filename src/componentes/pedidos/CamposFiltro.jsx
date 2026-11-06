import { Select } from '@mantine/core';
import { REGIOES } from '../../dados/regioes';
import { CATEGORIAS_PEDIDO } from '../../dados/categoriasPedido';
import { STATUS_PEDIDO } from '../../dados/statusPedido';
import { STATUS_EM_ANDAMENTO } from '../../logica/filtrosPedidos';

const OPCOES_REGIAO = REGIOES.map((regiao) => regiao.nome);
const OPCOES_CATEGORIA = CATEGORIAS_PEDIDO.map((c) => ({ value: c.id, label: c.rotulo }));
// "Em andamento" junta todos os status abertos em uma opção só
const OPCOES_STATUS = [
  { value: STATUS_EM_ANDAMENTO, label: 'Em andamento (todos os abertos)' },
  ...STATUS_PEDIDO.map((s) => ({ value: s.id, label: s.rotulo })),
];

// Os quatro filtros de escolha: região, bairro, categoria e status.
// Recebe os filtros atuais, a função aoMudar(nome, valor) e as opções de bairro
// (que dependem da região escolhida). Cada campo tem rótulo visível e pode ser limpo.
export default function CamposFiltro({ filtros, aoMudar, opcoesBairro }) {
  // Propriedades iguais nos quatro campos
  const comuns = {
    clearable: true,
    allowDeselect: true,
    checkIconPosition: 'right',
    clearButtonProps: { 'aria-label': 'Limpar este filtro' },
  };

  return (
    <>
      <Select
        {...comuns}
        label="Região"
        placeholder="Todas as regiões"
        data={OPCOES_REGIAO}
        value={filtros.regiao || null}
        onChange={(valor) => aoMudar('regiao', valor)}
      />
      <Select
        {...comuns}
        label="Bairro"
        placeholder="Todos os bairros"
        searchable
        nothingFoundMessage="Nenhum bairro com esse nome"
        data={opcoesBairro}
        value={filtros.bairro || null}
        onChange={(valor) => aoMudar('bairro', valor)}
      />
      <Select
        {...comuns}
        label="Categoria"
        placeholder="Todas as categorias"
        data={OPCOES_CATEGORIA}
        value={filtros.categoria || null}
        onChange={(valor) => aoMudar('categoria', valor)}
      />
      <Select
        {...comuns}
        label="Status"
        placeholder="Todos os status"
        data={OPCOES_STATUS}
        value={filtros.status || null}
        onChange={(valor) => aoMudar('status', valor)}
      />
    </>
  );
}
