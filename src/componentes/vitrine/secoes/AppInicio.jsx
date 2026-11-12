import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AlternarExemplos from '../AlternarExemplos';
import AtalhosServicos from '../../inicio/AtalhosServicos';
import ConviteEntrar from '../../inicio/ConviteEntrar';
import MeusPedidos from '../../inicio/MeusPedidos';
import PorQueExiste from '../../inicio/PorQueExiste';
import ProjetoEmVotacao from '../../inicio/ProjetoEmVotacao';
import ResumoBairro from '../../inicio/ResumoBairro';
import { USUARIO } from '../../../dados/usuario';
import { PEDIDOS } from '../../../dados/pedidos';
import { PROJETOS } from '../../../dados/projetos';
import { servicosMaisUsados } from '../../../logica/servicos';
import { pedidosAbertosDaPessoa } from '../../../logica/pedidos';
import { projetosEmVotacao } from '../../../logica/votacao';

// Seções da página inicial, com a Maria (conta de demonstração) como exemplo.
export default function AppInicio() {
  const projeto = projetosEmVotacao(PROJETOS)[0];

  return (
    <Subsecao id="app-inicio" titulo="Início">
      <Vitrine
        nome="AtalhosServicos"
        arquivo="src/componentes/inicio/AtalhosServicos.jsx"
        props="servicos (mais usados) · titulo · caminhoVerTodos"
      >
        <AtalhosServicos servicos={servicosMaisUsados()} />
      </Vitrine>

      <Vitrine
        nome="ConviteEntrar"
        arquivo="src/componentes/inicio/ConviteEntrar.jsx"
        props="sem props (só para o visitante)"
      >
        <ConviteEntrar />
      </Vitrine>

      <Vitrine
        nome="MeusPedidos"
        arquivo="src/componentes/inicio/MeusPedidos.jsx"
        props="pedidos · nuncaAbriu (com pedidos / conta nova)"
      >
        <AlternarExemplos
          rotulo="Estado de Meus pedidos"
          opcoes={[
            {
              valor: 'com',
              rotulo: 'Com pedidos',
              conteudo: <MeusPedidos pedidos={pedidosAbertosDaPessoa(PEDIDOS, USUARIO.id)} />,
            },
            {
              valor: 'nova',
              rotulo: 'Conta nova',
              conteudo: <MeusPedidos pedidos={[]} nuncaAbriu />,
            },
            { valor: 'vazio', rotulo: 'Nada em andamento', conteudo: <MeusPedidos pedidos={[]} /> },
          ]}
        />
      </Vitrine>

      {projeto && (
        <Vitrine
          nome="ProjetoEmVotacao"
          arquivo="src/componentes/inicio/ProjetoEmVotacao.jsx"
          props="projeto (visitante / sem voto / já votou)"
        >
          <AlternarExemplos
            rotulo="Estado do cartão Participe"
            opcoes={[
              {
                valor: 'visitante',
                rotulo: 'Visitante',
                conteudo: (
                  <ContextoSimulado logado={false}>
                    <ProjetoEmVotacao projeto={projeto} />
                  </ContextoSimulado>
                ),
              },
              {
                valor: 'sem-voto',
                rotulo: 'Sem voto',
                conteudo: (
                  <ContextoSimulado>
                    <ProjetoEmVotacao projeto={projeto} />
                  </ContextoSimulado>
                ),
              },
              {
                valor: 'votou',
                rotulo: 'Já votou',
                conteudo: (
                  <ContextoSimulado voto="sim">
                    <ProjetoEmVotacao projeto={projeto} />
                  </ContextoSimulado>
                ),
              },
            ]}
          />
        </Vitrine>
      )}

      <Vitrine
        nome="ResumoBairro"
        arquivo="src/componentes/inicio/ResumoBairro.jsx"
        props="usuario · pedidos"
      >
        <ResumoBairro usuario={USUARIO} pedidos={PEDIDOS} />
      </Vitrine>

      <Vitrine
        nome="PorQueExiste"
        arquivo="src/componentes/inicio/PorQueExiste.jsx"
        props="sem props (pesquisa TIC e ODS)"
      >
        <PorQueExiste />
      </Vitrine>
    </Subsecao>
  );
}
