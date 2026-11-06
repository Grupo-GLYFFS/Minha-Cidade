import { Link } from 'react-router-dom';
import { Button, Group, Text, Title, VisuallyHidden } from '@mantine/core';
import Cartao from '../Cartao';
import Etiqueta from '../Etiqueta';
import Icone from '../Icone';
import { STATUS_PROJETO } from '../../dados/statusProjeto';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { diasAte } from '../../logica/datas';
import { formatarNumero, formatarValorCurto, pluralizar } from '../../logica/formatos';
import classes from './ProjetoEmVotacao.module.css';

// Cartão "Participe": um projeto da prefeitura com votação aberta e o botão para votar.
// Recebe o projeto (título, resumo, valor, data de encerramento e votos).
// Votar precisa de conta: o visitante vê "Entrar para votar" e volta para cá depois de entrar.
export default function ProjetoEmVotacao({ projeto }) {
  const { logado } = useSessao();
  const { entrar } = useCaminhoConta();
  const status = STATUS_PROJETO.find((item) => item.id === projeto.status);
  const diasRestantes = diasAte(projeto.encerraEm);

  const dados = [
    { icone: 'payments', texto: formatarValorCurto(projeto.valor) },
    {
      icone: 'schedule',
      texto:
        diasRestantes > 0
          ? `Encerra em ${pluralizar(diasRestantes, 'dia', 'dias')}`
          : 'Encerra hoje',
    },
    {
      icone: 'how_to_vote',
      texto: `${formatarNumero(projeto.votos)} ${projeto.votos === 1 ? 'voto' : 'votos'}`,
    },
  ];

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
        to={logado ? `/cidade-aberta/projetos/${projeto.id}` : entrar}
        h={{ base: 48, md: 44 }}
        px="lg"
        className={classes.botao}
      >
        {logado ? 'Ver prós e contras e votar' : 'Entrar para votar'}
      </Button>
    </Cartao>
  );
}
