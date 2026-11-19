import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Botao from '../Botao';
import ResumoErros from '../ResumoErros';
import CampoSenha from './CampoSenha';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { CAMPOS_NOVA_SENHA, NOMES_NOVA_SENHA, esquemaNovaSenha } from '../../logica/esquemaEntrar';
import { manterErrosAtuais } from '../../logica/resumoErros';
import classes from './FormularioConta.module.css';

const VALIDADOR = yupResolver(esquemaNovaSenha);

// Formulário "Nova senha" (aberto pelo link do e-mail do "Esqueci minha senha"):
// "Nova senha" com a lista do que a senha precisa ter e "Repita a senha", com as regras do Criar conta.
// Ao salvar, a senha nova passa a valer e a pessoa volta para "Entrar" com o aviso "Senha trocada".
// Recebe o login (e-mail ou CPF) da conta que pediu o link e aoFalhar() se a conta não existir.
export default function FormularioNovaSenha({ login, aoFalhar }) {
  const { trocarSenha } = useSessao();
  // "Entrar" leva junto o destino (?voltar=)
  const { entrar } = useCaminhoConta();
  const navigate = useNavigate();
  const [errosResumo, setErrosResumo] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: VALIDADOR,
    defaultValues: { senha: '', repetir: '' },
    shouldFocusError: false,
  });
  const senha = useWatch({ control, name: 'senha' });

  // Campos com erro: resumo no topo, na ordem da tela
  function aoErrar(erros) {
    setErrosResumo(
      CAMPOS_NOVA_SENHA.filter((campo) => erros[campo]).map((campo) => ({
        campo,
        rotulo: NOMES_NOVA_SENHA[campo],
        mensagem: erros[campo].message,
      })),
    );
  }

  // Tudo certo: troca a senha e volta para "Entrar" com o aviso
  async function salvar(valores) {
    const resultado = await trocarSenha(login, valores.senha);
    if (!resultado.ok) {
      aoFalhar();
      return;
    }
    navigate(entrar, { state: { aviso: 'senha-trocada' } });
  }

  const resumo = manterErrosAtuais(errosResumo, errors);

  return (
    <form className={classes.formulario} onSubmit={handleSubmit(salvar, aoErrar)} noValidate>
      <ResumoErros
        erros={resumo}
        titulo={
          resumo.length === 1
            ? 'Corrija o campo marcado para salvar a senha.'
            : `Corrija os ${resumo.length} campos marcados para salvar a senha.`
        }
      />
      <CampoSenha
        id="senha"
        rotulo="Nova senha"
        autoComplete="new-password"
        senhaDigitada={senha}
        erro={errors.senha?.message}
        {...register('senha')}
      />
      <CampoSenha
        id="repetir"
        rotulo="Repita a senha"
        autoComplete="new-password"
        erro={errors.repetir?.message}
        {...register('repetir')}
      />
      <Botao variante="principal" type="submit" largo carregando={isSubmitting}>
        {isSubmitting ? 'Salvando…' : 'Salvar senha nova'}
      </Botao>
    </form>
  );
}
