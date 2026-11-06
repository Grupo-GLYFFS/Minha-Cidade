import { Controller, useFormContext } from 'react-hook-form';
import { Select } from '@mantine/core';
import GrupoOpcoes from '../novoPedido/GrupoOpcoes';

// Até este número de opções, elas aparecem como blocos clicáveis; acima, em uma lista
const MAXIMO_EM_BLOCOS = 4;

// Campo de escolha do formulário de serviço: blocos (até 4 opções) ou lista suspensa.
// Recebe a definição do campo (com "opcoes"), o rótulo e a descrição já montados.
export default function CampoSelecao({ campo, rotulo, descricao }) {
  const { control } = useFormContext();
  const emBlocos = campo.opcoes.length <= MAXIMO_EM_BLOCOS;

  return (
    <Controller
      name={campo.nome}
      control={control}
      render={({ field, fieldState }) =>
        emBlocos ? (
          <GrupoOpcoes
            ref={field.ref}
            nome={field.name}
            legenda={rotulo}
            descricao={descricao}
            opcoes={campo.opcoes}
            valor={field.value}
            aoMudar={field.onChange}
            aoSair={field.onBlur}
            erro={fieldState.error?.message}
            colunas={campo.opcoes.length === 3 ? 3 : 2}
            obrigatorio={campo.obrigatorio}
          />
        ) : (
          <Select
            ref={field.ref}
            name={field.name}
            value={field.value || null}
            onChange={(valor) => field.onChange(valor ?? '')}
            onBlur={field.onBlur}
            label={rotulo}
            description={descricao}
            placeholder="Escolha uma opção"
            data={campo.opcoes.map((opcao) => ({ value: opcao.valor, label: opcao.rotulo }))}
            required={campo.obrigatorio}
            allowDeselect={false}
            error={fieldState.error?.message}
          />
        )
      }
    />
  );
}
