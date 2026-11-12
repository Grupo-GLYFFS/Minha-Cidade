import { SimpleGrid } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AlternarExemplos from '../AlternarExemplos';
import CartaoPerfil from '../../perfil/CartaoPerfil';
import LinkOpcaoPerfil from '../../perfil/LinkOpcaoPerfil';
import GrupoOpcoesPerfil from '../../perfil/GrupoOpcoesPerfil';
import CartaoSolicitacao from '../../perfil/CartaoSolicitacao';
import AbaPedidos from '../../perfil/AbaPedidos';
import AbaServicos from '../../perfil/AbaServicos';
import FormularioMeusDados from '../../perfil/FormularioMeusDados';
import { USUARIO } from '../../../dados/usuario';
import { PEDIDOS } from '../../../dados/pedidos';
import { SERVICOS } from '../../../dados/servicos';
import { GRUPOS_PERFIL } from '../../../dados/opcoesPerfil';
import { pedidosDaPessoa } from '../../../logica/pedidos';
import { solicitacoesDeExemplo } from '../../../logica/vitrine';

const SOLICITACOES = solicitacoesDeExemplo(SERVICOS, USUARIO.id);

// Peças da página Perfil e de Meus pedidos, com a Maria como exemplo.
export default function AppPerfil() {
  return (
    <Subsecao id="app-perfil" titulo="Perfil">
      <Vitrine
        nome="CartaoPerfil"
        arquivo="src/componentes/perfil/CartaoPerfil.jsx"
        props="usuario · resumo { pedidosAbertos, servicos, apoios }"
      >
        <CartaoPerfil usuario={USUARIO} resumo={{ pedidosAbertos: 2, servicos: 1, apoios: 5 }} />
      </Vitrine>

      <Vitrine
        nome="GrupoOpcoesPerfil + LinkOpcaoPerfil"
        arquivo="src/componentes/perfil/"
        props="grupo { id, titulo, opcoes } · opcao { rotulo, descricao, icone, caminho }"
      >
        <GrupoOpcoesPerfil grupo={{ ...GRUPOS_PERFIL[1], id: 'vitrine' }} />
      </Vitrine>

      <Vitrine
        nome="LinkOpcaoPerfil (sozinho)"
        arquivo="src/componentes/perfil/LinkOpcaoPerfil.jsx"
        props="opcao"
        fundo="branco"
      >
        <LinkOpcaoPerfil opcao={GRUPOS_PERFIL[0].opcoes[2]} />
      </Vitrine>

      <Vitrine
        nome="CartaoSolicitacao"
        arquivo="src/componentes/perfil/CartaoSolicitacao.jsx"
        props="solicitacao · nivelTitulo={4} (Recebida / Em andamento; abre as respostas)"
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {SOLICITACOES.map((solicitacao) => (
            <CartaoSolicitacao key={solicitacao.id} solicitacao={solicitacao} nivelTitulo={4} />
          ))}
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="AbaPedidos + AbaServicos"
        arquivo="src/componentes/perfil/"
        props="pedidos · solicitacoes (com itens / vazias)"
      >
        <AlternarExemplos
          rotulo="Aba de Meus pedidos"
          opcoes={[
            {
              valor: 'pedidos',
              rotulo: 'Pedidos',
              conteudo: <AbaPedidos pedidos={pedidosDaPessoa(PEDIDOS, USUARIO.id)} />,
            },
            {
              valor: 'pedidos-vazio',
              rotulo: 'Pedidos (vazio)',
              conteudo: <AbaPedidos pedidos={[]} />,
            },
            {
              valor: 'servicos',
              rotulo: 'Serviços',
              conteudo: <AbaServicos solicitacoes={SOLICITACOES} />,
            },
            {
              valor: 'servicos-vazio',
              rotulo: 'Serviços (vazio)',
              conteudo: <AbaServicos solicitacoes={[]} />,
            },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="FormularioMeusDados"
        arquivo="src/componentes/perfil/FormularioMeusDados.jsx"
        props="sessão simulada: salvar mostra o aviso, mas não muda a conta"
        fundo="branco"
      >
        <AlternarExemplos
          rotulo="Mostrar o formulário Meus dados"
          opcoes={[
            { valor: 'fechado', rotulo: 'Esconder', conteudo: null },
            {
              valor: 'aberto',
              rotulo: 'Mostrar',
              conteudo: (
                <ContextoSimulado>
                  <FormularioMeusDados />
                </ContextoSimulado>
              ),
            },
          ]}
        />
      </Vitrine>
    </Subsecao>
  );
}
