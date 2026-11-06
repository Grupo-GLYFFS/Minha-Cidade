import { Stack, Switch, Title } from '@mantine/core';
import Cartao from '../Cartao';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';

// Seção com as chaves "Alto contraste" e "Reduzir animações" da página Acessibilidade.
// Cada chave tem nome e uma frase dizendo o que muda; vale na hora para o app inteiro.
export default function SecaoTelaMovimento() {
  const { altoContraste, reduzirAnimacoes, alternarAltoContraste, alternarAnimacoes } =
    useAcessibilidade();

  return (
    <Cartao component="section" aria-labelledby="titulo-tela">
      <Title order={2} id="titulo-tela" fz={{ base: 18, md: 20 }} fw={700} mb="md">
        Cores e movimento
      </Title>
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
    </Cartao>
  );
}
