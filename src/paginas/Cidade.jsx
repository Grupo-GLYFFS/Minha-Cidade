import { useSearchParams } from 'react-router-dom';
import { SegmentedControl, Stack, Text } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecoesCidadeAberta from '../componentes/cidadeAberta/SecoesCidadeAberta';
import BotaoAbrirPedido from '../componentes/pedidos/BotaoAbrirPedido';
import ListaPedidos from '../componentes/pedidos/ListaPedidos';

const SECOES = [
  { value: 'pedidos', label: 'Pedidos' },
  { value: 'cidade-aberta', label: 'Cidade Aberta' },
];

// Cidade (aba Cidade no celular): junta os pedidos de melhoria e a Cidade Aberta.
// Um seletor no topo troca entre as duas partes; a Cidade Aberta mostra o mesmo painel
// da página /cidade-aberta. A parte escolhida fica no endereço (?secao=cidade-aberta),
// então voltar de um projeto ou de uma obra mantém a Cidade Aberta aberta.
export default function Cidade() {
  const [parametros, setParametros] = useSearchParams();
  const secao = parametros.get('secao') === 'cidade-aberta' ? 'cidade-aberta' : 'pedidos';

  // Troca de parte guardando a escolha no endereço (sem criar um passo novo no histórico)
  function trocarSecao(nova) {
    setParametros(nova === 'cidade-aberta' ? { secao: nova } : {}, { replace: true });
  }

  return (
    <Stack gap="lg">
      <CabecalhoPagina titulo="Cidade" />

      <SegmentedControl
        aria-label="Escolha o que ver"
        data={SECOES}
        value={secao}
        onChange={trocarSecao}
        fullWidth
        size="md"
        radius="md"
      />

      {secao === 'pedidos' ? (
        <Stack gap="md">
          <Text c="var(--cor-texto-suave)">
            Veja o que os moradores pediram, apoie os pedidos e abra o seu.
          </Text>
          <div>
            <BotaoAbrirPedido />
          </div>
          <ListaPedidos />
        </Stack>
      ) : (
        <Stack gap="md">
          <Text c="var(--cor-texto-suave)">
            Veja para onde vai o dinheiro da cidade, vote nos grandes projetos e acompanhe as obras.
          </Text>
          <SecoesCidadeAberta />
        </Stack>
      )}
    </Stack>
  );
}
