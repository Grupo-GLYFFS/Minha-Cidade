import { Link } from 'react-router-dom';
import { Box, Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Etiqueta from '../Etiqueta';
import Icone from '../Icone';
import BarraResultado from './BarraResultado';
import { useVotos } from '../../contexto/useVotos';
import { formatarValorCurto } from '../../logica/formatos';
import {
  buscarOpcaoVoto,
  buscarStatusProjeto,
  descreverSituacao,
  frasePlacar,
  textoPrazoVotacao,
  votacaoAberta,
} from '../../logica/votacao';
import clicavel from './cartaoClicavel.module.css';
import classes from './CartaoProjeto.module.css';

// Cartão de um grande projeto: tema, status, título, região e valor.
// Votação aberta: mostra quanto falta para encerrar e, se a pessoa já votou, o voto e o resultado.
// Votação encerrada: mostra quem venceu, a situação (ex.: "Encaminhado à Câmara") e o resultado.
// Recebe o projeto e o nível do título (3 por padrão). O cartão inteiro leva ao projeto.
export default function CartaoProjeto({ projeto, nivelTitulo = 3 }) {
  const { votoDe, resultado } = useVotos();
  const aberta = votacaoAberta(projeto);
  const status = buscarStatusProjeto(aberta ? 'votacao-aberta' : 'encerrada');
  const voto = votoDe(projeto.id);
  const opcaoVoto = buscarOpcaoVoto(voto);
  const placar = resultado(projeto);
  const situacao = descreverSituacao(projeto);
  // A barra de resultado só aparece depois do voto ou quando a votação acabou
  const mostrarResultado = !aberta || Boolean(voto);

  return (
    <Cartao component="article" className={clicavel.clicavel}>
      <Group justify="space-between" gap="sm" mb="sm">
        <span className={classes.tema}>
          <Icone nome={projeto.icone} tamanho={18} />
          {projeto.tema}
        </span>
        <Etiqueta texto={status.rotulo} corFundo={status.corFundo} corTexto={status.corTexto} />
      </Group>

      <Title order={nivelTitulo} fz={{ base: 16, md: 17 }} fw={700} lh={1.3}>
        <Link to={`/minha-cidade/votacoes/${projeto.id}`} className={clicavel.linkEsticado}>
          {projeto.titulo}
        </Link>
      </Title>

      <ul className={classes.dados}>
        <Group component="li" gap={4} wrap="nowrap">
          <Icone nome="location_on" tamanho={18} />
          {projeto.regiao}
        </Group>
        <Group component="li" gap={4} wrap="nowrap">
          <Icone nome="payments" tamanho={18} />
          {formatarValorCurto(projeto.valor)}
        </Group>
      </ul>

      <div className={classes.rodape}>
        {aberta ? (
          <Group justify="space-between" gap="sm">
            <Group gap={4} wrap="nowrap" fz={14} fw={600}>
              <Icone nome="schedule" tamanho={18} />
              {textoPrazoVotacao(projeto.fimVotacao)}
            </Group>
            {opcaoVoto && (
              <Group gap={4} wrap="nowrap" fz={14} fw={700} c="var(--cor-link)">
                <Icone nome="check_circle" tamanho={18} preenchido />
                Seu voto: {opcaoVoto.rotulo}
              </Group>
            )}
          </Group>
        ) : (
          <>
            <Text fz={14} fw={700}>
              {frasePlacar(placar)}
            </Text>
            {situacao && (
              <Group gap={4} wrap="nowrap" fz={13} c="var(--cor-texto-suave)" mt={4}>
                <Icone nome={situacao.icone} tamanho={18} />
                {situacao.frase}
              </Group>
            )}
          </>
        )}
        {mostrarResultado && (
          <Box mt="sm">
            <BarraResultado resultado={placar} voto={voto} />
          </Box>
        )}
      </div>
    </Cartao>
  );
}
