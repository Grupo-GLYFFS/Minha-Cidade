import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import FormularioVoto from './FormularioVoto';
import ResultadoVotacao from './ResultadoVotacao';
import { useSessao } from '../../contexto/useSessao';
import { useVotos } from '../../contexto/useVotos';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { formatarNumero } from '../../logica/formatos';
import { descreverSituacao, textoPrazoVotacao, votacaoAberta } from '../../logica/votacao';

// Cartão de votação da página do projeto. Muda conforme a situação:
// - visitante com votação aberta: convite "Entrar para votar" (volta para este projeto depois);
// - logado sem voto: formulário Sim / Não / Abstenção;
// - já votou: resultado com o voto da pessoa em destaque (logo depois de votar, aviso de sucesso);
// - votação encerrada: resultado final e o que aconteceu depois (ex.: "Encaminhado à Câmara").
// Recebe o projeto.
export default function CartaoVotacao({ projeto }) {
  const { logado } = useSessao();
  const { votoDe, votar, resultado } = useVotos();
  const { entrar, criarConta } = useCaminhoConta(`/minha-cidade/votacoes/${projeto.id}`);
  const [acabouDeVotar, setAcabouDeVotar] = useState(false);
  const aviso = useRef(null);
  const aberta = votacaoAberta(projeto);
  const voto = votoDe(projeto.id);
  const placar = resultado(projeto);
  const situacao = descreverSituacao(projeto);

  // Depois de votar, o foco vai para o aviso de sucesso (o leitor de tela lê a confirmação)
  useEffect(() => {
    if (acabouDeVotar) aviso.current?.focus();
  }, [acabouDeVotar]);

  // Registra o voto e mostra o aviso. Recebe a opção escolhida.
  function confirmarVoto(opcao) {
    if (votar(projeto.id, opcao)) setAcabouDeVotar(true);
  }

  let titulo = 'Resultado parcial';
  if (!aberta) titulo = 'Resultado final';
  else if (!voto) titulo = 'Dê o seu voto';

  return (
    <Cartao component="section" aria-labelledby="votacao-titulo">
      <Title order={2} id="votacao-titulo" fz={{ base: 18, md: 20 }} fw={700}>
        {titulo}
      </Title>
      <Group gap={4} wrap="nowrap" fz={14} c="var(--cor-texto-suave)" mt={4} mb="md">
        <Icone nome={aberta ? 'schedule' : 'event_available'} tamanho={18} />
        {aberta ? textoPrazoVotacao(projeto.fimVotacao) : 'Votação encerrada'} ·{' '}
        {formatarNumero(placar.total)} votos
      </Group>

      {acabouDeVotar && (
        <Alert
          ref={aviso}
          tabIndex={-1}
          role="status"
          color="green"
          variant="light"
          radius="md"
          mb="md"
          title="Voto registrado. Obrigado por participar!"
          icon={<Icone nome="check_circle" tamanho={20} preenchido />}
        >
          O resultado abaixo já conta o seu voto.
        </Alert>
      )}

      {aberta && !logado && (
        <>
          <Text fz={15}>
            Para votar, entre na sua conta. Cada pessoa vota uma vez, e o resultado aparece depois
            do voto.
          </Text>
          <Button component={Link} to={entrar} h={48} mt="md" fullWidth>
            Entrar para votar
          </Button>
          <Button component={Link} to={criarConta} variant="subtle" h={44} mt="sm" fullWidth>
            Criar conta
          </Button>
        </>
      )}

      {aberta && logado && !voto && <FormularioVoto aoConfirmar={confirmarVoto} />}

      {(!aberta || voto) && <ResultadoVotacao resultado={placar} voto={voto} />}

      {!aberta && situacao && (
        <Group gap={8} wrap="nowrap" mt="md" fz={15} fw={600} align="flex-start">
          <Icone nome={situacao.icone} tamanho={20} />
          {situacao.frase}.
        </Group>
      )}
    </Cartao>
  );
}
