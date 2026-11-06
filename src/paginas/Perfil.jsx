import { Button, Group, Text } from '@mantine/core';
import PaginaProvisoria from '../componentes/PaginaProvisoria';
import Icone from '../componentes/Icone';
import { useSessao } from '../contexto/useSessao';
import { useSair } from '../contexto/useSair';

// Perfil: dados da pessoa, pedidos e protocolos, acessibilidade, ajuda e "Sobre o app".
// Por enquanto mostra quem está logado e o botão "Sair da conta" (no celular é o único jeito de sair).
export default function Perfil() {
  const { usuario } = useSessao();
  const sairDaConta = useSair();

  return (
    <PaginaProvisoria
      titulo="Perfil"
      descricao="Seus dados, seus pedidos e as configurações do app."
    >
      <Group justify="space-between" gap="sm">
        <Text fw={600}>
          {usuario.nome} · {usuario.email}
        </Text>
        <Button
          variant="default"
          h={48}
          onClick={sairDaConta}
          leftSection={<Icone nome="logout" tamanho={20} />}
        >
          Sair da conta
        </Button>
      </Group>
    </PaginaProvisoria>
  );
}
