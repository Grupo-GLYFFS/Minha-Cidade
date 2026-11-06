import { Text } from '@mantine/core';
import SaudacaoBusca from '../componentes/inicio/SaudacaoBusca';
import AvisoAlerta from '../componentes/AvisoAlerta';
import AtalhosServicos from '../componentes/inicio/AtalhosServicos';
import MeusPedidos from '../componentes/inicio/MeusPedidos';
import ResumoBairro from '../componentes/inicio/ResumoBairro';
import ProjetoEmVotacao from '../componentes/inicio/ProjetoEmVotacao';
import PorQueExiste from '../componentes/inicio/PorQueExiste';
import { USUARIO } from '../dados/usuario';
import { PEDIDOS } from '../dados/pedidos';
import { ALERTAS } from '../dados/alertas';
import { PROJETOS } from '../dados/projetos';
import { SERVICOS_MAIS_USADOS } from '../dados/servicos';
import { alertaDefesaCivilAtivo } from '../logica/alertas';
import { pedidosAbertosDaPessoa } from '../logica/pedidos';
import classes from './Inicio.module.css';

// Página inicial: busca, alerta da Defesa Civil, atalhos, pedidos da pessoa,
// resumo do bairro, votação aberta e "Por que o Minha Prefeitura existe".
export default function Inicio() {
  const alerta = alertaDefesaCivilAtivo(ALERTAS, USUARIO.regiao);
  const meusPedidos = pedidosAbertosDaPessoa(PEDIDOS, USUARIO.id);
  const projetoAberto = PROJETOS.find((projeto) => projeto.status === 'votacao-aberta');

  return (
    <div className={classes.pagina}>
      <SaudacaoBusca usuario={USUARIO} />

      {alerta && <AvisoAlerta alerta={alerta} />}

      <AtalhosServicos servicos={SERVICOS_MAIS_USADOS} />

      {/* No computador, pedidos e bairro ficam lado a lado */}
      <div className={classes.duasColunas}>
        <MeusPedidos pedidos={meusPedidos} />
        <ResumoBairro usuario={USUARIO} pedidos={PEDIDOS} />
      </div>

      {projetoAberto && <ProjetoEmVotacao projeto={projetoAberto} />}

      <PorQueExiste />

      {/* No computador este aviso já aparece no rodapé */}
      <Text hiddenFrom="md" fz={12} ta="center" c="var(--cor-texto-suave)">
        Protótipo acadêmico, não é um serviço oficial da Prefeitura de São Paulo. Dados de exemplo.
      </Text>
    </div>
  );
}
