import { Text } from '@mantine/core';
import SaudacaoBusca from '../componentes/inicio/SaudacaoBusca';
import AvisoSessao from '../componentes/inicio/AvisoSessao';
import ConviteEntrar from '../componentes/inicio/ConviteEntrar';
import AvisoAlerta from '../componentes/AvisoAlerta';
import AtalhosServicos from '../componentes/inicio/AtalhosServicos';
import MeusPedidos from '../componentes/inicio/MeusPedidos';
import ResumoBairro from '../componentes/inicio/ResumoBairro';
import ProjetoEmVotacao from '../componentes/inicio/ProjetoEmVotacao';
import PorQueExiste from '../componentes/inicio/PorQueExiste';
import { ALERTAS } from '../dados/alertas';
import { PROJETOS } from '../dados/projetos';
import { servicosMaisUsados } from '../logica/servicos';
import { alertaDefesaCivilAtivo } from '../logica/alertas';
import { pedidosAbertosDaPessoa } from '../logica/pedidos';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import classes from './Inicio.module.css';

// Atalhos da seção "Serviços mais usados", lidos do catálogo
const MAIS_USADOS = servicosMaisUsados();

// Página inicial: busca, alerta da Defesa Civil, atalhos, pedidos da pessoa,
// resumo do bairro, votação aberta e "Por que o Minha Prefeitura existe".
// Para o visitante: "Olá!" e o convite para entrar, sem "Meus pedidos" nem "Meu Bairro".
export default function Inicio() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const alerta = alertaDefesaCivilAtivo(ALERTAS, usuario?.regiao);
  const projetoAberto = PROJETOS.find((projeto) => projeto.status === 'votacao-aberta');
  const meusPedidos = usuario ? pedidosAbertosDaPessoa(pedidos, usuario.id) : [];
  const nuncaAbriu = usuario ? !pedidos.some((pedido) => pedido.autorId === usuario.id) : false;

  return (
    <div className={classes.pagina}>
      <AvisoSessao />

      <SaudacaoBusca usuario={usuario} />

      {!usuario && <ConviteEntrar />}

      {alerta && <AvisoAlerta alerta={alerta} />}

      <AtalhosServicos servicos={MAIS_USADOS} />

      {/* No computador, pedidos e bairro ficam lado a lado */}
      {usuario && (
        <div className={classes.duasColunas}>
          <MeusPedidos pedidos={meusPedidos} nuncaAbriu={nuncaAbriu} />
          <ResumoBairro usuario={usuario} pedidos={pedidos} />
        </div>
      )}

      {projetoAberto && <ProjetoEmVotacao projeto={projetoAberto} />}

      <PorQueExiste />

      {/* No computador este aviso já aparece no rodapé */}
      <Text hiddenFrom="md" fz={12} ta="center" c="var(--cor-texto-suave)">
        Protótipo acadêmico, não é um serviço oficial da Prefeitura de São Paulo. Dados de exemplo.
      </Text>
    </div>
  );
}
