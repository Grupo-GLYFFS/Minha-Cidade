import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioCriarConta from '../componentes/conta/FormularioCriarConta';
import PeConta from '../componentes/conta/PeConta';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { buscarEnderecoCadastro } from '../dados/enderecosCadastro';
import { regiaoDe } from '../logica/bairros';
import { destinoSeguro } from '../logica/sessao';

// Página "Criar conta" (/criar-conta): nome, e-mail, senha e endereço escolhido da lista.
// O bairro da pessoa sai do endereço escolhido.
// Ao enviar, a conta é criada, a pessoa já entra nela e vai para o destino do ?voltar= (ou Início).
export default function CriarConta() {
  const { logado, criarConta } = useSessao();
  const [parametros] = useSearchParams();
  const destino = destinoSeguro(parametros.get('voltar'));
  const { entrar } = useCaminhoConta();
  const navigate = useNavigate();
  // Quem já chega logado vai direto ao destino; quem acabou de criar a conta vai pelo navigate
  const [jaEstavaLogado] = useState(logado);

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
    <MolduraConta frase="Diga onde mora e veja o que muda perto de você." titulo="Criar conta">
      <FormularioCriarConta aoCriar={aoCriar} />
      <PeConta pergunta="Já tem conta?" acao="Entrar" para={entrar} />
    </MolduraConta>
  );
}
