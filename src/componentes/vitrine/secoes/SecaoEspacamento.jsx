import { Box, Paper, SimpleGrid, Stack, Text, useMantineTheme } from '@mantine/core';
import SecaoVitrine from '../SecaoVitrine';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import { OUTRAS_VARIAVEIS } from '../../../dados/vitrineCores';
import { useModoHtml } from '../../../contexto/useModoHtml';
import { lerVariavelCss } from '../../../logica/variaveisCss';
import classes from './SecaoEspacamento.module.css';

// Espaços usados fora do tema (props com número): 12 px (gap de atalhos) e 48 px (seções)
const ESPACOS_EXTRAS = [
  { id: '12', valor: '12px', uso: 'spacing={12} nos atalhos e gap de listas' },
  { id: '48', valor: '48px', uso: 'distância entre seções grandes' },
];

// Para que serve cada raio do tema
const USO_RAIOS = {
  xs: 'quase não usado',
  sm: 'avatar do menu, botão "Buscar" dentro do campo',
  md: 'padrão: botões, campos, avisos (12 px)',
  lg: 'sanfona de perguntas, janelas (16 px)',
  xl: 'cartões (20 px)',
};

// Seção "Espaçamento e raios": escala de espaços do tema, raios xs–xl,
// espessura da borda (normal × alto contraste), sombras e as outras variáveis do global.css.
export default function SecaoEspacamento() {
  const tema = useMantineTheme();
  useModoHtml();
  const espacos = [
    ...Object.entries(tema.spacing).map(([id, valor]) => ({ id, valor, uso: `spacing "${id}"` })),
    ...ESPACOS_EXTRAS,
  ].sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor));

  return (
    <SecaoVitrine id="espacamento" titulo="Espaçamento e raios" descricao="Tudo na escala de 4 px.">
      <Subsecao titulo="Escala de espaços">
        <Vitrine nome="theme.spacing" arquivo="src/tema.js" fundo="branco">
          <Stack gap="sm">
            {espacos.map((espaco) => (
              <div key={espaco.id} className={classes.linhaEspaco}>
                <Box w={parseFloat(espaco.valor)} h={16} bg="azul.6" className={classes.barra} />
                <Text fz={13} ff="monospace">
                  {espaco.valor} · {espaco.uso}
                </Text>
              </div>
            ))}
          </Stack>
        </Vitrine>
      </Subsecao>

      <Subsecao titulo="Raios" descricao="Etiquetas usam 999 px (redondas); checkbox usa 6 px.">
        <Vitrine nome="theme.radius" arquivo="src/tema.js" props="defaultRadius: 'md'">
          <SimpleGrid cols={{ base: 2, sm: 3, lg: 5 }} spacing="sm">
            {Object.entries(tema.radius).map(([id, valor]) => (
              <Paper key={id} radius={id} withBorder p="md" className={classes.raio}>
                <Text fw={700}>{id}</Text>
                <Text fz={12} ff="monospace">
                  {valor}
                </Text>
                <Text fz={12} c="var(--cor-texto-suave)">
                  {USO_RAIOS[id]}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Vitrine>
      </Subsecao>

      <Subsecao
        titulo="Bordas, sombras e outras variáveis"
        descricao="Valores lidos da página agora: mudam no alto contraste (borda 2 px, sem sombra)."
      >
        <Vitrine nome=":root (não cor)" arquivo="src/estilos/global.css">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
            <div className={classes.caixaBorda}>Borda: var(--espessura-borda)</div>
            <div className={classes.caixaSombra}>Sombra: var(--sombra)</div>
          </SimpleGrid>
          <ul className={classes.variaveis}>
            {OUTRAS_VARIAVEIS.map((item) => (
              <li key={item.nome}>
                <code>{item.nome}</code>
                <Text component="span" fz={12} ff="monospace">
                  {lerVariavelCss(item.nome)}
                </Text>
                <Text component="span" fz={13} c="var(--cor-texto-suave)">
                  {item.uso}
                </Text>
              </li>
            ))}
          </ul>
        </Vitrine>
      </Subsecao>
    </SecaoVitrine>
  );
}
