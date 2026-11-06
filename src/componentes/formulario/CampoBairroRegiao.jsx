import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Select, SimpleGrid, TextInput } from '@mantine/core';
import { REGIOES } from '../../dados/regioes';
import { regiaoDoBairro } from '../../logica/enderecos';

const OPCOES_REGIAO = REGIOES.map((regiao) => regiao.nome);

// Campos de bairro e região, lado a lado no computador.
// A região vem sozinha quando o app conhece o bairro; se não conhece, aparece a lista para escolher.
// Lê e grava "bairro" e "regiao" pelo formulário compartilhado (useFormContext).
export default function CampoBairroRegiao() {
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
  );
}
