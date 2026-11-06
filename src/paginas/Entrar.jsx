import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Anchor, Button, Divider, Stack, Text } from '@mantine/core';
import MolduraConta from '../componentes/conta/MolduraConta';
import FormularioEntrar from '../componentes/conta/FormularioEntrar';
import Icone from '../componentes/Icone';
import LinksAjudaConta from '../componentes/conta/LinksAjudaConta';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { destinoSeguro } from '../logica/sessao';

// Tela "Entrar": e-mail e senha, ou a conta de demonstração da Maria.
// O endereço pode trazer ?voltar=/caminho: depois de entrar, a pessoa volta para lá (ou para o Início).
// Quem já está logado é levado direto ao destino.
// Embaixo, links para Acessibilidade e ajuda: no celular, é por aqui que o visitante chega a eles.
export default function Entrar() {
  const { logado, entrarDemonstracao } = useSessao();
  const [parametros] = useSearchParams();
  const destino = destinoSeguro(parametros.get('voltar'));
  const { criarConta } = useCaminhoConta();

  if (logado) return <Navigate to={destino} replace />;

  return (
    <MolduraConta
      titulo="Entrar"
      descricao="Acompanhe seus pedidos e participe das decisões do bairro."
    >
      <Stack gap="lg">
        <FormularioEntrar />

        <Divider label="ou" labelPosition="center" color="var(--cor-borda)" />

        <div>
          <Button
            variant="light"
            size="md"
            fullWidth
            onClick={entrarDemonstracao}
            aria-describedby="ajuda-demonstracao"
            leftSection={<Icone nome="play_circle" tamanho={20} />}
          >
            Entrar com conta de demonstração
          </Button>
          <Text id="ajuda-demonstracao" fz="sm" ta="center" c="var(--cor-texto-suave)" mt="sm">
            Conta da Maria, com pedidos de exemplo.
          </Text>
        </div>

        <Text ta="center">
          Ainda não tem conta?{' '}
          <Anchor component={Link} to={criarConta} fw={700} c="var(--cor-link)">
            Criar conta
          </Anchor>
        </Text>

        <LinksAjudaConta />
      </Stack>
    </MolduraConta>
  );
}
