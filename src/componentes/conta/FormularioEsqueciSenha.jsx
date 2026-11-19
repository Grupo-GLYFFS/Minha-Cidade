import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import Icone from '../Icone';
import ResumoErros from '../ResumoErros';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { esquemaEsqueciSenha } from '../../logica/esquemaEntrar';
import { manterErrosAtuais } from '../../logica/resumoErros';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaEsqueciSenha);

// Formulário "Esqueci minha senha": e-mail ou CPF da conta.
// O protótipo não manda e-mail: depois de enviar, só mostra que o link foi enviado.
// A mensagem é a mesma com ou sem conta, para não revelar quem tem cadastro.
export default function FormularioEsqueciSenha() {
  // "Voltar para Entrar" leva junto o destino (?voltar=)
  const { entrar } = useCaminhoConta();
  const [errosResumo, setErrosResumo] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: VALIDADOR, defaultValues: { login: '' }, shouldFocusError: false });

  // Campo com erro: resumo no topo
  function aoFalhar(erros) {
    setErrosResumo([{ campo: 'login', rotulo: 'E-mail ou CPF', mensagem: erros.login.message }]);
  }

  if (enviado) {
    return (
      <div className={classes.formulario}>
        <p className={classes.ok} role="status">
          <Icone nome="mark_email_read" />
          <span>
            <b>Link enviado.</b> Se houver uma conta com esses dados, ele chega no e-mail dela em
            alguns minutos.
          </span>
        </p>
        <Botao variante="principal" largo para={entrar}>
          Voltar para Entrar
        </Botao>
      </div>
    );
  }

  return (
    <form
      className={classes.formulario}
      onSubmit={handleSubmit(() => setEnviado(true), aoFalhar)}
      noValidate
    >
      <ResumoErros
        erros={manterErrosAtuais(errosResumo, errors)}
        titulo="Corrija o campo marcado para enviar o link."
      />
      <CampoTexto
        id="login"
        rotulo="E-mail ou CPF"
        ajuda="O link vale por 1 hora."
        autoComplete="username"
        erro={errors.login?.message}
        {...register('login')}
      />
      <Botao variante="principal" type="submit" largo>
        Enviar link
      </Botao>
    </form>
  );
}
