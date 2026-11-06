import { Group, Progress, Text } from '@mantine/core';
import Icone from '../Icone';
import { formatarNumero, pluralizar } from '../../logica/formatos';
import { buscarOpcaoVoto } from '../../logica/votacao';
import classes from './ResultadoVotacao.module.css';

// Resultado completo de uma votação: uma barra para cada opção com percentual e votos
// escritos ao lado, o total de votos e o voto da pessoa em destaque.
// Recebe o resultado de calcularResultado() e o voto da pessoa (opcional).
// As barras são só desenho (aria-hidden): o leitor de tela lê os números.
export default function ResultadoVotacao({ resultado, voto }) {
  const seuVoto = buscarOpcaoVoto(voto);

  return (
    <div>
      <ul className={classes.lista}>
        {resultado.opcoes.map((opcao) => (
          <li
            key={opcao.valor}
            className={classes.item}
            data-seu-voto={opcao.valor === voto || undefined}
          >
            <div className={classes.rotulo}>
              <Group component="span" gap={4} wrap="nowrap" fw={700}>
                <Icone nome={opcao.icone} tamanho={20} />
                {opcao.rotulo}
              </Group>
              <span className={classes.numeros}>
                <strong>{opcao.percentual}%</strong> ·{' '}
                {pluralizar(opcao.quantidade, 'voto', 'votos')}
              </span>
            </div>
            <Progress
              value={opcao.percentual}
              color={opcao.cor}
              size={12}
              radius="xl"
              aria-hidden="true"
              classNames={{ root: classes.trilho }}
            />
          </li>
        ))}
      </ul>

      <Text fz={14} c="var(--cor-texto-suave)" mt="md">
        Total: {formatarNumero(resultado.total)} votos
      </Text>
      {seuVoto && (
        <Group gap={8} mt="sm" wrap="nowrap" fw={700} c="var(--cor-link)">
          <Icone nome="check_circle" tamanho={20} preenchido />
          Seu voto: {seuVoto.rotulo}
        </Group>
      )}
    </div>
  );
}
