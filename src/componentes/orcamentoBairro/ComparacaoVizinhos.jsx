import { useEffect, useRef } from 'react';
import { Alert, Button, Group, Progress, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { formatarDataCurta } from '../../logica/datas';
import { pluralizar } from '../../logica/formatos';
import classes from './ComparacaoVizinhos.module.css';

// Resultado do "Prefeito por 5 minutos" depois de enviar: para cada melhoria,
// "Você: 25% · Vizinhos: 31%" com duas barras, o total de participantes e o botão "Refazer".
// Recebe a lista de compararComVizinhos(), o envio salvo ({ bairro, enviadoEm }),
// o número de participantes, "acabouDeEnviar" (mostra o aviso de sucesso) e aoRefazer().
// Ao aparecer logo depois do envio, o foco vai para o título, para o leitor de tela continuar dali.
export default function ComparacaoVizinhos({
  comparacao,
  envio,
  participantes,
  acabouDeEnviar,
  aoRefazer,
}) {
  const titulo = useRef(null);

  useEffect(() => {
    if (acabouDeEnviar) titulo.current?.focus();
  }, [acabouDeEnviar]);

  return (
    <Cartao component="section" aria-labelledby="comparacao-titulo">
      {acabouDeEnviar && (
        <Alert
          color="green"
          variant="light"
          radius="md"
          mb="md"
          title="Divisão enviada. Obrigado por participar!"
          icon={<Icone nome="check_circle" tamanho={20} preenchido />}
        >
          Veja abaixo como a sua divisão se compara com a dos vizinhos.
        </Alert>
      )}

      <Title
        order={2}
        id="comparacao-titulo"
        ref={titulo}
        tabIndex={-1}
        fz={{ base: 18, md: 20 }}
        fw={700}
      >
        Você e os vizinhos de {envio.bairro}
      </Title>
      <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
        Você enviou sua divisão em {formatarDataCurta(envio.enviadoEm)} ·{' '}
        {pluralizar(participantes, 'pessoa participou', 'pessoas participaram')}
      </Text>

      <ul className={classes.lista}>
        {comparacao.map((item) => (
          <li key={item.id} className={classes.item}>
            <Group gap={8} wrap="nowrap" fw={700}>
              <Icone nome={item.icone} tamanho={20} />
              {item.nome}
            </Group>
            <Text fz={14} mt={4} mb={8}>
              <strong>Você: {item.voce}%</strong> · Vizinhos: {item.vizinhos}%
            </Text>
            <div className={classes.barras} aria-hidden="true">
              <span className={classes.rotuloBarra}>Você</span>
              <Progress
                value={item.voce}
                size={10}
                radius="xl"
                classNames={{ root: classes.trilho }}
              />
              <span className={classes.rotuloBarra}>Vizinhos</span>
              <Progress
                value={item.vizinhos}
                size={10}
                radius="xl"
                classNames={{ root: classes.trilho, section: classes.barraVizinhos }}
              />
            </div>
          </li>
        ))}
      </ul>

      <Text fz={13} c="var(--cor-texto-suave)" mt="md">
        Os percentuais dos vizinhos são a média de quem já participou (dados de exemplo).
      </Text>
      <Button
        variant="light"
        h={48}
        mt="md"
        onClick={aoRefazer}
        leftSection={<Icone nome="restart_alt" tamanho={20} />}
      >
        Refazer minha divisão
      </Button>
    </Cartao>
  );
}
