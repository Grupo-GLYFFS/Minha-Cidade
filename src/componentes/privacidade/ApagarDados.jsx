import { useState } from 'react';
import { Button, Group, Modal, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { apagarTudo } from '../../armazenamento';
import classes from './ApagarDados.module.css';

// Endereço aberto depois de apagar: a página Privacidade lê "?dados=apagados" e mostra o aviso
const CAMINHO_DEPOIS = `${import.meta.env.BASE_URL}privacidade?dados=apagados`;

// Cartão "Apagar meus dados" da página Privacidade, com um passo de confirmação numa janela.
// Ao confirmar, apaga tudo o que o app guardou neste navegador e recarrega o app:
// assim a pessoa sai da conta e nenhuma tela fica com dados antigos na memória.
export default function ApagarDados() {
  const [confirmando, setConfirmando] = useState(false);

  // Apaga os dados e abre a página de novo, já como visitante
  function apagar() {
    apagarTudo();
    window.location.replace(CAMINHO_DEPOIS);
  }

  return (
    <Cartao component="section" aria-labelledby="titulo-apagar">
      <Title order={2} id="titulo-apagar" fz={{ base: 18, md: 20 }} fw={700} mb={4}>
        Apagar meus dados
      </Title>
      <Text c="var(--cor-texto-suave)" mb="md">
        Apaga a conta criada aqui, pedidos, apoios, serviços pedidos, alertas lidos e preferências.
        Você sai da conta. Os dados de exemplo do app continuam.
      </Text>
      <Button
        variant="outline"
        color="var(--cor-erro)"
        onClick={() => setConfirmando(true)}
        className={classes.botao}
        leftSection={<Icone nome="delete" tamanho={20} />}
      >
        Apagar meus dados deste navegador
      </Button>

      <Modal
        opened={confirmando}
        onClose={() => setConfirmando(false)}
        title="Apagar seus dados?"
        centered
        radius="lg"
        closeButtonProps={{ 'aria-label': 'Fechar sem apagar' }}
      >
        <Text>
          Tudo o que você fez neste navegador será apagado e você vai sair da conta. Não dá para
          desfazer.
        </Text>
        <Group justify="flex-end" gap="sm" mt="lg">
          <Button variant="default" h={48} onClick={() => setConfirmando(false)}>
            Cancelar
          </Button>
          <Button color="var(--cor-erro)" h={48} onClick={apagar}>
            Sim, apagar tudo
          </Button>
        </Group>
      </Modal>
    </Cartao>
  );
}
