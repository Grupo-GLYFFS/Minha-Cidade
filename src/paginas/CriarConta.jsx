import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Anchor, Stack, Text } from '@mantine/core';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioCriarConta from '../componentes/conta/FormularioCriarConta';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { destinoSeguro } from '../logica/sessao';

// Tela "Criar conta": cadastro em 3 passos (Você, Endereço, Comprovante).
// Ao terminar, a conta é criada, a pessoa já entra nela e volta para o destino do ?voltar=
// (ou o Início), que mostra "Conta criada! Boas-vindas, <nome>!".
// Quem já chega logado é levado direto ao destino.
export default function CriarConta() {
  const { logado, criarConta } = useSessao();
  const [parametros] = useSearchParams();
  const destino = destinoSeguro(parametros.get('voltar'));
  const { entrar } = useCaminhoConta();
  const navigate = useNavigate();
  // Guarda se a pessoa já estava logada ao abrir a tela; quem acabou de criar a conta
  // é levado pelo navigate abaixo (com o aviso de boas-vindas), e não por este desvio
  const [jaEstavaLogado] = useState(logado);

  // Cria a conta e vai para o destino. Recebe os valores do formulário; devolve o resultado.
  async function aoCriar(valores) {
    const resultado = await criarConta(valores);
    if (resultado.ok) {
      navigate(destino, {
        state: { aviso: 'conta-criada', nome: resultado.usuario.primeiroNome },
      });
    }
    return resultado;
  }

  if (jaEstavaLogado) return <Navigate to={destino} replace />;

  return (
    <MolduraConta
      titulo="Criar conta"
      descricao="Leva uns 3 minutos. Com a conta você abre pedidos, apoia e acompanha tudo do seu bairro."
      largura="larga"
    >
      <Stack gap="lg">
        <FormularioCriarConta aoCriar={aoCriar} />
        <Text ta="center">
          Já tem conta?{' '}
          <Anchor component={Link} to={entrar} fw={700} c="var(--cor-link)">
            Entrar
          </Anchor>
        </Text>
      </Stack>
    </MolduraConta>
  );
}
