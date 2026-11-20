import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ResumoErros from '../ResumoErros';
import CampoEndereco from './CampoEndereco';
import CampoSenha from './CampoSenha';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { ERRO_EMAIL_EM_USO } from '../../logica/contas';
import {
  CAMPOS_CRIAR_CONTA,
  NOMES_CRIAR_CONTA,
  VALORES_CRIAR_CONTA,
  esquemaCriarConta,
} from '../../logica/esquemaCriarConta';
import { manterErrosAtuais } from '../../logica/resumoErros';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaCriarConta);

// Título do resumo de erros. Recebe quantos campos têm erro.
function tituloResumo(quantos) {
  return quantos === 1
    ? 'Corrija o campo marcado para criar a conta.'
    : `Corrija os ${quantos} campos marcados para criar a conta.`;
}

// Formulário "Criar conta" numa página só: nome completo, e-mail, senha com requisitos e endereço.
// O bairro do endereço escolhido vira o bairro da pessoa.
// Tudo certo: chama aoCriar(valores), que cria a conta e já entra nela.
export default function FormularioCriarConta({ aoCriar }) {
  const { emailEmUso } = useSessao();
  // "Entrar com ela" leva junto o destino (?voltar=)
  const { entrar } = useCaminhoConta();
  const [errosResumo, setErrosResumo] = useState([]);
  // Conta os envios com erro (a cada um, o foco volta para o resumo)
  const [tentativa, setTentativa] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: VALIDADOR,
    defaultValues: VALORES_CRIAR_CONTA,
    shouldFocusError: false,
  });

  const senha = useWatch({ control, name: 'senha' });
  // O resumo acompanha as correções: campo corrigido sai da lista
  const resumoAtual = manterErrosAtuais(errosResumo, errors);

  // Monta o resumo na ordem da tela. Recebe os erros { campo: { message } }.
  function mostrarResumo(erros) {
    setErrosResumo(
      CAMPOS_CRIAR_CONTA.filter((campo) => erros[campo]).map((campo) => ({
        campo,
        rotulo: NOMES_CRIAR_CONTA[campo],
        mensagem: erros[campo].message,
      })),
    );
    setTentativa((atual) => atual + 1);
  }

  // Regras certas: confere se o e-mail já tem conta e cria
  async function aoEnviar(valores) {
    if (emailEmUso(valores.email)) {
      const erro = { message: ERRO_EMAIL_EM_USO };
      setError('email', erro);
      mostrarResumo({ email: erro });
      return;
    }
    setErrosResumo([]);
    await aoCriar(valores);
  }

  // Erro do e-mail que já tem conta: traz o link para entrar com ela
  const erroEmail =
    errors.email?.message === ERRO_EMAIL_EM_USO ? (
      <span>
        {ERRO_EMAIL_EM_USO}{' '}
        <Link to={entrar} className={classes.linkErro}>
          Entrar com ela
        </Link>
      </span>
    ) : (
      errors.email?.message
    );

  return (
    <form
      className={classes.formulario}
      onSubmit={handleSubmit(aoEnviar, mostrarResumo)}
      noValidate
    >
      <ResumoErros
        erros={resumoAtual}
        titulo={tituloResumo(resumoAtual.length)}
        tentativa={tentativa}
      />

      <CampoTexto
        id="nome"
        rotulo="Nome completo"
        autoComplete="name"
        erro={errors.nome?.message}
        {...register('nome')}
      />
      <CampoTexto
        id="email"
        rotulo="E-mail"
        type="email"
        autoComplete="email"
        erro={erroEmail}
        {...register('email')}
      />
      <CampoSenha
        id="senha"
        autoComplete="new-password"
        senhaDigitada={senha}
        erro={errors.senha?.message}
        {...register('senha')}
      />

      <Controller
        name="endereco"
        control={control}
        render={({ field }) => (
          <CampoEndereco
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            erro={errors.endereco?.message}
          />
        )}
      />

      <Botao variante="principal" type="submit" largo carregando={isSubmitting}>
        {isSubmitting ? 'Criando conta…' : 'Criar conta'}
      </Botao>
    </form>
  );
}
