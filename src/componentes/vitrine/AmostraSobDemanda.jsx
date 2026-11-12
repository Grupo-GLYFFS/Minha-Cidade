import { useId, useState } from 'react';
import { Box, Button, Text } from '@mantine/core';
import Icone from '../Icone';

// Botão "Mostrar exemplo" que só põe o componente na tela quando a pessoa pede.
// Serve para componentes que levam o foco ao aparecer ou que têm o título h1 de uma página.
// Recebe o aviso (por que fica escondido) e o componente (children).
export default function AmostraSobDemanda({ aviso, children }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  return (
    <div>
      <Text fz={13} c="var(--cor-texto-suave)" mb="sm">
        {aviso}
      </Text>
      <Button
        variant="default"
        h={44}
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((atual) => !atual)}
        leftSection={<Icone nome={aberto ? 'expand_less' : 'expand_more'} tamanho={20} />}
      >
        {aberto ? 'Esconder exemplo' : 'Mostrar exemplo'}
      </Button>
      <Box id={id} mt={aberto ? 'md' : 0}>
        {aberto && children}
      </Box>
    </div>
  );
}
