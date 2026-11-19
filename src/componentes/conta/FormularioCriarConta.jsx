import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeSelect } from '@mantine/core';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import Icone from '../Icone';
import ResumoErros from '../ResumoErros';
import CampoSenha from './CampoSenha';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { ENDERECOS_CADASTRO, buscarEnderecoCadastro } from '../../dados/enderecosCadastro';
import { ERRO_EMAIL_EM_USO } from '../../logica/contas';
import {
  CAMPOS_CRIAR_CONTA,
  NOMES_CRIAR_CONTA,
  VALORES_CRIAR_CONTA,
  esquemaCriarConta,
} from '../../logica/esquemaCriarConta';
import { manterErrosAtuais } from '../../logica/resumoErros';
import campoClasses from '../CampoTexto.module.css';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaCriarConta);

// Opções do dropdown "Endereço"
const OPCOES_ENDERECO = [
  { value: '', label: 'Escolha um endereço' },
  ...ENDERECOS_CADASTRO.map((item) => ({ value: item.id, label: item.rotulo })),
];

// Título do resumo de erros. Recebe quantos campos têm erro.
function tituloResumo(quantos) {
  return quantos === 1
    ? 'Corrija o campo marcado para criar a conta.'
    : `Corrija os ${quantos} campos marcados para criar a conta.`;
}

// Formulário "Criar conta" numa página só: nome completo, e-mail, senha com requisitos e endereço.
// O bairro do endereço escolhido aparece no painel azul ao lado e vira o bairro da pessoa.
// Tudo certo: chama aoCriar(valores), que cria a conta e já entra nela.
export default function FormularioCriarConta({ aoCriar, aoMudarBairro }) {
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
  const enderecoId = useWatch({ control, name: 'endereco' });
  // O resumo acompanha as correções: campo corrigido sai da lista
  const resumoAtual = manterErrosAtuais(errosResumo, errors);

  // Avisa o painel azul quando a pessoa escolhe um endereço
  useEffect(() => {
    const escolhido = buscarEnderecoCadastro(enderecoId);
    aoMudarBairro?.(escolhido?.bairro ?? null);
  }, [enderecoId, aoMudarBairro]);

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

      <NativeSelect
        id="endereco"
        label="Endereço"
        data={OPCOES_ENDERECO}
        error={
          errors.endereco?.message && (
            <>
              <Icone nome="error" tamanho={20} />
              {errors.endereco.message}
            </>
          )
        }
        classNames={{
          label: campoClasses.rotulo,
          input: campoClasses.campo,
          error: campoClasses.erro,
        }}
        {...register('endereco')}
      />

      <Botao variante="principal" type="submit" largo carregando={isSubmitting}>
        {isSubmitting ? 'Criando conta…' : 'Criar conta'}
      </Botao>
    </form>
  );
}
