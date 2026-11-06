import { Group, Text } from '@mantine/core';
import PaginaAjuda from '../componentes/ajuda/PaginaAjuda';
import GrupoTelefones from '../componentes/ajuda/GrupoTelefones';
import Icone from '../componentes/Icone';
import { GRUPOS_TELEFONES } from '../dados/telefones';

// Telefones úteis: emergência, prefeitura, saúde e direitos, com botão de ligar em cada um.
// Aberta para todos, sem precisar de conta.
export default function TelefonesUteis() {
  return (
    <PaginaAjuda
      titulo="Telefones úteis"
      descricao="Toque no botão para ligar. Em emergência, ligue antes de abrir qualquer pedido no app."
    >
      <Group gap={8} wrap="nowrap" align="flex-start" c="var(--cor-texto-suave)">
        <Icone nome="info" tamanho={20} />
        <Text c="inherit">Todas as ligações são gratuitas, de telefone fixo ou celular.</Text>
      </Group>

      {GRUPOS_TELEFONES.map((grupo) => (
        <GrupoTelefones key={grupo.id} grupo={grupo} />
      ))}
    </PaginaAjuda>
  );
}
