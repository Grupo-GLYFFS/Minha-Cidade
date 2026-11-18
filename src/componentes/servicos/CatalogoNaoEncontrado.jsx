import { Link } from 'react-router-dom';
import { Button, Stack } from '@mantine/core';
import CabecalhoAntigo from '../CabecalhoAntigo';

// Mensagem para um serviço ou categoria que não existe, com a volta para o catálogo.
// Recebe o título (ex.: "Serviço não encontrado").
export default function CatalogoNaoEncontrado({ titulo }) {
  return (
    <Stack gap="md" align="flex-start">
      <CabecalhoAntigo
        titulo={titulo}
        descricao="O link pode estar errado ou o endereço mudou. Veja todos os serviços ou faça uma busca."
      />
      <Button component={Link} to="/servicos">
        Ver todos os serviços
      </Button>
    </Stack>
  );
}
