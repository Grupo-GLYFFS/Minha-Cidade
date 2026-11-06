import { Alert, Anchor, List } from '@mantine/core';
import Icone from '../Icone';
import { NOMES_CAMPOS, ORDEM_CAMPOS } from '../../logica/esquemaNovoPedido';

// Aviso no topo do formulário quando o envio falha: quantos campos corrigir e quais são.
// Cada nome da lista leva o foco até o campo. Recebe os erros do formulário e
// irParaCampo(nome). Usa role="alert" para o leitor de tela anunciar na hora.
export default function ResumoErros({ erros, irParaCampo }) {
  const campos = ORDEM_CAMPOS.filter((nome) => erros[nome]);
  if (campos.length === 0) return null;

  const titulo =
    campos.length === 1
      ? 'Corrija o campo marcado para enviar.'
      : `Corrija os ${campos.length} campos marcados para enviar.`;

  return (
    <Alert
      role="alert"
      color="red"
      variant="light"
      radius="md"
      title={titulo}
      icon={<Icone nome="error" tamanho={20} preenchido />}
    >
      <List size="sm" spacing={4}>
        {campos.map((nome) => (
          <List.Item key={nome}>
            <Anchor
              component="button"
              type="button"
              fz="sm"
              fw={600}
              c="inherit"
              underline="always"
              onClick={() => irParaCampo(nome)}
            >
              {NOMES_CAMPOS[nome]}
            </Anchor>
            : {erros[nome].message}
          </List.Item>
        ))}
      </List>
    </Alert>
  );
}
