import { useSearchParams } from 'react-router-dom';
import { Stack, Tabs } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import LinkVoltar from '../componentes/LinkVoltar';
import TextoResponsivo from '../componentes/TextoResponsivo';
import AbaPedidos from '../componentes/perfil/AbaPedidos';
import AbaServicos from '../componentes/perfil/AbaServicos';
import { useSessao } from '../contexto/useSessao';
import { usePedidos } from '../contexto/usePedidos';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { pedidosDaPessoa } from '../logica/pedidos';
import { ordenarSolicitacoes } from '../logica/solicitacoes';
import classes from './MeusPedidos.module.css';

// Meus pedidos e protocolos: duas abas, uma com os pedidos de melhoria da pessoa
// e outra com os serviços que ela solicitou pelo catálogo.
// A aba escolhida fica no endereço (?aba=servicos), então o link e o "voltar" do navegador mantêm a aba.
export default function MeusPedidos() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const [parametros, setParametros] = useSearchParams();
  const aba = parametros.get('aba') === 'servicos' ? 'servicos' : 'pedidos';

  const meusPedidos = pedidosDaPessoa(pedidos, usuario.id);
  const minhasSolicitacoes = ordenarSolicitacoes(solicitacoes);

  // Troca de aba guardando a escolha no endereço (sem criar um passo novo no histórico)
  function trocarAba(nova) {
    setParametros(nova === 'servicos' ? { aba: 'servicos' } : {}, { replace: true });
  }

  return (
    <Stack gap="lg">
      <div>
        <LinkVoltar caminho="/perfil" rotulo="Perfil" />
        <CabecalhoPagina titulo="Meus pedidos e protocolos" />
      </div>

      <Tabs value={aba} onChange={trocarAba} classNames={{ tab: classes.aba }}>
        <Tabs.List grow>
          <Tabs.Tab value="pedidos">
            <TextoResponsivo
              longo={`Pedidos de melhoria (${meusPedidos.length})`}
              curto={`Pedidos (${meusPedidos.length})`}
            />
          </Tabs.Tab>
          <Tabs.Tab value="servicos">
            <TextoResponsivo
              longo={`Serviços solicitados (${minhasSolicitacoes.length})`}
              curto={`Serviços (${minhasSolicitacoes.length})`}
            />
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pedidos" pt="lg">
          <AbaPedidos pedidos={meusPedidos} />
        </Tabs.Panel>
        <Tabs.Panel value="servicos" pt="lg">
          <AbaServicos solicitacoes={minhasSolicitacoes} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
