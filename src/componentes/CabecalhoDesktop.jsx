import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ActionIcon, Container, Group, Indicator, TextInput } from '@mantine/core';
import Icone from './Icone';
import MenuConta from './MenuConta';
import BarraAcessibilidade from './BarraAcessibilidade';
import { useSessao } from '../contexto/useSessao';
import { caminhoComVoltar } from '../logica/sessao';
import { montarCaminhoBusca } from '../logica/busca';
import { pluralizar } from '../logica/formatos';
import { MENU_COMPUTADOR, estaAtivo } from '../dados/navegacao';
import classes from './CabecalhoDesktop.module.css';

// Cabeçalho do computador: barra de acessibilidade, logo, menu, busca, alertas e conta.
// Recebe quantos alertas novos existem, para mostrar o contador no sino.
// Para o visitante, o sino leva a "Entrar" (os alertas são da pessoa) e não mostra contador.
export default function CabecalhoDesktop({ alertasNovos = 0 }) {
  const { pathname } = useLocation();
  const { logado } = useSessao();
  const novos = logado ? alertasNovos : 0;
  // Nome do sino para o leitor de tela: diz quantos alertas são novos (ou que é preciso entrar)
  let rotuloSino = 'Entrar para ver os alertas';
  if (logado) rotuloSino = novos > 0 ? `Alertas, ${pluralizar(novos, 'novo', 'novos')}` : 'Alertas';
  const [texto, setTexto] = useState('');
  const navigate = useNavigate();

  // Vai para a página de busca sem recarregar o app
  function buscar(evento) {
    evento.preventDefault();
    navigate(montarCaminhoBusca(texto));
  }

  return (
    <header>
      <BarraAcessibilidade />

      <div className={classes.topo}>
        <Container size={1200} px="xl">
          <Group mih={72} gap="lg" wrap="nowrap" className={classes.linha}>
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

            <Group gap="sm" wrap="nowrap" className={classes.acoes}>
              <form role="search" action="/busca" onSubmit={buscar}>
                <TextInput
                  name="q"
                  type="search"
                  value={texto}
                  onChange={(evento) => setTexto(evento.currentTarget.value)}
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
                  aria-label={rotuloSino}
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
