import { Stack, Text, useMantineTheme } from '@mantine/core';
import SecaoVitrine from '../SecaoVitrine';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import { ESCALA_TITULOS, PESOS_FONTE, TAMANHOS_TEXTO } from '../../../dados/vitrineTipografia';
import classes from './SecaoTipografia.module.css';

// Texto de uma linha de amostra: nome, medidas e onde aparece
function Medidas({ children }) {
  return (
    <Text fz={12} c="var(--cor-texto-suave)" ff="monospace" mt={4}>
      {children}
    </Text>
  );
}

// Seção "Tipografia": a fonte, a escala de títulos usada nas telas, os tamanhos de texto,
// os pesos e a altura de linha. As amostras são parágrafos (não títulos de verdade),
// para não bagunçar a ordem dos títulos desta página.
export default function SecaoTipografia() {
  const tema = useMantineTheme();

  return (
    <SecaoVitrine
      id="tipografia"
      titulo="Tipografia"
      descricao="Plus Jakarta Sans em tudo, títulos com peso 800. Tamanhos em rem: crescem com a letra escolhida na acessibilidade."
    >
      <Subsecao titulo="Fonte">
        <Vitrine
          nome="theme.fontFamily"
          arquivo="src/tema.js"
          props={tema.fontFamily}
          fundo="branco"
        >
          <Text fz={28} fw={800} lh={1.2}>
            Aa Bb Cc 0123456789
          </Text>
          <Text mt="sm">
            Os serviços da prefeitura e as melhorias do seu bairro em um só lugar.
          </Text>
        </Vitrine>
      </Subsecao>

      <Subsecao
        titulo="Escala de títulos"
        descricao="Tamanhos no celular → no computador. O nível h4 não é usado no app."
      >
        <Vitrine
          nome="Title order fz"
          arquivo="CabecalhoPagina, SecaoCabecalho e cartões"
          fundo="branco"
        >
          <Stack gap="lg">
            {ESCALA_TITULOS.map((titulo) => (
              <div key={titulo.nivel}>
                <Text fz={titulo.fz} fw={titulo.fw} lh={titulo.lh} lts={titulo.lts}>
                  {titulo.exemplo}
                </Text>
                <Medidas>
                  {titulo.nivel} · {titulo.fz.base} → {titulo.fz.md} px · peso {titulo.fw} · linha{' '}
                  {titulo.lh} · {titulo.onde}
                </Medidas>
              </div>
            ))}
          </Stack>
        </Vitrine>
      </Subsecao>

      <Subsecao
        titulo="Tamanhos de texto"
        descricao="Valores do Mantine; muitos textos usam números diretos (13, 14, 15 px) na prop fz."
      >
        <Vitrine nome="fz xs – xl" arquivo="@mantine/core (tema padrão)" fundo="branco">
          <Stack gap="md">
            {TAMANHOS_TEXTO.map((tamanho) => (
              <div key={tamanho.id}>
                <Text fz={tamanho.id}>Tem o mesmo problema? Apoie o pedido.</Text>
                <Medidas>
                  fz=&quot;{tamanho.id}&quot; · {tamanho.px} px · linha{' '}
                  {tema.lineHeights[tamanho.id]} · {tamanho.uso}
                </Medidas>
              </div>
            ))}
          </Stack>
        </Vitrine>
      </Subsecao>

      <Subsecao titulo="Pesos e altura de linha">
        <Vitrine nome="fw" arquivo="Plus Jakarta Sans (Google Fonts, index.html)" fundo="branco">
          <ul className={classes.pesos}>
            {PESOS_FONTE.map((item) => (
              <li key={item.peso}>
                <Text fw={item.peso} fz={18}>
                  Peso {item.peso}
                </Text>
                <Medidas>{item.uso}</Medidas>
              </li>
            ))}
          </ul>
          <Text fz={14} c="var(--cor-texto-suave)" mt="md">
            Altura de linha: 1,55 no texto padrão do Mantine; 1,15 a 1,3 nos títulos; 1,6 em textos
            longos (descrição do pedido e do projeto).
          </Text>
        </Vitrine>
      </Subsecao>
    </SecaoVitrine>
  );
}
