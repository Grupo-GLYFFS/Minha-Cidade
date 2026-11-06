import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Stack, Text, Title, VisuallyHidden } from '@mantine/core';
import ResumoErros from '../formulario/ResumoErros';
import ProgressoPassos from './ProgressoPassos';
import BotoesPasso from './BotoesPasso';
import PassoVoce from './PassoVoce';
import PassoEndereco from './PassoEndereco';
import PassoComprovante from './PassoComprovante';
import { useSessao } from '../../contexto/useSessao';
import {
  CAMPOS_POR_PASSO,
  ESQUEMAS_POR_PASSO,
  NOMES_CAMPOS_CONTA,
  PASSOS_CONTA,
  VALORES_INICIAIS_CONTA,
} from '../../logica/esquemaCriarConta';
import { ERRO_EMAIL_EM_USO } from '../../logica/contas';
import classes from './FormularioCriarConta.module.css';

const ULTIMO_PASSO = PASSOS_CONTA.length - 1;
// Um validador por passo: cada passo confere só os próprios campos
const VALIDADORES = ESQUEMAS_POR_PASSO.map((esquema) => yupResolver(esquema));

// Formulário "Criar conta" em 3 passos (Você, Endereço, Comprovante), num formulário só.
// "Continuar" confere só os campos do passo atual; "Voltar" muda de passo sem perder nada.
// Com erro: resumo no topo e foco no primeiro campo errado. Ao trocar de passo, o foco vai
// para o título do passo novo. Recebe aoCriar(valores), que devolve { ok, erro, campo }.
export default function FormularioCriarConta({ aoCriar }) {
  const { emailEmUso } = useSessao();
  const [passo, setPasso] = useState(0);
  const [tentou, setTentou] = useState(false);
  const [erroGeral, setErroGeral] = useState(null);
  // Fica true depois da primeira troca de passo: daí em diante o foco vai ao título do passo
  // (ao abrir a tela, o foco continua no começo da página)
  const [focarTitulo, setFocarTitulo] = useState(false);
  const tituloRef = useRef(null);

  const formulario = useForm({
    // Valida só com as regras do passo atual (o react-hook-form usa o validador da última renderização)
    resolver: VALIDADORES[passo],
    defaultValues: VALORES_INICIAIS_CONTA,
    mode: 'onTouched',
    shouldFocusError: false,
  });
  const { handleSubmit, setFocus, setError, clearErrors, formState } = formulario;

  // Depois de trocar de passo, leva o foco ao título do passo novo
  useEffect(() => {
    if (focarTitulo) tituloRef.current?.focus();
  }, [passo, focarTitulo]);

  // Muda de passo, limpando os avisos do passo anterior. Recebe o número do passo (0 a 2).
  function irParaPasso(novo) {
    setFocarTitulo(true);
    clearErrors();
    setTentou(false);
    setErroGeral(null);
    setPasso(novo);
  }

  // Volta ao passo 1 marcando o e-mail como já usado
  function avisarEmailEmUso() {
    irParaPasso(0);
    setTentou(true);
    setError('email', { message: ERRO_EMAIL_EM_USO });
  }

  // Passo certo: vai para o próximo (no passo 1, antes confere se o e-mail já tem conta)
  function continuar(valores) {
    if (passo === 0 && emailEmUso(valores.email)) {
      setTentou(true);
      setError('email', { message: ERRO_EMAIL_EM_USO });
      setFocus('email');
      return;
    }
    irParaPasso(passo + 1);
  }

  // Último passo certo: cria a conta
  async function criar(valores) {
    setErroGeral(null);
    const resultado = await aoCriar(valores);
    if (resultado.ok) return;
    if (resultado.campo === 'email') avisarEmailEmUso();
    else setErroGeral(resultado.erro);
  }

  // Passo com erro: mostra o resumo e foca o primeiro campo errado, na ordem da tela
  function aoFalhar(erros) {
    setTentou(true);
    const primeiro = CAMPOS_POR_PASSO[passo].find((nome) => erros[nome]);
    if (primeiro) setFocus(primeiro);
  }

  const ehUltimo = passo === ULTIMO_PASSO;

  return (
    <FormProvider {...formulario}>
      <form
        noValidate
        onSubmit={handleSubmit(ehUltimo ? criar : continuar, aoFalhar)}
        aria-label="Criar conta"
      >
        <Stack gap="lg">
          <ProgressoPassos passo={passo} aoVoltarPara={irParaPasso} />

          <Title
            order={2}
            ref={tituloRef}
            tabIndex={-1}
            fz={20}
            fw={700}
            className={classes.titulo}
          >
            <VisuallyHidden>
              Passo {passo + 1} de {PASSOS_CONTA.length}:{' '}
            </VisuallyHidden>
            {PASSOS_CONTA[passo].descricao}
          </Title>

          {tentou && (
            <ResumoErros
              erros={formState.errors}
              irParaCampo={setFocus}
              ordemCampos={CAMPOS_POR_PASSO[passo]}
              nomesCampos={NOMES_CAMPOS_CONTA}
              acao={ehUltimo ? 'criar a conta' : 'continuar'}
            />
          )}

          <div role="alert">
            {erroGeral && (
              <Alert role="none" color="red" variant="light" radius="md" title={erroGeral} />
            )}
          </div>

          <Text fz="sm" c="var(--cor-texto-suave)">
            Campos com * são obrigatórios.
          </Text>

          {passo === 0 && <PassoVoce />}
          {passo === 1 && <PassoEndereco />}
          {passo === 2 && <PassoComprovante />}

          <BotoesPasso
            temAnterior={passo > 0}
            ehUltimo={ehUltimo}
            enviando={formState.isSubmitting}
            aoVoltar={() => irParaPasso(passo - 1)}
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
