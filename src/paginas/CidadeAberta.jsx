import { Stack } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import SecoesCidadeAberta from '../componentes/cidadeAberta/SecoesCidadeAberta';

// Cidade Aberta: painel com o orçamento, os grandes projetos em votação,
// o orçamento do bairro e as obras da cidade.
export default function CidadeAberta() {
  return (
    <Stack gap="lg">
      <CabecalhoAntigo
        titulo="Cidade Aberta"
        descricao="Veja para onde vai o dinheiro da cidade, vote nos grandes projetos e acompanhe as obras."
      />
      <SecoesCidadeAberta />
    </Stack>
  );
}
