import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import Icone from '../Icone';
import ResumoErros from '../formulario/ResumoErros';
import { useSessao } from '../../contexto/useSessao';
import { CAMPOS_ENTRAR, NOMES_CAMPOS_ENTRAR, esquemaEntrar } from '../../logica/esquemaEntrar';

// Formulário de e-mail e senha da tela "Entrar".
// Erros de preenchimento aparecem embaixo de cada campo (e no resumo, ao tentar entrar);
// e-mail ou senha errados mostram um aviso geral, sem dizer qual dos dois está errado.
// Quando dá certo, a sessão muda e a página "Entrar" leva a pessoa de volta.
export default function FormularioEntrar() {
  const { entrar } = useSessao();
  const [tentou, setTentou] = useState(false);
  const [erroGeral, setErroGeral] = useState(null);
  const { register, handleSubmit, setFocus, formState } = useForm({
    resolver: yupResolver(esquemaEntrar),
    defaultValues: { email: '', senha: '' },
    mode: 'onTouched',
    shouldFocusError: false,
  });
  const { errors, isSubmitting } = formState;

  // Envio com tudo preenchido: confere e-mail e senha
  async function enviar(valores) {
    setErroGeral(null);
    const resultado = await entrar(valores.email, valores.senha);
    if (!resultado.ok) {
      setErroGeral(resultado.erro);
      setFocus('senha');
    }
  }

  // Envio com erro: mostra o resumo e foca o primeiro campo errado
  function aoFalhar(erros) {
    setTentou(true);
    setErroGeral(null);
    const primeiro = CAMPOS_ENTRAR.find((nome) => erros[nome]);
    if (primeiro) setFocus(primeiro);
  }

  return (
    <form noValidate onSubmit={handleSubmit(enviar, aoFalhar)} aria-label="Entrar com e-mail">
      <Stack gap="lg">
        {tentou && (
          <ResumoErros
            erros={errors}
            irParaCampo={setFocus}
            ordemCampos={CAMPOS_ENTRAR}
            nomesCampos={NOMES_CAMPOS_ENTRAR}
            acao="entrar"
          />
        )}

        {/* Área sempre presente: o leitor de tela anuncia quando o aviso aparece */}
        <div role="alert">
          {erroGeral && (
            <Alert
              role="none"
              color="red"
              variant="light"
              radius="md"
              title={erroGeral}
              icon={<Icone nome="error" tamanho={20} preenchido />}
            />
          )}
        </div>

        <TextInput
          {...register('email')}
          type="email"
          label="E-mail"
          placeholder="nome@exemplo.com"
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
        />
        <PasswordInput
          {...register('senha')}
          label="Senha"
          required
          autoComplete="current-password"
          visibilityToggleFocusable
          visibilityToggleButtonProps={{ 'aria-label': 'Mostrar senha' }}
          error={errors.senha?.message}
        />

        <Button
          type="submit"
          size="md"
          fullWidth
          loading={isSubmitting}
          leftSection={<Icone nome="login" tamanho={20} />}
        >
          Entrar
        </Button>
      </Stack>
    </form>
  );
}
