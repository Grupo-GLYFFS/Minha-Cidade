import { Link } from 'react-router-dom';
import { Avatar, Button, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import Icone from './Icone';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { useSair } from '../contexto/useSair';
import classes from './CabecalhoDesktop.module.css';

// Canto direito do cabeçalho do computador.
// Visitante: botões "Entrar" e "Criar conta" (voltam para a página atual depois).
// Logado: botão com avatar e primeiro nome que abre o menu "Meu perfil", "Meus pedidos" e "Sair".
export default function MenuConta() {
  const { usuario } = useSessao();
  const caminhos = useCaminhoConta();
  const sairDaConta = useSair();

  if (!usuario) {
    return (
      <Group gap="sm" wrap="nowrap">
        <Button component={Link} to={caminhos.entrar} variant="default" h={44} px="md">
          Entrar
        </Button>
        <Button component={Link} to={caminhos.criarConta} h={44} px="md">
          Criar conta
        </Button>
      </Group>
    );
  }

  return (
    <Menu position="bottom-end" width={220} radius="md" shadow="md">
      <Menu.Target>
        <UnstyledButton className={classes.perfil} aria-label={`Menu da conta de ${usuario.nome}`}>
          <Avatar color="azul" variant="filled" radius="sm" size={34}>
            {usuario.iniciais}
          </Avatar>
          <Text fw={600}>{usuario.primeiroNome}</Text>
          <Icone nome="expand_more" tamanho={20} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{usuario.nome}</Menu.Label>
        <Menu.Item
          component={Link}
          to="/perfil"
          className={classes.itemMenu}
          leftSection={<Icone nome="person" tamanho={20} />}
        >
          Meu perfil
        </Menu.Item>
        <Menu.Item
          component={Link}
          to="/perfil/pedidos"
          className={classes.itemMenu}
          leftSection={<Icone nome="list_alt" tamanho={20} />}
        >
          Meus pedidos
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={sairDaConta}
          className={classes.itemMenu}
          leftSection={<Icone nome="logout" tamanho={20} />}
        >
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
