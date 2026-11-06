import { Link } from 'react-router-dom';
import { Box, Button, Group, Progress, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import TextoResponsivo from '../TextoResponsivo';
import { ODS_ATENDIDOS } from '../../dados/ods';
import { AGENDAMENTO_ONLINE, AGENDAMENTO_ONLINE_GERAL } from '../../dados/pesquisaTic';
import classes from './PorQueExiste.module.css';

const LINKS_SOBRE = [
  { rotulo: 'Como funciona', caminho: '/como-funciona' },
  { rotulo: 'Impacto', caminho: '/impacto' },
  { rotulo: 'Equipe', caminho: '/equipe' },
];

// Explica o problema que o app resolve, com dados da pesquisa TIC Governo Eletrônico e os ODS.
// No computador fica em duas colunas (texto e dados); no celular os blocos ficam empilhados.
export default function PorQueExiste() {
  return (
    <Cartao component="section" aria-labelledby="porque-titulo" className={classes.cartao}>
      <div className={classes.texto}>
        <Title
          order={2}
          id="porque-titulo"
          fz={{ base: 20, md: 24 }}
          fw={800}
          lh={1.25}
          lts="-0.02em"
          mb="sm"
        >
          Por que o Minha Prefeitura existe
        </Title>
        <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)" mb="sm" maw={520}>
          Muita gente não sabe a qual setor da prefeitura recorrer, e as reclamações feitas em
          grupos de WhatsApp nunca chegam a quem resolve.
        </Text>
        <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)" maw={520}>
          <TextoResponsivo
            curto="Nas cidades pequenas é pior: quase nada pode ser feito pela internet."
            longo="Nas cidades pequenas é pior: quase nada pode ser feito pela internet. O Minha Prefeitura funciona para qualquer prefeitura e coloca todos os serviços e a participação da população em um só lugar."
          />
        </Text>
      </div>

      <div className={classes.dado}>
        <p className={classes.numeroGrande}>{AGENDAMENTO_ONLINE_GERAL}%</p>
        <Text fz={15} fw={600} mt="sm" maw={420}>
          das prefeituras com site permitem agendar um atendimento pela internet.
        </Text>

        {AGENDAMENTO_ONLINE.map((item) => (
          <Box key={item.id} mt="sm">
            <Group justify="space-between" gap="sm" wrap="nowrap" mb={4}>
              <Text fz={{ base: 13, md: 14 }}>{item.rotulo}</Text>
              <Text fz={{ base: 13, md: 14 }} fw={700}>
                {item.porcentagem}%
              </Text>
            </Group>
            {/* A barra é só visual: a porcentagem já está escrita ao lado do rótulo */}
            <Progress
              value={item.porcentagem}
              color={item.destaque ? 'var(--cor-contador)' : 'azul'}
              size={12}
              radius="xl"
              aria-hidden="true"
            />
          </Box>
        ))}

        <Text fz={{ base: 12, md: 13 }} c="var(--cor-texto-suave)" mt="md">
          Fonte: TIC Governo Eletrônico 2023, Cetic.br/NIC.br.
        </Text>
      </div>

      <ul className={classes.ods} aria-label="Objetivos de Desenvolvimento Sustentável atendidos">
        {ODS_ATENDIDOS.map((ods) => (
          <Group component="li" key={ods.numero} gap="sm" wrap="nowrap" fz={14}>
            <Box component="span" bg={ods.cor} className={classes.odsNumero}>
              {ods.numero}
            </Box>
            {ods.nome}
          </Group>
        ))}
      </ul>

      <div className={classes.links}>
        {LINKS_SOBRE.map((link) => (
          <Button
            key={link.caminho}
            component={Link}
            to={link.caminho}
            variant="light"
            h={44}
            className={classes.botao}
          >
            {link.rotulo}
          </Button>
        ))}
      </div>
    </Cartao>
  );
}
