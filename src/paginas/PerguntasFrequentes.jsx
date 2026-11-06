import { Link } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';
import PaginaAjuda from '../componentes/ajuda/PaginaAjuda';
import GrupoPerguntas from '../componentes/ajuda/GrupoPerguntas';
import Cartao from '../componentes/Cartao';
import Icone from '../componentes/Icone';
import { GRUPOS_PERGUNTAS } from '../dados/perguntas';

// Perguntas frequentes sobre o app, em grupos (Conta, Pedidos, Serviços, Privacidade e
// Acessibilidade). No fim, o caminho para a Ouvidoria. Aberta para todos, sem precisar de conta.
export default function PerguntasFrequentes() {
  return (
    <PaginaAjuda
      titulo="Perguntas frequentes"
      descricao="Respostas curtas sobre como o app funciona. Toque na pergunta para ver a resposta."
    >
      {GRUPOS_PERGUNTAS.map((grupo) => (
        <GrupoPerguntas key={grupo.id} grupo={grupo} />
      ))}

      <Cartao component="section" aria-labelledby="titulo-ouvidoria">
        <Title order={2} id="titulo-ouvidoria" fz={{ base: 18, md: 20 }} fw={700}>
          Não achou?
        </Title>
        <Text c="var(--cor-texto-suave)" mt={4} mb="md">
          Mande sua dúvida, reclamação ou sugestão para a Ouvidoria da prefeitura.
        </Text>
        <Button
          component={Link}
          to="/servicos/ouvidoria"
          h={48}
          leftSection={<Icone nome="campaign" tamanho={20} />}
        >
          Falar com a Ouvidoria
        </Button>
      </Cartao>
    </PaginaAjuda>
  );
}
