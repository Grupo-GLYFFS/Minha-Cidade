import { Group, Stack, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import MenuConta from '../../MenuConta';
import TrilhaServico from '../../servicos/TrilhaServico';
import { CATEGORIAS_SERVICOS } from '../../../dados/categoriasServicos';

// Navegação: o cabeçalho, as abas e o rodapé já aparecem nesta página;
// aqui ficam o menu da conta (visitante e logado) e a trilha de serviços.
export default function AppNavegacao() {
  return (
    <Subsecao
      id="app-navegacao"
      titulo="Navegação"
      descricao="CabecalhoDesktop, BarraAcessibilidade e Rodape estão no topo e no fim desta página (computador); BarraAbas fica presa embaixo da tela no celular. Eles não se repetem aqui para não criar outro menu principal."
    >
      <Vitrine
        nome="MenuConta"
        arquivo="src/componentes/MenuConta.jsx"
        props="visitante: Entrar e Criar conta · logado: avatar e menu (Sair aqui só leva ao Início)"
        fundo="branco"
      >
        <Stack gap="md">
          <ContextoSimulado logado={false}>
            <MenuConta />
          </ContextoSimulado>
          <ContextoSimulado>
            <Group>
              <MenuConta />
            </Group>
          </ContextoSimulado>
          <Text fz={13} c="var(--cor-texto-suave)">
            Sessão simulada: nenhum login acontece.
          </Text>
        </Stack>
      </Vitrine>

      <Vitrine
        nome="TrilhaServico"
        arquivo="src/componentes/servicos/TrilhaServico.jsx"
        props='categoria (nav "Você está em")'
        fundo="branco"
      >
        <TrilhaServico categoria={CATEGORIAS_SERVICOS[0]} />
      </Vitrine>
    </Subsecao>
  );
}
