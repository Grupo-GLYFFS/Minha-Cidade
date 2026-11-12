import { useState } from 'react';
import {
  Checkbox,
  Chip,
  Group,
  SegmentedControl,
  SimpleGrid,
  Slider,
  Stack,
  Switch,
} from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import GrupoOpcoes from '../../novoPedido/GrupoOpcoes';
import { CATEGORIAS_PEDIDO } from '../../../dados/categoriasPedido';
import { GRAVIDADES } from '../../../dados/gravidades';
import { SITUACOES_PEDIDO } from '../../../logica/pedidos';
import { textoValor } from '../../../logica/orcamentoBairro';

const OPCOES_CATEGORIA = CATEGORIAS_PEDIDO.slice(0, 3).map((categoria) => ({
  valor: categoria.id,
  rotulo: categoria.rotulo,
  icone: categoria.icone,
}));
const OPCOES_GRAVIDADE = GRAVIDADES.map((gravidade) => ({
  valor: gravidade.valor,
  rotulo: gravidade.rotulo,
}));

// Checkbox, chave, segmentos, chips, blocos de opção (GrupoOpcoes) e controle deslizante.
// Cada um guarda a escolha só aqui; nada é salvo.
export default function BaseEscolhas() {
  const [categoria, setCategoria] = useState('iluminacao');
  const [gravidade, setGravidade] = useState(null);
  const [visao, setVisao] = useState('grade');
  const [situacao, setSituacao] = useState('todos');
  const [valor, setValor] = useState(250000);

  return (
    <Subsecao id="base-escolhas" titulo="Escolhas">
      <Vitrine
        nome="Checkbox"
        arquivo="@mantine/core"
        props='size="md" radius={6} (canto proporcional ao do botão)'
        fundo="branco"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Checkbox size="md" radius={6} label="Confirmo que as informações estão corretas." />
          <Checkbox size="md" radius={6} defaultChecked label="Marcada" />
          <Checkbox
            size="md"
            radius={6}
            label="Li e aceito o uso dos meus dados."
            error="Marque a confirmação de que as informações estão corretas."
          />
          <Checkbox size="md" radius={6} disabled label="Desativada" />
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="Switch"
        arquivo="@mantine/core"
        props='size="md" · label · description'
        fundo="branco"
      >
        <Stack gap="lg">
          <Switch
            size="md"
            label="Ligada"
            description="Fundo branco, texto preto e bordas mais grossas."
            defaultChecked
          />
          <Switch size="md" label="Desligada" description="Tira os movimentos da tela." />
          <Switch size="md" label="Desativada" disabled />
        </Stack>
      </Vitrine>

      <Vitrine
        nome="SegmentedControl + Chip"
        arquivo="@mantine/core"
        props='SegmentedControl radius="md" · Chip radius="xl" dentro de role="radiogroup"'
        fundo="branco"
      >
        <Stack gap="md" align="flex-start">
          <SegmentedControl
            aria-label="Exibir como"
            data={[
              { value: 'grade', label: 'Grade' },
              { value: 'lista', label: 'Lista' },
            ]}
            value={visao}
            onChange={setVisao}
            radius="md"
          />
          <div role="radiogroup" aria-label="Mostrar pedidos">
            <Chip.Group value={situacao} onChange={setSituacao}>
              <Group gap="sm">
                {SITUACOES_PEDIDO.map((opcao) => (
                  <Chip key={opcao.value} value={opcao.value} size="sm" radius="xl">
                    {opcao.label}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </div>
        </Stack>
      </Vitrine>

      <Vitrine
        nome="GrupoOpcoes"
        arquivo="src/componentes/novoPedido/GrupoOpcoes.jsx"
        props="blocos de rádio: com ícone · com erro · compacto (escala de 1 a 5)"
        fundo="branco"
      >
        <Stack gap="xl">
          <GrupoOpcoes
            nome="vitrine-categoria"
            legenda="Categoria"
            descricao="Escolha o tipo de problema."
            opcoes={OPCOES_CATEGORIA}
            valor={categoria}
            aoMudar={setCategoria}
          />
          <GrupoOpcoes
            nome="vitrine-gravidade"
            legenda="Quão grave é o problema?"
            descricao="De 1 (leve) a 5 (muito grave)."
            opcoes={OPCOES_GRAVIDADE}
            valor={gravidade}
            aoMudar={setGravidade}
            erro={gravidade ? undefined : 'Escolha de 1 a 5 quão grave é o problema.'}
            compacto
          />
        </Stack>
      </Vitrine>

      <Vitrine
        nome="Slider"
        arquivo="@mantine/core"
        props='size="lg" thumbSize={28} · thumbLabel · thumbValueText'
        fundo="branco"
      >
        <Slider
          min={0}
          max={1000000}
          step={50000}
          value={valor}
          onChange={setValor}
          label={textoValor}
          thumbLabel="Valor para Recapear ruas"
          thumbValueText={textoValor}
          size="lg"
          thumbSize={28}
          mx="sm"
        />
      </Vitrine>
    </Subsecao>
  );
}
