import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioCriarConta from '../componentes/conta/FormularioCriarConta';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { buscarEnderecoCadastro } from '../dados/enderecosCadastro';
import { regiaoDe } from '../logica/bairros';
import { destinoSeguro } from '../logica/sessao';

// Página "Criar conta" (/criar-conta): nome, e-mail, senha e endereço escolhido da lista.
// Ao enviar, a conta é criada, a pessoa já entra nela e vai para o destino do ?voltar= (ou Início).
export default function CriarConta() {
  const { logado, criarConta } = useSessao();
  const [parametros] = useSearchParams();
  const destino = destinoSeguro(parametros.get('voltar'));
  const { entrar } = useCaminhoConta();
  const navigate = useNavigate();
  // Quem já chega logado vai direto ao destino; quem acabou de criar a conta vai pelo navigate
  const [jaEstavaLogado] = useState(logado);
  const [bairro, setBairro] = useState(null);

  // Cria a conta direto com o endereço escolhido e leva para o destino
  async function aoCriar(valores) {
    const endereco = buscarEnderecoCadastro(valores.endereco);
    if (!endereco) return;
    const resultado = await criarConta({
      nome: valores.nome,
      email: valores.email,
      senha: valores.senha,
      rua: endereco.rua,
      numero: endereco.numero,
      cep: endereco.cep,
      complemento: '',
      bairro: endereco.bairro,
      regiao: regiaoDe(endereco.bairro),
    });
    if (resultado.ok) {
      navigate(destino, { replace: true });
    }
  }

  if (jaEstavaLogado) return <Navigate to={destino} replace />;

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
      <FormularioCriarConta aoCriar={aoCriar} aoMudarBairro={setBairro} />
    </MolduraConta>
  );
}
