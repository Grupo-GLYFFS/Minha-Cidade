import { TextInput } from '@mantine/core';
import Icone from '../Icone';

// Campo de busca por texto nos pedidos (título, descrição e rua).
// Recebe o texto atual e a função aoMudar(texto).
export default function CampoBusca({ valor, aoMudar }) {
  return (
    <TextInput
      type="search"
      label="Buscar pedido"
      placeholder="Ex.: buraco, poste, Rua Vergueiro"
      leftSection={<Icone nome="search" tamanho={20} />}
      value={valor}
      onChange={(evento) => aoMudar(evento.currentTarget.value)}
    />
  );
}
