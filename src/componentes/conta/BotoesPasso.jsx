import { Button, Group } from '@mantine/core';
import Icone from '../Icone';
import classes from './FormularioCriarConta.module.css';

// Botões do rodapé de cada passo do cadastro: "Voltar" (a partir do passo 2) e
// "Continuar" ou, no último passo, "Criar conta" (este envia o formulário).
// Recebe se há passo anterior, se é o último passo, se está enviando e aoVoltar().
export default function BotoesPasso({ temAnterior, ehUltimo, enviando, aoVoltar }) {
  return (
    <Group
      justify={temAnterior ? 'space-between' : 'flex-end'}
      gap="sm"
      pt="sm"
      className={classes.botoes}
    >
      {temAnterior && (
        <Button
          type="button"
          variant="default"
          size="md"
          onClick={aoVoltar}
          leftSection={<Icone nome="arrow_back" tamanho={20} />}
        >
          Voltar
        </Button>
      )}
      <Button
        type="submit"
        size="md"
        loading={enviando}
        rightSection={ehUltimo ? null : <Icone nome="arrow_forward" tamanho={20} />}
        leftSection={ehUltimo ? <Icone nome="how_to_reg" tamanho={20} /> : null}
      >
        {ehUltimo ? 'Criar conta' : 'Continuar'}
      </Button>
    </Group>
  );
}
