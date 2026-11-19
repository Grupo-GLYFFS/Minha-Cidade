import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioCriarConta from '../componentes/conta/FormularioCriarConta';
import ConfirmarEmail from '../componentes/conta/ConfirmarEmail';
import PeConta from '../componentes/conta/PeConta';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { regiaoDe } from '../logica/bairros';
import { VALORES_CRIAR_CONTA } from '../logica/esquemaCriarConta';
import { destinoSeguro } from '../logica/sessao';

// Página "Criar conta" (/criar-conta), em dois passos na mesma rota:
// 1. o formulário (dados, senha e endereço pelo CEP);
// 2. "Confirme seu e-mail", com o código de 6 números. "Corrigir" volta ao formulário preenchido.
// Com o código certo, a conta é criada, a pessoa já entra nela e vai para o destino do ?voltar=
// (ou o Início).
export default function CriarConta() {
  const { logado, criarConta } = useSessao();
  const [parametros] = useSearchParams();
  const destino = destinoSeguro(parametros.get('voltar'));
  const { entrar } = useCaminhoConta();
  const navigate = useNavigate();
  // Quem já chega logado vai direto ao destino; quem acabou de criar a conta vai pelo navigate
  const [jaEstavaLogado] = useState(logado);
  const [valores, setValores] = useState(VALORES_CRIAR_CONTA);
  const [passo, setPasso] = useState('dados');
  const [bairro, setBairro] = useState(null);

  // Dados certos: guarda e passa para a confirmação do e-mail
  function aoContinuar(valoresDoFormulario) {
    setValores(valoresDoFormulario);
    setPasso('codigo');
    window.scrollTo(0, 0);
  }

  // Código certo: cria a conta e vai para o destino. O bairro da conta é o distrito
  // (um dos 96, achado pelo CEP ou escolhido pela pessoa); a região vem dele.
  async function aoConfirmar() {
    const resultado = await criarConta({
      ...valores,
      bairro: valores.distrito,
      regiao: regiaoDe(valores.distrito),
    });
    if (resultado.ok) {
      navigate(destino, { replace: true });
      return;
    }
    // E-mail ou CPF ganharam conta no meio do caminho: volta ao formulário
    setPasso('dados');
  }

  if (jaEstavaLogado) return <Navigate to={destino} replace />;

  if (passo === 'codigo') {
    return (
      <MolduraConta
        painel="endereco"
        bairro={bairro}
        titulo="Confirme seu e-mail"
        texto={
          <>
            Enviamos um código de 6 números para <b>{valores.email}</b>.
          </>
        }
      >
        <ConfirmarEmail aoConfirmar={aoConfirmar} />
        <PeConta pergunta="E-mail errado?" acao="Corrigir" onClick={() => setPasso('dados')} />
      </MolduraConta>
    );
  }

  return (
    <MolduraConta
      painel="endereco"
      bairro={bairro}
      titulo="Criar conta"
      texto={
        <>
          Já tem conta? <Link to={entrar}>Entrar</Link>
        </>
      }
    >
      <FormularioCriarConta
        valoresIniciais={valores}
        aoContinuar={aoContinuar}
        aoMudarBairro={setBairro}
      />
    </MolduraConta>
  );
}
