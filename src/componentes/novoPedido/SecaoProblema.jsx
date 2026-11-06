import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Stack, Textarea, TextInput } from '@mantine/core';
import GrupoOpcoes from './GrupoOpcoes';
import TituloSecao from './TituloSecao';
import { CATEGORIAS_PEDIDO } from '../../dados/categoriasPedido';
import { GRAVIDADES } from '../../dados/gravidades';
import { DESCRICAO_MAX, DESCRICAO_MIN, TITULO_MAX } from '../../logica/esquemaNovoPedido';

const OPCOES_CATEGORIA = CATEGORIAS_PEDIDO.map((c) => ({
  valor: c.id,
  rotulo: c.rotulo,
  icone: c.icone,
}));

const OPCOES_GRAVIDADE = GRAVIDADES.map((g) => ({ valor: g.valor, rotulo: g.rotulo }));

// Primeira parte do formulário: categoria, título, descrição e gravidade do problema.
// Lê e grava os campos pelo formulário compartilhado (useFormContext).
export default function SecaoProblema() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const titulo = useWatch({ control, name: 'titulo' }) ?? '';
  const descricao = useWatch({ control, name: 'descricao' }) ?? '';
  const gravidade = useWatch({ control, name: 'gravidade' });
  const explicacaoGravidade = GRAVIDADES.find((g) => g.valor === gravidade)?.explicacao;

  return (
    <Stack component="section" gap="lg" aria-labelledby="secao-problema">
      <TituloSecao id="secao-problema" numero={1} titulo="O problema" />

      <Controller
        name="categoria"
        control={control}
        render={({ field }) => (
          <GrupoOpcoes
            ref={field.ref}
            nome={field.name}
            legenda="Categoria"
            descricao="Escolha o tipo de problema. Ele define qual setor da prefeitura vai cuidar."
            opcoes={OPCOES_CATEGORIA}
            valor={field.value}
            aoMudar={field.onChange}
            aoSair={field.onBlur}
            erro={errors.categoria?.message}
            colunas={3}
          />
        )}
      />

      <TextInput
        {...register('titulo')}
        label="Título"
        description={`Resuma em poucas palavras. Ex.: Poste apagado em frente ao número 120. ${titulo.length} de ${TITULO_MAX} caracteres.`}
        required
        autoComplete="off"
        error={errors.titulo?.message}
      />

      <Textarea
        {...register('descricao')}
        label="Descrição"
        description={`Conte desde quando acontece e o que atrapalha. Mínimo de ${DESCRICAO_MIN} caracteres. ${descricao.length} de ${DESCRICAO_MAX}.`}
        required
        autosize
        minRows={4}
        maxRows={10}
        error={errors.descricao?.message}
      />

      <Controller
        name="gravidade"
        control={control}
        render={({ field }) => (
          <GrupoOpcoes
            ref={field.ref}
            nome={field.name}
            legenda="Quão grave é o problema?"
            descricao={
              explicacaoGravidade
                ? `${gravidade} de 5: ${explicacaoGravidade}`
                : 'De 1 (leve) a 5 (muito grave). A gravidade ajuda a definir a prioridade.'
            }
            opcoes={OPCOES_GRAVIDADE}
            valor={field.value}
            aoMudar={field.onChange}
            aoSair={field.onBlur}
            erro={errors.gravidade?.message}
            compacto
          />
        )}
      />
    </Stack>
  );
}
