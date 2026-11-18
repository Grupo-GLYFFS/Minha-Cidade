import { Link } from 'react-router-dom';
import { Button, Group, Text, Title, VisuallyHidden } from '@mantine/core';
import Cartao from '../Cartao';
import Etiqueta from '../Etiqueta';
import Icone from '../Icone';
import { STATUS_PROJETO } from '../../dados/statusProjeto';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { useVotos } from '../../contexto/useVotos';
import { formatarValorCurto, pluralizar } from '../../logica/formatos';
import { buscarOpcaoVoto, textoPrazoVotacao } from '../../logica/votacao';
import classes from './ProjetoEmVotacao.module.css';

// Cartão "Participe": um projeto da prefeitura com votação aberta e o botão para votar.
// Recebe o projeto (título, resumo, valor, data de encerramento e votos).
// Votar precisa de conta: o visitante vê "Entrar para votar" e, depois de entrar,
// vai direto para a página do projeto. Quem já votou vê o próprio voto e o link do resultado.
export default function ProjetoEmVotacao({ projeto }) {
  const { logado } = useSessao();
  const caminhoProjeto = `/minha-cidade/votacoes/${projeto.id}`;
  const { entrar } = useCaminhoConta(caminhoProjeto);
  const { votoDe, resultado } = useVotos();
  const status = STATUS_PROJETO.find((item) => item.id === projeto.status);
  const voto = buscarOpcaoVoto(votoDe(projeto.id));
  const { total } = resultado(projeto);

  const dados = [
    { icone: 'payments', texto: formatarValorCurto(projeto.valor) },
    { icone: 'schedule', texto: textoPrazoVotacao(projeto.fimVotacao) },
    { icone: 'how_to_vote', texto: pluralizar(total, 'voto', 'votos') },
  ];

  // Texto e destino do botão em cada caso: visitante, já votou ou ainda não votou
  let rotuloBotao = 'Ver prós e contras e votar';
  if (!logado) rotuloBotao = 'Entrar para votar';
  else if (voto) rotuloBotao = `Você votou: ${voto.rotulo} · Ver resultado`;

  return (
    <Cartao component="section" aria-labelledby="participe-titulo" className={classes.cartao}>
      <VisuallyHidden component="h2" id="participe-titulo">
        Participe
      </VisuallyHidden>

      <div>
        {status && (
          <Etiqueta texto={status.rotulo} corFundo={status.corFundo} corTexto={status.corTexto} />
        )}
        <Title order={3} fz={{ base: 18, md: 20 }} fw={700} lh={1.3} lts="-0.01em" mt="sm" mb={4}>
          {projeto.titulo}
        </Title>
        <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)">
          {projeto.resumo}
        </Text>
        <ul className={classes.dados}>
          {dados.map((dado) => (
            <Group component="li" key={dado.icone} gap={4} wrap="nowrap">
              <Icone nome={dado.icone} tamanho={18} />
              {dado.texto}
            </Group>
          ))}
        </ul>
      </div>

      <Button
        component={Link}
        to={logado ? caminhoProjeto : entrar}
        h={{ base: 48, md: 44 }}
        px="lg"
        variant={voto ? 'light' : 'filled'}
        leftSection={voto ? <Icone nome="check_circle" tamanho={20} preenchido /> : undefined}
        className={classes.botao}
      >
        {rotuloBotao}
      </Button>
    </Cartao>
  );
}
