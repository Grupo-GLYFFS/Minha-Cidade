import { Controller, useFormContext } from 'react-hook-form';
import { FileInput, Stack } from '@mantine/core';
import Icone from '../Icone';
import TituloSecao from './TituloSecao';
import { LIMITE_FOTO_MB } from '../../logica/esquemaNovoPedido';

// Terceira parte do formulário: foto opcional do problema.
// Só o nome do arquivo fica no pedido; a imagem não é salva neste protótipo.
export default function SecaoFoto() {
  const { control } = useFormContext();

  return (
    <Stack component="section" gap="lg" aria-labelledby="secao-foto">
      <TituloSecao id="secao-foto" numero={3} titulo="Mostre o problema" />

      <Controller
        name="foto"
        control={control}
        render={({ field, fieldState }) => (
          <FileInput
            ref={field.ref}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label="Foto (opcional)"
            description={`Imagem JPG, PNG ou WEBP de até ${LIMITE_FOTO_MB} MB. A foto não é salva neste protótipo.`}
            placeholder="Escolher foto"
            accept="image/*"
            clearable
            clearButtonProps={{ 'aria-label': 'Tirar a foto escolhida' }}
            leftSection={<Icone nome="photo_camera" tamanho={20} />}
            error={fieldState.error?.message}
          />
        )}
      />
    </Stack>
  );
}
