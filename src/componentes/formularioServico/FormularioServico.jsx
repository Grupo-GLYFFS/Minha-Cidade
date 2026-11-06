import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Divider, Group, Stack, Text } from '@mantine/core';
import Icone from '../Icone';
import ResumoErros from '../formulario/ResumoErros';
import CampoServico from './CampoServico';
import SeusDados from './SeusDados';
import {
  CAMPO_CONFIRMACAO,
  montarEsquemaServico,
  ordemENomesCampos,
  valoresIniciais,
} from '../../logica/esquemaServico';
import classes from './FormularioServico.module.css';

// Formulário online de um serviço, montado a partir de servico.campos.
// Cada campo é conferido quando a pessoa sai dele e, depois disso, a cada mudança.
// Ao tentar enviar com erro: mostra o resumo no topo e leva o foco ao primeiro campo errado.
// Recebe o serviço e aoEnviar(valores), chamada só com tudo certo (pode ser assíncrona:
// enquanto ela não termina, o botão mostra que está enviando).
export default function FormularioServico({ servico, aoEnviar }) {
  const { campos } = servico;
  const esquema = useMemo(() => montarEsquemaServico(campos), [campos]);
  const { ordem, nomes } = useMemo(() => ordemENomesCampos(campos), [campos]);
  const formulario = useForm({
    resolver: yupResolver(esquema),
    defaultValues: valoresIniciais(campos),
    mode: 'onTouched',
    // O foco no primeiro erro é feito por nós, seguindo a ordem da tela
    shouldFocusError: false,
  });
  const { handleSubmit, register, setFocus, formState } = formulario;
  const [tentouEnviar, setTentouEnviar] = useState(false);

  // Envio com erro: mostra o resumo e foca o primeiro campo errado, na ordem da tela
  function aoFalhar(erros) {
    setTentouEnviar(true);
    const primeiro = ordem.find((nome) => erros[nome]);
    if (primeiro) setFocus(primeiro);
  }

  return (
    <FormProvider {...formulario}>
      <form
        noValidate
        onSubmit={handleSubmit(aoEnviar, aoFalhar)}
        className={classes.formulario}
        aria-label={`Solicitar: ${servico.nome}`}
      >
        <Stack gap="lg">
          {tentouEnviar && (
            <ResumoErros
              erros={formState.errors}
              irParaCampo={setFocus}
              ordemCampos={ordem}
              nomesCampos={nomes}
              acao="enviar"
            />
          )}

          <SeusDados />
          <Divider color="var(--cor-borda)" />

          <Text fz="sm" c="var(--cor-texto-suave)">
            Os campos com * são obrigatórios.
          </Text>

          {campos.map((campo) => (
            <CampoServico key={campo.nome} campo={campo} />
          ))}

          <Divider color="var(--cor-borda)" />

          <Checkbox
            {...register(CAMPO_CONFIRMACAO)}
            size="md"
            radius={6}
            required
            label="Confirmo que as informações estão corretas."
            error={formState.errors[CAMPO_CONFIRMACAO]?.message}
          />

          <Group justify="flex-end">
            <Button
              type="submit"
              size="md"
              loading={formState.isSubmitting}
              loaderProps={{ 'aria-label': 'Enviando a solicitação' }}
              className={classes.enviar}
              leftSection={<Icone nome="send" tamanho={20} />}
            >
              Enviar solicitação
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  );
}
