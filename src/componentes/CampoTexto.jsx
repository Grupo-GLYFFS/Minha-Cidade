import { Textarea, TextInput } from '@mantine/core';
import Icone from './Icone';
import classes from './CampoTexto.module.css';

// Campo de texto com rótulo visível, ajuda e erro no padrão dos formulários (refino 1):
// - ajuda: uma frase por linha (passe uma lista de frases ou um texto só);
// - erro: mensagem embaixo do campo, com ícone, dizendo como resolver.
// Sem "campos com * são obrigatórios". Funciona com react-hook-form: {...register('nome')}.
// Recebe rotulo, ajuda, erro, multilinha (vira Textarea) e qualquer prop do TextInput do Mantine
// (id, placeholder, type, value, onChange…). Dê um id ao campo para o ResumoErros achar.
export default function CampoTexto({ rotulo, ajuda, erro, multilinha = false, ...props }) {
  const Campo = multilinha ? Textarea : TextInput;
  const frases = Array.isArray(ajuda) ? ajuda : [ajuda];

  return (
    <Campo
      label={rotulo}
      description={
        ajuda && (
          <>
            {frases.map((frase) => (
              <span key={frase} className={classes.frase}>
                {frase}
              </span>
            ))}
          </>
        )
      }
      error={
        erro && (
          <>
            <Icone nome="error" tamanho={20} />
            {erro}
          </>
        )
      }
      autosize={multilinha || undefined}
      minRows={multilinha ? 4 : undefined}
      classNames={{
        label: classes.rotulo,
        description: classes.ajuda,
        input: classes.campo,
        error: classes.erro,
      }}
      {...props}
    />
  );
}
