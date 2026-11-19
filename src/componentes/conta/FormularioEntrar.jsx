import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ResumoErros from '../ResumoErros';
import AvisoErroConta from './AvisoErroConta';
import BotaoGovbr from './BotaoGovbr';
import CaixaMarcar from './CaixaMarcar';
import CampoSenha from './CampoSenha';
import SeparadorOu from './SeparadorOu';
import { useSessao } from '../../contexto/useSessao';
import { CAMPOS_ENTRAR, NOMES_CAMPOS_ENTRAR, esquemaEntrar } from '../../logica/esquemaEntrar';
import { simularGovbr } from '../../logica/govbr';
import {
  LIMITE_TENTATIVAS,
  bloqueadoAte,
  formatarHora,
  registrarErro,
  zerarTentativas,
} from '../../logica/tentativasEntrar';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaEntrar);

// Monta o aviso de erro de quem não conseguiu entrar.
// Recebe a data do fim do bloqueio (ou null); devolve { titulo, linhas }.
function avisoDeFalha(ate) {
  if (ate) {
    return {
      titulo: 'Entrada bloqueada por 15 minutos.',
      linhas: [
        `Você errou a senha ${LIMITE_TENTATIVAS} vezes.`,
        `Tente de novo às ${formatarHora(ate)} ou crie uma senha nova em "Esqueci minha senha".`,
      ],
    };
  }
  return {
    titulo: 'E-mail, CPF ou senha não conferem.',
    linhas: [
      'Confira e tente de novo.',
      `Depois de ${LIMITE_TENTATIVAS} tentativas, a conta fica bloqueada por 15 minutos.`,
    ],
  };
}

// Formulário "Entrar": gov.br (simulado, entra na conta da Maria), e-mail ou CPF, senha
// e "Manter conectado neste aparelho". Depois de entrar, vai para o destino.
// Com campo vazio ou errado: resumo de erros no topo. Com senha errada: aviso sem dizer
// qual dos dados errou; na quinta vez, bloqueia por 15 minutos neste aparelho.
// Recebe o destino (ex.: "/inicio").
export default function FormularioEntrar({ destino }) {
  const { entrar, entrarDemonstracao } = useSessao();
  const navigate = useNavigate();
  const [errosResumo, setErrosResumo] = useState([]);
  const [falha, setFalha] = useState(null);
  const [conectandoGovbr, setConectandoGovbr] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: VALIDADOR,
    defaultValues: { login: '', senha: '', manter: false },
    shouldFocusError: false,
  });

  // Dados preenchidos: confere o bloqueio e a senha
  async function aoEnviar(valores) {
    setErrosResumo([]);
    const bloqueio = bloqueadoAte();
    if (bloqueio) {
      setFalha(avisoDeFalha(bloqueio));
      return;
    }
    const resultado = await entrar(valores.login, valores.senha, valores.manter);
    if (resultado.ok) {
      zerarTentativas();
      navigate(destino, { replace: true });
      return;
    }
    setFalha(avisoDeFalha(registrarErro()));
  }

  // Campos com erro: monta o resumo na ordem da tela
  function aoFalhar(erros) {
    setFalha(null);
    setErrosResumo(
      CAMPOS_ENTRAR.filter((campo) => erros[campo]).map((campo) => ({
        campo,
        rotulo: NOMES_CAMPOS_ENTRAR[campo],
        mensagem: erros[campo].message,
      })),
    );
  }

  // gov.br: simula a volta com os dados da Maria e entra na conta dela
  async function entrarComGovbr() {
    setConectandoGovbr(true);
    await simularGovbr();
    zerarTentativas();
    entrarDemonstracao();
    navigate(destino, { replace: true });
  }

  return (
    <form className={classes.formulario} onSubmit={handleSubmit(aoEnviar, aoFalhar)} noValidate>
      <BotaoGovbr verbo="Entrar" carregando={conectandoGovbr} onClick={entrarComGovbr} />
      <SeparadorOu />

      {falha && <AvisoErroConta titulo={falha.titulo} linhas={falha.linhas} />}
      <ResumoErros
        erros={errosResumo}
        titulo={
          errosResumo.length === 1
            ? 'Corrija o campo marcado para entrar.'
            : 'Corrija os 2 campos marcados para entrar.'
        }
      />

      <CampoTexto
        id="login"
        rotulo="E-mail ou CPF"
        autoComplete="username"
        erro={errors.login?.message}
        {...register('login')}
      />
      <CampoSenha
        id="senha"
        autoComplete="current-password"
        erro={errors.senha?.message}
        acao={
          <Botao variante="texto" para="/entrar/esqueci">
            Esqueci minha senha
          </Botao>
        }
        {...register('senha')}
      />
      <CaixaMarcar id="manter" {...register('manter')}>
        Manter conectado neste aparelho
      </CaixaMarcar>

      <Botao variante="principal" type="submit" largo carregando={isSubmitting}>
        {isSubmitting ? 'Entrando…' : 'Entrar'}
      </Botao>
    </form>
  );
}
