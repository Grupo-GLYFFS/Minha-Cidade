import { Link } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import Cartao from './Cartao';
import Icone from './Icone';

// Cartão para quando uma lista está vazia: uma frase e, se quiser, um botão com o próximo passo.
// Recebe o texto e, opcionalmente, { rotuloBotao, caminho, icone } do botão.
export default function EstadoVazio({ texto, rotuloBotao, caminho, icone = 'arrow_forward' }) {
  return (
    <Cartao>
      <Text c="var(--cor-texto-suave)">{texto}</Text>
      {rotuloBotao && caminho && (
        <Button
          component={Link}
          to={caminho}
          h={48}
          mt="md"
          leftSection={<Icone nome={icone} tamanho={20} />}
        >
          {rotuloBotao}
        </Button>
      )}
    </Cartao>
  );
}
