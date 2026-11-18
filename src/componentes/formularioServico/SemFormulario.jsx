import { Link } from 'react-router-dom';
import { Button, Group, Stack } from '@mantine/core';
import CabecalhoAntigo from '../CabecalhoAntigo';
import Icone from '../Icone';
import { caminhoServico } from '../../logica/servicos';

// Mensagem para um serviço que não tem formulário online (só explica, ou tem tela própria).
// Leva para a página do serviço, onde está o jeito certo de resolver, ou para o catálogo.
// Recebe o serviço.
export default function SemFormulario({ servico }) {
  return (
    <Stack gap="md" align="flex-start">
      <CabecalhoAntigo
        titulo={servico.nome}
        descricao="Este serviço não tem formulário online. Veja na página dele como resolver: lá estão os passos, os documentos e os telefones."
      />
      <Group gap="sm">
        <Button
          component={Link}
          to={caminhoServico(servico)}
          rightSection={<Icone nome="arrow_forward" tamanho={20} />}
        >
          Ver como resolver
        </Button>
        <Button component={Link} to="/servicos" variant="default">
          Ver todos os serviços
        </Button>
      </Group>
    </Stack>
  );
}
