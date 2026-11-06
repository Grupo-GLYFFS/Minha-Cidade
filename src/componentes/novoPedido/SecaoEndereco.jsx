import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Select, SimpleGrid, Stack, TextInput } from '@mantine/core';
import CampoCep from './CampoCep';
import TituloSecao from './TituloSecao';
import { REGIOES } from '../../dados/regioes';
import { CIDADE_ATENDIDA } from '../../logica/buscarCep';
import { regiaoDoBairro } from '../../logica/enderecos';
import classes from './SecaoEndereco.module.css';

const OPCOES_REGIAO = REGIOES.map((regiao) => regiao.nome);

// Segunda parte do formulário: onde fica o problema (CEP, cidade, rua, número, bairro, região).
// A região vem sozinha quando o app conhece o bairro; se não conhece, a pessoa escolhe.
export default function SecaoEndereco() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const bairro = useWatch({ control, name: 'bairro' }) ?? '';
  const regiaoAchada = regiaoDoBairro(bairro);

  // Preenche a região quando o bairro é conhecido. Recebe o nome do bairro.
  // Se o bairro não está na lista, mantém a região que já estava (a pessoa pode trocar).
  function atualizarRegiao(nomeBairro) {
    const regiao = regiaoDoBairro(nomeBairro);
    if (regiao) setValue('regiao', regiao, { shouldValidate: true });
  }

  return (
    <Stack component="section" gap="lg" aria-labelledby="secao-endereco">
      <TituloSecao id="secao-endereco" numero={2} titulo="Onde fica" />

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="lg">
        <CampoCep aoAcharBairro={atualizarRegiao} />
        <TextInput
          label="Cidade"
          value={CIDADE_ATENDIDA}
          readOnly
          variant="filled"
          description="O app atende só a capital."
        />
      </SimpleGrid>

      <div className={classes.ruaNumero}>
        <TextInput
          {...register('rua')}
          label="Rua"
          description="Ex.: Rua Joaquim Távora"
          required
          autoComplete="address-line1"
          error={errors.rua?.message}
        />
        <TextInput
          {...register('numero')}
          label="Número"
          description="Ou s/n"
          required
          autoComplete="off"
          error={errors.numero?.message}
        />
      </div>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="lg">
        <TextInput
          {...register('bairro', { onChange: (evento) => atualizarRegiao(evento.target.value) })}
          label="Bairro"
          description={regiaoAchada ? `Região: ${regiaoAchada}` : 'Ex.: Vila Mariana'}
          required
          autoComplete="address-level3"
          error={errors.bairro?.message}
        />

        {/* Bairro fora da lista do app: a pessoa escolhe a região */}
        {bairro.trim().length >= 2 && !regiaoAchada && (
          <Controller
            name="regiao"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                ref={field.ref}
                name={field.name}
                value={field.value || null}
                onChange={(valor) => field.onChange(valor ?? '')}
                onBlur={field.onBlur}
                label="Região"
                description="Não achamos este bairro na lista. Escolha a região."
                placeholder="Escolha a região"
                data={OPCOES_REGIAO}
                required
                allowDeselect={false}
                error={fieldState.error?.message}
              />
            )}
          />
        )}
      </SimpleGrid>
    </Stack>
  );
}
