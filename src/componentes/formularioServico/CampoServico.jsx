import { Controller, useFormContext } from 'react-hook-form';
import { NumberInput, TextInput } from '@mantine/core';
import CampoArquivo from '../formulario/CampoArquivo';
import CampoCpf from './CampoCpf';
import CampoSelecao from './CampoSelecao';
import CampoTextoLongo from './CampoTextoLongo';
import EnderecoServico from './EnderecoServico';
import {
  descricaoCampo,
  limitesData,
  rotuloCampo,
  tiposAceitos,
} from '../../logica/esquemaServico';

// Mostra um campo do formulário de serviço, escolhendo o componente pelo tipo:
// texto → TextInput; textoLongo → Textarea com contador; data e hora → calendário e relógio
// do navegador; selecao → blocos (até 4 opções) ou lista; numero → NumberInput;
// cpf → campo com máscara; arquivo → CampoArquivo; cep → bloco de endereço completo.
// Recebe a definição do campo (formato em src/dados/servicos/index.js).
export default function CampoServico({ campo }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const rotulo = rotuloCampo(campo);
  const descricao = descricaoCampo(campo);
  const erro = errors[campo.nome]?.message;

  switch (campo.tipo) {
    case 'cep':
      return <EnderecoServico campo={campo} />;
    case 'textoLongo':
      return <CampoTextoLongo campo={campo} rotulo={rotulo} descricao={descricao} />;
    case 'selecao':
      return <CampoSelecao campo={campo} rotulo={rotulo} descricao={descricao} />;
    case 'cpf':
      return <CampoCpf campo={campo} rotulo={rotulo} descricao={descricao} />;
    case 'arquivo':
      return (
        <CampoArquivo
          nome={campo.nome}
          rotulo={rotulo}
          descricao={descricao}
          placeholder="Escolher arquivo"
          aceita={tiposAceitos(campo).mimes.join(',')}
          icone="upload_file"
          obrigatorio={campo.obrigatorio}
          rotuloLimpar={`Tirar o arquivo escolhido em ${campo.rotulo}`}
        />
      );
    case 'numero':
      return (
        <Controller
          name={campo.nome}
          control={control}
          render={({ field, fieldState }) => (
            <NumberInput
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={rotulo}
              description={descricao}
              required={campo.obrigatorio}
              min={campo.min}
              max={campo.max}
              allowDecimal={false}
              allowNegative={false}
              // Não corrige o número sozinho: a regra do formulário explica o limite
              clampBehavior="none"
              // Sem as setinhas, que são pequenas demais para o toque
              hideControls
              inputMode="numeric"
              error={fieldState.error?.message}
            />
          )}
        />
      );
    case 'data':
    case 'hora': {
      const limites =
        campo.tipo === 'data' ? limitesData(campo) : { min: campo.min, max: campo.max };
      return (
        <TextInput
          {...register(campo.nome)}
          type={campo.tipo === 'data' ? 'date' : 'time'}
          label={rotulo}
          description={descricao}
          required={campo.obrigatorio}
          min={limites.min ?? undefined}
          max={limites.max ?? undefined}
          error={erro}
        />
      );
    }
    default:
      return (
        <TextInput
          {...register(campo.nome)}
          label={rotulo}
          description={descricao}
          required={campo.obrigatorio}
          error={erro}
        />
      );
  }
}
