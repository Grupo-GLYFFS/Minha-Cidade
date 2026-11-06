import { useFormContext } from 'react-hook-form';
import { SimpleGrid, Stack, TextInput } from '@mantine/core';
import CampoCep from '../formulario/CampoCep';
import CampoBairroRegiao from '../formulario/CampoBairroRegiao';
import TituloSecao from './TituloSecao';
import { CIDADE_ATENDIDA } from '../../logica/buscarCep';
import classes from './SecaoEndereco.module.css';

// Segunda parte do formulário: onde fica o problema (CEP, cidade, rua, número, bairro, região).
// A região vem sozinha quando o app conhece o bairro; se não conhece, a pessoa escolhe.
export default function SecaoEndereco() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack component="section" gap="lg" aria-labelledby="secao-endereco">
      <TituloSecao id="secao-endereco" numero={2} titulo="Onde fica" />

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="lg">
        <CampoCep />
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

      <CampoBairroRegiao />
    </Stack>
  );
}
