import { useFormContext, useWatch } from 'react-hook-form';
import { Text, Textarea } from '@mantine/core';
import classes from './CampoTextoLongo.module.css';

// Campo de texto longo do formulário de serviço. Quando há limite, mostra embaixo
// quantos caracteres já foram usados (ex.: "120 de 300 caracteres").
// Recebe a definição do campo, o rótulo e a descrição já montados.
export default function CampoTextoLongo({ campo, rotulo, descricao }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const texto = useWatch({ control, name: campo.nome }) ?? '';
  const passou = Boolean(campo.max) && texto.length > campo.max;

  return (
    <div>
      <Textarea
        {...register(campo.nome)}
        label={rotulo}
        description={descricao}
        required={campo.obrigatorio}
        autosize
        minRows={4}
        maxRows={10}
        error={errors[campo.nome]?.message}
      />
      {campo.max && (
        <Text className={classes.contador} data-passou={passou || undefined}>
          {texto.length} de {campo.max} caracteres
        </Text>
      )}
    </div>
  );
}
