import { Alert, Anchor, List } from '@mantine/core';
import Icone from '../Icone';

// Aviso no topo do formulário quando o envio falha: quantos campos corrigir e quais são.
// Cada nome da lista leva o foco até o campo. Usa role="alert" para o leitor de tela anunciar na hora.
// Recebe os erros do formulário, irParaCampo(nome), a ordem dos campos na tela,
// o nome de cada campo e a ação que a pessoa tentou (ex.: "enviar", "continuar").
export default function ResumoErros({ erros, irParaCampo, ordemCampos, nomesCampos, acao }) {
  const campos = ordemCampos.filter((nome) => erros[nome]);
  if (campos.length === 0) return null;

  const titulo =
    campos.length === 1
      ? `Corrija o campo marcado para ${acao}.`
      : `Corrija os ${campos.length} campos marcados para ${acao}.`;

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
              ta="left"
              c="inherit"
              underline="always"
              onClick={() => irParaCampo(nome)}
            >
              {nomesCampos[nome]}
            </Anchor>
            : {erros[nome].message}
          </List.Item>
        ))}
      </List>
    </Alert>
  );
}
