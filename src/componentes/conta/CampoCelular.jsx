import { Controller, useFormContext } from 'react-hook-form';
import { TextInput } from '@mantine/core';
import { formatarCelular } from '../../logica/celular';

// Campo de celular com a máscara (11) 91234-5678 aplicada enquanto a pessoa digita.
// Lê e grava "celular" pelo formulário compartilhado (useFormContext).
export default function CampoCelular() {
  const { control } = useFormContext();

  return (
    <Controller
      name="celular"
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          ref={field.ref}
          name={field.name}
          value={field.value}
          onChange={(evento) => field.onChange(formatarCelular(evento.target.value))}
          onBlur={field.onBlur}
          type="tel"
          label="Celular"
          description="Com DDD. Ex.: (11) 91234-5678"
          placeholder="(11) 91234-5678"
          required
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={15}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
