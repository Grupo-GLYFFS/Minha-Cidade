import { Select } from '@mantine/core';
import { ORDENS_PEDIDOS } from '../../logica/filtrosPedidos';

// Escolha da ordem da lista: mais prioritários, mais apoiados ou mais recentes.
// Recebe a ordem atual e a função aoMudar(ordem).
export default function CampoOrdem({ valor, aoMudar }) {
  return (
    <Select
      label="Ordenar por"
      data={ORDENS_PEDIDOS}
      value={valor}
      allowDeselect={false}
      checkIconPosition="right"
      onChange={(ordem) => ordem && aoMudar(ordem)}
    />
  );
}
