import { Stack, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';

// Explicação do projeto em parágrafos curtos e, embaixo, quem sente a mudança no dia a dia.
// Recebe o projeto (descricao em lista de parágrafos e quemAfeta).
export default function SobreProjeto({ projeto }) {
  return (
    <Cartao component="section" aria-labelledby="sobre-projeto-titulo">
      <Title order={2} id="sobre-projeto-titulo" fz={{ base: 18, md: 20 }} fw={700} mb="sm">
        Sobre o projeto
      </Title>
      <Stack gap="sm">
        {projeto.descricao.map((paragrafo) => (
          <Text key={paragrafo.slice(0, 40)} fz={{ base: 15, md: 16 }} lh={1.6}>
            {paragrafo}
          </Text>
        ))}
      </Stack>

      <Title order={3} fz={{ base: 16, md: 17 }} fw={700} mt="lg" mb={4}>
        Quem é afetado
      </Title>
      <Text fz={{ base: 15, md: 16 }} lh={1.6}>
        {projeto.quemAfeta}
      </Text>
    </Cartao>
  );
}
