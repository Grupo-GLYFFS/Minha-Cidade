import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioNovaSenha from '../componentes/conta/FormularioNovaSenha';
import AvisoErroConta from '../componentes/conta/AvisoErroConta';
import Botao from '../componentes/Botao';
import PeConta from '../componentes/conta/PeConta';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { caminhoComVoltar } from '../logica/sessao';
import classes from './NovaSenha.module.css';

// Página "Nova senha" (/entrar/nova-senha): o que abre o link do e-mail do "Esqueci minha senha".
// A conta vem junto do link (state.login). Sem ela, ou se a conta não existir mais,
// mostra que o link não vale e leva para pedir outro.
export default function NovaSenha() {
  const { state } = useLocation();
  const { entrar, voltar } = useCaminhoConta();
  const [linkInvalido, setLinkInvalido] = useState(!state?.login);

  return (
    <MolduraConta
      titulo="Nova senha"
      texto="Crie a senha que você vai usar para entrar."
    >
      {linkInvalido ? (
        <div className={classes.linkInvalido}>
          <AvisoErroConta
            titulo="Este link não vale mais."
            linhas={['Peça um link novo em "Esqueci minha senha".']}
          />
          <Botao variante="principal" largo para={caminhoComVoltar('/entrar/esqueci', voltar)}>
            Pedir outro link
          </Botao>
        </div>
      ) : (
        <FormularioNovaSenha login={state.login} aoFalhar={() => setLinkInvalido(true)} />
      )}
      <PeConta pergunta="Lembrou a senha?" acao="Entrar" para={entrar} />
    </MolduraConta>
  );
}
