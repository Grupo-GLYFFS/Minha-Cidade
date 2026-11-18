import { useState } from 'react';
import Abas from '../Abas';
import Chip from '../Chip';
import ParaOndeIr from '../ParaOndeIr';
import TituloGrupo from '../TituloGrupo';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';
import classes from './Vitrine.module.css';

const ABAS = [
  { id: 'meus', rotulo: 'Meus pedidos', contagem: 3 },
  { id: 'seguidos', rotulo: 'Pedidos seguidos', contagem: 5 },
];

const DESTINOS = [
  {
    icone: 'how_to_vote',
    titulo: 'Votações da cidade',
    meta: '3 abertas para votar',
    para: '/minha-cidade/votacoes',
  },
  {
    icone: 'payments',
    titulo: 'Orçamento da cidade',
    meta: 'R$ 90,25 bi pagos até outubro',
    para: '/minha-cidade/orcamento',
  },
  {
    icone: 'construction',
    titulo: 'Obras do bairro',
    meta: '2 em andamento',
    para: '/meu-bairro/obras',
  },
];

// Seção de listas da /componentes: TituloGrupo, Abas, Chip e ParaOndeIr.
export default function VitrineListas() {
  const [aba, setAba] = useState('meus');
  const [assunto, setAssunto] = useState('todos');

  return (
    <VitrineSecao
      id="listas"
      titulo="Listas e navegação"
      arquivo="TituloGrupo.jsx · Abas.jsx · Chip.jsx · ParaOndeIr.jsx"
    >
      <VitrineExemplo rotulo="TituloGrupo (bolinha na cor do status, contagem e linha)">
        <TituloGrupo titulo="Abertas" contagem={3} cor="azul" />
        <TituloGrupo titulo="Encerradas" contagem={5} />
      </VitrineExemplo>

      <VitrineExemplo rotulo="Abas com contagem (setas do teclado trocam)">
        <Abas
          abas={ABAS}
          ativa={aba}
          aoMudar={setAba}
          rotulo="Tipo de pedido"
          prefixo="vitrine-abas"
        />
        <div
          role="tabpanel"
          id={`vitrine-abas-painel-${aba}`}
          aria-labelledby={`vitrine-abas-aba-${aba}`}
        >
          <p>Painel da aba “{aba === 'meus' ? 'Meus pedidos' : 'Pedidos seguidos'}”.</p>
        </div>
      </VitrineExemplo>

      <VitrineExemplo
        rotulo="Chips de filtro (aria-pressed, com contagem) e de atalho (com ícone)"
        linha
      >
        <Chip pressionado={assunto === 'todos'} contagem={66} onClick={() => setAssunto('todos')}>
          Todos
        </Chip>
        <Chip pressionado={assunto === 'saude'} contagem={12} onClick={() => setAssunto('saude')}>
          Saúde
        </Chip>
        <Chip icone="pets" para="/servicos">
          Castração
        </Chip>
      </VitrineExemplo>

      <VitrineExemplo rotulo="ParaOndeIr (fim de listas, hubs e detalhes)">
        <div className={classes.semMargem}>
          <ParaOndeIr destinos={DESTINOS.slice(0, 2)} />
          <ParaOndeIr destinos={DESTINOS} titulo="Para onde ir (3 cards)" />
        </div>
      </VitrineExemplo>
    </VitrineSecao>
  );
}
