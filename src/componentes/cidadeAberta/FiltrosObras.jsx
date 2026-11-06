import { Chip, Group, Select, Text } from '@mantine/core';
import Cartao from '../Cartao';
import { REGIOES } from '../../dados/regioes';
import { SITUACOES_OBRA } from '../../dados/situacaoObra';
import { TODAS_SITUACOES } from '../../logica/obras';
import classes from './FiltrosObras.module.css';

const OPCOES_REGIAO = REGIOES.map((regiao) => regiao.nome);
// "Todas" vem primeiro; as outras usam o nome no plural (ex.: "Atrasadas")
const OPCOES_SITUACAO = [
  { value: TODAS_SITUACOES, label: 'Todas' },
  ...SITUACOES_OBRA.map((situacao) => ({ value: situacao.id, label: situacao.rotuloPlural })),
];

// Filtros da lista de obras: região (lista de escolha) e situação (chips).
// Tudo muda a lista na hora, sem botão de aplicar.
// Recebe os filtros atuais { regiao, situacao } e a função aoMudar(nome, valor).
export default function FiltrosObras({ filtros, aoMudar }) {
  return (
    <Cartao
      component="form"
      role="search"
      aria-label="Filtrar obras"
      onSubmit={(evento) => evento.preventDefault()}
    >
      <div className={classes.filtros}>
        <Select
          label="Região"
          placeholder="Todas as regiões"
          data={OPCOES_REGIAO}
          value={filtros.regiao || null}
          onChange={(valor) => aoMudar('regiao', valor ?? '')}
          clearable
          allowDeselect
          checkIconPosition="right"
          clearButtonProps={{ 'aria-label': 'Limpar região' }}
          className={classes.regiao}
        />
        <div>
          <Text component="span" id="situacao-obra-rotulo" className={classes.rotulo}>
            Situação
          </Text>
          <div role="radiogroup" aria-labelledby="situacao-obra-rotulo">
            <Chip.Group value={filtros.situacao} onChange={(valor) => aoMudar('situacao', valor)}>
              <Group gap="sm">
                {OPCOES_SITUACAO.map((opcao) => (
                  <Chip
                    key={opcao.value}
                    value={opcao.value}
                    size="sm"
                    radius="xl"
                    classNames={{ label: classes.chip }}
                  >
                    {opcao.label}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </div>
        </div>
      </div>
    </Cartao>
  );
}
