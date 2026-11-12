import { useState } from 'react';
import { Chip, Group, Stack } from '@mantine/core';

// Escolha entre estados de um componente (ex.: "Normal" e "Recusado"), mostrando um por vez.
// Serve para componentes com ids fixos, que não podem aparecer duas vezes na mesma página.
// Recebe o rótulo do grupo e as opções [{ valor, rotulo, conteudo }]; começa na primeira.
export default function AlternarExemplos({ rotulo, opcoes }) {
  const [escolhido, setEscolhido] = useState(opcoes[0].valor);
  const atual = opcoes.find((opcao) => opcao.valor === escolhido) ?? opcoes[0];

  return (
    <Stack gap="md">
      <div role="radiogroup" aria-label={rotulo}>
        <Chip.Group value={escolhido} onChange={setEscolhido}>
          <Group gap="sm">
            {opcoes.map((opcao) => (
              <Chip key={opcao.valor} value={opcao.valor} size="md" radius="xl">
                {opcao.rotulo}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </div>
      <div>{atual.conteudo}</div>
    </Stack>
  );
}
