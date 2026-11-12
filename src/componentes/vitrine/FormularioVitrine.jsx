import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from '@mantine/core';
import Icone from '../Icone';

// Formulário de mentira para mostrar campos que leem e gravam pelo formulário compartilhado
// (CampoCep, CampoCelular, CampoArquivo...). Nunca envia nada.
// Com "regras" (resolver do yup), o botão "Conferir os campos" mostra os erros de verdade.
// Recebe: rotulo (nome do formulário), valores iniciais, regras (opcional),
// campos (nomes a conferir; sem lista, confere todos) e children.
export default function FormularioVitrine({ rotulo, valores, regras, campos, children }) {
  const formulario = useForm({ defaultValues: valores, resolver: regras, mode: 'onTouched' });

  return (
    <FormProvider {...formulario}>
      <form noValidate aria-label={rotulo} onSubmit={(evento) => evento.preventDefault()}>
        <Stack gap="lg">
          {children}
          {regras && (
            <Button
              type="button"
              variant="default"
              h={44}
              onClick={() => formulario.trigger(campos)}
              leftSection={<Icone nome="fact_check" tamanho={20} />}
              w="fit-content"
            >
              Conferir os campos
            </Button>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
}
