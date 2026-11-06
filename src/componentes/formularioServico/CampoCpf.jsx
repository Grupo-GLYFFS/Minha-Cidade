import { Controller, useFormContext } from 'react-hook-form';
import { TextInput } from '@mantine/core';
import { formatarCpf } from '../../logica/cpf';

// Campo de CPF com máscara 000.000.000-00, aplicada enquanto a pessoa digita.
// Recebe a definição do campo, o rótulo e a descrição já montados.
export default function CampoCpf({ campo, rotulo, descricao }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={campo.nome}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          ref={field.ref}
          name={field.name}
          value={field.value}
          onChange={(evento) => field.onChange(formatarCpf(evento.target.value))}
          onBlur={field.onBlur}
          label={rotulo}
          description={descricao ?? 'Digite só os 11 números; os pontos e o hífen entram sozinhos.'}
          placeholder="000.000.000-00"
          required={campo.obrigatorio}
          inputMode="numeric"
          autoComplete="off"
          maxLength={14}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
