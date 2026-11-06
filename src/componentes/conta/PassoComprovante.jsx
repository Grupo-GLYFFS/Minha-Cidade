import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { Anchor, Checkbox, Stack, VisuallyHidden } from '@mantine/core';
import CampoArquivo from '../formulario/CampoArquivo';
import { LIMITE_ARQUIVO_MB } from '../../logica/regrasFormulario';
import { TIPOS_COMPROVANTE } from '../../logica/esquemaCriarConta';
import classes from './PassoComprovante.module.css';

// Passo 3 do cadastro (Comprovante): comprovante de residência obrigatório e o aceite do uso dos dados.
// O arquivo é conferido (tipo e tamanho), mas não é salvo neste protótipo.
export default function PassoComprovante() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack gap="lg">
      <CampoArquivo
        nome="comprovante"
        rotulo="Comprovante de residência"
        descricao={`Conta de luz, água ou telefone dos últimos 3 meses. PDF, JPG ou PNG de até ${LIMITE_ARQUIVO_MB} MB. O arquivo é conferido, mas não é salvo neste protótipo.`}
        placeholder="Escolher arquivo"
        aceita={TIPOS_COMPROVANTE.join(',')}
        icone="upload_file"
        obrigatorio
        rotuloLimpar="Tirar o arquivo escolhido"
      />

      <Checkbox
        {...register('aceite')}
        size="md"
        radius={6}
        required
        error={errors.aceite?.message}
        label={
          <>
            Li e aceito o{' '}
            <Anchor
              component={Link}
              to="/privacidade"
              target="_blank"
              fw={600}
              c="var(--cor-link)"
              underline="always"
            >
              uso dos meus dados
              <VisuallyHidden> (abre em outra aba)</VisuallyHidden>
            </Anchor>{' '}
            para acompanhar meus pedidos.{' '}
            <span className={classes.asterisco} aria-hidden="true">
              *
            </span>
          </>
        }
      />
    </Stack>
  );
}
