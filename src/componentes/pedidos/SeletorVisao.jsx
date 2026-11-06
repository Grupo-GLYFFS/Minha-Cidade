import { Group, SegmentedControl, Text } from '@mantine/core';
import Icone from '../Icone';
import classes from './SeletorVisao.module.css';

// Cada opção mostra ícone e texto, para ninguém depender só do desenho
const OPCOES = [
  { value: 'grade', icone: 'grid_view', rotulo: 'Grade' },
  { value: 'lista', icone: 'view_agenda', rotulo: 'Lista' },
].map((opcao) => ({
  value: opcao.value,
  label: (
    <Group gap={4} wrap="nowrap" justify="center">
      <Icone nome={opcao.icone} tamanho={18} />
      <span>{opcao.rotulo}</span>
    </Group>
  ),
}));

// Troca o jeito de mostrar os pedidos: em grade (cartões lado a lado) ou em lista.
// Recebe a visão atual ("grade" ou "lista") e a função aoMudar(visao).
export default function SeletorVisao({ valor, aoMudar }) {
  return (
    <div>
      <Text component="span" id="visao-rotulo" className={classes.rotulo}>
        Exibir como
      </Text>
      <SegmentedControl
        aria-labelledby="visao-rotulo"
        data={OPCOES}
        value={valor}
        onChange={aoMudar}
        radius="md"
        size="sm"
        className={classes.controle}
      />
    </div>
  );
}
