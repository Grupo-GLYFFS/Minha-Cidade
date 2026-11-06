import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Group, Stack, Text } from '@mantine/core';
import Icone from '../Icone';
import ResumoErros from './ResumoErros';
import SecaoProblema from './SecaoProblema';
import SecaoEndereco from './SecaoEndereco';
import SecaoFoto from './SecaoFoto';
import { ORDEM_CAMPOS, VALORES_INICIAIS, esquemaNovoPedido } from '../../logica/esquemaNovoPedido';
import classes from './FormularioPedido.module.css';

// Formulário "Abrir pedido", validado com as regras de esquemaNovoPedido.
// Cada campo é conferido quando a pessoa sai dele e, depois disso, a cada mudança.
// Ao tentar enviar com erro: mostra o resumo no topo e leva o foco ao primeiro campo errado.
// Recebe aoEnviar(valores), chamada só com tudo certo, e os valores iniciais
// (para voltar ao formulário sem perder o que já foi preenchido).
export default function FormularioPedido({ aoEnviar, valoresIniciais = VALORES_INICIAIS }) {
  const formulario = useForm({
    resolver: yupResolver(esquemaNovoPedido),
    defaultValues: valoresIniciais,
    mode: 'onTouched',
    // O foco no primeiro erro é feito por nós, seguindo a ordem da tela
    shouldFocusError: false,
  });
  const { handleSubmit, setFocus, formState } = formulario;
  const [tentouEnviar, setTentouEnviar] = useState(false);

  // Leva o foco a um campo. Recebe o nome do campo.
  function irParaCampo(nome) {
    setFocus(nome);
  }

  // Envio com erro: mostra o resumo e foca o primeiro campo errado, na ordem da tela
  function aoFalhar(erros) {
    setTentouEnviar(true);
    const primeiro = ORDEM_CAMPOS.find((nome) => erros[nome]);
    if (primeiro) irParaCampo(primeiro);
  }

  return (
    <FormProvider {...formulario}>
      <form
        noValidate
        onSubmit={handleSubmit(aoEnviar, aoFalhar)}
        className={classes.formulario}
        aria-label="Abrir pedido"
      >
        <Stack gap="lg">
          {tentouEnviar && <ResumoErros erros={formState.errors} irParaCampo={irParaCampo} />}

          <Text fz="sm" c="var(--cor-texto-suave)">
            Todos os campos são obrigatórios, menos a foto. Eles estão marcados com *.
          </Text>

          <SecaoProblema />
          <Divider color="var(--cor-borda)" />
          <SecaoEndereco />
          <Divider color="var(--cor-borda)" />
          <SecaoFoto />

          <Group justify="flex-end" pt="sm">
            <Button
              type="submit"
              size="md"
              className={classes.enviar}
              leftSection={<Icone nome="send" tamanho={20} />}
            >
              Enviar pedido
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  );
}
