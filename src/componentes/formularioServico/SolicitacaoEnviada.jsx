import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { caminhoServico } from '../../logica/servicos';
import { proximosPassos } from '../../logica/solicitacoes';
import classes from './SolicitacaoEnviada.module.css';

// Tela de sucesso depois de enviar a solicitação: protocolo em destaque, o prazo,
// os próximos passos do serviço e os caminhos de volta.
// O foco vai para o título assim que a tela aparece. Recebe o serviço e a solicitação criada.
export default function SolicitacaoEnviada({ servico, solicitacao }) {
  const tituloRef = useRef(null);
  const passos = proximosPassos(servico);

  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  return (
    <Cartao component="section" aria-labelledby="enviada-titulo" className={classes.tela}>
      <Stack gap="lg">
        <Stack gap="sm" align="center" ta="center">
          <span className={classes.icone}>
            <Icone nome="check" tamanho={28} />
          </span>
          <Title
            order={2}
            id="enviada-titulo"
            ref={tituloRef}
            tabIndex={-1}
            fz={{ base: 26, md: 28 }}
            lh={1.15}
            className={classes.titulo}
          >
            Solicitação enviada
          </Title>
          <Text c="var(--cor-texto-suave)" maw={480}>
            A prefeitura recebeu o seu pedido de “{servico.nome}”. Guarde o número do protocolo para
            acompanhar.
          </Text>
        </Stack>

        <div className={classes.protocolo}>
          <Text fz="sm" fw={600} c="var(--cor-texto-suave)">
            Número do protocolo
          </Text>
          <Text fz={{ base: 26, md: 34 }} fw={800} lts="0.02em" className={classes.numero}>
            {solicitacao.protocolo}
          </Text>
          <Text fz="sm" c="var(--cor-texto-suave)">
            Status agora: <strong>Recebida</strong>
          </Text>
        </div>

        <div>
          <Title order={3} fz={18} fw={700}>
            O que acontece agora
          </Title>
          <Text fz="sm" mt="xs">
            <strong>Prazo:</strong> {solicitacao.prazo}
          </Text>
          {passos.length > 0 && (
            <ol className={classes.passos}>
              {passos.map((passo, posicao) => (
                <li key={passo} className={classes.passo}>
                  <span className={classes.numeroPasso} aria-hidden="true">
                    {posicao + 1}
                  </span>
                  <Text fz="sm">{passo}</Text>
                </li>
              ))}
            </ol>
          )}
        </div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
          <Button
            component={Link}
            to={caminhoServico(servico)}
            size="md"
            leftSection={<Icone nome="description" tamanho={20} />}
          >
            Ver o serviço
          </Button>
          <Button component={Link} to="/servicos" size="md" variant="default">
            Voltar aos serviços
          </Button>
        </SimpleGrid>
      </Stack>
    </Cartao>
  );
}
