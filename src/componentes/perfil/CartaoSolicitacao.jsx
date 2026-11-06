import { Link } from 'react-router-dom';
import { Anchor, Button, Collapse, Group, Text, Title, VisuallyHidden } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Cartao from '../Cartao';
import Etiqueta from '../Etiqueta';
import Icone from '../Icone';
import { buscarStatusSolicitacao } from '../../logica/solicitacoes';
import { formatarDataExtenso } from '../../logica/datas';
import classes from './CartaoSolicitacao.module.css';

// Cartão de uma solicitação de serviço: status, protocolo, nome do serviço, data de envio,
// prazo e as respostas enviadas (escondidas até a pessoa abrir "Ver respostas").
// Recebe a solicitação e o nível do título (2 por padrão).
export default function CartaoSolicitacao({ solicitacao, nivelTitulo = 2 }) {
  const [aberto, { toggle: alternar }] = useDisclosure(false);
  const status = buscarStatusSolicitacao(solicitacao.status);
  const idRespostas = `respostas-${solicitacao.id}`;

  return (
    <Cartao component="article">
      <Group justify="space-between" gap="sm" wrap="nowrap" mb="sm">
        <Etiqueta texto={status.rotulo} corFundo={status.corFundo} corTexto={status.corTexto} />
        <Text fz={{ base: 12, md: 13 }} c="var(--cor-texto-suave)">
          Protocolo {solicitacao.protocolo}
        </Text>
      </Group>

      <Title order={nivelTitulo} fz={{ base: 16, md: 17 }} fw={700} lh={1.3}>
        {solicitacao.nomeServico}
      </Title>
      <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
        Enviado em {formatarDataExtenso(solicitacao.criadoEm)}
      </Text>
      {solicitacao.prazo && (
        <Group gap={4} wrap="nowrap" align="flex-start" mt="sm" c="var(--cor-texto-suave)">
          <Icone nome="schedule" tamanho={18} />
          <Text fz={14} c="inherit">
            <strong>Prazo:</strong> {solicitacao.prazo}
          </Text>
        </Group>
      )}

      <Group justify="space-between" gap="sm" mt="sm" pt="sm" className={classes.rodape}>
        <Button
          variant="subtle"
          h={44}
          px="sm"
          onClick={alternar}
          aria-expanded={aberto}
          aria-controls={idRespostas}
          rightSection={<Icone nome={aberto ? 'expand_less' : 'expand_more'} tamanho={20} />}
        >
          {aberto ? 'Esconder respostas' : 'Ver respostas'}
        </Button>
        <Anchor
          component={Link}
          to={`/servicos/${solicitacao.idServico}`}
          fz={14}
          fw={600}
          c="var(--cor-link)"
          className={classes.link}
        >
          Ver o serviço
          <VisuallyHidden> {solicitacao.nomeServico}</VisuallyHidden>
        </Anchor>
      </Group>

      <Collapse expanded={aberto} id={idRespostas}>
        {solicitacao.respostas.length === 0 ? (
          <Text fz={14} c="var(--cor-texto-suave)" pt="sm">
            Este serviço não pediu outras informações.
          </Text>
        ) : (
          <dl className={classes.respostas}>
            {solicitacao.respostas.map((resposta) => (
              <div key={resposta.nome} className={classes.resposta}>
                <dt className={classes.rotulo}>{resposta.rotulo}</dt>
                <dd className={classes.valor}>{resposta.valor}</dd>
              </div>
            ))}
          </dl>
        )}
      </Collapse>
    </Cartao>
  );
}
