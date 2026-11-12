import { Group, Stack, Text } from '@mantine/core';
import SecaoVitrine from '../SecaoVitrine';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Icone from '../../Icone';
import { ICONES_USADOS } from '../../../dados/iconesUsados';
import { CATEGORIAS_PEDIDO } from '../../../dados/categoriasPedido';
import classes from './SecaoIcones.module.css';

const TAMANHOS = [18, 20, 24, 28];

// Seção "Ícones": o componente Icone nos 4 tamanhos (vazado e preenchido),
// os ícones das categorias de pedido e a grade com todos os ícones usados no app.
export default function SecaoIcones() {
  return (
    <SecaoVitrine
      id="icones"
      titulo="Ícones"
      descricao="Material Symbols Rounded, carregado como fonte. O ícone é decorativo (aria-hidden): o texto ao lado ou o aria-label do botão explica."
    >
      <Subsecao titulo="Tamanhos e preenchimento">
        <Vitrine
          nome="Icone"
          arquivo="src/componentes/Icone.jsx"
          props="nome · tamanho 18 | 20 | 24 | 28 · preenchido"
          fundo="branco"
        >
          <Stack gap="md">
            {[false, true].map((preenchido) => (
              <Group key={String(preenchido)} gap="lg" align="flex-end">
                {TAMANHOS.map((tamanho) => (
                  <div key={tamanho} className={classes.tamanho}>
                    <Icone nome="notifications" tamanho={tamanho} preenchido={preenchido} />
                    <Text fz={12} ff="monospace">
                      {tamanho}
                    </Text>
                  </div>
                ))}
                <Text fz={13} c="var(--cor-texto-suave)">
                  {preenchido ? 'preenchido (aba ativa, avisos importantes)' : 'vazado (padrão)'}
                </Text>
              </Group>
            ))}
          </Stack>
        </Vitrine>
      </Subsecao>

      <Subsecao
        titulo="Categorias de pedido"
        descricao="Cada categoria tem ícone e rótulo; não tem cor própria."
      >
        <Vitrine nome="CATEGORIAS_PEDIDO" arquivo="src/dados/categoriasPedido.js" fundo="branco">
          <ul className={classes.categorias}>
            {CATEGORIAS_PEDIDO.map((categoria) => (
              <li key={categoria.id}>
                <Icone nome={categoria.icone} tamanho={20} />
                <span>{categoria.rotulo}</span>
                <code className={classes.nomeIcone}>{categoria.icone}</code>
              </li>
            ))}
          </ul>
        </Vitrine>
      </Subsecao>

      <Subsecao
        titulo="Todos os ícones usados"
        descricao={`${ICONES_USADOS.length} ícones, encontrados nos componentes e nos dados. Lista em src/dados/iconesUsados.js.`}
      >
        <Vitrine nome="ICONES_USADOS" arquivo="src/dados/iconesUsados.js" fundo="branco">
          <ul className={classes.grade}>
            {ICONES_USADOS.map((nome) => (
              <li key={nome} className={classes.icone}>
                <Icone nome={nome} />
                <code className={classes.nomeIcone}>{nome}</code>
              </li>
            ))}
          </ul>
        </Vitrine>
      </Subsecao>
    </SecaoVitrine>
  );
}
