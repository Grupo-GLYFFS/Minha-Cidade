import { useFormContext } from 'react-hook-form';
import { SimpleGrid, Stack, TextInput } from '@mantine/core';
import CampoCep from '../formulario/CampoCep';
import CampoBairroRegiao from '../formulario/CampoBairroRegiao';
import { CIDADE_ATENDIDA } from '../../logica/buscarCep';
import classes from './EnderecoServico.module.css';

// Bloco de endereço que um campo 'cep' traz junto: CEP (com busca no ViaCEP), cidade,
// rua, número, bairro e região. Recebe a definição do campo 'cep' (rótulo e ajuda).
export default function EnderecoServico({ campo }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const ajudaCep = ['Rua e bairro são preenchidos sozinhos.', campo.ajuda]
    .filter(Boolean)
    .join(' ');

  return (
    <Stack gap="lg">
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="lg">
        <CampoCep rotulo={campo.rotulo} descricao={ajudaCep} />
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
