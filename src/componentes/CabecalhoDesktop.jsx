import { Link, useLocation } from 'react-router-dom';
import { ActionIcon, Container, Group, Indicator, Text, TextInput } from '@mantine/core';
import Icone from './Icone';
import MenuConta from './MenuConta';
import { useSessao } from '../contexto/useSessao';
import { caminhoComVoltar } from '../logica/sessao';
import { MENU_COMPUTADOR, estaAtivo } from '../dados/navegacao';
import classes from './CabecalhoDesktop.module.css';

// Cabeçalho do computador: barra de acessibilidade, logo, menu, busca, alertas e conta.
// Recebe quantos alertas novos existem, para mostrar o contador no sino.
// Para o visitante, o sino leva a "Entrar" (os alertas são da pessoa) e não mostra contador.
export default function CabecalhoDesktop({ alertasNovos = 0 }) {
  const { pathname } = useLocation();
  const { logado } = useSessao();
  const novos = logado ? alertasNovos : 0;

  return (
    <header>
      {/* Barra fina com a cidade e os controles de acessibilidade */}
      <div className={classes.util}>
        <Container size={1200} px="xl">
          <Group justify="space-between" h={40}>
            <Text size="sm" c="dimmed">
              São Paulo, SP
            </Text>
            <Group gap="sm" role="group" aria-label="Acessibilidade">
              <Text size="sm" c="dimmed">
                Acessibilidade
              </Text>
              {/* TODO: ligar os botões ao tamanho da letra e ao alto contraste */}
              <button
                type="button"
                className={classes.a11y}
                aria-label="Diminuir o tamanho da letra"
              >
                A−
              </button>
              <button type="button" className={classes.a11y} aria-label="Tamanho padrão da letra">
                A
              </button>
              <button
                type="button"
                className={classes.a11y}
                aria-label="Aumentar o tamanho da letra"
              >
                A+
              </button>
              <button type="button" className={classes.a11y} aria-pressed="false">
                <Icone nome="contrast" tamanho={18} />
                Alto contraste
              </button>
            </Group>
          </Group>
        </Container>
      </div>

      <div className={classes.topo}>
        <Container size={1200} px="xl">
          <Group h={72} gap="lg" wrap="nowrap">
            <Link to="/">
              <img
                className={classes.logo}
                src="/img/logo.png"
                alt="Minha Prefeitura, ir para o início"
              />
            </Link>

            <nav aria-label="Menu principal" className={classes.nav}>
              <ul className={classes.lista}>
                {MENU_COMPUTADOR.map((item) => {
                  const ativo = estaAtivo(item, pathname);
                  return (
                    <li key={item.caminho}>
                      <Link
                        to={item.caminho}
                        className={classes.link}
                        aria-current={ativo ? 'page' : undefined}
                      >
                        {item.rotulo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Group gap="sm" wrap="nowrap">
              <form role="search" action="/busca">
                <TextInput
                  name="q"
                  w={210}
                  placeholder="Buscar serviço"
                  aria-label="Buscar serviço"
                  leftSection={<Icone nome="search" tamanho={20} />}
                />
              </form>

              <Indicator label={novos} size={18} color="red" disabled={novos === 0}>
                <ActionIcon
                  component={Link}
                  to={logado ? '/alertas' : caminhoComVoltar('/entrar', '/alertas')}
                  variant="default"
                  size={44}
                  aria-label={logado ? `Alertas, ${novos} novos` : 'Entrar para ver os alertas'}
                >
                  <Icone nome="notifications" />
                </ActionIcon>
              </Indicator>

              <MenuConta />
            </Group>
          </Group>
        </Container>
      </div>
    </header>
  );
}
