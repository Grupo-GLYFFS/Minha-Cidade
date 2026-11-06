import { Stack } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecoesCidadeAberta from '../componentes/cidadeAberta/SecoesCidadeAberta';

// Cidade Aberta: painel com o orçamento, os grandes projetos em votação,
// o orçamento do bairro e as obras da cidade.
export default function CidadeAberta() {
  return (
    <Stack gap="lg">
      <CabecalhoPagina
        titulo="Cidade Aberta"
        descricao="Veja para onde vai o dinheiro da cidade, vote nos grandes projetos e acompanhe as obras."
      />
      <SecoesCidadeAberta />
    </Stack>
  );
}
