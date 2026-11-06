import { useFormContext, useWatch } from 'react-hook-form';
import { PasswordInput, SimpleGrid, Stack, TextInput } from '@mantine/core';
import CampoCelular from './CampoCelular';
import CampoFotoPerfil from './CampoFotoPerfil';
import ChecklistSenha from './ChecklistSenha';
import { SENHA_MIN } from '../../logica/senha';

// Passo 1 do cadastro (Você): nome, celular, e-mail, senha com a lista de regras,
// confirmação da senha e foto de perfil opcional.
export default function PassoVoce() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const senha = useWatch({ control, name: 'senha' }) ?? '';

  return (
    <Stack gap="lg">
      <TextInput
        {...register('nome')}
        label="Nome completo"
        description="Nome e sobrenome, como nos documentos."
        required
        autoComplete="name"
        error={errors.nome?.message}
      />

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="lg">
        <CampoCelular />
        <TextInput
          {...register('email')}
          type="email"
          label="E-mail"
          description="Você vai usar para entrar."
          placeholder="nome@exemplo.com"
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
        />
      </SimpleGrid>

      <div>
        <PasswordInput
          {...register('senha')}
          label="Senha"
          description={`Pelo menos ${SENHA_MIN} caracteres, com letras e números.`}
          required
          autoComplete="new-password"
          visibilityToggleFocusable
          visibilityToggleButtonProps={{ 'aria-label': 'Mostrar senha' }}
          error={errors.senha?.message}
        />
        <ChecklistSenha senha={senha} />
      </div>

      <PasswordInput
        {...register('confirmarSenha')}
        label="Confirmar senha"
        description="Digite a mesma senha de novo."
        required
        autoComplete="new-password"
        visibilityToggleFocusable
        visibilityToggleButtonProps={{ 'aria-label': 'Mostrar a confirmação da senha' }}
        error={errors.confirmarSenha?.message}
      />

      <CampoFotoPerfil />
    </Stack>
  );
}
