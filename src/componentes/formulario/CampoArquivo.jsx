import { Controller, useFormContext } from 'react-hook-form';
import { FileInput } from '@mantine/core';
import Icone from '../Icone';

// Campo para escolher um arquivo (foto, comprovante), ligado ao formulário compartilhado.
// O arquivo só é conferido pelas regras do formulário; o protótipo não guarda o arquivo.
// Recebe: nome do campo, rotulo, descricao, placeholder, aceita (tipos do seletor de arquivos),
// icone, obrigatorio e rotuloLimpar (texto do botão que tira o arquivo escolhido).
export default function CampoArquivo({
  nome,
  rotulo,
  descricao,
  placeholder,
  aceita,
  icone,
  obrigatorio = false,
  rotuloLimpar,
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={nome}
      control={control}
      render={({ field, fieldState }) => (
        <FileInput
          ref={field.ref}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          label={rotulo}
          description={descricao}
          placeholder={placeholder}
          accept={aceita}
          required={obrigatorio}
          clearable
          clearButtonProps={{ 'aria-label': rotuloLimpar }}
          leftSection={<Icone nome={icone} tamanho={20} />}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
