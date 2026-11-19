import { SegmentedControl, VisuallyHidden } from '@mantine/core';
import SecaoCard from '../SecaoCard';
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

// Card "Tamanho da letra" da página Acessibilidade: quatro opções e uma prévia do texto.
// A mudança vale na hora para o app inteiro, e o novo tamanho é anunciado ao leitor de tela.
export default function SecaoTamanhoLetra() {
  const { tamanhoLetra, definirTamanho } = useAcessibilidade();

  return (
    <SecaoCard titulo="Tamanho da letra">
      <SegmentedControl
        aria-label="Tamanho da letra"
        data={OPCOES}
        value={tamanhoLetra}
        onChange={definirTamanho}
        fullWidth
        size="md"
        radius="md"
      />
      <div className={classes.previa}>
        <p className={classes.textoPrevia}>Assim fica o texto do app.</p>
        <p className={classes.tamanho} role="status" aria-live="polite">
          Tamanho da letra: {rotuloTamanho(tamanhoLetra)}
        </p>
      </div>
    </SecaoCard>
  );
}
