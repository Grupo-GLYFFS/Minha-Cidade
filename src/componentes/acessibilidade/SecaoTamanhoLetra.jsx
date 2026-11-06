import { SegmentedControl, Text, Title, VisuallyHidden } from '@mantine/core';
import Cartao from '../Cartao';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';
import { rotuloTamanho } from '../../logica/acessibilidade';
import { TAMANHOS_LETRA } from '../../dados/tamanhosLetra';
import classes from './SecaoTamanhoLetra.module.css';

// Cada opção mostra um "A" no tamanho dela; o leitor de tela ouve o nome (ex.: "Letra grande")
const OPCOES = TAMANHOS_LETRA.map((tamanho) => ({
  value: tamanho.id,
  label: (
    <>
      <span className={classes.letra} data-tamanho={tamanho.id} aria-hidden="true">
        A
      </span>
      <VisuallyHidden>Letra {tamanho.rotulo}</VisuallyHidden>
    </>
  ),
}));

// Seção "Tamanho da letra" da página Acessibilidade: quatro opções e uma prévia do texto.
// A mudança vale na hora para o app inteiro, e o novo tamanho é anunciado ao leitor de tela.
export default function SecaoTamanhoLetra() {
  const { tamanhoLetra, definirTamanho } = useAcessibilidade();

  return (
    <Cartao component="section" aria-labelledby="titulo-letra">
      <Title order={2} id="titulo-letra" fz={{ base: 18, md: 20 }} fw={700}>
        Tamanho da letra
      </Title>
      <SegmentedControl
        aria-labelledby="titulo-letra"
        data={OPCOES}
        value={tamanhoLetra}
        onChange={definirTamanho}
        fullWidth
        size="md"
        radius="md"
        className={classes.controle}
      />
      <div className={classes.previa}>
        <Text fw={600}>Assim fica o texto do app.</Text>
        <Text fz="sm" c="var(--cor-texto-suave)" mt={4} role="status" aria-live="polite">
          Tamanho da letra: {rotuloTamanho(tamanhoLetra)}
        </Text>
      </div>
    </Cartao>
  );
}
