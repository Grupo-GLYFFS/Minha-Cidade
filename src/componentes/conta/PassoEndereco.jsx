import { useFormContext } from 'react-hook-form';
import { SimpleGrid, Stack, TextInput } from '@mantine/core';
import CampoCep from '../formulario/CampoCep';
import CampoBairroRegiao from '../formulario/CampoBairroRegiao';
import { CIDADE_ATENDIDA } from '../../logica/buscarCep';
import classes from '../novoPedido/SecaoEndereco.module.css';

// Passo 2 do cadastro (Endereço): CEP com busca no ViaCEP, cidade (só a capital),
// rua, número, complemento opcional, bairro e região.
export default function PassoEndereco() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack gap="lg">
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="lg">
        <CampoCep />
        <TextInput
          label="Cidade"
          value={CIDADE_ATENDIDA}
          readOnly
          variant="filled"
          description="O app atende só moradores da capital."
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

      <TextInput
        {...register('complemento')}
        label="Complemento (opcional)"
        description="Ex.: Apto 12, bloco B"
        autoComplete="address-line2"
        error={errors.complemento?.message}
      />

      <CampoBairroRegiao />
    </Stack>
  );
}
