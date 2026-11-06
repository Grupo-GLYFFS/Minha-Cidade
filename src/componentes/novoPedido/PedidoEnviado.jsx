import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import EtiquetaStatus from '../EtiquetaStatus';
import Icone from '../Icone';
import AvisoEmAnalise from './AvisoEmAnalise';
import classes from './PedidoEnviado.module.css';

// O que acontece depois do envio, em três passos curtos
const PROXIMOS_PASSOS = [
  { titulo: 'Análise', texto: 'A equipe confere o local e o tipo de problema.' },
  { titulo: 'Aprovação', texto: 'A prefeitura define a prioridade e quem vai fazer o serviço.' },
  { titulo: 'Execução', texto: 'A equipe faz o conserto e você avalia o resultado.' },
];

// Tela de sucesso depois de enviar o pedido: protocolo em destaque, status ao vivo,
// próximos passos e os caminhos para acompanhar ou voltar à lista.
// O foco vai para o título assim que a tela aparece. Recebe o pedido recém-criado.
export default function PedidoEnviado({ pedido }) {
  const tituloRef = useRef(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  return (
    <Cartao component="section" aria-labelledby="enviado-titulo" className={classes.tela}>
      <Stack gap="lg">
        <Stack gap="sm" align="center" ta="center">
          <span className={classes.icone}>
            <Icone nome="check" tamanho={28} />
          </span>
          <Title
            order={1}
            id="enviado-titulo"
            ref={tituloRef}
            tabIndex={-1}
            fz={{ base: 28, md: 32 }}
            lh={1.15}
            className={classes.titulo}
          >
            Pedido enviado
          </Title>
          <Text c="var(--cor-texto-suave)" maw={480}>
            A prefeitura recebeu o seu pedido “{pedido.titulo}”. Guarde o número do protocolo para
            acompanhar.
          </Text>
        </Stack>

        <div className={classes.protocolo}>
          <Text fz="sm" fw={600} c="var(--cor-texto-suave)">
            Número do protocolo
          </Text>
          <Text fz={{ base: 28, md: 36 }} fw={800} lts="0.02em" className={classes.numero}>
            {pedido.protocolo}
          </Text>
          <Group gap="sm" justify="center">
            <Text component="span" fz="sm" c="var(--cor-texto-suave)">
              Status agora:
            </Text>
            <EtiquetaStatus status={pedido.status} />
          </Group>
        </div>

        <AvisoEmAnalise pedido={pedido} />

        <div>
          <Title order={2} fz={18} fw={700}>
            O que acontece agora
          </Title>
          <ol className={classes.passos}>
            {PROXIMOS_PASSOS.map((passo, posicao) => (
              <li key={passo.titulo} className={classes.passo}>
                <span className={classes.numeroPasso} aria-hidden="true">
                  {posicao + 1}
                </span>
                <Text fz="sm">
                  <strong>{passo.titulo}:</strong> {passo.texto}
                </Text>
              </li>
            ))}
          </ol>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
          <Button
            component={Link}
            to={`/pedidos/${pedido.id}`}
            size="md"
            leftSection={<Icone nome="visibility" tamanho={20} />}
          >
            Acompanhar pedido
          </Button>
          <Button component={Link} to="/pedidos" size="md" variant="default">
            Voltar para pedidos
          </Button>
        </SimpleGrid>
      </Stack>
    </Cartao>
  );
}
