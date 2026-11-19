import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import Icone from '../Icone';
import ResumoErros from '../ResumoErros';
import BotaoGovbr from './BotaoGovbr';
import CaixaMarcar from './CaixaMarcar';
import CampoSenha from './CampoSenha';
import CamposEnderecoConta from './CamposEnderecoConta';
import SeparadorOu from './SeparadorOu';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { formatarCelular } from '../../logica/celular';
import { ERRO_CPF_EM_USO, ERRO_EMAIL_EM_USO } from '../../logica/contas';
import { formatarCpf } from '../../logica/cpf';
import {
  CAMPOS_CRIAR_CONTA,
  NOMES_CRIAR_CONTA,
  esquemaCriarConta,
} from '../../logica/esquemaCriarConta';
import { simularGovbr } from '../../logica/govbr';
import { manterErrosAtuais } from '../../logica/resumoErros';
import { PESSOA_NOVA_GOVBR } from '../../dados/pessoaNovaGovbr';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaCriarConta);

// Título do resumo de erros. Recebe quantos campos têm erro.
function tituloResumo(quantos) {
  return quantos === 1
    ? 'Corrija o campo marcado para criar a conta.'
    : `Corrija os ${quantos} campos marcados para criar a conta.`;
}

// Formulário "Criar conta" numa página só: gov.br (simulado, preenche os dados), nome, CPF,
// celular, e-mail, senha com requisitos, endereço pelo CEP e aceite dos termos.
// Com erro: resumo no topo (CPF que não existe, e-mail ou CPF que já têm conta…).
// Tudo certo: chama aoContinuar(valores), que leva à confirmação do e-mail.
// Recebe os valores iniciais (ao voltar de "Corrigir"), aoContinuar e aoMudarBairro (painel azul).
export default function FormularioCriarConta({ valoresIniciais, aoContinuar, aoMudarBairro }) {
  const { emailEmUso, cpfEmUso } = useSessao();
  // "Entrar com ela" leva junto o destino (?voltar=)
  const { entrar } = useCaminhoConta();
  const [errosResumo, setErrosResumo] = useState([]);
  // Conta os envios com erro (a cada um, o foco volta para o resumo)
  const [tentativa, setTentativa] = useState(0);
  const [conectandoGovbr, setConectandoGovbr] = useState(false);
  const [veioDoGovbr, setVeioDoGovbr] = useState(false);

  const formulario = useForm({
    resolver: VALIDADOR,
    defaultValues: valoresIniciais,
    shouldFocusError: false,
  });
  const { register, handleSubmit, setValue, setError, control, formState } = formulario;
  const { errors } = formState;
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

  // Regras certas: ainda confere se o e-mail ou o CPF já têm conta
  function aoEnviar(valores) {
    const jaExistem = {};
    if (cpfEmUso(valores.cpf)) jaExistem.cpf = { message: ERRO_CPF_EM_USO };
    if (emailEmUso(valores.email)) jaExistem.email = { message: ERRO_EMAIL_EM_USO };
    if (Object.keys(jaExistem).length > 0) {
      Object.entries(jaExistem).forEach(([campo, erro]) => setError(campo, erro));
      mostrarResumo(jaExistem);
      return;
    }
    setErrosResumo([]);
    aoContinuar(valores);
  }

  // gov.br: simula a volta de uma pessoa sem conta, com nome, CPF, celular, e-mail
  // e endereço já preenchidos. Depois de um envio com erro, os campos são conferidos de novo.
  async function preencherComGovbr() {
    setConectandoGovbr(true);
    const dados = await simularGovbr(PESSOA_NOVA_GOVBR);
    const opcoes = { shouldDirty: true, shouldValidate: formState.isSubmitted };
    Object.entries(dados).forEach(([campo, valor]) => setValue(campo, valor, opcoes));
    setConectandoGovbr(false);
    setVeioDoGovbr(true);
  }

  // Liga um campo com máscara: aplica a máscara enquanto a pessoa digita.
  // Depois de um envio com erro, confere de novo já com a máscara (o erro some quando fica certo).
  function comMascara(campo, formatar) {
    return register(campo, {
      onChange: (evento) =>
        setValue(campo, formatar(evento.target.value), {
          shouldValidate: formState.isSubmitted,
        }),
    });
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
    <FormProvider {...formulario}>
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

        {veioDoGovbr ? (
          <p className={classes.ok} role="status">
            <Icone nome="check_circle" preenchido />
            <span>
              <b>Dados trazidos do gov.br.</b> Confira, crie a senha e aceite os termos.
            </span>
          </p>
        ) : (
          <>
            <BotaoGovbr verbo="Criar" carregando={conectandoGovbr} onClick={preencherComGovbr} />
            <SeparadorOu>ou preencha seus dados</SeparadorOu>
          </>
        )}

        <CampoTexto
          id="nome"
          rotulo="Nome completo"
          autoComplete="name"
          erro={errors.nome?.message}
          {...register('nome')}
        />
        <CamposLado>
          <CampoTexto
            id="cpf"
            rotulo="CPF"
            placeholder="000.000.000-00"
            inputMode="numeric"
            maxLength={14}
            erro={errors.cpf?.message}
            {...comMascara('cpf', formatarCpf)}
          />
          <CampoTexto
            id="celular"
            rotulo="Celular"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={15}
            erro={errors.celular?.message}
            {...comMascara('celular', formatarCelular)}
          />
        </CamposLado>
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

        <CamposEnderecoConta aoMudarBairro={aoMudarBairro} />

        <CaixaMarcar id="termos" erro={errors.termos?.message} {...register('termos')}>
          Li e aceito os{' '}
          <Link to="/ajuda/privacidade" target="_blank">
            Termos de uso
          </Link>{' '}
          e a{' '}
          <Link to="/ajuda/privacidade" target="_blank">
            Política de privacidade
          </Link>
          .
        </CaixaMarcar>

        <Botao variante="principal" type="submit" largo>
          Criar conta
        </Botao>
      </form>
    </FormProvider>
  );
}
