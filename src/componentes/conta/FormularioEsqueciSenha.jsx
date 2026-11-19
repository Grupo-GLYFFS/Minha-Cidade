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
import { caminhoComVoltar } from '../../logica/sessao';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaEsqueciSenha);

// Formulário "Esqueci minha senha": e-mail da conta.
// O protótipo não manda e-mail: depois de enviar, mostra que o link foi enviado e um botão
// que faz o papel do link do e-mail (leva à tela "Nova senha" desta conta).
// A mensagem é a mesma com ou sem conta, para não revelar quem tem cadastro.
export default function FormularioEsqueciSenha() {
  // "Voltar para Entrar" leva junto o destino (?voltar=)
  const { entrar, voltar } = useCaminhoConta();
  const [errosResumo, setErrosResumo] = useState([]);
  // Guarda o e-mail enviado (o link de demonstração leva para a senha nova desta conta)
  const [enviado, setEnviado] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: VALIDADOR, defaultValues: { login: '' }, shouldFocusError: false });

  // Campo com erro: resumo no topo
  function aoFalhar(erros) {
    setErrosResumo([{ campo: 'login', rotulo: 'E-mail', mensagem: erros.login.message }]);
  }

  if (enviado) {
    return (
      <div className={classes.formulario}>
        <p className={classes.ok} role="status">
          <Icone nome="mark_email_read" />
          <span>
            <b>Link enviado.</b> Se houver uma conta com este e-mail, ele chega em alguns minutos.
          </span>
        </p>
        <Botao
          variante="texto"
          icone="arrow_forward"
          iconeDireita
          para={caminhoComVoltar('/entrar/nova-senha', voltar)}
          state={{ login: enviado }}
        >
          Abrir o link do e-mail (demonstração)
        </Botao>
        <Botao variante="principal" largo para={entrar}>
          Voltar para Entrar
        </Botao>
      </div>
    );
  }

  return (
    <form
      className={classes.formulario}
      onSubmit={handleSubmit((valores) => setEnviado(valores.login.trim()), aoFalhar)}
      noValidate
    >
      <ResumoErros
        erros={manterErrosAtuais(errosResumo, errors)}
        titulo="Corrija o campo marcado para enviar o link."
      />
      <CampoTexto
        id="login"
        rotulo="E-mail"
        type="email"
        ajuda="O link vale por 1 hora."
        autoComplete="email"
        erro={errors.login?.message}
        {...register('login')}
      />
      <Botao variante="principal" type="submit" largo>
        Enviar link
      </Botao>
    </form>
  );
}
