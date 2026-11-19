import { forwardRef } from 'react';
import { NativeSelect } from '@mantine/core';
import Icone from '../Icone';
import { nomesDistritos } from '../../logica/lugares';
import classes from '../CampoTexto.module.css';

// Opções do campo: "Escolha o distrito" e os 96 distritos de A a Z
const OPCOES = [{ value: '', label: 'Escolha o distrito' }, ...nomesDistritos()];

// Campo "Distrito" (lista com os 96 distritos), no mesmo padrão do CampoTexto.
// Aparece quando o bairro do CEP não é um dos distritos que o app conhece.
// Recebe id, erro, ajuda e as props do NativeSelect do Mantine (value, onChange, ou {...register}).
const CampoDistrito = forwardRef(function CampoDistrito({ erro, ajuda, ...props }, ref) {
  return (
    <NativeSelect
      ref={ref}
      label="Distrito"
      description={ajuda}
      data={OPCOES}
      error={
        erro && (
          <>
            <Icone nome="error" tamanho={20} />
            {erro}
          </>
        )
      }
      classNames={{
        label: classes.rotulo,
        description: classes.ajuda,
        input: classes.campo,
        error: classes.erro,
      }}
      {...props}
    />
  );
});

export default CampoDistrito;
