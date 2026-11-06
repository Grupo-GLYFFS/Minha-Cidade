import { Link } from 'react-router-dom';
import { Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { LINKS_RODAPE } from '../dados/navegacao';
import classes from './Rodape.module.css';

// Rodapé do computador: logo, links do app, ajuda, acessibilidade e o aviso de protótipo.
export default function Rodape() {
  return (
    <footer className={classes.rodape}>
      <Container size={1200} px="xl">
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl" py="xl">
          <div>
            <img className={classes.logo} src="/img/logo.png" alt="Minha Prefeitura" />
            <Text size="sm" c="dimmed" mt="sm" maw={300}>
              Os serviços da prefeitura e as melhorias do seu bairro em um só lugar.
            </Text>
          </div>

          {LINKS_RODAPE.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo}>
              <Title order={2} size="sm" fw={700} mb="sm">
                {grupo.titulo}
              </Title>
              <Stack gap="xs" component="ul" className={classes.lista}>
                {grupo.links.map((link) => (
                  <li key={link.caminho}>
                    <Link to={link.caminho} className={classes.link}>
                      {link.rotulo}
                    </Link>
                  </li>
                ))}
              </Stack>
            </nav>
          ))}
        </SimpleGrid>

        <Group justify="space-between" py="md" className={classes.base}>
          <Text size="xs" c="dimmed">
            Protótipo acadêmico da Global Solution FIAP 2026. Não é um serviço oficial da Prefeitura
            de São Paulo.
          </Text>
          <Text size="xs" c="dimmed">
            Dados de exemplo. Nada sai do seu navegador.
          </Text>
        </Group>
      </Container>
    </footer>
  );
}
