import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import ResumoErros from '../formulario/ResumoErros';
import CampoCelular from '../conta/CampoCelular';
import PassoEndereco from '../conta/PassoEndereco';
import { useSessao } from '../../contexto/useSessao';
import { CAMPOS_MEUS_DADOS, esquemaMeusDados } from '../../logica/esquemaMeusDados';
import { NOMES_CAMPOS_CONTA } from '../../logica/esquemaCriarConta';
import { limparDadosPessoais, valoresMeusDados } from '../../logica/contas';

const VALIDADOR = yupResolver(esquemaMeusDados);

// Formulário "Meus dados": nome, celular e endereço, já preenchidos com a conta.
// O e-mail só aparece (para trocar, a pessoa fala com o 156), assim o jeito de entrar não muda.
// "Salvar alterações" só fica ativo quando algo mudou; "Cancelar" volta ao que estava salvo.
// Com erro: resumo no topo e foco no primeiro campo errado.
export default function FormularioMeusDados() {
  const { usuario, atualizarConta } = useSessao();
  const [tentou, setTentou] = useState(false);
  const [salvou, setSalvou] = useState(false);

  const formulario = useForm({
    resolver: VALIDADOR,
    defaultValues: valoresMeusDados(usuario),
    mode: 'onTouched',
    shouldFocusError: false,
  });
  const { handleSubmit, setFocus, reset, register, formState } = formulario;
  const { errors, isDirty } = formState;

  // Dados certos: troca a conta e passa a usar os valores novos como "salvos"
  function salvar(valores) {
    const resultado = atualizarConta(valores);
    if (!resultado.ok) return;
    // Mostra os valores como ficaram guardados (ex.: "s/n" vira "S/N")
    reset({ ...valores, ...limparDadosPessoais(valores) });
    setTentou(false);
    setSalvou(true);
  }

  // Dados com erro: mostra o resumo e foca o primeiro campo errado, na ordem da tela
  function aoFalhar(erros) {
    setTentou(true);
    setSalvou(false);
    const primeiro = CAMPOS_MEUS_DADOS.find((nome) => erros[nome]);
    if (primeiro) setFocus(primeiro);
  }

  // Desfaz as mudanças que ainda não foram salvas
  function cancelar() {
    reset();
    setTentou(false);
  }

  return (
    <FormProvider {...formulario}>
      <form noValidate onSubmit={handleSubmit(salvar, aoFalhar)} aria-label="Meus dados">
        <Stack gap="lg">
          {tentou && (
            <ResumoErros
              erros={errors}
              irParaCampo={setFocus}
              ordemCampos={CAMPOS_MEUS_DADOS}
              nomesCampos={NOMES_CAMPOS_CONTA}
              acao="salvar"
            />
          )}

          <Text fz="sm" c="var(--cor-texto-suave)">
            Campos com * são obrigatórios.
          </Text>

          <Cartao component="section" aria-labelledby="dados-voce">
            <Stack gap="lg">
              <Title order={2} id="dados-voce" fz={{ base: 18, md: 20 }} fw={700}>
                Você
              </Title>
              <TextInput
                {...register('nome')}
                label="Nome completo"
                description="Nome e sobrenome, como nos documentos."
                required
                autoComplete="name"
                error={errors.nome?.message}
              />
              <CampoCelular />
              <TextInput
                label="E-mail"
                value={usuario.email}
                readOnly
                variant="filled"
                description="Para trocar o e-mail, fale com o atendimento 156."
              />
            </Stack>
          </Cartao>

          <Cartao component="section" aria-labelledby="dados-endereco">
            <Stack gap="lg">
              <Title order={2} id="dados-endereco" fz={{ base: 18, md: 20 }} fw={700}>
                Endereço
              </Title>
              <PassoEndereco />
            </Stack>
          </Cartao>

          {/* Perto dos botões, onde a pessoa está. Área anunciada pelo leitor de tela;
              o aviso some quando a pessoa muda algo de novo */}
          <div role="status">
            {salvou && !isDirty && (
              <Alert
                role="none"
                color="green"
                variant="light"
                radius="md"
                title="Seus dados foram atualizados."
                icon={<Icone nome="check_circle" tamanho={20} preenchido />}
              />
            )}
          </div>

          <Group gap="sm">
            <Button
              type="submit"
              h={48}
              disabled={!isDirty}
              loading={formState.isSubmitting}
              leftSection={<Icone nome="check" tamanho={20} />}
            >
              Salvar alterações
            </Button>
            <Button type="button" variant="default" h={48} onClick={cancelar} disabled={!isDirty}>
              Cancelar
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  );
}
