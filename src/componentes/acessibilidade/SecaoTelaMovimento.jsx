import { Stack, Switch } from '@mantine/core';
import SecaoCard from '../SecaoCard';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';

// Card "Cores e movimento" da página Acessibilidade: chaves "Alto contraste" e "Reduzir animações".
// Cada chave tem nome e uma frase dizendo o que muda; vale na hora para o app inteiro.
export default function SecaoTelaMovimento() {
  const { altoContraste, reduzirAnimacoes, alternarAltoContraste, alternarAnimacoes } =
    useAcessibilidade();

  return (
    <SecaoCard titulo="Cores e movimento">
      <Stack gap="lg">
        <Switch
          size="md"
          checked={altoContraste}
          onChange={alternarAltoContraste}
          label="Alto contraste"
          description="Fundo branco, texto preto, bordas mais grossas e links sublinhados."
        />
        <Switch
          size="md"
          checked={reduzirAnimacoes}
          onChange={alternarAnimacoes}
          label="Reduzir animações"
          description="Tira os movimentos da tela, como o pulinho no número de apoios."
        />
      </Stack>
    </SecaoCard>
  );
}
