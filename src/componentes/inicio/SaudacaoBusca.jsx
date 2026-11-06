import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Group, Input, Text, Title, VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import { montarCaminhoBusca } from '../../logica/busca';
import classes from './SaudacaoBusca.module.css';

// Topo da página inicial: "Olá, Maria", o bairro da pessoa e o campo de busca.
// No computador o campo é de verdade; no celular é um link que abre a tela de Busca.
// Recebe a pessoa usando o app.
export default function SaudacaoBusca({ usuario }) {
  const [texto, setTexto] = useState('');
  const navigate = useNavigate();

  // Vai para a página de busca sem recarregar o app
  function buscar(evento) {
    evento.preventDefault();
    navigate(montarCaminhoBusca(texto));
  }

  return (
    <section aria-labelledby="ola-titulo">
      <Title order={1} id="ola-titulo" fz={{ base: 30, md: 32 }} lh={1.15} lts="-0.02em">
        Olá, {usuario.primeiroNome}
      </Title>
      <Group gap={4} mt={4} c="var(--cor-texto-suave)">
        <Icone nome="location_on" tamanho={18} />
        <Text fz={{ base: 14, md: 15 }} fw={500} c="inherit">
          {usuario.bairro}, {usuario.cidade}
        </Text>
      </Group>

      <Box
        component="form"
        role="search"
        visibleFrom="md"
        className={classes.campo}
        onSubmit={buscar}
      >
        <Icone nome="search" />
        <VisuallyHidden component="label" htmlFor="busca-inicio">
          O que você precisa?
        </VisuallyHidden>
        <Input
          id="busca-inicio"
          type="search"
          variant="unstyled"
          size="md"
          className={classes.entradaCaixa}
          classNames={{ input: classes.entrada }}
          placeholder="O que você precisa? Ex.: IPTU, vacina, poda de árvore"
          value={texto}
          onChange={(evento) => setTexto(evento.currentTarget.value)}
        />
        <Button type="submit" h={44} px="lg" radius="sm">
          Buscar
        </Button>
      </Box>

      <Box component={Link} to="/busca" hiddenFrom="md" className={classes.campoLink}>
        <Icone nome="search" />O que você precisa?
        <VisuallyHidden> Abrir a busca</VisuallyHidden>
      </Box>
    </section>
  );
}
